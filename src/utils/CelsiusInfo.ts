import dotenv from 'dotenv'
import axios from 'axios'
import { Celsius, AUTH_METHODS, ENVIRONMENT } from 'celsius-sdk'
import {
	defaultStatsRecord,
	coinMarketCapInfo,
	defaultTransactionRecord,
	CHAIN_NAMES,
} from './values'
import {
	getTicker,
	getDebitFromType,
	getInverse,
	getPrice,
	getBaseNumbers,
} from './transaction'
import {
	Await,
	NumericDict,
	ActionDict,
	TransactionArgs,
	TransactionRecord,
	Stats,
	DriverArgs,
} from './types'

// Init

dotenv.config()

// Constants

const API_KEY = process.env.CELSIUS_API_KEY || ''
const PARTNER_KEY = process.env.CELSIUS_PARTNER_KEY || ''
const COIN_MARKET_CAP_KEY = process.env.COIN_MARKET_CAP_KEY || ''
const PAGE_SIZE = 50

/**
 * CelsiusInfo Class
 */

export default class CelsiusInfo {

	// Properties

	sdk?: Await<ReturnType<typeof Celsius>>
	stats: Stats = {
		total: defaultStatsRecord(),
		tokens: {}
	}
	balances: ActionDict = {}
	transactions: TransactionRecord[] = []

	/**
	 * Driver
	 */

	async driver(args?: DriverArgs) {
		const opts: DriverArgs = {
			transactions: true,
			stats: true,
			log: false,
			...args
		}
		await this.authenticate()
		const requests: Promise<any>[] = [this.getBalances()]
		if (opts.transactions) {
			requests.push(this.getTransactions({ date: opts.date }))
		}
		if (opts.stats) requests.push(this.getStats())
		await Promise.all(requests)
		if (opts.log) this.log()
	}

	/**
	 * Authenticate
	 */

	async authenticate() {
		const sdk = await Celsius({
			authMethod: AUTH_METHODS.API_KEY,
			partnerKey: PARTNER_KEY,
			environment: ENVIRONMENT.PRODUCTION,
		})
		this.sdk = sdk
	}

	/**
	 * Get Balances
	 */

	async getBalances() {
		if (this.sdk) {
			const res = await this.sdk.getBalanceSummary(API_KEY)
			if (res?.balance) {
				for (const token in res.balance) {
					const value = Number(res.balance[token])
					if (value) {
						const upperToken = token.toUpperCase()
						this.balances[upperToken] = {
							quantity: value,
							amount: 0,
							price: 0,
						}
					}
				}
				const quotes = await this.getQuotes()
				for (const key in this.balances) {
					const price = quotes[key] || 0
					const quantity = this.balances[key].quantity
					this.balances[key].amount = quantity * price
					this.balances[key].price = price
				}
			}
		}
	}

	/**
	 * Get Transactions
	 */

	async getTransactions(args?: TransactionArgs): Promise<any> {
		if (this.sdk) {
			const { date, getPage, transactions } = args || {}
			const res = await this.sdk.getTransactionSummary(
				{ page: getPage || 1, per_page: PAGE_SIZE } as any,
				API_KEY
			)
			let newTransactions = transactions || []
			if (res?.record) {
				let nextPage = 0
				const records = res.record || []
				const { current: current, pages: numPages } = res?.pagination || {}
				const currentPage = current || 1
				const pages = numPages || 1
				const getNextPage = () => {
					if (currentPage < pages) nextPage = currentPage + 1
				}

				// Date Cutoff
				if (date) {
					// Check if last date is in range
					const lastDate = records[records.length - 1].time
					if (lastDate >= date) {
						newTransactions = [...newTransactions, ...records]
						getNextPage()
					}

					// Cutoff last date in range
					else {
						let dateCutoffIndex = 0
						for (const index in records) {
							const recordDate = records[index].time
							if (recordDate < date) {
								dateCutoffIndex = Number(index)
								break
							}
						}
						const validRecords = records.slice(0, dateCutoffIndex)
						newTransactions = [...newTransactions, ...validRecords]
					}
				}

				// All Records
				else {
					newTransactions = [...newTransactions, ...records]
					getNextPage()
				}

				// Get Pages Recursively
				if (nextPage > 0) {
					return await this.getTransactions({
						date,
						getPage: nextPage,
						transactions: newTransactions,
					})
				}
			}

			// Format Transactions
			if (newTransactions.length > 0) {
				const aliases: any = {
					withdrawal: 'send',
					deposit: 'receive',
					referrer_award: 'receive',
					referred_award: 'receive',
				}
				const history: TransactionRecord[] = []
				for (const record of newTransactions) {
					const {
						id: internalId,
						tx_id: transHash,
						amount_usd: valUSD,
						amount_precise: qty,
						coin: quoteSymbol,
						nature: transType,
						time,
					} = record
					const id = internalId || ''
					const transactionHash = transHash || ''
					const blockchain = CHAIN_NAMES[quoteSymbol] || 'eth'
					const baseSymbol = 'USD'
					const ticker = getTicker(quoteSymbol, baseSymbol)
					const type = aliases[transType] || transType
					const quoteValueUSD = Number(valUSD)
					const quoteQuantity = Number(qty)
					const quotePriceUSD = getPrice(quoteValueUSD, quoteQuantity)
					const { baseQuantity, baseValueUSD } = getBaseNumbers(quoteValueUSD)
					history.push({
						...defaultTransactionRecord,
						id,
						time,
						quoteSymbol,
						ticker,
						type,
						quoteQuantity,
						quoteValueUSD,
						quotePriceUSD,
						baseQuantity,
						baseValueUSD,
						blockchain,
						transactionHash
					})
				}
				this.transactions = history
			}
		}
	}

	/**
	 * Get Stats
	 */

	async getStats() {
		if (this.sdk) {
			const res = await this.sdk.getStatistics(API_KEY)
			if (res) {
				const deposits = Number(res.deposit_count)
				const withdrawals = Number(res.withdrawal_count)
				const depositInfo = res.deposit_amount
				const withdrawInfo = res.withdrawal_amount
				const interestInfo = res.interest_amount
				for (const key in depositInfo) {
					const deposit = depositInfo[key]
					const withdrawal = withdrawInfo[key]
					const interest = interestInfo[key]

					// Totals
					if (key == 'total_amount_usd') {
						const depositAmount = Number(deposit)
						const withdrawAmount = Number(withdrawal)
						const interestAmount = Number(interest)
						this.stats.total = {
							deposit: {
								quantity: depositAmount,
								amount: depositAmount,
							},
							withdraw: {
								quantity: withdrawAmount,
								amount: withdrawAmount,
							},
							interest: {
								quantity: interestAmount,
								amount: interestAmount,
							},
							deposits,
							withdrawals,
						}
					}

					// Tokens
					else {
						const {
							amount_usd: depositAmount,
							amount: depositQuantity
						} = deposit
						const {
							amount_usd: withdrawAmount,
							amount: withdrawQuantity
						} = withdrawal
						const {
							amount_usd: interestAmount,
							amount: interestQuantity
						} = interest
						this.stats.tokens[key] = {
							deposit: {
								amount: Number(depositAmount) || 0,
								quantity: Number(depositQuantity) || 0,
							},
							withdraw: {
								amount: Number(withdrawAmount) || 0,
								quantity: Number(withdrawQuantity) || 0,
							},
							interest: {
								amount: Number(interestAmount) || 0,
								quantity: Number(interestQuantity) || 0,
							},
						}
					}
				}
			}
		}
	}

	/**
	 * Get Quotes
	 */

	private async getQuotes() {
		const quotes: NumericDict = {}
		const tokens = Object.keys(this.balances)
		if (tokens.length > 0) {
			const tokensCsv = Object.keys(this.balances).join(',')
			const res = await this.coinMarketCapRequest(
				'quotes',
				{ symbol: tokensCsv }
			)
			const data = res?.data || {}
			if (Object.keys(data).length > 0) {
				for (const key in data) {
					const price = data[key]?.quote?.USD?.price || 0
					quotes[key] = price
				}
			}
		}
		return quotes
	}

	/**
	 * Coin Market Cap Request
	 */

	private async coinMarketCapRequest(
		endpoint: keyof typeof coinMarketCapInfo,
		args?: any
	) {
		try {
			let query = args ? new URLSearchParams(args).toString() : ''
			if (query) query = '?' + query
			const url = coinMarketCapInfo[endpoint]
			const fullUrl = `${coinMarketCapInfo.api}/${url}${query}`
			return (await axios.get(
				fullUrl,
				{
					headers: { [coinMarketCapInfo.authHeader]: COIN_MARKET_CAP_KEY }
				}
			))?.data || {}
		} catch (err) {
			return {}
		}
	}

	/**
	 * Log
	 */

	 private async log() {
		console.log('Balances', this.balances)
		console.log('Transaction Count:', this.transactions.length)
		console.log(this.transactions[0] || '')
		console.log('Stats', this.stats)
		console.log(this.stats.tokens)
	}
}

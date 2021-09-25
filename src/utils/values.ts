import {
	StatsRecord,
	Action,
	TransactionRecord,
} from './types'

/**
 * Default Stats
 */

export const defaultStatsRecord = () => {
	const action: Action = { quantity: 0, amount: 0 }
	return {
		deposit: { ...action },
		withdraw: { ...action },
		interest: { ...action },
	} as StatsRecord
}

/**
 * Coin Market Info
 */

export const coinMarketCapInfo = {
	api: 'https://pro-api.coinmarketcap.com/v1',
	quotes: 'cryptocurrency/quotes/latest',
	authHeader: 'X-CMC_PRO_API_KEY'
}

/**
 * Default Transaction
 */

export const defaultTransactionRecord: TransactionRecord = {
	id: '',
	time: '',
	quoteSymbol: '',
	baseSymbol: 'USD',
	feeSymbol: 'USD',
	ticker: '',
	type: 'interest',
	quoteQuantity: 0,
	quoteValueUSD: 0,
	quotePriceUSD: 0,
	baseQuantity: 0,
	baseValueUSD: 0,
	basePriceUSD: 1,
	feeQuantity: 0,
	feeValueUSD: 0,
	feePriceUSD: 1,
	blockchain: 'eth',
	fromAddress: '',
	toAddress: '',
	transactionHash: '',
}

/**
 * Chain Names
 */

export const CHAIN_NAMES: any = {
	BTC: 'btc'
}

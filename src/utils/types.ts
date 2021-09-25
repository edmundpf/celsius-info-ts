import { CelsiusTransactionRecord } from 'celsius-sdk'

/**
 * Await Type
 */

export type Await<T> = T extends {
	then(onfulfilled?: (value: infer U) => unknown): unknown
} ? U : T

/**
 * Numeric Dict Type
 */

export type NumericDict = {
	[index: string]: number
}

/**
 * Action Dict Type
 */

export type ActionDict = {
	[index: string]: Action
}

/**
 * Transaction Args Type
 */

export type TransactionArgs = {
	date?: string
	getPage?: number
	transactions?: CelsiusTransactionType[]
}

/**
 * Celsius Transaction Type
 */

export type CelsiusTransactionType = CelsiusTransactionRecord & {
	id?: string
}

/**
 * Transaction Record
 */

export type TransactionRecord = {
	id: string
	time: string
	quoteSymbol: string
	baseSymbol: string
	feeSymbol: string
	ticker: string
	type: 'receive' | 'send' | 'interest'
	quoteQuantity: number
	quoteValueUSD: number
	quotePriceUSD: number
	baseQuantity: number
	baseValueUSD: number
	basePriceUSD: number
	feeQuantity: number
	feeValueUSD: number
	feePriceUSD: number
	blockchain: 'btc' | 'eth'
	fromAddress: string
	toAddress: string
	transactionHash: string
}


/**
 * Stats Record Type
 */

export type StatsRecord = {
	deposit: Action
	withdraw: Action
	interest: Action
	deposits?: number
	withdrawals?: number
}

/**
 * State Type
 */

export type Stats = {
	total: StatsRecord
	tokens: {
		[index: string]: StatsRecord
	}
}

/**
 * TransferType
 */

export type Action = {
	quantity: number
	amount: number
	price?: number
}

/**
 * Driver Args Type
 */

export type DriverArgs = {
	transactions?: boolean
	stats?: boolean
	log?: boolean
	date?: string
}

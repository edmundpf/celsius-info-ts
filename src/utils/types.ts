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
 * History Record
 */

export type HistoryRecord = {
	id: string
	date: string
	ticker: string
	quote: string
	base: string
	type: string
	direction: string
	quantity: number
	amount: number
	price: number
	fromAddress?: string
	toAddress?: string
	transactionId?: string
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

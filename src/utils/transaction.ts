/**
 * Get Ticker
 */

export const getTicker = (quoteSym: string, baseSym: string) => {
	const hasDashes = quoteSym.includes('-') || baseSym.includes('-')
	const separator = hasDashes ? '/' : '-'
	return `${quoteSym}${separator}${baseSym}`
}

/**
 * Get Debit from Type
 */

export const getDebitFromType = (type: string, match = 'send') =>
	type == match

/**
 * Get Inverse
 */

export const getInverse = (value: number) => value != 0 ? value * -1 : value

/**
 * Get Base Numbers
 */

export const getBaseNumbers = (quoteValue: number) => {
	const baseValueUSD = getInverse(quoteValue)
	const baseQuantity = baseValueUSD
	return {
		baseQuantity,
		baseValueUSD
	}
}

/**
 * Get Price
 */

export const getPrice = (value: number, quantity: number) =>
	Math.abs(value / quantity)

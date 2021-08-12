import {
	StatsRecord,
	Action,
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


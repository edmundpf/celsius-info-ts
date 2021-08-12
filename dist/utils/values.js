"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinMarketCapInfo = exports.defaultStatsRecord = void 0;
/**
 * Default Stats
 */
const defaultStatsRecord = () => {
    const action = { quantity: 0, amount: 0 };
    return {
        deposit: Object.assign({}, action),
        withdraw: Object.assign({}, action),
        interest: Object.assign({}, action),
    };
};
exports.defaultStatsRecord = defaultStatsRecord;
/**
 * Coin Market Info
 */
exports.coinMarketCapInfo = {
    api: 'https://pro-api.coinmarketcap.com/v1',
    quotes: 'cryptocurrency/quotes/latest',
    authHeader: 'X-CMC_PRO_API_KEY'
};

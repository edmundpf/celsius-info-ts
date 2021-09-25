"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_NAMES = exports.defaultTransactionRecord = exports.coinMarketCapInfo = exports.defaultStatsRecord = void 0;
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
/**
 * Default Transaction
 */
exports.defaultTransactionRecord = {
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
};
/**
 * Chain Names
 */
exports.CHAIN_NAMES = {
    BTC: 'btc'
};

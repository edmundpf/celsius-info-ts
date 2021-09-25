"use strict";
/**
 * Get Ticker
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = exports.getBaseNumbers = exports.getInverse = exports.getDebitFromType = exports.getTicker = void 0;
const getTicker = (quoteSym, baseSym) => {
    const hasDashes = quoteSym.includes('-') || baseSym.includes('-');
    const separator = hasDashes ? '/' : '-';
    return `${quoteSym}${separator}${baseSym}`;
};
exports.getTicker = getTicker;
/**
 * Get Debit from Type
 */
const getDebitFromType = (type, match = 'send') => type == match;
exports.getDebitFromType = getDebitFromType;
/**
 * Get Inverse
 */
const getInverse = (value) => value != 0 ? value * -1 : value;
exports.getInverse = getInverse;
/**
 * Get Base Numbers
 */
const getBaseNumbers = (quoteValue) => {
    const baseValueUSD = exports.getInverse(quoteValue);
    const baseQuantity = baseValueUSD;
    return {
        baseQuantity,
        baseValueUSD
    };
};
exports.getBaseNumbers = getBaseNumbers;
/**
 * Get Price
 */
const getPrice = (value, quantity) => Math.abs(value / quantity);
exports.getPrice = getPrice;

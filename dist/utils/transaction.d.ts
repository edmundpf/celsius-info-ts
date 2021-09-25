/**
 * Get Ticker
 */
export declare const getTicker: (quoteSym: string, baseSym: string) => string;
/**
 * Get Debit from Type
 */
export declare const getDebitFromType: (type: string, match?: string) => boolean;
/**
 * Get Inverse
 */
export declare const getInverse: (value: number) => number;
/**
 * Get Base Numbers
 */
export declare const getBaseNumbers: (quoteValue: number) => {
    baseQuantity: number;
    baseValueUSD: number;
};
/**
 * Get Price
 */
export declare const getPrice: (value: number, quantity: number) => number;

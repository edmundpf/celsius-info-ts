import { CelsiusTransactionRecord } from 'celsius-sdk';
/**
 * Await Type
 */
export declare type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;
/**
 * Numeric Dict Type
 */
export declare type NumericDict = {
    [index: string]: number;
};
/**
 * Action Dict Type
 */
export declare type ActionDict = {
    [index: string]: Action;
};
/**
 * Transaction Args Type
 */
export declare type TransactionArgs = {
    date?: string;
    getPage?: number;
    transactions?: CelsiusTransactionType[];
};
/**
 * Celsius Transaction Type
 */
export declare type CelsiusTransactionType = CelsiusTransactionRecord & {
    id?: string;
};
/**
 * History Record
 */
export declare type HistoryRecord = {
    id: string;
    date: string;
    ticker: string;
    quote: string;
    base: string;
    type: string;
    direction: string;
    quantity: number;
    amount: number;
    price: number;
    fromAddress?: string;
    toAddress?: string;
    transactionId?: string;
};
/**
 * Stats Record Type
 */
export declare type StatsRecord = {
    deposit: Action;
    withdraw: Action;
    interest: Action;
    deposits?: number;
    withdrawals?: number;
};
/**
 * State Type
 */
export declare type Stats = {
    total: StatsRecord;
    tokens: {
        [index: string]: StatsRecord;
    };
};
/**
 * TransferType
 */
export declare type Action = {
    quantity: number;
    amount: number;
    price?: number;
};
/**
 * Driver Args Type
 */
export declare type DriverArgs = {
    transactions?: boolean;
    stats?: boolean;
    log?: boolean;
    date?: string;
};

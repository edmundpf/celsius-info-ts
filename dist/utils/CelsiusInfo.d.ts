import { Celsius } from 'celsius-sdk';
import { Await, ActionDict, TransactionArgs, TransactionRecord, Stats, DriverArgs } from './types';
/**
 * CelsiusInfo Class
 */
export default class CelsiusInfo {
    sdk?: Await<ReturnType<typeof Celsius>>;
    stats: Stats;
    balances: ActionDict;
    transactions: TransactionRecord[];
    /**
     * Driver
     */
    driver(args?: DriverArgs): Promise<void>;
    /**
     * Authenticate
     */
    authenticate(): Promise<void>;
    /**
     * Get Balances
     */
    getBalances(): Promise<void>;
    /**
     * Get Transactions
     */
    getTransactions(args?: TransactionArgs): Promise<any>;
    /**
     * Get Stats
     */
    getStats(): Promise<void>;
    /**
     * Get Quotes
     */
    private getQuotes;
    /**
     * Coin Market Cap Request
     */
    private coinMarketCapRequest;
    /**
     * Log
     */
    private log;
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const celsius_sdk_1 = require("celsius-sdk");
const values_1 = require("./values");
// Init
dotenv_1.default.config();
// Constants
const API_KEY = process.env.API_KEY || '';
const PARTNER_KEY = process.env.PARTNER_KEY || '';
const COIN_MARKET_CAP_KEY = process.env.COIN_MARKET_CAP_KEY || '';
const PAGE_SIZE = 50;
/**
 * CelsiusInfo Class
 */
class CelsiusInfo {
    constructor() {
        // Properties
        this.stats = {
            total: values_1.defaultStatsRecord(),
            tokens: {}
        };
        this.balances = {};
        this.transactions = [];
    }
    /**
     * Driver
     */
    driver(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = Object.assign({ transactions: true, stats: true, log: false }, args);
            yield this.authenticate();
            const requests = [this.getBalances()];
            if (opts.transactions) {
                requests.push(this.getTransactions({ date: opts.date }));
            }
            if (opts.stats)
                requests.push(this.getStats());
            yield Promise.all(requests);
            if (opts.log)
                this.log();
        });
    }
    /**
     * Authenticate
     */
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const sdk = yield celsius_sdk_1.Celsius({
                authMethod: celsius_sdk_1.AUTH_METHODS.API_KEY,
                partnerKey: PARTNER_KEY,
                environment: celsius_sdk_1.ENVIRONMENT.PRODUCTION,
            });
            this.sdk = sdk;
        });
    }
    /**
     * Get Balances
     */
    getBalances() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sdk) {
                const res = yield this.sdk.getBalanceSummary(API_KEY);
                if (res === null || res === void 0 ? void 0 : res.balance) {
                    for (const token in res.balance) {
                        const value = Number(res.balance[token]);
                        if (value) {
                            const upperToken = token.toUpperCase();
                            this.balances[upperToken] = {
                                quantity: value,
                                amount: 0,
                                price: 0,
                            };
                        }
                    }
                    const quotes = yield this.getQuotes();
                    for (const key in this.balances) {
                        const price = quotes[key] || 0;
                        const quantity = this.balances[key].quantity;
                        this.balances[key].amount = quantity * price;
                        this.balances[key].price = price;
                    }
                }
            }
        });
    }
    /**
     * Get Transactions
     */
    getTransactions(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sdk) {
                const { date, getPage, transactions } = args || {};
                const res = yield this.sdk.getTransactionSummary({ page: getPage || 1, per_page: PAGE_SIZE }, API_KEY);
                let newTransactions = transactions || [];
                if (res === null || res === void 0 ? void 0 : res.record) {
                    let nextPage = 0;
                    const records = res.record || [];
                    const { current: current, pages: numPages } = (res === null || res === void 0 ? void 0 : res.pagination) || {};
                    const currentPage = current || 1;
                    const pages = numPages || 1;
                    const getNextPage = () => {
                        if (currentPage < pages)
                            nextPage = currentPage + 1;
                    };
                    // Date Cutoff
                    if (date) {
                        // Check if last date is in range
                        const lastDate = records[records.length - 1].time;
                        if (lastDate >= date) {
                            newTransactions = [...newTransactions, ...records];
                            getNextPage();
                        }
                        // Cutoff last date in range
                        else {
                            let dateCutoffIndex = 0;
                            for (const index in records) {
                                const recordDate = records[index].time;
                                if (recordDate < date) {
                                    dateCutoffIndex = Number(index);
                                    break;
                                }
                            }
                            const validRecords = records.slice(0, dateCutoffIndex);
                            newTransactions = [...newTransactions, ...validRecords];
                        }
                    }
                    // All Records
                    else {
                        newTransactions = [...newTransactions, ...records];
                        getNextPage();
                    }
                    // Get Pages Recursively
                    if (nextPage > 0) {
                        return yield this.getTransactions({
                            date,
                            getPage: nextPage,
                            transactions: newTransactions,
                        });
                    }
                }
                // Format Transactions
                if (newTransactions.length > 0) {
                    const aliases = {
                        withdrawal: 'send',
                        deposit: 'receive',
                        referal_award: 'award',
                    };
                    const history = [];
                    for (const record of newTransactions) {
                        const { id: internalId, tx_id: cryptoId, amount_usd: amountUsd, amount_precise: tokenQuantity, coin, nature, time, } = record;
                        const id = internalId || '';
                        const transId = cryptoId || undefined;
                        const base = 'USD';
                        const ticker = `${coin}-${base}`;
                        const type = aliases[nature] || nature;
                        const isCredit = type != 'send' ? true : false;
                        const direction = isCredit ? 'credit' : 'debit';
                        const amount = isCredit ? Number(amountUsd) : Number(amountUsd) * -1;
                        const quantity = Number(tokenQuantity);
                        const price = Math.abs(amount / quantity);
                        history.push({
                            id,
                            date: time,
                            ticker,
                            quote: coin,
                            base,
                            type,
                            direction,
                            quantity,
                            amount,
                            price,
                            transactionId: transId,
                        });
                    }
                    this.transactions = history;
                }
            }
        });
    }
    /**
     * Get Stats
     */
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sdk) {
                const res = yield this.sdk.getStatistics(API_KEY);
                if (res) {
                    const deposits = Number(res.deposit_count);
                    const withdrawals = Number(res.withdrawal_count);
                    const depositInfo = res.deposit_amount;
                    const withdrawInfo = res.withdrawal_amount;
                    const interestInfo = res.interest_amount;
                    for (const key in depositInfo) {
                        const deposit = depositInfo[key];
                        const withdrawal = withdrawInfo[key];
                        const interest = interestInfo[key];
                        // Totals
                        if (key == 'total_amount_usd') {
                            const depositAmount = Number(deposit);
                            const withdrawAmount = Number(withdrawal);
                            const interestAmount = Number(interest);
                            this.stats.total = {
                                deposit: {
                                    quantity: depositAmount,
                                    amount: depositAmount,
                                },
                                withdraw: {
                                    quantity: withdrawAmount,
                                    amount: withdrawAmount,
                                },
                                interest: {
                                    quantity: interestAmount,
                                    amount: interestAmount,
                                },
                                deposits,
                                withdrawals,
                            };
                        }
                        // Tokens
                        else {
                            const { amount_usd: depositAmount, amount: depositQuantity } = deposit;
                            const { amount_usd: withdrawAmount, amount: withdrawQuantity } = withdrawal;
                            const { amount_usd: interestAmount, amount: interestQuantity } = interest;
                            this.stats.tokens[key] = {
                                deposit: {
                                    amount: Number(depositAmount) || 0,
                                    quantity: Number(depositQuantity) || 0,
                                },
                                withdraw: {
                                    amount: Number(withdrawAmount) || 0,
                                    quantity: Number(withdrawQuantity) || 0,
                                },
                                interest: {
                                    amount: Number(interestAmount) || 0,
                                    quantity: Number(interestQuantity) || 0,
                                },
                            };
                        }
                    }
                }
            }
        });
    }
    /**
     * Get Quotes
     */
    getQuotes() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const quotes = {};
            const tokens = Object.keys(this.balances);
            if (tokens.length > 0) {
                const tokensCsv = Object.keys(this.balances).join(',');
                const res = yield this.coinMarketCapRequest('quotes', { symbol: tokensCsv });
                const data = (res === null || res === void 0 ? void 0 : res.data) || {};
                if (Object.keys(data).length > 0) {
                    for (const key in data) {
                        const price = ((_c = (_b = (_a = data[key]) === null || _a === void 0 ? void 0 : _a.quote) === null || _b === void 0 ? void 0 : _b.USD) === null || _c === void 0 ? void 0 : _c.price) || 0;
                        quotes[key] = price;
                    }
                }
            }
            return quotes;
        });
    }
    /**
     * Coin Market Cap Request
     */
    coinMarketCapRequest(endpoint, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = args ? new URLSearchParams(args).toString() : '';
                if (query)
                    query = '?' + query;
                const url = values_1.coinMarketCapInfo[endpoint];
                const fullUrl = `${values_1.coinMarketCapInfo.api}/${url}${query}`;
                return ((_a = (yield axios_1.default.get(fullUrl, {
                    headers: { [values_1.coinMarketCapInfo.authHeader]: COIN_MARKET_CAP_KEY }
                }))) === null || _a === void 0 ? void 0 : _a.data) || {};
            }
            catch (err) {
                return {};
            }
        });
    }
    /**
     * Log
     */
    log() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Balances', this.balances);
            console.log('Transaction Count:', this.transactions.length);
            console.log(this.transactions[0] || '');
            console.log('Stats', this.stats);
            console.log(this.stats.tokens);
        });
    }
}
exports.default = CelsiusInfo;

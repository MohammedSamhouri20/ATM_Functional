import type { Account } from "../types/Account.js";
import type { Transaction } from "../types/Transaction.js";
import type { Response } from "../types/Response.js";
import { TransactionType } from "../enums/TransactionType.js";

export function getTransactionsByAccountId(accounts: readonly Account[], accountId: number) : Response<Transaction[]> {
    const account = accounts.find(a => a.id == accountId);
    if (account == undefined) {
        return {data: null, success: false};
    }

    return {data: account.transactions, success: true};
}

export function addTransaction(accounts: readonly Account[], accountId: number, transactionType: TransactionType, amount: number ) : Response<Transaction> {
    const account = accounts.find(a => a.id == accountId);

    if (account == undefined) {
        console.log("Invalid Account");
        return {data: null, success: false};
    }

    const transactions = account.transactions;

    const newTransaction: Transaction = {
        id: transactions.length + 1, 
        type: transactionType, 
        amount: amount, 
        availableBalance: account.balance, 
        account: account,
        createdAt: new Date()
    };

    transactions.push(newTransaction);

    return {data: newTransaction, success: true};

}
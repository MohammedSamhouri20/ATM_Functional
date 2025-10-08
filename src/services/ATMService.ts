import { TransactionType } from "../enums/TransactionType.js";
import type { Account } from "../types/Account.js";
import type { Transaction } from "../types/Transaction.js";
import { getAccountById, updateAccountBalanceById } from "../repositories/AccountRepository.js";
import type { Response } from "../types/Response.js";
import { addTransaction, getTransactionsByAccountId } from "../repositories/TransactionRepository.js";

export function authenticateAccount(accounts: readonly Account[], accountId: number, pin: string): Response<boolean> {
    const account = accounts.find(a => a.id == accountId && a.pin == pin);
    if (account == undefined) {
        console.log("Invalid Account ID or PIN number");
        return {data: false, success: false};
    }

    const userName = account.user.name;
    console.log(`Welcome ${userName}`);

    return {data: true, success: true};
}

export function checkBalance(accounts: readonly Account[], accountId : number) : Response<number> {
    const account: Response<Account> = getAccountById(accounts, accountId);

    if (!account.success) {
        console.log("Invalid Account");
        return {data: -1, success: false};
    }
    const accountData : Account | null = account.data;
    if (accountData == null) {
        return {data: -1, success: false};
    }
    return {data: accountData.balance, success: true};
}

export function withdraw(accounts: readonly Account[], accountId: number, amount: number): Response<Transaction | null> {
    const account: Response<Account> = getAccountById(accounts, accountId);

    if (!account.success || account.data == null) {
        console.log("Invalid Account");
        return { data: null, success: false };
    }

    const balance = account.data.balance;
    if (balance < amount) {
        console.log(`Withdrawal failed: insufficient funds. Your current balance is $${balance}.`);
        return { data: null, success: false };
    }

    const newBalance = balance - amount;
    const updatedAccount = updateAccountBalanceById(accounts, accountId, newBalance);
    if (!updatedAccount.success) {
        console.log("Failed to update account balance");
        return { data: null, success: false };
    }

    const transaction = addTransaction(accounts, accountId, TransactionType.Withdraw, amount);
    if (!transaction.success || transaction.data == null) {
        console.log("Transaction creation failed");
        return { data: null, success: false };
    }

    console.log(`Withdrawal success: Your current balance is $${newBalance}.`);
    return { data: transaction.data, success: true };
}

export function deposit(accounts: readonly Account[], accountId : number, amount: number) : Response<Transaction | null> {
    const account : Response<Account> = getAccountById(accounts, accountId);

    if (!account.success || account.data == null) {
        console.log("Invalid Account");
        return { data: null, success: false };
    }

    const balance = account.data.balance;
    const newBalance = balance + amount;

    const updatedAccount = updateAccountBalanceById(accounts, accountId, newBalance);
    if (!updatedAccount.success) {
        console.log("Failed to update account balance");
        return { data: null, success: false };
    }

    const transaction = addTransaction(accounts, accountId, TransactionType.Deposit, amount);
    if (!transaction.success || transaction.data == null) {
        console.log("Transaction creation failed");
        return { data: null, success: false };
    }

    console.log(`Deposit success: Your current balance is $${newBalance}.`);
    return { data: transaction.data, success: true };
    
}
    
export function viewTransactionHistory(accounts: readonly Account[], accountId: number) : Response<Transaction[]> {
    return getTransactionsByAccountId(accounts, accountId);
}

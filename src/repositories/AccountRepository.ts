import type { Account } from "../types/Account.js";
import type { Response } from "../types/Response.js";

export function getAccountById(accounts: readonly Account[], accountId: number) : Response<Account> {
    const account = accounts.find(a => a.id == accountId);
    if (account == undefined) {
        return {data: null, success: false};
    }

    return {data: account, success: true};
}

export function getAccountByUserId(accounts: readonly Account[], userId: number) : Response<Account> {
    const account = accounts.find(a => a.user.id == userId);
    if (account == undefined) {
        return {data: null, success: false};
    }

    return {data: account, success: true};
}

export function updateAccountBalanceById(accounts: readonly Account[], accountId: number, newBalance: number) : Response<Account> {
       const account = accounts.find(a => a.id == accountId);

       if (account == undefined) {
        console.log("Update Failed: Invalid Account");
        return {data: null, success: false};
       }

       account.balance = newBalance;

       return {data: account, success: true};
}
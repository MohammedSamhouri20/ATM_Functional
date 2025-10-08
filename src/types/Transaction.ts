import type { TransactionType } from "../Enums/TransactionType.js";
import type { Account } from "./Account.js";

export type Transaction = {
     id: number,
     type: TransactionType,
     createdAt: Date,
     amount: number,
     availableBalance: number,
     account: Account,
}
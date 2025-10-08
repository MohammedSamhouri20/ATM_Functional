import type { Transaction } from "./Transaction.js";
import type { User } from "./User.js";

export type Account = {
    id: number,
    user: User,
    pin: string,
    balance: number,
    transactions: Transaction[]
}
import type { Account } from "./Account.js"

export type User = {
    id: number,
    name: string,
    account: Account | undefined
}
import type { Account } from "../types/Account.js";
import type { User } from "../types/User.js";

const users: User[] = [];
const accounts: Account[] = [];

//generate random users and accounts
//the accounts ids will be 10, 20,..., 90
//the PINs will be 1231, 1232, 1233, ...., 1239
for (let i = 1; i < 10; i++) {
    const user : User = {id: i, 
        name: `User${i}`, 
        account: undefined
    };

    const account : Account = {
        id: i * 10, 
        balance: Math.floor(Math.random() * 10000), 
        user: user, 
        pin:`123${i}`, 
        transactions: []
    };

    user.account = account;
    
    users.push(user);
    accounts.push(account);
}

export {users, accounts};
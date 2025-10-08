# ATM Console App (TypeScript)

## What does it include?

### Types
These define the **structure of the data** and enforce type safety in TypeScript.

- **User**  
  Represents a bank user. Contains personal information such as `name`, `id`. Used to link account to the person who owns it.

- **Account**  
  Represents a bank account. Stores `id`, `balance`, `pin`, `transactions` and a reference to the `User`. All operations like deposits and withdrawals work on this object.

- **Transaction**  
  Represents a financial transaction on an account. Includes `id`, `type` (Deposit or Withdraw), `amount`, and `createdAt`. Used to track account activity.

### Repositories
Repositories act as a **data access layer**, abstracting how accounts and transactions are stored and retrieved. This keeps the service logic clean.

- **Account Repository**  
  Handles reading and updating accounts. Functions include:
  - `getAccountById` → retrieve a specific account.
  - `updateAccountBalanceById` → update account balance after a deposit or withdrawal.

- **Transaction Repository**  
  Handles all transaction-related data. Functions include:
  - `addTransaction` → record a new deposit or withdrawal.
  - `getTransactionsByAccountId` → fetch all transactions for a specific account.

### Services
Services contain the **business logic** — the actual operations the ATM can perform.

- **ATM Service**  
  Provides functions like:
  - `authenticateAccount` → checks if an account ID and PIN are valid.
  - `checkBalance` → retrieves the current account balance.
  - `deposit` → adds money to the account and records a transaction.
  - `withdraw` → subtracts money from the account (if funds are sufficient) and records a transaction.
  - `viewTransactionHistory` → shows all transactions associated with the account.

### CLI Interface
The console application handles **user interaction**.

- Prompts the user for account ID and PIN.  
- Displays a menu to choose services (Check Balance, Withdraw, Deposit, View Transactions).  
- Calls the appropriate service functions based on user selection.  
- Shows feedback and transaction results in the console.  

### Data
- Stored in memory for simplicity. 

### You can try the app using the data:
- The Account Ids: 10, 20, 30, ..., 90
- The PINs respectively: 1231, 1232, 1233, ...., 1239
---

## How to Run  
```bash
git clone https://github.com/MohammedSamhouri20/ATM_Functional
cd ATM_Functional
npm install
npm start

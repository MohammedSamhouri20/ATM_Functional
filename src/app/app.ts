import inquirer from "inquirer";
import { accounts } from "../data/data.js";
import {
    checkBalance,
    deposit,
    withdraw,
    viewTransactionHistory,
    authenticateAccount
} from "../services/ATMService.js";

async function startATM() {
    while (true) {
        const login = await inquirer.prompt([
            {
                type: "number",
                name: "AccountId",
                message: "Please Enter Your Account ID:"
            },
            {
                type: "password",
                name: "PIN",
                message: "Please Enter Your PIN:",
                mask: "*"
            }
        ]);

        const isAuthenticated = authenticateAccount(accounts, login.AccountId, login.PIN);
        if (!isAuthenticated.success) {
            console.log("Authentication failed. Try again.\n");
            continue;
        }

        while (true) {
            const { service } = await inquirer.prompt([
                {
                    type: "list",
                    name: "service",
                    message: "Please Choose The Service:",
                    choices: [
                        "Check Balance",
                        "Withdraw",
                        "Deposit",
                        "View All Transactions",
                        "Exit"
                    ]
                }
            ]);

            if (service === "Check Balance") {
                const result = checkBalance(accounts, login.AccountId);
                if (result.success && result.data != null)
                    console.log(`Your current balance is $${result.data}.\n`);
                else
                    console.log("Unable to retrieve balance.\n");
            }

            else if (service === "Withdraw") {
                const { amount } = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter withdrawal amount:"
                    }
                ]);
                withdraw(accounts, login.AccountId, amount);
            }

            else if (service === "Deposit") {
                const { amount } = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter deposit amount:"
                    }
                ]);
                deposit(accounts, login.AccountId, amount);
            }

            else if (service === "View All Transactions") {
                const transactions = viewTransactionHistory(accounts, login.AccountId);
                if (!transactions.success || transactions.data == null) {
                    console.log("No transactions found.\n");
                } else {
                    console.log("\n### Transaction History ###");
                    transactions.data.forEach((t) => {
                        console.log(
                            `ID: ${t.id} | Type: ${t.type} | Amount: $${t.amount} | Date: ${t.createdAt}`
                        );
                    });
                    console.log("###############################\n");
                }
            }

            else if (service === "Exit") {
                console.log("Thank you for using the ATM.\n");
                process.exit();
            }
        }
    }
}

startATM();

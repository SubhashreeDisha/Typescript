"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
class BankAccount {
    accountNumber;
    accountHolder;
    balance;
    constructor(accountNumber, accountHolder, initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited amount: ₹${amount} and updated new balance: ₹${this.balance}.`);
        }
        else {
            console.log("Amount must be greater than 0.");
        }
    }
    withdraw(amount) {
        if (amount < this.balance) {
            this.balance -= amount;
            console.log(`Withdrew amount: ₹${amount} and Remaining balance: ₹${this.balance}`);
        }
        else if (amount <= 0) {
            console.log("Withdraw amount must be greater than 0.");
        }
        else {
            console.log("Insufficient balance!");
        }
    }
    getBalance() {
        return this.balance;
    }
}
class SavingAccount extends BankAccount {
    interestRate;
    constructor(accountNumber, accountHolder, initialBalance, interestRate) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = interestRate;
    }
    applyInterest() {
        const interest = (this.getBalance() * this.interestRate) / 100;
        this.deposit(interest);
        console.log(`An interest of ₹${interest.toFixed(2)} has been successfully added to your account.`);
    }
}
const acc = new SavingAccount(101, "Disha", 55000, 4);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function Display() {
    console.log("----------------- Banking Menu ----------------");
    console.log("1. Deposit");
    console.log("2. Withdraw");
    console.log("3. Check Balance");
    console.log("4. ApplyInterest");
    console.log("5. Exit");
    rl.question("Choose an option: ", (choice) => {
        handleChoice(choice);
    });
}
function handleChoice(choice) {
    switch (choice) {
        case "1":
            rl.question("Enter amount to deposit: ", (amt) => {
                const amount = parseFloat(amt);
                if (isNaN(amount) === false) {
                    acc.deposit(amount);
                }
                else {
                    console.log("Invalid amount.");
                }
                Display();
            });
            break;
        case "2":
            rl.question("Enter amount to withdraw: ", (amt) => {
                const amount = parseFloat(amt);
                if (isNaN(amount) === false) {
                    acc.withdraw(amount);
                }
                else {
                    console.log("Invalid amount.");
                }
                Display();
            });
            break;
        case "3":
            console.log(`Balance: ₹${acc.getBalance()}`);
            Display();
            break;
        case "4":
            acc.applyInterest();
            Display();
            break;
        case "5":
            console.log("Thanks for using our bank!");
            rl.close();
            break;
        default:
            console.log("Invalid option. Try again.");
            Display();
    }
}
Display();

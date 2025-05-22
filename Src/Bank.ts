import * as readline from "readline";

class BankAccount {
  private accountNumber:number;
  public accountHolder:string;
  private balance:number;

  constructor(accountNumber:number, accountHolder:string, initialBalance:number) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  public deposit(amount:number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited amount: ₹${amount} and updated new balance: ₹${this.balance}.`);
    } else {
      console.log("Amount must be greater than 0.");
    }
  }

  public withdraw(amount:number): void {
    
     if(amount < this.balance){
      this.balance -= amount;
      console.log(`Withdrew amount: ₹${amount} and Remaining balance: ₹${this.balance}`);
    }
    else if (amount <= 0) {
      console.log("Withdraw amount must be greater than 0.");
    }
    else{
       console.log("Insufficient balance!");
    }
  }

  public getBalance(): number {
    return this.balance;
  }
}

class SavingAccount extends BankAccount {
  private interestRate: number;

  constructor(accountNumber:number, accountHolder:string, initialBalance:number, interestRate:number) {
    super(accountNumber, accountHolder, initialBalance);
    this.interestRate = interestRate;
  }

  public applyInterest(): void {
    const interest = (this.getBalance() * this.interestRate) / 100;
    this.deposit(interest);
   console.log(`An interest of ₹${interest.toFixed(2)} has been successfully added to your account.`);

  }
}

const acc = new SavingAccount(101, "Disha", 550000, 4);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function Display(): void {
  console.log("--- Banking Menu ---");
  console.log("1. Deposit");
  console.log("2. Withdraw");
  console.log("3. Check Balance");
  console.log("4. ApplyInterest");
  console.log("5. Exit");

  rl.question("Choose an option: ", (choice: string) => {
    handleChoice(choice);
  });
}

function handleChoice(choice: string): void {
  switch (choice) {
    case "1":
      rl.question("Enter amount to deposit: ", (amt: string) => {
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
      rl.question("Enter amount to withdraw: ", (amt: string) => {
        const amount = parseFloat(amt);
        if (isNaN(amount) === false) {
        acc.withdraw(amount);
       }
        else{
          console.log("Invalid amount.")
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

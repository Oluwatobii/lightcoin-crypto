//Account Class
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transac of this.transactions) {
      balance += transac.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

//Transaction Class
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this); // <---- why?
    }
  }
}

// Withdrawal Class
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance >= this.amount) {
      return true;
    } else {
      console.log("Not enough Cash");
      return false;
    }
    //return this.account.balance >= this.amount; // <-- Alternatively
  }
}

// Deposit Class
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Otbi");

console.log("Starting Balance: ", myAccount.balance);

const t1 = new Deposit(115.0, myAccount);
t1.commit();
console.log(t1.time);

const t2 = new Withdrawal(10.0, myAccount);
t2.commit();
console.log(t2.time);

const t3 = new Deposit(20.0, myAccount);
t3.commit();
console.log(t3.time);

const t4 = new Withdrawal(400.0, myAccount);
t4.commit();
//console.log(t4.time);

console.log("Ending Balance:", myAccount.balance);

console.log("Account Transaction History: ", myAccount.transactions);

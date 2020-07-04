//Account Class
class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
  }
}

//Transaction Class
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.account.balance += this.value;
  }
}

// Withdrawal Class
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

// Deposit Class
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("Otbi");

console.log("Starting Balance: ", myAccount.balance);

const t1 = new Deposit(120.0, myAccount);
t1.commit();

const t2 = new Withdrawal(10.0, myAccount);
t2.commit();

const t3 = new Deposit(20.0, myAccount);
t3.commit();

console.log("Ending Balance:", myAccount.balance);

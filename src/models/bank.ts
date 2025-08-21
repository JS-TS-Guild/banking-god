import BankAccount from "./bank-account";

class Bank {
  private id: string;
  private accounts: BankAccount[] = [];
  private balance: number;
  constructor() {
    this.id = crypto.randomUUID();
    this.balance = 0;
  }

  // this is static as it creates a new instance of the Bank class also [const bank = Bank.create()]
  static create(): Bank {
    return new Bank();
  }
  // this is not static as it operates on an instance of the Bank class [bank.getId()]
  getId(): string {
    return this.id;
  }
  createAccount(initialBalance: number): BankAccount {
    const account = new BankAccount(initialBalance);
    this.accounts.push(account);
    return account;
  }
}
export default Bank;

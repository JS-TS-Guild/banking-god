class BankAccount {
  private id: string;
  private balance: number;

  constructor(initialBalance: number) {
    this.id = crypto.randomUUID();
    this.balance = initialBalance;
  }

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    this.balance -= amount;
  }
}
export default BankAccount;

import { BankAccountId } from "@/types/Common";

export default class BankAccount {
  private id: BankAccountId;
  private balance: number;
  private isNegativeAllowed: boolean;

  constructor(initialBalance: number, isNegativeAllowed: boolean = false) {
    this.id = this.generateId();
    this.balance = initialBalance;
    this.isNegativeAllowed = isNegativeAllowed;
  }

  private generateId(): BankAccountId {
    return `account_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getId(): BankAccountId {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (!this.isNegativeAllowed && this.balance < amount) {
      throw new Error("Insufficient funds");
    }

    this.balance -= amount;
  }

  setBalance(balance: number): void {
    if (!this.isNegativeAllowed && balance < 0) {
      throw new Error("Negative balance not allowed");
    }
    this.balance = balance;
  }
}

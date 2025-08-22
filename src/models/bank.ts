import { BankAccountId, UserId } from "@/types/Common";
import BankAccount from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";

interface BankOptions {
  isNegativeAllowed?: boolean;
}

export default class Bank {
  private id: string;
  private accounts: Map<BankAccountId, BankAccount>;
  private isNegativeAllowed: boolean;

  constructor(options: BankOptions = {}) {
    this.id = this.generateId();
    this.accounts = new Map();
    this.isNegativeAllowed = options.isNegativeAllowed || false;
    GlobalRegistry.registerBank(this);
  }

  private generateId(): string {
    return `bank_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static create(options?: BankOptions): Bank {
    return new Bank(options);
  }

  getId(): string {
    return this.id;
  }

  createAccount(initialBalance: number): BankAccount {
    const account = new BankAccount(initialBalance, this.isNegativeAllowed);
    this.accounts.set(account.getId(), account);
    return account;
  }

  getAccount(accountId: BankAccountId): BankAccount {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error(`Account ${accountId} not found`);
    }
    return account;
  }

  hasAccount(accountId: BankAccountId): boolean {
    return this.accounts.has(accountId);
  }

  send(
    fromUserId: UserId,
    toUserId: UserId,
    amount: number,
    toBankId?: string
  ): void {
    const fromUser = GlobalRegistry.getUser(fromUserId);
    const toUser = GlobalRegistry.getUser(toUserId);

    if (!fromUser || !toUser) {
      throw new Error("User not found");
    }

    const fromAccountIds = fromUser.getAccountIds();
    const toAccountIds = toUser.getAccountIds();

    if (fromAccountIds.length === 0 || toAccountIds.length === 0) {
      throw new Error("User has no accounts");
    }

    // Find accounts that belong to this bank
    const fromAccountId = fromAccountIds.find((id) => this.hasAccount(id));
    const toAccountId = toAccountIds.find((id) => this.hasAccount(id));

    if (!fromAccountId) {
      throw new Error("Sender has no account in this bank");
    }

    const fromAccount = this.getAccount(fromAccountId);

    // Determine target bank and account
    let toBank: Bank;
    let toAccount: BankAccount;

    if (toBankId && toBankId !== this.id) {
      toBank = GlobalRegistry.getBank(toBankId);
      const targetAccountId = toAccountIds.find((id) => toBank.hasAccount(id));
      if (!targetAccountId) {
        throw new Error("Recipient has no account in target bank");
      }
      toAccount = toBank.getAccount(targetAccountId);
    } else {
      if (!toAccountId) {
        throw new Error("Recipient has no account in this bank");
      }
      toBank = this;
      toAccount = this.getAccount(toAccountId);
    }

    // Perform the transfer
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);
  }
}

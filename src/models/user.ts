import { UserId, BankAccountId } from "@/types/Common";
import GlobalRegistry from "@/services/GlobalRegistry";

export default class User {
  private id: UserId;
  private name: string;
  private accountIds: BankAccountId[];

  constructor(name: string, accountIds: BankAccountId[]) {
    this.id = this.generateId();
    this.name = name;
    this.accountIds = accountIds;
    GlobalRegistry.registerUser(this);
  }

  private generateId(): UserId {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static create(name: string, accountIds: BankAccountId[]): User {
    return new User(name, accountIds);
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAccountIds(): BankAccountId[] {
    return [...this.accountIds];
  }

  addAccount(accountId: BankAccountId): void {
    if (!this.accountIds.includes(accountId)) {
      this.accountIds.push(accountId);
    }
  }

  removeAccount(accountId: BankAccountId): void {
    this.accountIds = this.accountIds.filter((id) => id !== accountId);
  }
}

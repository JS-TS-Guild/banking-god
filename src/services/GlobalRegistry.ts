import { UserId } from "@/types/Common";
import User from "@/models/user";
import Bank from "@/models/bank";

export default class GlobalRegistry {
  private static users: Map<UserId, User> = new Map();
  private static banks: Map<string, Bank> = new Map();

  static registerUser(user: User): void {
    this.users.set(user.getId(), user);
  }

  static registerBank(bank: Bank): void {
    this.banks.set(bank.getId(), bank);
  }

  static getUser(userId: UserId): User | undefined {
    return this.users.get(userId);
  }

  static getBank(bankId: string): Bank {
    const bank = this.banks.get(bankId);
    if (!bank) {
      throw new Error(`Bank ${bankId} not found`);
    }
    return bank;
  }

  static clear(): void {
    this.users.clear();
    this.banks.clear();
  }
}

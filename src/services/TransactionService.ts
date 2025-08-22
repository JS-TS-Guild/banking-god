import { UserId } from "@/types/Common";
import GlobalRegistry from "./GlobalRegistry";
import Bank from "@/models/bank";

export default class TransactionService {
  static transfer(
    fromUserId: UserId,
    toUserId: UserId,
    amount: number,
    bankId?: string
  ): void {
    const fromUser = GlobalRegistry.getUser(fromUserId);
    const toUser = GlobalRegistry.getUser(toUserId);

    if (!fromUser || !toUser) {
      throw new Error("User not found");
    }

    // For now, we'll use the first bank in the registry
    // In a real implementation, you'd want to specify which bank to use
    const bank = bankId ? GlobalRegistry.getBank(bankId) : null;
    if (!bank) {
      throw new Error("No banks available");
    }

    bank.send(fromUserId, toUserId, amount);
  }

  static getTransactionHistory(userId: UserId): any[] {
    // This would return transaction history for a user
    // For now, return empty array
    return [];
  }
}

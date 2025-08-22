// ...existing imports...

export class TestFactory {
  static createFixtures(): TestFixtures {
    GlobalRegistry.clear();

    // Create users first
    const aliceUser = User.create("Alice");
    const bobUser = User.create("Bob");

    // Create accounts and associate with users
    const aliceAccount = bank.createAccount(1000, aliceUser.getId());
    const bobAccount = bank.createAccount(500, bobUser.getId());
    const aliceAccountAllowsNegative = bankAllowsNegative.createAccount(
      200,
      aliceUser.getId()
    );

    // ...rest of your code...

    return {
      bank,
      bankAllowsNegative,
      aliceUserId: aliceUser.getId(),
      bobUserId: bobUser.getId(),
      aliceAccountId: aliceAccount.getId(),
      bobAccountId: bobAccount.getId(),
      aliceAccountAllowsNegativeId: aliceAccountAllowsNegative.getId(),
    };
  }
}

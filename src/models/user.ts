class User {
  constructor(private name: string, private bankAccountIds: string[]) {
    this.name = name;
    this.bankAccountIds = bankAccountIds;
  }

  private static create(): User {
    return new User("", []);
  }
}
export default User;

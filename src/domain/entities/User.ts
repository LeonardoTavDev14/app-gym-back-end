export const userRoles = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  PROFESSIONAL: "PROFESSIONAL",
  USER: "USER",
} as const;

export type userRoles = (typeof userRoles)[keyof typeof userRoles];

export class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public role: userRoles;
  public age: number;
  public timeoutAccount?: Date | null;
  public loginAttempts?: number | null;
  public accountBlocked?: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    role: userRoles,
    age: number,
    timeoutAccount?: Date | null,
    loginAttempts?: number | null,
    accountBlocked?: boolean,
    id?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.age = age;

    if (timeoutAccount !== undefined) this.timeoutAccount = timeoutAccount;
    if (loginAttempts !== undefined) this.loginAttempts = loginAttempts;
    if (accountBlocked !== undefined) this.accountBlocked = accountBlocked;
    if (id) this.id = id;
  }

  static updateUser(existingUser: User, updates: Partial<User>): User {
    return new User(
      updates.name ?? existingUser.name,
      existingUser.email,
      updates.password ?? existingUser.password,
      updates.role ?? existingUser.role,
      updates.age ?? existingUser.age,
      updates.timeoutAccount !== undefined
        ? updates.timeoutAccount
        : existingUser.timeoutAccount,
      updates.loginAttempts !== undefined
        ? updates.loginAttempts
        : existingUser.loginAttempts,
      updates.accountBlocked !== undefined
        ? updates.accountBlocked
        : existingUser.accountBlocked,
      existingUser.id
    );
  }
}

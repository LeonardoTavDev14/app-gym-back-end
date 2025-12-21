import { User } from "../../../domain/entities/User";
import { IUpdateUserRepositories } from "../../../domain/repositories/user/IUpdateUserRepositories";
import { prisma } from "../../database/prisma";

export class UpdateUserRepository implements IUpdateUserRepositories {
  async updateUser(user: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        password: user.password,
        role: user.role,
        age: user.age,
        timeoutAccount: user.timeoutAccount,
        loginAttempts: user.loginAttempts,
        accountBlocked: user.accountBlocked,
      },
    });
  }
}

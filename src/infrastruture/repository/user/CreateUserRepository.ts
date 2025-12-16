import { ICreateUserRepositories } from "../../../domain/repositories/user/ICreateUserRepositories";
import { User } from "../../../domain/entities/User";
import { prisma } from "../../database/prisma";

export class CreateUserRepository implements ICreateUserRepositories {
  async createdUser(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        age: user.age,
        timeoutAccount: null,
        loginAttempts: 0,
        accountBlocked: false,
      },
    });

    return new User(
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.age,
      newUser.timeoutAccount,
      newUser.loginAttempts,
      newUser.accountBlocked!,
      newUser.id
    );
  }
}

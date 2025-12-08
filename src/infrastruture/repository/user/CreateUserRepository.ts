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
      },
    });

    return new User(
      newUser.name,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.age,
      newUser.id
    );
  }
}

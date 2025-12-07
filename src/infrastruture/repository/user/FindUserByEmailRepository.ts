import { IFindUserByEmailRepositories } from "../../../domain/repositories/user/IFindUserByEmailRepositories";
import { User } from "../../../domain/entities/User";
import { prisma } from "../../database/prisma";

export class FindUserByEmailRepository implements IFindUserByEmailRepositories {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new User(user.name, user.email, user.password, user.role, user.id);
  }
}

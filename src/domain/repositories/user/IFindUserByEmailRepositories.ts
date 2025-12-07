import { User } from "../../entities/User";

export interface IFindUserByEmailRepositories {
  findUserByEmail(email: string): Promise<User | null>;
}

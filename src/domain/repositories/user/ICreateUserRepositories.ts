import { User } from "../../entities/User";

export interface ICreateUserRepositories {
  createdUser(user: User): Promise<User>;
}

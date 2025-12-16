import { User } from "../../entities/User";

export interface IUpdateUserRepositories {
  updateUser(user: User): Promise<void>;
}

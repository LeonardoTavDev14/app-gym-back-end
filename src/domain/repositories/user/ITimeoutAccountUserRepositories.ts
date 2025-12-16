import { User } from "../../entities/User";

export interface ITimeoutAccountUserRepositories {
  timeoutAccountUser(user: User): Promise<boolean>;
}

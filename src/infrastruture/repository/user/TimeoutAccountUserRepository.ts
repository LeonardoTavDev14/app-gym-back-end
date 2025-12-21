import { ITimeoutAccountUserRepositories } from "../../../domain/repositories/user/ITimeoutAccountUserRepositories";
import { User } from "../../../domain/entities/User";
import dayjs from "dayjs";

export class TimeoutAccountUserRepository
  implements ITimeoutAccountUserRepositories
{
  async timeoutAccountUser(user: User): Promise<boolean> {
    if (!user.timeoutAccount) return false;

    const timeoutAccountUser =
      user.timeoutAccount instanceof Date
        ? user.timeoutAccount
        : new Date(user.timeoutAccount);

    return dayjs().isBefore(timeoutAccountUser);
  }
}

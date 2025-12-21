import { IFindUserByEmailRepositories } from "../../../domain/repositories/user/IFindUserByEmailRepositories";
import { ICompareProvider } from "../../../shared/providers/bcryptjs/compare/ICompareProvider";
import { IJWTProvider } from "../../../shared/providers/tokens/jwt/IJWTProvider";
import { IAuthUserDTO } from "../../dtos/user/IAuthUserDTO";
import { CredencialsUserError } from "../../../shared/errors/user/CredencialsUserError";
import { UserAccountBlockedError } from "../../../shared/errors/user/UserAccountBlockedError";
import { UserTimeoutAccountError } from "../../../shared/errors/user/UserTimeoutAccountError";
import { IAuthUserResponseDTO } from "../../dtos/user/IAuthUserResponseDTO";
import { IDayJsProvider } from "../../../shared/providers/dayjs/IDayJsProvider";
import { User } from "../../../domain/entities/User";
import { IUpdateUserRepositories } from "../../../domain/repositories/user/IUpdateUserRepositories";
import { ITimeoutAccountUserRepositories } from "../../../domain/repositories/user/ITimeoutAccountUserRepositories";
import { IDeleteManyRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/IDeleteManyRefreshTokenRepositories";
import { ICreateRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/ICreateRefreshTokenRepositories";
import { RefreshToken } from "../../../domain/entities/RefreshToken";

export class AuthUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepositories,
    private readonly timeoutAccountUserRepository: ITimeoutAccountUserRepositories,
    private readonly compareProvider: ICompareProvider,
    private readonly dayJsProvider: IDayJsProvider,
    private readonly updateUserRepository: IUpdateUserRepositories,
    private readonly deleteManyRefreshTokenRepository: IDeleteManyRefreshTokenRepositories,
    private readonly createRefreshTokenRepository: ICreateRefreshTokenRepositories,
    private readonly jwtProvider: IJWTProvider
  ) {}

  async execute(data: IAuthUserDTO): Promise<IAuthUserResponseDTO> {
    const user = await this.findUserByEmailRepository.findUserByEmail(
      data.email
    );

    if (!user) {
      throw new CredencialsUserError();
    }

    if (user.accountBlocked === true) {
      throw new UserAccountBlockedError();
    }

    const userTimeoutAccount =
      await this.timeoutAccountUserRepository.timeoutAccountUser(user);

    console.log(userTimeoutAccount);

    if (userTimeoutAccount) {
      throw new UserTimeoutAccountError();
    }

    const isPassword = await this.compareProvider.comparePassword(
      data.password,
      user.password
    );

    if (!isPassword) {
      const userAttempts = user.loginAttempts ?? 0;
      let countAttempts = userAttempts + 1;

      if (countAttempts >= 5) {
        if (countAttempts >= 10) {
          const updatesUser = User.updateUser(user, {
            accountBlocked: true,
          });

          await this.updateUserRepository.updateUser(updatesUser);
        }

        const accountIsLocked = this.dayJsProvider.add(5, "minute");

        const updatesUser = User.updateUser(user, {
          timeoutAccount: accountIsLocked,
          loginAttempts: countAttempts,
        });

        await this.updateUserRepository.updateUser(updatesUser);

        throw new UserTimeoutAccountError();
      }

      const updatesUser = User.updateUser(user, {
        loginAttempts: countAttempts,
      });

      await this.updateUserRepository.updateUser(updatesUser);

      throw new CredencialsUserError();
    }

    const updatesUser = User.updateUser(user, {
      loginAttempts: 0,
    });

    await this.updateUserRepository.updateUser(updatesUser);

    await this.deleteManyRefreshTokenRepository.deleteRefreshToken(
      user.id as string
    );

    const newRefreshToken = new RefreshToken(user.role, user.id as string);

    const refreshToken =
      await this.createRefreshTokenRepository.createRefreshToken(
        newRefreshToken
      );

    const accessToken = await this.jwtProvider.generateJWT({
      id: user.id as string,
      role: user.role,
    });

    return {
      id: user.id as string,
      email: user.email,
      name: user.name,
      accessToken,
      refreshToken: refreshToken.id as string,
    };
  }
}

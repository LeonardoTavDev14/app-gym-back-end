import { Request, Response } from "express";
import { FindUserByEmailRepository } from "../../../infrastruture/repository/user/FindUserByEmailRepository";
import { TimeoutAccountUserRepository } from "../../../infrastruture/repository/user/TimeoutAccountUserRepository";
import { CompareProvider } from "../../../shared/providers/bcryptjs/compare/CompareProvider";
import { DayJsProvider } from "../../../shared/providers/dayjs/DayJsProvider";
import { UpdateUserRepository } from "../../../infrastruture/repository/user/UpdateUserRepository";
import { JWTProvider } from "../../../shared/providers/tokens/jwt/JWTProvider";
import { AuthUserUseCase } from "../../../application/usecases/user/AuthUserUseCase";
import { CredencialsUserError } from "../../../shared/errors/user/CredencialsUserError";
import { UserAccountBlockedError } from "../../../shared/errors/user/UserAccountBlockedError";
import { UserTimeoutAccountError } from "../../../shared/errors/user/UserTimeoutAccountError";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const timeoutAccountUserRepository = new TimeoutAccountUserRepository();
    const compareProvider = new CompareProvider();
    const dayJsProvider = new DayJsProvider();
    const updateUserRepository = new UpdateUserRepository();
    const jwtProvider = new JWTProvider();

    const useCase = new AuthUserUseCase(
      findUserByEmailRepository,
      timeoutAccountUserRepository,
      compareProvider,
      dayJsProvider,
      updateUserRepository,
      jwtProvider
    );

    try {
      const user = await useCase.execute({ email, password });

      return response.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: user.accessToken,
      });
    } catch (err: any) {
      if (err instanceof CredencialsUserError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      if (err instanceof UserAccountBlockedError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      if (err instanceof UserTimeoutAccountError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        message: err.message,
      });
    }
  }
}

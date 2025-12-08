import { Request, Response } from "express";

import { RedisProvider } from "../../../shared/providers/redis/provider/RedisProvider";
import { HashProvider } from "../../../shared/providers/bcryptjs/hash/HashProvider";
import { NodemailerProvider } from "../../../shared/providers/nodemailer/provider/NodemailerProvider";
import { WelcomeUserAccountTEMPLATE } from "../../../shared/providers/templates/user/welcome-account/WelcomeUserAccountTEMPLATE";
import { CreateUserRepository } from "../../../infrastruture/repository/user/CreateUserRepository";

import { CreateUserConfirmUseCase } from "../../../application/usecases/user/CreateUserConfirmUseCase";

import { UserNotFoundError } from "../../../shared/errors/user/UserNotFoundError";

export class CreateUserConfirmController {
  async handle(request: Request, response: Response) {
    const { token } = request.params;
    const { password, age } = request.body;

    const redisProvider = new RedisProvider();
    const hashProvider = new HashProvider();
    const nodemailerProvider = new NodemailerProvider();
    const welcomeUserAccountTEMPLATE = new WelcomeUserAccountTEMPLATE();
    const createUserRepository = new CreateUserRepository();

    const useCase = new CreateUserConfirmUseCase(
      redisProvider,
      hashProvider,
      nodemailerProvider,
      welcomeUserAccountTEMPLATE,
      createUserRepository
    );

    try {
      const newUser = await useCase.execute({ password, age, token: token as string });

      return response.status(200).json({
        message: "Sua conta foi criada com sucesso!",
        user: newUser,
      });
    } catch (err: any) {
      if (err instanceof UserNotFoundError) {
        return response.status(err.statusCode).json({ message: err.message });
      }

      return response.status(500).json({ message: err.message });
    }
  }
}

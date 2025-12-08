import { Request, Response } from "express";

import { FindUserByEmailRepository } from "../../../infrastruture/repository/user/FindUserByEmailRepository";
import { GenerateCryptoToken } from "../../../shared/providers/tokens/crypto/GenerateCryptoToken";
import { RedisProvider } from "../../../shared/providers/redis/provider/RedisProvider";
import { NodemailerProvider } from "../../../shared/providers/nodemailer/provider/NodemailerProvider";
import { ConfirmUserAccountTEMPLATE } from "../../../shared/providers/templates/user/confirm-account/ConfirmUserAccountTEMPLATE";

import { CreateUserRequestUseCase } from "../../../application/usecases/user/CreateUserRequestUseCase";

import { UserAlreadyExistsError } from "../../../shared/errors/user/UserAlreadyExistsError";

export class CreateUserRequestController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;

    const findUserByEmailRepository = new FindUserByEmailRepository();
    const generateCryptoToken = new GenerateCryptoToken();
    const redisProvider = new RedisProvider();
    const nodemailerProvider = new NodemailerProvider();
    const confirmAccountUserTEMPLATE = new ConfirmUserAccountTEMPLATE();

    const useCase = new CreateUserRequestUseCase(
      findUserByEmailRepository,
      generateCryptoToken,
      redisProvider,
      nodemailerProvider,
      confirmAccountUserTEMPLATE
    );

    try {
      const newEmail = await useCase.execute({ name, email });

      return response.status(200).json({
        message: "Enviamos um e-mail para confirmar o seu cadastro!",
        email: newEmail,
      });
    } catch (err: any) {
      if (err instanceof UserAlreadyExistsError) {
        return response.status(err.statusCode).json({ message: err.message });
      }

      return response.status(500).json({ message: err.message });
    }
  }
}

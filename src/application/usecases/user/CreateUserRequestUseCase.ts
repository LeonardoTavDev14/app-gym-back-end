import { IFindUserByEmailRepositories } from "../../../domain/repositories/user/IFindUserByEmailRepositories";
import { IGenerateCryptoToken } from "../../../shared/providers/tokens/crypto/IGenerateCryptoToken";
import { IRedisProvider } from "../../../shared/providers/redis/provider/IRedisProvider";
import { INodemailerProvider } from "../../../shared/providers/nodemailer/provider/INodemailerProvider";
import { IConfirmUserAccountTEMPLATE } from "../../../shared/providers/templates/user/confirm-account/IConfirmUserAccountTEMPLATE";

import { ICreateUserRequestDTO } from "../../dtos/user/ICreateUserRequestDTO";

import { UserAlreadyExistsError } from "../../../shared/errors/user/UserAlreadyExistsError";

export class CreateUserRequestUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepositories,
    private readonly generateCryptoToken: IGenerateCryptoToken,
    private readonly redisProvider: IRedisProvider,
    private readonly nodemailerProvider: INodemailerProvider,
    private readonly confirmAccountUserTEMPLATE: IConfirmUserAccountTEMPLATE
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists =
      await this.findUserByEmailRepository.findUserByEmail(data.email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const userToken = await this.generateCryptoToken.generateToken();

    await this.redisProvider.dataSetCache({
      key: `user_pending_${userToken}`,
      expiration: 900,
      values: {
        name: data.name.toUpperCase(),
        email: data.email.toLowerCase(),
        token: userToken,
      },
    });

    const linkConfirmation = `${this.nodemailerProvider.linkConfirmationAccount}/${userToken}`;

    await this.nodemailerProvider.sendMail({
      email: data.email.toLowerCase(),
      content: this.confirmAccountUserTEMPLATE.confirmUserAccount(
        data.name.toUpperCase(),
        linkConfirmation
      ),
      subject: "CONFIRMAR CADASTRO",
    });
  }
}

import { IRedisProvider } from "../../../shared/providers/redis/provider/IRedisProvider";
import { IHashProvider } from "../../../shared/providers/bcryptjs/hash/IHashProvider";
import { INodemailerProvider } from "../../../shared/providers/nodemailer/provider/INodemailerProvider";
import { IWelcomeUserAccountTEMPLATE } from "../../../shared/providers/templates/user/welcome-account/IWelcomeUserAccountTEMPLATE";
import { ICreateUserRepositories } from "../../../domain/repositories/user/ICreateUserRepositories";

import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";

import { User } from "../../../domain/entities/User";

import { UserNotFoundError } from "../../../shared/errors/user/UserNotFoundError";

export class CreateUserConfirmUseCase {
  constructor(
    private readonly redisProvider: IRedisProvider,
    private readonly hashProvider: IHashProvider,
    private readonly nodemailerProvider: INodemailerProvider,
    private readonly welcomeUserAccountTEMPLATE: IWelcomeUserAccountTEMPLATE,
    private readonly createUserRepository: ICreateUserRepositories
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const dataUser = await this.redisProvider.dataGetCache(
      `user_pending_${data.token}`
    );

    if (!dataUser) {
      throw new UserNotFoundError();
    }

    const { name, email } = JSON.parse(dataUser);

    const hashedPassword = await this.hashProvider.hashPassword(data.password);

    const newUser = new User(name, email, hashedPassword, "USER", data.age);

    const createUser = await this.createUserRepository.createdUser(newUser);

    await this.redisProvider.dataDeleteCache(`user_pending_${data.token}`);

    await this.nodemailerProvider.sendMail({
      email: email,
      content: this.welcomeUserAccountTEMPLATE.welcomeUserAccount(
        name,
        this.nodemailerProvider.linkPlataform
      ),
      subject: "BEM-VINDO AO APP-GYM",
    });

    return createUser;
  }
}

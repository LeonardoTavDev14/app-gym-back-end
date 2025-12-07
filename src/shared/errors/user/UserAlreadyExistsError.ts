import { ErrorCustomize } from "../Error";

export class UserAlreadyExistsError extends ErrorCustomize {
  constructor() {
    super("Este e-mail já está em uso!", 400);
  }
}

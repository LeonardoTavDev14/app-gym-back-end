import { ErrorCustomize } from "../Error";

export class CredencialsUserError extends ErrorCustomize {
  constructor() {
    super("E-mail ou senha incorretos!", 400);
  }
}

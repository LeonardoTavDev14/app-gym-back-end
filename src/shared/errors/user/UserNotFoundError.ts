import { ErrorCustomize } from "../Error";

export class UserNotFoundError extends ErrorCustomize {
  constructor() {
    super("Informações não encontradas!", 404);
  }
}

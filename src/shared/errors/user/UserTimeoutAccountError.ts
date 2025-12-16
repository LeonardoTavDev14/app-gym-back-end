import { ErrorCustomize } from "../Error";

export class UserTimeoutAccountError extends ErrorCustomize {
  constructor() {
    super("Sua conta foi bloqueada temporariamente por 5 minutos", 400);
  }
}

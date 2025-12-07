import { ErrorCustomize } from "../Error";

export class SendMailError extends ErrorCustomize {
  constructor() {
    super("Erro ao enviar e-mail ao usuário", 400);
  }
}

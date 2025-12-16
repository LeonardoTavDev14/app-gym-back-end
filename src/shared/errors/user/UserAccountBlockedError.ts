import { ErrorCustomize } from "../Error";

export class UserAccountBlockedError extends ErrorCustomize {
  constructor() {
    super(
      "Sua conta está bloqueada permanentemente, para mais informações contate o suporte!",
      400
    );
  }
}

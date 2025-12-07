import { IHashProvider } from "./IHashProvider";
import { hash } from "bcryptjs";

export class HashProvider implements IHashProvider {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }
}

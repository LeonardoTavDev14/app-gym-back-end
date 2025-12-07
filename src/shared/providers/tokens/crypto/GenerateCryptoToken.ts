import { IGenerateCryptoToken } from "./IGenerateCryptoToken";
import crypto from "crypto";

export class GenerateCryptoToken implements IGenerateCryptoToken {
  async generateToken(): Promise<string> {
    return crypto.randomBytes(32).toString("hex");
  }
}

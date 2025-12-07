import { ICompareProvider } from "./ICompareProvider";
import { compare } from "bcryptjs";

export class CompareProvider implements ICompareProvider {
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}

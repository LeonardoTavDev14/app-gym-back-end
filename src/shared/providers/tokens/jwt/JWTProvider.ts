import { IJWTPayload } from "./IJWTProvider";
import { IJWTProvider } from "./IJWTProvider";
import jsonwebtoken from "jsonwebtoken";

export class JWTProvider implements IJWTProvider {
  async generateJWT(payload: IJWTPayload): Promise<string> {
    const accessToken = jsonwebtoken.sign(
      { role: payload.role },
      process.env.JWT_SECRET as string,
      {
        subject: payload.id,
        expiresIn: "15m",
      }
    );

    return accessToken;
  }
}

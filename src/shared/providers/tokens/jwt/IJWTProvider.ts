import { userRoles } from "../../../../domain/entities/User";

export interface IJWTPayload {
  id: string;
  role: userRoles;
}

export interface IJWTProvider {
  generateJWT(payload: IJWTPayload): Promise<string>;
}

import { RefreshToken } from "../../entities/RefreshToken";

export interface ICreateRefreshTokenRepositories {
  createRefreshToken(refreshToken: RefreshToken): Promise<RefreshToken>;
}

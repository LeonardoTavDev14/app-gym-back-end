import { ICreateRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/ICreateRefreshTokenRepositories";
import { RefreshToken } from "../../../domain/entities/RefreshToken";
import { prisma } from "../../database/prisma";

export class CreateRefreshTokenRepository
  implements ICreateRefreshTokenRepositories
{
  async createRefreshToken(refreshToken: RefreshToken): Promise<RefreshToken> {
    const refresh_token = await prisma.refreshToken.create({
      data: {
        userRole: refreshToken.userRole,
        userId: refreshToken.userId,
      },
    });

    return new RefreshToken(
      refreshToken.userRole,
      refreshToken.userId,
      refreshToken.id
    );
  }
}

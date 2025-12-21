import { IDeleteManyRefreshTokenRepositories } from "../../../domain/repositories/refresh-token/IDeleteManyRefreshTokenRepositories";
import { prisma } from "../../database/prisma";

export class DeleteManyRefreshTokenRepository
  implements IDeleteManyRefreshTokenRepositories
{
  async deleteRefreshToken(userId: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}

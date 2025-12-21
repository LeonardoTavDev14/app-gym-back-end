export interface IDeleteManyRefreshTokenRepositories {
  deleteRefreshToken(userId: string): Promise<void>;
}

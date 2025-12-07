export interface IGenerateCryptoToken {
  generateToken(): Promise<string>;
}

export interface ICompareProvider {
  comparePassword(password: string, hash: string): Promise<boolean>;
}

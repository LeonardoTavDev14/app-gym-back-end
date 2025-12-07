export interface IRedisParameters {
  key: string;
  expiration: number;
  values: {
    email?: string;
    token?: string;
  };
}

export interface IRedisProvider {
  dataSetCache(redisParameter: IRedisParameters): Promise<void>;
  dataGetCache(key: string): Promise<string | null>;
  dataDeleteCache(key: string): Promise<number>;
}

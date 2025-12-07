import { IRedisParameters } from "./IRedisProvider";
import { IRedisProvider } from "./IRedisProvider";
import { redisConfig } from "../redisConfig";

export class RedisProvider implements IRedisProvider {
  async dataSetCache(redisParameter: IRedisParameters): Promise<void> {
    await redisConfig.setEx(
      redisParameter.key,
      redisParameter.expiration,
      JSON.stringify(redisParameter.values)
    );
  }

  async dataGetCache(key: string): Promise<string | null> {
    const data = await redisConfig.get(key);

    return data;
  }

  async dataDeleteCache(key: string): Promise<number> {
    const dataDel = await redisConfig.del(key);

    return dataDel;
  }
}

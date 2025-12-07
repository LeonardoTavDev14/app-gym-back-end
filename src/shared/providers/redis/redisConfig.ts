import { createClient } from "redis";

import dotenv from "dotenv";
dotenv.config();

export const redisConfig = createClient({
  url: process.env.REDIS_URL!,
});

redisConfig.on("error", (err: any) => {
  console.error("Erro ao iniciar o redis: ", err.message);
});

(async () => {
  await redisConfig.connect();
})();

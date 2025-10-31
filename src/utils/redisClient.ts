import { createClient } from "redis";
import { logger } from "./logger.js";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  username: "default",
  password: String(process.env.REDIS_PASS),
  socket: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("connect", () => {
  logger.info("Redis client connected");
});

redisClient.on("error", (err) => {
  logger.error("Redis client error", err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    logger.error("Error connecting or using Redis", error);
  }
})();

export default redisClient;

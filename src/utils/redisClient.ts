import { createClient } from "redis";
import { logger } from "./logger.js";
import dotenv from "dotenv";
import { resetDatabaseMocks } from "../test/mocks/database.mock.js";

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

export let updateCache = async (key: string, value: any, ex:number) => {
  try {
    await redisClient.set(key, value, { EX: ex });
    logger.info(`Cache updated for key: ${key}`);
  } catch (error) {
    logger.error("Error updating cache", error);
  }
}

export let getCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      logger.info(`Cache hit for key: ${key}`);
      return JSON.parse(data);
    }
  } catch (error) {
    logger.error("Error getting cache", error);
  }
  return null;
};

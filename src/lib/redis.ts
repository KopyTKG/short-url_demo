import Redis from "ioredis";

export default class RedisLib {
  private static instance: RedisLib;
  private redisClient: Redis;

  private constructor() {
    this.redisClient = new Redis(process.env.REDIS_URL as string);
  }

  public static getInstance(): RedisLib {
    if (!this.instance) {
      if (!process.env.REDIS_URL) {
        throw new Error("REDIS_URL is not defined");
      }
      this.instance = new RedisLib();
    }
    return this.instance;
  }

  public getClient(): Redis {
    return this.redisClient;
  }
}
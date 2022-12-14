import { createClient, RedisClientType } from 'redis';
const client: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: 6379
  }
});

/**
 * Establish connection with redis server.
 */
export const establishRedisConnection = async (): Promise<void> =>
  await client.connect();

/**
 * Get cache from redis.
 */
export const getCache = async (key: string): Promise<string | null> =>
  await client.get(key);

/**
 * Cache a key value pair  in redis with  expiry.
 */
export const saveTempCache = async (
  key: string,
  seconds: number,
  value: string
): Promise<string | null> => client.setEx(key, seconds, value);

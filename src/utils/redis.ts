import { createClient, RedisClientType } from 'redis';
const client: RedisClientType = createClient();

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
 * Cache a key value pair  in redis with no expiry.
 */
export const saveCache = async (
  key: string,
  value: string
): Promise<string | null> => client.SET(key, value);

/**
 * Cache a key value pair  in redis with  expiry.
 */
export const saveTempCache = async (
  key: string,
  seconds: number,
  value: string
): Promise<string | null> => client.setEx(key, seconds, value);

/**
 * Delete cache if exist.
 *
 */
export const deleteCache = async (key: string): Promise<number> =>
  client.del(key);

import bcrypt from 'bcrypt';
import { HttpException } from '@utils/errors';
import jwt from 'jsonwebtoken';
import { saveTempCache } from './redis';
import { SESSION_EXPIRY, statusCodes } from '../constants';

/**
 * Hashes password and returns the hashed password with the salt.
 */
export const hashPassword = async (
  password: string
): Promise<{ salt: string; hashedPassword: string }> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return {
    salt,
    hashedPassword
  };
};

/**
 * Authenticates user by checking the password with the salt.
 *
 */
export const checkPassword = async (
  password: string,
  hashedPassword: string
): Promise<void> => {
  const valid = await bcrypt.compare(password, hashedPassword);

  if (!valid) {
    throw new HttpException(statusCodes.forbidden, 'Wrong password');
  }
};

/**
 * Generates JWT token and saves session to redis.
 *
 */
export const generateAuthToken = async (credentials: {
  email: string;
  id: number;
}): Promise<string> => {
  const { JWT_KEY } = process.env;
  if (JWT_KEY === undefined) {
    throw new HttpException(statusCodes.server, 'JWT key is missing');
  }

  const token: string = jwt.sign(credentials, JWT_KEY);
  await saveTempCache(credentials.email, SESSION_EXPIRY, token);

  return token;
};

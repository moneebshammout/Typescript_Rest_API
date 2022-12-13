import { HttpException } from '@utils/errors';
import { statusCodes } from '../constants';

/**
 * One response format for all requests.
 *
 */
export const formatResponse = (
  res: object,
  message: string,
  success = true
) => ({
  data: res,
  msg: message,
  success
});

/**
 *
 * Validates environment variables.
 */
export const envVarsValidator = (name: string): string => {
  const key: string | undefined = process.env[name];
  if (key === undefined) {
    throw new HttpException(statusCodes.server, `${name} key is missing`);
  }

  return key;
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@utils/errors';
import { JWT_HEADER, statusCodes } from '../constants';
import { envVarsValidator } from '@utils/requests';
import { getCache } from '@utils/redis';

/**
 * Middleware for handling authentication for routs.
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const unSecurePaths = ['/health', '/user/login', '/user/register'];
  const { path } = req;

  if (unSecurePaths.includes(path)) return next();

  const token = req.header(JWT_HEADER);

  //check if token exist.
  if (!token) {
    throw new HttpException(
      statusCodes.unAuthorized,
      'Access denied. No token provided'
    );
  }

  //check if token is valid.
  const JWT_KEY = envVarsValidator('JWT_KEY');
  const credential = jwt.verify(token, JWT_KEY);

  //check if session didn't expire.
  if (typeof credential === 'object' && credential.email !== null) {
    const session = await getCache(credential.email);
    if (session === null) {
      throw new HttpException(statusCodes.unAuthorized, 'Session expired');
    }
  }
  next();
};

import winston from 'winston';
import { HttpException } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for handling errors during request processing.
 *
 */
const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //logs errors to a log file
  winston.error(err.message);

  res.status(err.statusCode ?? 400).json({
    msg: err.message ?? 'Something went wrong',
    success: false
  });
};

export { errorMiddleware };

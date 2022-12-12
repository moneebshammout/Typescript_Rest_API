import winston from 'winston';
import { HttpException } from '../utils/errors';
import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '@utils/requests';

/**
 * Middleware for handling errors during request processing.
 *
 */
export default (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //logs errors to a log file
  winston.error(err.message);

  res
    .status(err.statusCode ?? 400)
    .json(
      formatResponse(
        { stack: err.stack ?? '' },
        err.message ?? 'Something went wrong',
        false
      )
    );
};

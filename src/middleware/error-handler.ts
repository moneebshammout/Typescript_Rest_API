import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { HttpException } from '../utils/errors';
import { formatResponse } from '@utils/requests';
import { statusCodes } from '../constants';

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
    .status(err.statusCode ?? statusCodes.badRequest)
    .json(
      formatResponse(
        { stack: err.stack ?? '' },
        err.message ?? 'Something went wrong',
        false
      )
    );
};

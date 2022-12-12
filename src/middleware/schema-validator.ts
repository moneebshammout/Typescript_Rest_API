import { validationResult } from 'express-validator';
import { formatResponse } from '@utils/requests';
import { Request, Response, NextFunction } from 'express';
import { statusCodes } from '../constants';

/**
 * Middleware for handling parameters validation.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const errorsList = validationResult(req);
  if (errorsList.isEmpty()) {
    return next();
  }

  return res
    .status(statusCodes.badRequest)
    .json(formatResponse({ error: errorsList.array() }, 'Invalid data', false));
};

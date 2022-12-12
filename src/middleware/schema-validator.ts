import { validationResult } from 'express-validator';
import { formatResponse } from '@utils/requests';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for handling parameters validation.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const errorsList = validationResult(req);
  if (errorsList.isEmpty()) {
    return next();
  }

  return res
    .status(400)
    .json(formatResponse({ error: errorsList.array() }, 'Invalid data', false));
};

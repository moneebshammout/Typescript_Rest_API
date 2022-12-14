import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '@utils/requests';
import { getCache } from '@utils/redis';
import {
  CategoryListByParam,
  ExpenseListByParam
} from '@custom-types/query-param';

/**
 * Category Middleware for handling cached data.
 */
export const categoryCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path } = req.route;
  const { id, name, userId }: CategoryListByParam = req.query;
  let cached;

  if (path === '/') {
    cached = await getCache(`allCategory`);
  } else if (path === '/list') {
    cached = await getCache(`categoryBy${id}${userId}${name}}`);
  }

  if (cached)
    res.send(formatResponse(JSON.parse(cached), `/category${path} from cache`));
  else next();
};

/**
 * Expense Middleware for handling cached data.
 */
export const expenseCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path } = req.route;
  const { day, month, year }: ExpenseListByParam = req.query;
  let cached;

  if (path === '/') {
    cached = await getCache(`expenseBy${day}${month},${year}`);
  }

  if (cached)
    res.send(formatResponse(JSON.parse(cached), `/expense${path} from cache`));
  else next();
};

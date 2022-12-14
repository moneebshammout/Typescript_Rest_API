import { RequestHandler, Request, Response } from 'express';
import { Expense, Category, User, sequelize } from '@models/index';
import { Op } from 'sequelize';
import { formatResponse } from '@utils/requests';
import { saveTempCache } from '@utils/redis';
import {
  ExpenseDeleteParam,
  ExpenseListByParam
} from '@custom-types/query-param';
import {
  CreateExpenseBodyType,
  UpdateExpenseBodyType
} from '@custom-types/body-params';
import { ExpenseAttributes } from '@models/expense';
import { EXPENSE_BY_CACHE } from '../constants';

/**
 * Create a expense.
 */
export const create: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, categoryId, spendingDate, amount }: CreateExpenseBodyType =
    req.body;

  await Promise.all([
    User.doesNotExist({ id: userId }),
    Category.doesNotExist({ id: categoryId })
  ]);

  const expense = await Expense.create({
    userId,
    categoryId,
    spendingDate: new Date(spendingDate),
    amount
  });

  res.send(formatResponse(expense, `Expense created`));
};

/**
 * Update Expense.
 */
export const update: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, spendingDate, amount }: UpdateExpenseBodyType = req.body;

  await Expense.doesNotExist({ id });
  const result = await Expense.update(
    {
      ...(spendingDate && { spendingDate }),
      ...(amount && { amount })
    },
    { where: { id } }
  );

  res.send(formatResponse(result, `Expense updated`));
};

/**
 * Delete an Expense.
 */
export const destroy: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id }: ExpenseDeleteParam = req.query;
  const expense = (await Expense.doesNotExist({
    id
  })) as unknown as ExpenseAttributes | null;
  //it will not be null because it will throw an exception
  if (expense === null) return;

  await Expense.destroy({ where: { id } });

  res.send(formatResponse(expense, `Expense delete`));
};

/**
 * List expense by day , month Year.
 */
export const listByDate: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { day, month, year }: ExpenseListByParam = req.query;

  const findAllDateChecks = {
    ...(day && {
      day: sequelize.where(
        sequelize.literal('extract(day from "expense"."spending_date")'),
        day
      )
    }),
    ...(month && {
      month: sequelize.where(
        sequelize.literal('extract(month from "expense"."spending_date")'),
        month
      )
    }),
    ...(year && {
      year: sequelize.where(
        sequelize.literal('extract(year from "expense"."spending_date")'),
        year
      )
    })
  };

  const result = await Expense.findAll({
    where: {
      spendingDate: {
        [Op.and]: Object.values(findAllDateChecks)
      }
    },
    include: [Category, User]
  });

  await saveTempCache(
    `expenseBy${day}${month},${year}`,
    EXPENSE_BY_CACHE,
    JSON.stringify(result, null, 2)
  );

  res.send(
    formatResponse(
      result,
      `Expenses fetched by ${Object.keys(findAllDateChecks)}`
    )
  );
};

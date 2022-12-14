import { RequestHandler, Request, Response } from 'express';
import { Expense, Category, User } from '@models/index';
import { formatResponse } from '@utils/requests';
import { ExpenseDeleteParam } from '@custom-types/query-param';
import { ExpenseAttributes } from '@models/expense';
import { Op } from 'sequelize';

/**
 * Create a expense.
 */
export const create: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    userId,
    categoryId,
    spendingDate,
    amount
  }: {
    userId: number;
    categoryId: number;
    spendingDate: Date;
    amount: number;
  } = req.body;

  await Promise.all([
    User.doesNotExist({ id: userId }),
    Category.doesNotExist({ id: categoryId })
  ]);

  const expense = await Expense.create({
    userId,
    categoryId,
    spendingDate,
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
  const {
    id,
    spendingDate,
    amount
  }: { id: number; spendingDate: Date; amount: number } = req.body;

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

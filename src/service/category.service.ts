import { RequestHandler, Request, Response } from 'express';
import { Category, User } from '@models/index';
import { formatResponse } from '@utils/requests';
import { saveTempCache } from '@utils/redis';
import { CategoryListByParam } from '@custom-types/query-param';
import { CATEGORY_ALL_CACHE, CATEGORY_BY_CACHE } from '../constants';
import {
  CreateCategoryBodyType,
  UpdateCategoryBodyType
} from '@custom-types/body-params';

/**
 * Create a category.
 */
export const create: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, name }: CreateCategoryBodyType = req.body;

  await Promise.all([
    User.doesNotExist({ id: userId }),
    Category.alreadyExist({ name })
  ]);

  const category = await Category.create({
    userId,
    name
  });

  res.send(formatResponse(category, `Category created`));
};

/**
 * Update Category.
 */
export const update: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name }: UpdateCategoryBodyType = req.body;

  await Promise.all([
    Category.doesNotExist({ id }),
    Category.alreadyExist({ name })
  ]);

  const result = await Category.update({ name }, { where: { id } });

  res.send(formatResponse(result, `Category updated`));
};

/**
 * Get all categories.
 */
export const getAll: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await Category.findAll({
    include: User
  });

  await saveTempCache(
    'allCategory',
    CATEGORY_ALL_CACHE,
    JSON.stringify(result, null, 2)
  );

  res.send(formatResponse(result, `Categories fetched`));
};

/**
 * Get all categories.
 */
export const listByAttribute: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name, userId }: CategoryListByParam = req.query;

  const result = await Category.findAll({
    where: {
      ...(id && { id }),
      ...(userId && { userId }),
      ...(name && { name })
    },
    include: User
  });

  await saveTempCache(
    `categoryBy${id}${userId}${name}}`,
    CATEGORY_BY_CACHE,
    JSON.stringify(result, null, 2)
  );

  res.send(formatResponse(result, `Categories fetched`));
};

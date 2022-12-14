import { numberSchema, dateSchema, floatSchema } from './helpers';
import { ValidationChain, oneOf } from 'express-validator';

export const createSchema: ValidationChain[] = [
  numberSchema('userId'),
  numberSchema('categoryId'),
  dateSchema('spendingDate'),
  floatSchema('amount')
];

export const updateSchema = [
  numberSchema('id'),
  oneOf([dateSchema('spendingDate'), floatSchema('amount')])
];

export const deleteSchema: ValidationChain[] = [numberSchema('id', 'query')];

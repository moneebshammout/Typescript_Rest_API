import { ValidationChain, oneOf } from 'express-validator';
import {
  numberSchema,
  dateSchema,
  floatSchema,
  numberRangeSchema
} from './helpers';

export const createSchema: ValidationChain[] = [
  numberSchema('userId'),
  numberSchema('categoryId'),
  dateSchema('spendingDate'),
  floatSchema('amount')
];

export const updateSchema = [
  numberSchema('id'),
  oneOf(
    [dateSchema('spendingDate'), floatSchema('amount')],
    'At least one of spendingDate and amount'
  )
];

export const deleteSchema: ValidationChain[] = [numberSchema('id', 'query')];

export const listBySchema = [
  oneOf(
    [
      numberRangeSchema('day', { min: 1, max: 31 }, 'query'),
      numberRangeSchema('month', { min: 1, max: 12 }, 'query'),
      numberRangeSchema('year', { min: 1900, max: 3000 }, 'query')
    ],

    'At least one of day,month,year'
  )
];

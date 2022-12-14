import { ValidationChain, oneOf } from 'express-validator';
import { stringSchema, numberSchema } from './helpers';

export const createSchema: ValidationChain[] = [
  stringSchema('name'),
  numberSchema('userId')
];

export const updateSchema: ValidationChain[] = [
  numberSchema('id'),
  stringSchema('name')
];

export const ListBySchema = [
  oneOf(
    [
      numberSchema('id', 'query'),
      stringSchema('name', 'query'),
      numberSchema('userId', 'query')
    ],
    'At least one of id,name and userId'
  )
];

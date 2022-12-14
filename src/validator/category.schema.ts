import { stringSchema, numberSchema } from './helpers';
import { ValidationChain, oneOf } from 'express-validator';

export const createSchema: ValidationChain[] = [
  stringSchema('name'),
  numberSchema('userId')
];

export const updateSchema: ValidationChain[] = [
  numberSchema('id'),
  stringSchema('name')
];

export const ListBySchema = [
  oneOf([
    numberSchema('id', 'query'),
    stringSchema('name', 'query'),
    numberSchema('userId', 'query')
  ])
];

import { stringSchema, emailSchema, passwordSchema } from './helpers';
import { ValidationChain } from 'express-validator';

export const createSchema: ValidationChain[] = [
  emailSchema(),
  passwordSchema(),
  stringSchema('name')
];

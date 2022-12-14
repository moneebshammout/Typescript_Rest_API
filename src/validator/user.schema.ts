import { ValidationChain } from 'express-validator';
import { stringSchema, emailSchema, passwordSchema } from './helpers';

export const loginSchema: ValidationChain[] = [emailSchema(), passwordSchema()];

export const registerSchema: ValidationChain[] = [
  ...loginSchema,
  stringSchema('name')
];

import { stringSchema, emailSchema, passwordSchema } from './helpers';
import { ValidationChain } from 'express-validator';

export const loginSchema: ValidationChain[] = [emailSchema(), passwordSchema()];

export const registerSchema: ValidationChain[] = [
  ...loginSchema,
  stringSchema('name')
];

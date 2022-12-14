import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import { create, update, destroy } from '@service/expense.service';
import validator from '@middleware/schema-validator';
import {
  createSchema,
  updateSchema,
  deleteSchema
} from '@validator/expense.schema';

const router: AsyncRouterInstance = AsyncRouter();

router.post('/', createSchema, validator, create);
router.put('/', updateSchema, validator, update);
router.delete('/', deleteSchema, validator, destroy);

export default router;

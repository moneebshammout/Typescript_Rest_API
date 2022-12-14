import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import validator from '@middleware/schema-validator';
import { expenseCache } from '@middleware/cache-handler';
import { create, update, destroy, listByDate } from '@service/expense.service';
import {
  createSchema,
  updateSchema,
  deleteSchema,
  listBySchema
} from '@validator/expense.schema';

const router: AsyncRouterInstance = AsyncRouter();

router.post('/', createSchema, validator, create);
router.put('/', updateSchema, validator, update);
router.delete('/', deleteSchema, validator, destroy);
router.get('/', listBySchema, validator, expenseCache, listByDate);

export default router;

import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import validator from '@middleware/schema-validator';
import { categoryCache } from '@middleware/cache-handler';
import {
  create,
  update,
  getAll,
  listByAttribute
} from '@service/category.service';
import {
  createSchema,
  updateSchema,
  ListBySchema
} from '@validator/category.schema';

const router: AsyncRouterInstance = AsyncRouter();

router.post('/', createSchema, validator, create);
router.put('/', updateSchema, validator, update);
router.get('/', categoryCache, getAll);
router.get('/list', ListBySchema, validator, categoryCache, listByAttribute);

export default router;

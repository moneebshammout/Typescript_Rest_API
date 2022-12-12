import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import { createUser } from '@service/user.service';
import validator from '@middleware/schema-validator';
import { createSchema } from '@validator/user.schema';
const router: AsyncRouterInstance = AsyncRouter();

router.post('/register', createSchema, validator, createUser);

export default router;

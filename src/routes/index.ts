import { AsyncRouter, AsyncRouterInstance } from 'express-async-router';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import userRouter from './user.rout';
import categoryRouter from './category.rout';
import { statusCodes } from '../constants';

const router: AsyncRouterInstance = AsyncRouter();

router.use('/user', userRouter);
router.use('/category', categoryRouter);

/**
 * Check server health
 */
router.get('/health', async (req: Request, res: Response): Promise<void> => {
  const filePath: string = path.resolve('error-logs.log');
  const contents: Buffer = fs.readFileSync(filePath);
  if (contents === null) {
    res.write('Healthy');
  } else {
    res.write(contents);
  }

  res.end();
});

/**
 * All un implemented routes goes here.
 */
router.all('*', async (req: Request, res: Response): Promise<void> => {
  res.status(statusCodes.notFound).send('You Arrived No Where 🤟');
});

export default router;

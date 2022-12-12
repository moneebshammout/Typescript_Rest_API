import { AsyncRouter } from 'express-async-router';

const router = AsyncRouter();

router.all('*', (req, res) => {
  res.status(404).send('You Arrived No Where 🤟');
});

export default router;

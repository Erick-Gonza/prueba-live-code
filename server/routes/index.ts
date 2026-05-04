import { Router } from 'express';
import userRouter from './user';
import analyzeRouter from './analyze';
import memoryRouter from './memory';
import { memories } from '../lib';

const router = Router();

if (memories.length === 0) {
	memories.push({});
}

router.use('/users', userRouter);
router.use('/analyze', analyzeRouter);
router.use('/memory', memoryRouter);

export default router;

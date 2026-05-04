import { Router } from 'express';
import { prisma } from '../../lib';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) return res.status(404).json({ error: 'User not found' });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body;
		const user = await prisma.user.create({ data: { name, email } });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

router.patch('/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
		const { name, email } = req.body;
		const user = await prisma.user.update({ where: { id }, data: { name, email } });
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = Number(req.params.id);
		if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
		await prisma.user.delete({ where: { id } });
		res.json({ message: 'User deleted' });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

export default router;

import { Router } from 'express';
import { analyzeText, memories } from '../../lib';
import type { Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const { text } = req.body;
		if (!text) return res.status(400).json({ error: 'Text is required' });

		const analysis = await analyzeText(text);
		res.json(analysis);

		const savedMemories = memories;
		savedMemories.push({ ...analysis, analyzedAt: new Date().toISOString() });
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

export default router;

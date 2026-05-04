import { Router } from 'express';
import { memories, prisma } from '../../lib';

import type { Request, Response } from 'express';

interface AnalysisResult {
	summary: string;
	sentiment: 'positive' | 'negative' | 'neutral';
	language: string;
	keywords: string[];
	category:
		| 'tecnología'
		| 'deportes'
		| 'política'
		| 'entretenimiento'
		| 'ciencia'
		| 'negocios'
		| 'otro';
}

const categories = [
	{ name: 'tecnología', value: 0 },
	{ name: 'deportes', value: 0 },
	{ name: 'política', value: 0 },
	{ name: 'entretenimiento', value: 0 },
	{ name: 'ciencia', value: 0 },
	{ name: 'negocios', value: 0 },
	{ name: 'otro', value: 0 },
];

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		if (memories.length !== 0) {
			return res.json(memories);
		} else {
			return res.status(404).json({ error: 'No memories found' });
		}
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

router.get('/grouped-by-category', async (req: Request, res: Response) => {
	try {
		if (memories.length === 0) {
			return res.json(categories);
		}

		const groupedMemories = categories.map((cat) => ({
			name: cat.name,
			value: 0,
		}));

		memories.forEach((memory: AnalysisResult) => {
			const category = groupedMemories.find((cat) => cat.name === memory.category);
			if (category) {
				category.value += 1;
			}
		});

		return res.json(groupedMemories);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

export default router;

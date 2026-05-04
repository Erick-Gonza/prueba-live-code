import { PrismaClient } from '@prisma/client';

export { analyzeText, type AnalysisResult } from './gemini';

export const memories = [{}];

export const prisma = new PrismaClient();

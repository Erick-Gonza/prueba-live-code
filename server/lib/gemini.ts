import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface AnalysisResult {
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

export async function analyzeText(text: string): Promise<AnalysisResult> {
	const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

	const prompt = `Analiza el siguiente texto y devuelve un JSON con: summary, sentiment, language, keywords, category.

Texto: "${text}"

Responde SOLO con el JSON, sin markdown ni explicaciones.

Requisitos:
- sentiment: solo puede ser "positive", "negative" o "neutral"
- category: solo puede ser "tecnología", "deportes", "política", "entretenimiento", "ciencia", "negocios" u "otro" (si no encaja en las anteriores)`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const textResponse = response.text();

	return JSON.parse(textResponse) as AnalysisResult;
}

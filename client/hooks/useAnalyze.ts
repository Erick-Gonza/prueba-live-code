import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { AnalysisResult } from '../types/analysis';

export function useAnalyze() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<AnalysisResult | null>(null);

	const analyzeText = useCallback(async (text: string) => {
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			const res = await api.post<AnalysisResult>('/analyze', { text });
			setResult(res.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setResult(null);
		setError(null);
	}, []);

	return {
		result,
		loading,
		error,
		analyzeText,
		reset,
	};
}

import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { AnalysisResult } from '../types/analysis';

interface MemoryResult extends AnalysisResult {
	analyzedAt: string;
}

export function useAnalyze() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<MemoryResult | null>(null);

	const getMemories = useCallback(async () => {
		setLoading(true);
		setError(null);
		setResult(null);
		try {
			const res = await api.get<MemoryResult>('/memory');
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
		getMemories,
		reset,
	};
}

'use client';

import { useState } from 'react';
import { sentimentColors, sentimentLabels } from '@/constants';
import { useAnalyze } from '../hooks/useAnalyze';
// import { useMemory } from '../hooks/useMemory';

export default function Home() {
	const [text, setText] = useState<string>('');
	const { result, loading, error, analyzeText, reset } = useAnalyze();

	async function handleAnalyze(e: React.FormEvent) {
		e.preventDefault();
		if (!text.trim()) return;
		await analyzeText(text);
	}

	function handleReset() {
		setText('');
		reset();
	}

	return (
		<main
			style={{
				padding: '2rem',
				fontFamily: 'system-ui, sans-serif',
				maxWidth: '800px',
				margin: '0 auto',
			}}
		>
			<h1>AI Text Analyzer</h1>

			<form onSubmit={handleAnalyze}>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Pega aquí el texto que deseas analizar..."
					rows={6}
					style={{
						width: '100%',
						padding: '1rem',
						fontSize: '1rem',
						borderRadius: '8px',
						border: '1px solid #ccc',
						resize: 'vertical',
						marginBottom: '1rem',
					}}
				/>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<button
						type="submit"
						disabled={loading || !text.trim()}
						style={{
							padding: '0.75rem 2rem',
							fontSize: '1rem',
							backgroundColor: '#3b82f6',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							cursor: loading ? 'not-allowed' : 'pointer',
							opacity: loading ? 0.6 : 1,
						}}
					>
						{loading ? 'Analizando...' : 'Analizar'}
					</button>
					{result && (
						<button
							type="button"
							onClick={handleReset}
							style={{
								padding: '0.75rem 2rem',
								fontSize: '1rem',
								backgroundColor: '#6b7280',
								color: 'white',
								border: 'none',
								borderRadius: '8px',
								cursor: 'pointer',
							}}
						>
							Limpiar
						</button>
					)}
				</div>
			</form>

			{error && (
				<div
					style={{
						marginTop: '2rem',
						padding: '1rem',
						backgroundColor: '#fef2f2',
						border: '1px solid #ef4444',
						borderRadius: '8px',
						color: '#ef4444',
					}}
				>
					Error: {error}
				</div>
			)}

			{result && (
				<div
					style={{
						marginTop: '2rem',
						padding: '1.5rem',
						backgroundColor: '#f9fafb',
						borderRadius: '12px',
						border: '1px solid #e5e7eb',
					}}
				>
					<h2 style={{ marginTop: 0 }}>Resultado del Análisis</h2>

					<div style={{ marginBottom: '1.5rem' }}>
						<strong>Resumen:</strong>
						<p style={{ margin: '0.5rem 0 0 0' }}>{result.summary}</p>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<strong>Sentimiento:</strong>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								marginTop: '0.5rem',
							}}
						>
							<span
								style={{
									display: 'inline-block',
									width: '12px',
									height: '12px',
									borderRadius: '50%',
									backgroundColor: sentimentColors[result.sentiment],
								}}
							/>
							<span>{sentimentLabels[result.sentiment]}</span>
						</div>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<strong>Idioma:</strong>
						<span style={{ marginLeft: '0.5rem' }}>
							{result.language.toUpperCase()}
						</span>
					</div>

					<div style={{ marginBottom: '1.5rem' }}>
						<strong>Keywords:</strong>
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '0.5rem',
								marginTop: '0.5rem',
							}}
						>
							{result.keywords.map((keyword, i) => (
								<span
									key={i}
									style={{
										padding: '0.25rem 0.75rem',
										backgroundColor: '#dbeafe',
										color: '#1e40af',
										borderRadius: '9999px',
										fontSize: '0.875rem',
									}}
								>
									{keyword}
								</span>
							))}
						</div>
					</div>

					<div>
						<strong>Categoría:</strong>
						<span
							style={{
								marginLeft: '0.5rem',
								padding: '0.25rem 0.75rem',
								backgroundColor: '#f3e8ff',
								color: '#7c3aed',
								borderRadius: '9999px',
								fontSize: '0.875rem',
							}}
						>
							{result.category}
						</span>
					</div>
				</div>
			)}
		</main>
	);
}

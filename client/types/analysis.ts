export interface AnalysisResult {
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  language: string;
  keywords: string[];
  category: "tecnología" | "deportes" | "política" | "entretenimiento" | "ciencia" | "negocios" | "otro";
}
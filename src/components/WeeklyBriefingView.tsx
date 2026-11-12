import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  MapPin, 
  GitBranch, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  Printer, 
  Layers,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { WeeklyBriefing } from '../types';

interface WeeklyBriefingViewProps {
  briefing: WeeklyBriefing | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

export const WeeklyBriefingView: React.FC<WeeklyBriefingViewProps> = ({
  briefing,
  isLoading,
  onRegenerate,
}) => {
  const [copied, setCopied] = useState(false);

  if (isLoading || !briefing) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-3 border-cyan-400 border-t-transparent" />
        <h3 className="mt-4 text-base font-semibold text-white">Synthesizing Weekly Intelligence Briefing...</h3>
        <p className="mt-1 text-xs text-slate-400 font-mono">
          Evaluating 7-day signals across AI Coding Tools, Indian Startups & Open-Source Models via Gemini 3.8
        </p>
      </div>
    );
  }

  const handleCopyMarkdown = () => {
    const md = `# ${briefing.title}
Date Range: ${briefing.dateRange}

## Executive Summary
${briefing.executiveSummary}

## Key Themes
${briefing.keyThemes.map(t => `### ${t.theme}\n${t.description}\n*Relevance: ${t.relevance}*`).join('\n\n')}

## 1. ${briefing.codingToolsSection.title}
${briefing.codingToolsSection.highlights.map(h => `- ${h}`).join('\n')}
*Benchmark Shift: ${briefing.codingToolsSection.benchmarkShift}*
*Tools to Watch: ${briefing.codingToolsSection.toolsToWatch.join(', ')}*

## 2. ${briefing.indianStartupsSection.title}
${briefing.indianStartupsSection.highlights.map(h => `- ${h}`).join('\n')}
*Funding & Dynamics: ${briefing.indianStartupsSection.fundingAndLaunches}*
*Ecosystem Insight: ${briefing.indianStartupsSection.ecosystemInsight}*

## 3. ${briefing.openSourceSection.title}
${briefing.openSourceSection.highlights.map(h => `- ${h}`).join('\n')}
*Model Architecture: ${briefing.openSourceSection.modelBreakdown}*
*Weights & Licensing: ${briefing.openSourceSection.weightsLicenseNote}*

## Strategic Recommendations
${briefing.strategicRecommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `AEGIS AI WEEKLY INTELLIGENCE REPORT\n${briefing.title}\n${briefing.dateRange}\n\n` +
      `EXECUTIVE SUMMARY:\n${briefing.executiveSummary}\n\n` +
      `CODING TOOLS:\n${briefing.codingToolsSection.highlights.join('\n')}\n\n` +
      `INDIAN STARTUPS:\n${briefing.indianStartupsSection.highlights.join('\n')}\n\n` +
      `OPEN SOURCE:\n${briefing.openSourceSection.highlights.join('\n')}\n\n` +
      `RECOMMENDATIONS:\n${briefing.strategicRecommendations.join('\n')}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Aegis_Weekly_Briefing_${briefing.dateRange.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Weekly Executive Dossier</span>
            <span aria-hidden="true">·</span>
            <span>{briefing.dateRange}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {briefing.title}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-synthesize</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Text</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors font-semibold"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Briefing Document Content */}
      <div className="mt-8 space-y-10">
        {/* Executive Summary Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Award className="h-4 w-4" />
            <span>Executive Synthesis & Macro Shift</span>
          </div>
          <p className="text-base text-slate-200 leading-relaxed font-normal">
            {briefing.executiveSummary}
          </p>

          {/* Key Themes Horizontal Strip */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Core Strategic Vectors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {briefing.keyThemes.map((theme, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-cyan-300">
                    {theme.theme}
                  </div>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {theme.description}
                  </p>
                  <div className="mt-2 text-2xs text-slate-500 font-mono">
                    <span className="text-slate-400 font-medium">Impact: </span>
                    {theme.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: AI Coding Tools */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-400">Pillar 01</div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {briefing.codingToolsSection.title}
                </h2>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
              <span>SWE-bench Parity Accelerating</span>
            </div>
          </div>

          <ul className="space-y-3">
            {briefing.codingToolsSection.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-cyan-400 font-mono text-xs mt-1">▸</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Benchmark Velocity
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {briefing.codingToolsSection.benchmarkShift}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Tools & Projects to Watch
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {briefing.codingToolsSection.toolsToWatch.map((tool, i) => (
                  <span key={i} className="text-xs text-cyan-300 font-mono">
                    {tool}{i < briefing.codingToolsSection.toolsToWatch.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Indian Tech Ecosystem */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-amber-400">Pillar 02</div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {briefing.indianStartupsSection.title}
                </h2>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span>Bengaluru · Hyderabad · IndiaAI</span>
            </div>
          </div>

          <ul className="space-y-3">
            {briefing.indianStartupsSection.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-amber-400 font-mono text-xs mt-1">▸</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Venture & Launch Signals
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {briefing.indianStartupsSection.fundingAndLaunches}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Sovereign Strategy & Infrastructure
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {briefing.indianStartupsSection.ecosystemInsight}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Open-Source Models */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <GitBranch className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400">Pillar 03</div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {briefing.openSourceSection.title}
                </h2>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <span>DeepSeek · Qwen · Mistral · Ollama</span>
            </div>
          </div>

          <ul className="space-y-3">
            {briefing.openSourceSection.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-emerald-400 font-mono text-xs mt-1">▸</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Architecture & MoE Sparsity
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {briefing.openSourceSection.modelBreakdown}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Licensing & Commercial Autonomy
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {briefing.openSourceSection.weightsLicenseNote}
              </p>
            </div>
          </div>
        </section>

        {/* Strategic Recommendations */}
        <section className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
            <Layers className="h-4 w-4" />
            <span>Actionable Weekly Directives for Engineering & Product</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {briefing.strategicRecommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-cyan-500/10 text-cyan-400 font-mono text-xs">
                  0{idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

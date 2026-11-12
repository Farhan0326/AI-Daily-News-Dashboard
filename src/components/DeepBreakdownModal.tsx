import React from 'react';
import { X, Microscope, Cpu, Wrench, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NewsItem, DeepBreakdown } from '../types';

interface DeepBreakdownModalProps {
  item: NewsItem | null;
  breakdown: DeepBreakdown | null;
  isLoading: boolean;
  onClose: () => void;
}

export const DeepBreakdownModal: React.FC<DeepBreakdownModalProps> = ({
  item,
  breakdown,
  isLoading,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-700/80 bg-slate-900 shadow-2xl p-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Microscope className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400">
                Aegis Technical Dissection
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {item.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <p className="mt-4 text-xs font-mono text-slate-400">
              Synthesizing architectural mechanics and workflow impact via Gemini...
            </p>
          </div>
        )}

        {/* Loaded Breakdown Content */}
        {!isLoading && breakdown && (
          <div className="mt-5 space-y-6">
            {/* Executive Verdict Callout */}
            <div className="rounded-lg bg-cyan-950/30 border border-cyan-800/40 p-4">
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-1 uppercase tracking-wider">
                Executive Verdict
              </div>
              <p className="text-sm text-cyan-100 leading-relaxed">
                {breakdown.executiveVerdict}
              </p>
            </div>

            {/* Architecture and Mechanics */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold mb-2.5">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <span>Architecture & Technical Mechanics</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {breakdown.architectureAndMechanics.map((mech, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded bg-slate-950/40 border border-slate-800/60">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Workflow Impact */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold mb-2.5">
                <Wrench className="h-4 w-4 text-amber-400" />
                <span>Developer Workflow Impact</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {breakdown.developerWorkflowImpact.map((impact, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded bg-slate-950/40 border border-slate-800/60">
                    <ArrowRight className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ecosystem Tradeoffs & Counterpoints */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold mb-2.5">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Ecosystem Tradeoffs & Friction Points</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                {breakdown.ecosystemCounterpoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-2.5 rounded bg-slate-950/40 border border-slate-800/60">
                    <span className="text-rose-400 font-mono text-xs mt-0.5">!</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Action Footer */}
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-4">
              <div className="text-xs font-mono text-slate-400 mb-1">
                Tactical Recommended Next Step:
              </div>
              <p className="text-sm font-medium text-white">
                {breakdown.recommendedAction}
              </p>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            Close Dissection
          </button>
        </div>
      </div>
    </div>
  );
};

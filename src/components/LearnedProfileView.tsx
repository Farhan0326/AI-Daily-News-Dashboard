import React, { useState } from 'react';
import { 
  Sliders, 
  BrainCircuit, 
  Plus, 
  X, 
  Sparkles, 
  History, 
  Send, 
  CheckCircle,
  Lightbulb,
  Terminal,
  MapPin,
  GitBranch,
  ArrowUpRight
} from 'lucide-react';
import { UserPreferences, CategoryType } from '../types';

interface LearnedProfileViewProps {
  preferences: UserPreferences;
  onUpdateWeights: (newWeights: UserPreferences['weights']) => void;
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
  onTeachAgent: (note: string) => Promise<void>;
  isTeaching: boolean;
}

export const LearnedProfileView: React.FC<LearnedProfileViewProps> = ({
  preferences,
  onUpdateWeights,
  onAddKeyword,
  onRemoveKeyword,
  onTeachAgent,
  isTeaching,
}) => {
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [teachingNote, setTeachingNote] = useState('');
  const [teachSuccessMessage, setTeachSuccessMessage] = useState<string | null>(null);

  const handleSliderChange = (cat: keyof UserPreferences['weights'], value: number) => {
    const updated = {
      ...preferences.weights,
      [cat]: value,
    };
    onUpdateWeights(updated);
  };

  const handleAddKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeywordInput.trim()) {
      onAddKeyword(newKeywordInput.trim());
      setNewKeywordInput('');
    }
  };

  const handleTeachSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teachingNote.trim() || isTeaching) return;

    try {
      await onTeachAgent(teachingNote.trim());
      setTeachSuccessMessage('Agent has recalibrated its internal weightings based on your feedback.');
      setTeachingNote('');
      setTimeout(() => setTeachSuccessMessage(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <BrainCircuit className="h-4 w-4" />
          <span>Cognitive Adaptation Engine</span>
          <span aria-hidden="true">·</span>
          <span>Adaptive Bias Profile</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Learned User Preferences
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Aegis continuously refines your intelligence stream based on reading depth, upvotes, bookmarks, and explicit directives.
        </p>
      </div>

      {/* Main Grid: Cognitive Overview & Weight Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Weight Sliders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-white">
                  Active Priority Weight Distribution
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Live Calibrated
              </span>
            </div>

            <div className="space-y-5">
              {/* Pillar 1: AI Coding Tools */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-slate-200">
                    <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                    AI Coding Tools & Agentic Workflows
                  </span>
                  <span className="text-cyan-400 font-semibold tabular-nums">
                    {preferences.weights.ai_coding_tools}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={preferences.weights.ai_coding_tools}
                  onChange={(e) => handleSliderChange('ai_coding_tools', parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-2xs text-slate-500 font-mono mt-1">
                  <span>Standard Baseline (30%)</span>
                  <span>Dominant Focus (100%)</span>
                </div>
              </div>

              {/* Pillar 2: Indian Tech Startups */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-slate-200">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    Indian Tech Startups & Ecosystem
                  </span>
                  <span className="text-amber-400 font-semibold tabular-nums">
                    {preferences.weights.indian_tech_startups}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={preferences.weights.indian_tech_startups}
                  onChange={(e) => handleSliderChange('indian_tech_startups', parseInt(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-2xs text-slate-500 font-mono mt-1">
                  <span>Standard Baseline (30%)</span>
                  <span>Dominant Focus (100%)</span>
                </div>
              </div>

              {/* Pillar 3: Open-Source Models */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-slate-200">
                    <GitBranch className="h-3.5 w-3.5 text-emerald-400" />
                    Open-Source Models, Weights & Fine-Tuning
                  </span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    {preferences.weights.open_source_models}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={preferences.weights.open_source_models}
                  onChange={(e) => handleSliderChange('open_source_models', parseInt(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-2xs text-slate-500 font-mono mt-1">
                  <span>Standard Baseline (30%)</span>
                  <span>Dominant Focus (100%)</span>
                </div>
              </div>

              {/* Auxiliary: General Frontier Trends */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <span className="flex items-center gap-1.5 font-medium text-slate-400">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                    General Frontier & Macro Trends
                  </span>
                  <span className="text-purple-400 font-semibold tabular-nums">
                    {preferences.weights.frontier_trends}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={preferences.weights.frontier_trends}
                  onChange={(e) => handleSliderChange('frontier_trends', parseInt(e.target.value))}
                  className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interactive Teach-The-Agent Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">
                Direct Cognitive Coaching
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Instruct Aegis directly in natural language to recalibrate its editorial radar (e.g. &quot;Focus on Sarvam AI&apos;s new Indic models and developer adoption in Bengaluru&quot;).
            </p>

            <form onSubmit={handleTeachSubmit} className="space-y-3">
              <textarea
                value={teachingNote}
                onChange={(e) => setTeachingNote(e.target.value)}
                placeholder="Tell Aegis what you want more or less of in your daily radar..."
                rows={3}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />

              <div className="flex items-center justify-between">
                <div className="text-2xs text-slate-500 font-mono">
                  Processed via Gemini 3.8 Flash adaptation layer
                </div>
                <button
                  type="submit"
                  disabled={!teachingNote.trim() || isTeaching}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors"
                >
                  <Send className="h-3 w-3" />
                  <span>{isTeaching ? 'Calibrating...' : 'Teach Agent'}</span>
                </button>
              </div>
            </form>

            {teachSuccessMessage && (
              <div className="mt-3 flex items-center gap-2 p-2.5 rounded-md bg-emerald-950/40 border border-emerald-800/50 text-xs text-emerald-300">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>{teachSuccessMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Learned Model Synthesis & Custom Keywords */}
        <div className="space-y-6">
          {/* How the Agent Sees You */}
          <div className="rounded-xl border border-cyan-800/40 bg-cyan-950/20 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <BrainCircuit className="h-4 w-4" />
              <span>Agent&apos;s Mental Model</span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              {preferences.learnedInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/60">
                  <span className="text-cyan-400 font-mono text-xs mt-0.5">▪</span>
                  <span className="leading-relaxed">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Targeted Focus Keywords */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="text-sm font-semibold text-white mb-2">
              Tracked Signal Keywords
            </div>
            <p className="text-xs text-slate-400 mb-3">
              High-multiplier terms that boost an article&apos;s relevance score:
            </p>

            {/* Keyword Chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {preferences.focusKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/80 text-xs text-slate-200 font-mono"
                >
                  <span>{kw}</span>
                  <button
                    onClick={() => onRemoveKeyword(kw)}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add new keyword form */}
            <form onSubmit={handleAddKeywordSubmit} className="flex gap-2">
              <input
                type="text"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                placeholder="Add keyword (e.g. DeepSeek-R1)..."
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                type="submit"
                className="flex items-center justify-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

          {/* Quick preset triggers */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
            <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
              Curated Priority Presets
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => onUpdateWeights({
                  ai_coding_tools: 98,
                  indian_tech_startups: 92,
                  open_source_models: 95,
                  frontier_trends: 40
                })}
                className="w-full text-left p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-xs text-slate-300 flex items-center justify-between transition-colors font-mono"
              >
                <span>Full Focus (Developer + India + Open)</span>
                <ArrowUpRight className="h-3 w-3 text-cyan-400" />
              </button>

              <button
                onClick={() => onUpdateWeights({
                  ai_coding_tools: 100,
                  indian_tech_startups: 70,
                  open_source_models: 90,
                  frontier_trends: 30
                })}
                className="w-full text-left p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-xs text-slate-300 flex items-center justify-between transition-colors font-mono"
              >
                <span>Code Generation & SWE-bench Heavy</span>
                <ArrowUpRight className="h-3 w-3 text-cyan-400" />
              </button>

              <button
                onClick={() => onUpdateWeights({
                  ai_coding_tools: 75,
                  indian_tech_startups: 100,
                  open_source_models: 85,
                  frontier_trends: 40
                })}
                className="w-full text-left p-2 rounded bg-slate-950/60 hover:bg-slate-800 text-xs text-slate-300 flex items-center justify-between transition-colors font-mono"
              >
                <span>India Tech Corridor & Sovereign AI</span>
                <ArrowUpRight className="h-3 w-3 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calibration History Audit Log */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">
            Audit Log: Recent Preference Adjustments
          </h2>
        </div>

        <div className="divide-y divide-slate-800/80">
          {preferences.learningLog.length === 0 ? (
            <p className="text-xs text-slate-500 py-3">
              No recent manual adjustments. Vote on articles in the Daily Radar to train the agent!
            </p>
          ) : (
            preferences.learningLog.slice(0, 6).map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <span className="font-mono text-cyan-400">[{log.action.toUpperCase()}]</span>
                    <span>{log.targetTitle}</span>
                  </div>
                  <p className="text-slate-400 mt-0.5">{log.reasoning}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 font-mono text-2xs text-slate-500">
                  <span className="text-emerald-400 font-semibold">{log.delta}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

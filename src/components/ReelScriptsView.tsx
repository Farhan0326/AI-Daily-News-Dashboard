import React, { useState } from 'react';
import { 
  Video, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Clock, 
  Star, 
  CheckCircle2, 
  RefreshCw, 
  Download, 
  SlidersHorizontal,
  Flame,
  Terminal,
  MapPin,
  GitBranch,
  Layers,
  Send,
  HelpCircle
} from 'lucide-react';
import { ReelScript, ScriptAngle, CategoryType } from '../types';

interface ReelScriptsViewProps {
  scripts: ReelScript[];
  onGenerateBatch: (customTopic?: string, pillar?: string) => Promise<void>;
  isGenerating: boolean;
  onToggleBestPick: (scriptId: string) => void;
  onUpdateStatus: (scriptId: string, status: 'ready' | 'selected' | 'recorded') => void;
  onOpenTeleprompter: (script: ReelScript) => void;
}

export const ReelScriptsView: React.FC<ReelScriptsViewProps> = ({
  scripts,
  onGenerateBatch,
  isGenerating,
  onToggleBestPick,
  onUpdateStatus,
  onOpenTeleprompter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'best_only' | 'ai_coding_tools' | 'indian_tech_startups' | 'open_source_models'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showIdeaBox, setShowIdeaBox] = useState(false);

  // Filter scripts
  const filteredScripts = scripts.filter((s) => {
    if (selectedFilter === 'best_only') return s.isBestPick || s.status === 'selected';
    if (selectedFilter === 'ai_coding_tools') return s.category === 'ai_coding_tools';
    if (selectedFilter === 'indian_tech_startups') return s.category === 'indian_tech_startups';
    if (selectedFilter === 'open_source_models') return s.category === 'open_source_models';
    return true;
  });

  const bestPicks = scripts.filter(s => s.isBestPick || s.status === 'selected');
  const recordedCount = scripts.filter(s => s.status === 'recorded').length;

  const handleCopyScript = (script: ReelScript) => {
    const text = `REEL SCRIPT: ${script.title}
Target Duration: ~${script.estimatedDurationSec}s (${script.wordCount} words)

[0:00 - 0:05] HOOK:
"${script.hook}"

[0:05 - 0:50] BODY:
${script.body}

[0:50 - 1:00] CTA:
"${script.cta}"

ON-SCREEN CAPTIONS:
${script.onScreenCaptions.join(' | ')}

SUGGESTED B-ROLL:
${script.visualBroll.map((b, i) => `${i + 1}. ${b}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedId(script.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadAllSelected = () => {
    const targets = bestPicks.length > 0 ? bestPicks : scripts.slice(0, 5);
    const content = targets.map((s, idx) => (
      `==============================\n` +
      `SCRIPT #${idx + 1}: ${s.title.toUpperCase()}\n` +
      `Duration: ~${s.estimatedDurationSec}s (${s.wordCount} words) | Category: ${s.category}\n` +
      `------------------------------\n` +
      `HOOK:\n"${s.hook}"\n\n` +
      `BODY:\n${s.body}\n\n` +
      `CTA:\n"${s.cta}"\n\n` +
      `B-ROLL SUGGESTIONS:\n${s.visualBroll.map((b, i) => `- ${b}`).join('\n')}\n` +
      `CAPTIONS: ${s.onScreenCaptions.join(' | ')}\n` +
      `==============================\n\n`
    )).join('\n');

    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Aegis_Reels_Recording_Scripts_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getAngleLabel = (angle: ScriptAngle) => {
    switch (angle) {
      case 'mindblowing_fact':
        return 'Mindblowing Fact';
      case 'developer_speed':
        return 'Developer Velocity';
      case 'indian_startup':
        return 'Indian Startup Spotlight';
      case 'open_source_rebellion':
        return 'Open Source Rebellion';
      case 'future_shift':
        return 'Macro Tech Shift';
    }
  };

  const getCategoryIcon = (cat: string) => {
    if (cat === 'ai_coding_tools') return <Terminal className="h-3 w-3 text-cyan-400" />;
    if (cat === 'indian_tech_startups') return <MapPin className="h-3 w-3 text-amber-400" />;
    if (cat === 'open_source_models') return <GitBranch className="h-3 w-3 text-emerald-400" />;
    return <Sparkles className="h-3 w-3 text-purple-400" />;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Video className="h-4 w-4" />
            <span>AI Reel & Shorts Studio</span>
            <span aria-hidden="true">·</span>
            <span>Structured: Hook + Body + CTA</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">Strictly ≤ 70s Read Time</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Daily Instagram Reel Scripts
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Autonomous daily scripts covering AI coding breakthroughs, Indian tech startups, and open weights. Select the best scripts each morning to record on camera.
          </p>
        </div>

        {/* Creator KPIs & Batch Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onGenerateBatch()}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating 5-10 Scripts...' : 'Generate Fresh 5-10 Batch'}</span>
          </button>

          <button
            onClick={handleDownloadAllSelected}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            title="Download batch text file for teleprompter"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export Text Batch</span>
          </button>
        </div>
      </div>

      {/* Daily Recording Queue Strip (Selected Best to Record) */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Flame className="h-4 w-4 text-amber-400" />
            <span className="font-semibold text-white">Today&apos;s Recording Queue:</span>
            <span className="text-amber-400 font-bold tabular-nums">{bestPicks.length} Selected as Best to Record</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 tabular-nums">{recordedCount} Recorded</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIdeaBox(!showIdeaBox)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              <span>{showIdeaBox ? 'Hide Custom Generator' : 'Generate on Custom Topic'}</span>
            </button>
          </div>
        </div>

        {/* Custom Generator Drawer */}
        {showIdeaBox && (
          <div className="mb-4 pt-3 border-t border-slate-800/80">
            <div className="text-xs text-slate-400 mb-2 font-mono">
              Prompt Gemini to write 5-10 reels on a specific angle (e.g. &quot;Sarvam AI vs OpenAI pricing in India&quot;, &quot;Why developers love Cursor Composer&quot;):
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter custom reel topic or specific fact to turn into 5-10 scripts..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                onClick={() => {
                  if (customPrompt.trim()) {
                    onGenerateBatch(customPrompt.trim());
                    setCustomPrompt('');
                  }
                }}
                disabled={isGenerating || !customPrompt.trim()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors"
              >
                <Send className="h-3 w-3" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        )}

        {/* Selected Quick Pills */}
        <div className="flex flex-wrap gap-2">
          {bestPicks.length === 0 ? (
            <div className="text-xs text-slate-500 py-1 font-mono">
              No scripts marked as best yet. Click the &quot;Best to Record&quot; star on any script card below to queue it for recording!
            </div>
          ) : (
            bestPicks.map((s) => (
              <div
                key={s.id}
                onClick={() => onOpenTeleprompter(s)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all text-xs"
              >
                <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
                <span className="font-medium text-slate-200 group-hover:text-amber-300 truncate max-w-xs">
                  {s.title}
                </span>
                <span className="text-2xs font-mono text-slate-400 tabular-nums">
                  {s.estimatedDurationSec}s
                </span>
                <Play className="h-3 w-3 text-cyan-400 opacity-60 group-hover:opacity-100 shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filter and View Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Scripts ({scripts.length})
          </button>
          <button
            onClick={() => setSelectedFilter('best_only')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
              selectedFilter === 'best_only' ? 'bg-slate-800 text-amber-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="h-3 w-3 fill-current text-amber-400" />
            Best to Record ({bestPicks.length})
          </button>
          <button
            onClick={() => setSelectedFilter('ai_coding_tools')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedFilter === 'ai_coding_tools' ? 'bg-slate-800 text-cyan-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Coding Tools
          </button>
          <button
            onClick={() => setSelectedFilter('indian_tech_startups')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedFilter === 'indian_tech_startups' ? 'bg-slate-800 text-amber-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Indian Startups
          </button>
          <button
            onClick={() => setSelectedFilter('open_source_models')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              selectedFilter === 'open_source_models' ? 'bg-slate-800 text-emerald-300 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Open Source
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="font-semibold text-white tabular-nums">{filteredScripts.length}</span> scripts
        </div>
      </div>

      {/* Grid of 5-10 Daily Scripts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScripts.map((script) => {
          const isSelectedBest = script.isBestPick || script.status === 'selected';
          const isRecorded = script.status === 'recorded';

          return (
            <article
              key={script.id}
              className={`rounded-2xl border transition-all p-6 flex flex-col justify-between shadow-sm ${
                isSelectedBest
                  ? 'border-amber-500/50 bg-slate-900/90 ring-1 ring-amber-500/20'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700/80'
              }`}
            >
              <div>
                {/* Header Metadata (Clean unboxed with separators) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-3 font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-300">
                      {getCategoryIcon(script.category)}
                      {getAngleLabel(script.angle)}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-cyan-400 font-bold tabular-nums">
                      <Clock className="h-3 w-3" />
                      ~{script.estimatedDurationSec}s
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="tabular-nums">{script.wordCount} words</span>
                  </div>

                  {/* Best Pick Toggle Star */}
                  <button
                    onClick={() => onToggleBestPick(script.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-2xs font-semibold transition-colors ${
                      isSelectedBest
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800'
                    }`}
                    title="Mark this as one of the best scripts to record today"
                  >
                    <Star className={`h-3 w-3 ${isSelectedBest ? 'fill-amber-400 text-amber-400' : ''}`} />
                    <span>{isSelectedBest ? 'Best to Record' : 'Select'}</span>
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                  {script.title}
                </h2>

                {/* Verified Fact Highlight */}
                {script.keyFactHighlight && (
                  <div className="mt-2 text-2xs font-mono text-cyan-300/90 flex items-center gap-1.5">
                    <span className="text-slate-500">Key Fact:</span>
                    <span>{script.keyFactHighlight}</span>
                  </div>
                )}

                {/* Script Structure Container */}
                <div className="mt-4 space-y-3.5">
                  {/* 1. HOOK (0 - 5s) */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                    <div className="flex items-center justify-between text-2xs font-mono text-cyan-400 mb-1.5 uppercase tracking-wider font-semibold">
                      <span>01. The Hook (0 - 5s)</span>
                      <span className="text-slate-500">Instant Stop-Scroll</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      &quot;{script.hook}&quot;
                    </p>
                  </div>

                  {/* 2. BODY (5 - 55s) */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between text-2xs font-mono text-amber-400 mb-1.5 uppercase tracking-wider font-semibold">
                      <span>02. High-Retention Body (5 - 55s)</span>
                      <span className="text-slate-500">Core Technical Facts</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {script.body}
                    </p>
                  </div>

                  {/* 3. CTA (55 - 65s) */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <div className="flex items-center justify-between text-2xs font-mono text-emerald-400 mb-1.5 uppercase tracking-wider font-semibold">
                      <span>03. The CTA (55 - 65s)</span>
                      <span className="text-slate-500">Engagement Trigger</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-emerald-200 leading-relaxed">
                      &quot;{script.cta}&quot;
                    </p>
                  </div>
                </div>

                {/* On-screen text captions */}
                {script.onScreenCaptions && script.onScreenCaptions.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5 items-center">
                    <span className="text-2xs font-mono text-slate-500">Captions:</span>
                    {script.onScreenCaptions.map((cap, i) => (
                      <span key={i} className="text-2xs font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenTeleprompter(script)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-sm"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Record / Teleprompter</span>
                  </button>

                  <button
                    onClick={() => handleCopyScript(script)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                  >
                    {copiedId === script.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedId === script.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateStatus(script.id, isRecorded ? 'ready' : 'recorded')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      isRecorded
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isRecorded ? 'Recorded' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

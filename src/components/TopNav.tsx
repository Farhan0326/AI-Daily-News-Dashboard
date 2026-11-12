import React from 'react';
import { Sparkles, RefreshCw, Layers, Compass, BrainCircuit, BarChart3, Bookmark, Video } from 'lucide-react';

interface TopNavProps {
  activeTab: 'radar' | 'briefing' | 'reels' | 'profile' | 'trends' | 'saved';
  setActiveTab: (tab: 'radar' | 'briefing' | 'reels' | 'profile' | 'trends' | 'saved') => void;
  isScanning: boolean;
  onTriggerScan: () => void;
  savedCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  isScanning,
  onTriggerScan,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              Aegis AI Agent
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-mono">
              Research & Radar
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line, unboxed, hover underline) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('radar')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'radar'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="h-4 w-4" />
            Daily Radar
          </button>

          <button
            onClick={() => setActiveTab('briefing')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'briefing'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Weekly Briefing
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'reels'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="h-4 w-4" />
            Reels Studio (5-10/day)
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-4 w-4" />
            Preferences
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'trends'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Trend Matrix
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`whitespace-nowrap transition-colors pb-1 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            Saved ({savedCount})
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md shadow-sm transition-all disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning Feeds...' : 'Run Daily Scan'}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-800/80 px-2 py-2 text-xs text-slate-400 bg-slate-950 overflow-x-auto">
        <button
          onClick={() => setActiveTab('radar')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'radar' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Radar
        </button>
        <button
          onClick={() => setActiveTab('briefing')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'briefing' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Briefing
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'reels' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Reels Studio
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'profile' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Preferences
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'trends' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Trends
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'saved' ? 'text-cyan-400 font-medium' : ''}`}
        >
          Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};

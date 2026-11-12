import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark, 
  Search, 
  ExternalLink, 
  Microscope, 
  CheckCircle2, 
  Terminal, 
  MapPin, 
  GitBranch, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { NewsItem, CategoryType } from '../types';

interface DailyRadarProps {
  newsItems: NewsItem[];
  selectedCategory: CategoryType | 'all';
  onVote: (item: NewsItem, vote: 'up' | 'down') => void;
  onToggleBookmark: (item: NewsItem) => void;
  onInspectItem: (item: NewsItem) => void;
  isScanning: boolean;
  agentThoughtTrace?: string[];
}

export const DailyRadar: React.FC<DailyRadarProps> = ({
  newsItems,
  selectedCategory,
  onVote,
  onToggleBookmark,
  onInspectItem,
  isScanning,
  agentThoughtTrace,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'date'>('relevance');

  // Filter items
  const filteredItems = newsItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.entitiesMentioned.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'relevance') {
      return b.relevanceScore - a.relevanceScore;
    }
    return 0; // maintain order
  });

  const getCategoryLabel = (cat: CategoryType) => {
    switch (cat) {
      case 'ai_coding_tools':
        return 'AI Coding Tools';
      case 'indian_tech_startups':
        return 'Indian Tech Ecosystem';
      case 'open_source_models':
        return 'Open-Source Models';
      default:
        return 'Frontier AI';
    }
  };

  const getCategoryIcon = (cat: CategoryType) => {
    switch (cat) {
      case 'ai_coding_tools':
        return <Terminal className="h-3.5 w-3.5 text-cyan-400" />;
      case 'indian_tech_startups':
        return <MapPin className="h-3.5 w-3.5 text-amber-400" />;
      case 'open_source_models':
        return <GitBranch className="h-3.5 w-3.5 text-emerald-400" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Agent Reasoning Stream Banner (When active or recent) */}
      {agentThoughtTrace && agentThoughtTrace.length > 0 && (
        <div className="mb-6 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Agent Neural Filter Trace</span>
          </div>
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            {agentThoughtTrace.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-slate-500 tabular-nums">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control bar: Search, Sort, Total Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals, entities (Sarvam, Cursor, DeepSeek)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>Showing</span>
            <span className="font-semibold text-white tabular-nums">{sortedItems.length}</span>
            <span>of</span>
            <span className="font-semibold text-white tabular-nums">{newsItems.length}</span>
            <span>signals</span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setSortBy('relevance')}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                sortBy === 'relevance'
                  ? 'bg-slate-800 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpDown className="h-3 w-3" />
              Relevance
            </button>
            <button
              onClick={() => setSortBy('date')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                sortBy === 'date'
                  ? 'bg-slate-800 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Latest
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <Microscope className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No AI developments match criteria</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your query filter or reset category selection to view all monitored intelligence.
          </p>
          <button
            onClick={() => { setSearchQuery(''); }}
            className="mt-4 px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Intelligence Cards Grid (Single-Elevation, No pill badge sandwich) */}
      <div className="space-y-4">
        {sortedItems.map((item) => {
          return (
            <article
              key={item.id}
              className="group rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700/80 transition-all p-5 shadow-sm"
            >
              {/* Header: Clean unboxed metadata with typographic separators */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2.5 font-mono">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    {getCategoryIcon(item.category)}
                    {getCategoryLabel(item.category)}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.source}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.date}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.readTime}</span>
                </div>

                {/* Relevance Score (Tabular Numbers) */}
                <div className="flex items-center gap-1 text-xs font-mono tabular-nums">
                  <span className="text-slate-500">Signal Match:</span>
                  <span className="text-cyan-400 font-semibold">{item.relevanceScore}%</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h2>

              {/* Summary */}
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              {/* Key Takeaways Checklist */}
              <div className="mt-4 rounded-lg bg-slate-950/60 border border-slate-800/80 p-3.5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  Key Technical Takeaways
                </div>
                <ul className="space-y-1.5">
                  {item.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Impact statement */}
              {item.technicalImpact && (
                <div className="mt-3 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Developer Impact: </span>
                  <span>{item.technicalImpact}</span>
                </div>
              )}

              {/* Tags & Mentioned Entities (Unboxed inline text with separators) */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-2xs text-slate-400">
                <span className="text-slate-500">Entities:</span>
                {item.entitiesMentioned.map((entity, i) => (
                  <span key={i} className="text-slate-300 font-mono">
                    {entity}{i < item.entitiesMentioned.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>

              {/* Action Toolbar */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                {/* Preference Training Buttons (Up/Down Feedback) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1">Train Agent:</span>
                  <button
                    onClick={() => onVote(item, 'up')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                      item.userVote === 'up'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800'
                    }`}
                    title="Upvote: Agent prioritizes similar breakthroughs in future scans"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>Relevant</span>
                  </button>

                  <button
                    onClick={() => onVote(item, 'down')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                      item.userVote === 'down'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800'
                    }`}
                    title="Downvote: Agent reduces weight on this topic"
                  >
                    <ThumbsDown className="h-3 w-3" />
                    <span>Less like this</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark(item)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-colors ${
                      item.isBookmarked
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800'
                    }`}
                  >
                    <Bookmark className="h-3 w-3" />
                    <span>{item.isBookmarked ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Secondary Actions: Inspect Technical Dissection + Source */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onInspectItem(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 hover:bg-cyan-900/40 rounded-md transition-colors"
                  >
                    <Microscope className="h-3.5 w-3.5" />
                    <span>Inspect Deep Dissection</span>
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

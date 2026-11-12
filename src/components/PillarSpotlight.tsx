import React from 'react';
import { Terminal, MapPin, GitBranch, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { CategoryType, UserPreferences } from '../types';

interface PillarSpotlightProps {
  preferences: UserPreferences;
  selectedCategory: CategoryType | 'all';
  onSelectCategory: (cat: CategoryType | 'all') => void;
  onOpenPreferences: () => void;
}

export const PillarSpotlight: React.FC<PillarSpotlightProps> = ({
  preferences,
  selectedCategory,
  onSelectCategory,
  onOpenPreferences,
}) => {
  const pillars = [
    {
      id: 'ai_coding_tools' as CategoryType,
      title: 'AI Coding Tools',
      subtitle: 'Agentic IDEs · SWE-bench · Code Synthesis',
      weight: preferences.weights.ai_coding_tools,
      image: '/src/assets/images/radar_ai_coding_1794447180378.jpg',
      icon: Terminal,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      activeBg: 'bg-cyan-500/10',
    },
    {
      id: 'indian_tech_startups' as CategoryType,
      title: 'Indian Tech Startups',
      subtitle: 'Sarvam · Krutrim · Bengaluru Venture Corridor',
      weight: preferences.weights.indian_tech_startups,
      image: '/src/assets/images/radar_indian_tech_1794447182078.jpg',
      icon: MapPin,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      activeBg: 'bg-amber-500/10',
    },
    {
      id: 'open_source_models' as CategoryType,
      title: 'Open-Source Models',
      subtitle: 'DeepSeek · Qwen · Mistral · Weights & Licensing',
      weight: preferences.weights.open_source_models,
      image: '/src/assets/images/radar_open_weights_1794447180504.jpg',
      icon: GitBranch,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      activeBg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header row with agent alignment status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <span>Agent Mode: Autonomous Active Radar</span>
              <span aria-hidden="true">·</span>
              <span>Learning Cycle: #{preferences.interactionCount} Interactions</span>
              <span aria-hidden="true">·</span>
              <span>Updated: {preferences.lastLearnedDate}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Target Priority Radar
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/60'
              }`}
            >
              All Pillars
            </button>
            <button
              onClick={onOpenPreferences}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-md border border-slate-700/60 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
              Tune Weights
            </button>
          </div>
        </div>

        {/* 3 Pillar Bento Grid with High-Fidelity Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedCategory === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : pillar.id)}
                className={`group relative overflow-hidden rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? `${pillar.borderColor} ring-1 ring-cyan-500/30 ${pillar.activeBg}`
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Visual image banner with gradient scrim */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-800">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  
                  {/* Floating Pillar Weight Badge (Functional, Tabular) */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700/70 text-xs font-mono tabular-nums text-slate-300">
                    <span className="text-slate-400">Weight</span>
                    <span className={`font-semibold ${pillar.color}`}>{pillar.weight}%</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg bg-slate-800 border border-slate-700 ${pillar.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {pillar.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-1">
                    {pillar.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>Click to isolate stream</span>
                    <span className="font-mono text-cyan-400 text-2xs">
                      {isSelected ? 'Active Filter' : 'Filter by Pillar'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

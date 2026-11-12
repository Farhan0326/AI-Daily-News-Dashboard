import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { PillarSpotlight } from './components/PillarSpotlight';
import { DailyRadar } from './components/DailyRadar';
import { WeeklyBriefingView } from './components/WeeklyBriefingView';
import { LearnedProfileView } from './components/LearnedProfileView';
import { TrendMatrixView } from './components/TrendMatrixView';
import { DeepBreakdownModal } from './components/DeepBreakdownModal';
import { ReelScriptsView } from './components/ReelScriptsView';
import { TeleprompterModal } from './components/TeleprompterModal';
import { NewsItem, UserPreferences, WeeklyBriefing, DeepBreakdown, CategoryType, ReelScript } from './types';
import { Bookmark, Sparkles, CheckCircle2, AlertCircle, Video } from 'lucide-react';

const INITIAL_PREFERENCES: UserPreferences = {
  weights: {
    ai_coding_tools: 95,
    indian_tech_startups: 90,
    open_source_models: 92,
    frontier_trends: 55,
  },
  focusKeywords: [
    'SWE-bench',
    'Sarvam AI',
    'DeepSeek',
    'vLLM',
    'Cursor',
    'Bengaluru AI Hub',
    'Krutrim',
    'Indic LLMs',
    'MoE',
    'Cline'
  ],
  excludedKeywords: ['Crypto', 'NFTs', 'Self-driving Cars'],
  learnedInsights: [
    'Primary affinity for agentic IDE workflows and deterministic code refactoring tools.',
    'High engagement with Indian foundational AI models and sovereign infrastructure initiatives (Bengaluru corridor).',
    'Strong focus on permissive open-weight releases that can be air-gapped on developer workstations.'
  ],
  learningLog: [
    {
      id: 'log-1',
      timestamp: 'Today, 09:30 AM',
      action: 'upvoted',
      targetTitle: 'Sarvam AI Unveils Sovereign Indic Language Foundation Models',
      delta: '+4% Indian Tech Startups',
      reasoning: 'Reinforced regional multilingual NLP weighting.'
    },
    {
      id: 'log-2',
      timestamp: 'Yesterday, 05:00 PM',
      action: 'bookmarked',
      targetTitle: 'Next-Gen Agentic IDEs: Multi-File Synthesis Takes Center Stage',
      delta: '+3% AI Coding Tools',
      reasoning: 'Prioritized agentic developer workflows.'
    }
  ],
  interactionCount: 14,
  lastLearnedDate: 'Today, 10:15 AM'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'radar' | 'briefing' | 'reels' | 'profile' | 'trends' | 'saved'>('radar');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  
  // Persistent state initialized from localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem('aegis_user_preferences');
      return stored ? JSON.parse(stored) : INITIAL_PREFERENCES;
    } catch {
      return INITIAL_PREFERENCES;
    }
  });

  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    try {
      const stored = localStorage.getItem('aegis_news_items');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [briefing, setBriefing] = useState<WeeklyBriefing | null>(() => {
    try {
      const stored = localStorage.getItem('aegis_weekly_briefing');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Daily Instagram Reel scripts state
  const [reelScripts, setReelScripts] = useState<ReelScript[]>(() => {
    try {
      const stored = localStorage.getItem('aegis_reel_scripts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [teleprompterScript, setTeleprompterScript] = useState<ReelScript | null>(null);
  const [isGeneratingReels, setIsGeneratingReels] = useState(false);

  // UI state
  const [isScanning, setIsScanning] = useState(false);
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);
  const [isTeaching, setIsTeaching] = useState(false);
  const [agentThoughtTrace, setAgentThoughtTrace] = useState<string[]>([
    'Synthesized 24h global intelligence streams',
    'Aligned ranking with primary vectors: AI Coding Tools (95%), Open-Source (92%), Indian Startups (90%)'
  ]);
  
  // Deep inspection modal state
  const [inspectItem, setInspectItem] = useState<NewsItem | null>(null);
  const [deepBreakdown, setDeepBreakdown] = useState<DeepBreakdown | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);

  // Toast notifications for preference adaptations
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('aegis_user_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (newsItems.length > 0) {
      localStorage.setItem('aegis_news_items', JSON.stringify(newsItems));
    }
  }, [newsItems]);

  useEffect(() => {
    if (briefing) {
      localStorage.setItem('aegis_weekly_briefing', JSON.stringify(briefing));
    }
  }, [briefing]);

  useEffect(() => {
    if (reelScripts.length > 0) {
      localStorage.setItem('aegis_reel_scripts', JSON.stringify(reelScripts));
    }
  }, [reelScripts]);

  // Initial load: Fetch news, briefing, and daily reel scripts if not present
  useEffect(() => {
    if (newsItems.length === 0) {
      handleTriggerScan();
    }
    if (!briefing) {
      handleGenerateWeeklyBriefing();
    }
    if (reelScripts.length === 0) {
      handleGenerateReelsBatch();
    }
  }, []);

  // Daily Scan Trigger
  const handleTriggerScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/agent/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      const data = await res.json();
      if (data.items) {
        // Keep user votes and bookmarks for existing items
        setNewsItems((prev) => {
          const voteMap = new Map(prev.map(p => [p.id, { vote: p.userVote, bookmarked: p.isBookmarked }]));
          return data.items.map((item: NewsItem) => {
            const existing = voteMap.get(item.id);
            return {
              ...item,
              userVote: existing?.vote || item.userVote || 'neutral',
              isBookmarked: existing?.bookmarked ?? item.isBookmarked ?? false,
            };
          });
        });
        if (data.agentThoughtTrace) {
          setAgentThoughtTrace(data.agentThoughtTrace);
        }
        showToast('Daily Scan Completed', `Discovered and filtered ${data.items.length} priority signals based on your preferences.`);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Weekly Briefing Generation
  const handleGenerateWeeklyBriefing = async () => {
    setIsGeneratingBriefing(true);
    try {
      const res = await fetch('/api/agent/weekly-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences, recentArticles: newsItems }),
      });
      const data = await res.json();
      if (data.briefing) {
        setBriefing(data.briefing);
      }
    } catch (err) {
      console.error('Weekly briefing error:', err);
    } finally {
      setIsGeneratingBriefing(false);
    }
  };

  // Instagram Reels Script Generation
  const handleGenerateReelsBatch = async (customTopic?: string, pillar?: string) => {
    setIsGeneratingReels(true);
    try {
      const res = await fetch('/api/reels/generate-scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customTopic,
          targetPillar: pillar,
          count: 8,
        }),
      });
      const data = await res.json();
      if (data.scripts) {
        setReelScripts(data.scripts);
        showToast('Daily Reel Scripts Ready', `Generated ${data.scripts.length} viral video scripts under 70 seconds.`);
      }
    } catch (err) {
      console.error('Reels generation error:', err);
    } finally {
      setIsGeneratingReels(false);
    }
  };

  // Toggle "Best to Record" pick
  const handleToggleBestPick = (scriptId: string) => {
    setReelScripts(prev => prev.map(s => {
      if (s.id === scriptId) {
        const nextPick = !s.isBestPick;
        return {
          ...s,
          isBestPick: nextPick,
          status: nextPick ? 'selected' : 'ready',
        };
      }
      return s;
    }));
  };

  // Update script status
  const handleUpdateScriptStatus = (scriptId: string, status: 'ready' | 'selected' | 'recorded') => {
    setReelScripts(prev => prev.map(s => s.id === scriptId ? { ...s, status } : s));
  };

  // Mark as Recorded from Teleprompter
  const handleMarkRecorded = (scriptId: string) => {
    setReelScripts(prev => prev.map(s => s.id === scriptId ? { ...s, status: 'recorded' } : s));
    showToast('Reel Marked as Recorded', 'Nice job! The script has been archived as completed.');
  };

  // Preference learning on user vote (up/down)
  const handleVote = async (item: NewsItem, vote: 'up' | 'down') => {
    const isTogglingOff = item.userVote === vote;
    const finalVote = isTogglingOff ? 'neutral' : vote;

    // Optimistically update UI
    setNewsItems(prev => prev.map(p => p.id === item.id ? { ...p, userVote: finalVote } : p));

    if (finalVote === 'neutral') return;

    try {
      const res = await fetch('/api/agent/learn-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPreferences: preferences,
          feedbackAction: finalVote === 'up' ? 'upvoted' : 'downvoted',
          itemTitle: item.title,
          itemCategory: item.category,
        }),
      });

      const data = await res.json();
      if (data.result) {
        const { updatedWeights, newLearnedInsight, calibrationDelta } = data.result;

        setPreferences(prev => ({
          ...prev,
          weights: updatedWeights || prev.weights,
          learnedInsights: newLearnedInsight
            ? [newLearnedInsight, ...prev.learnedInsights.slice(0, 4)]
            : prev.learnedInsights,
          learningLog: [
            {
              id: `log-${Date.now()}`,
              timestamp: 'Just now',
              action: finalVote === 'up' ? 'upvoted' : 'downvoted',
              targetTitle: item.title,
              delta: calibrationDelta || 'Calibrated',
              reasoning: newLearnedInsight || 'Weight adjusted based on feedback.',
            },
            ...prev.learningLog.slice(0, 10),
          ],
          interactionCount: prev.interactionCount + 1,
          lastLearnedDate: 'Just now',
        }));

        showToast('Agent Learned Preference', `${calibrationDelta}: ${newLearnedInsight}`);
      }
    } catch (err) {
      console.error('Learning error:', err);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (item: NewsItem) => {
    const updatedBookmark = !item.isBookmarked;
    setNewsItems(prev => prev.map(p => p.id === item.id ? { ...p, isBookmarked: updatedBookmark } : p));

    if (updatedBookmark) {
      // Trigger subtle positive learning feedback for bookmarked item
      fetch('/api/agent/learn-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPreferences: preferences,
          feedbackAction: 'bookmarked',
          itemTitle: item.title,
          itemCategory: item.category,
        }),
      }).then(res => res.json()).then(data => {
        if (data.result) {
          const { updatedWeights, newLearnedInsight, calibrationDelta } = data.result;
          setPreferences(prev => ({
            ...prev,
            weights: updatedWeights || prev.weights,
            learnedInsights: newLearnedInsight ? [newLearnedInsight, ...prev.learnedInsights.slice(0, 4)] : prev.learnedInsights,
            learningLog: [
              {
                id: `log-${Date.now()}`,
                timestamp: 'Just now',
                action: 'bookmarked',
                targetTitle: item.title,
                delta: calibrationDelta || '+2% Weight',
                reasoning: newLearnedInsight || 'Bookmarked item prioritized.',
              },
              ...prev.learningLog.slice(0, 10),
            ],
            interactionCount: prev.interactionCount + 1,
            lastLearnedDate: 'Just now',
          }));
        }
      }).catch(() => {});
      showToast('Saved to Intelligence Briefcase', 'Article bookmarked and prioritized in weekly synthesis.');
    }
  };

  // Inspect deep breakdown
  const handleInspectItem = async (item: NewsItem) => {
    setInspectItem(item);
    setDeepBreakdown(null);
    setIsInspecting(true);

    try {
      const res = await fetch('/api/agent/deep-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const data = await res.json();
      if (data.breakdown) {
        setDeepBreakdown(data.breakdown);
      }
    } catch (err) {
      console.error('Deep breakdown error:', err);
    } finally {
      setIsInspecting(false);
    }
  };

  // Custom instruction coaching
  const handleTeachAgent = async (note: string) => {
    setIsTeaching(true);
    try {
      const res = await fetch('/api/agent/learn-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPreferences: preferences,
          feedbackAction: 'note_added',
          customNote: note,
        }),
      });
      const data = await res.json();
      if (data.result) {
        const { updatedWeights, newLearnedInsight, recommendedKeywordsToAdd, calibrationDelta } = data.result;

        setPreferences(prev => ({
          ...prev,
          weights: updatedWeights || prev.weights,
          focusKeywords: Array.from(new Set([...(recommendedKeywordsToAdd || []), ...prev.focusKeywords])),
          learnedInsights: newLearnedInsight ? [newLearnedInsight, ...prev.learnedInsights.slice(0, 4)] : prev.learnedInsights,
          learningLog: [
            {
              id: `log-${Date.now()}`,
              timestamp: 'Just now',
              action: 'coached',
              targetTitle: `Directive: "${note.slice(0, 36)}..."`,
              delta: calibrationDelta || 'Calibrated',
              reasoning: newLearnedInsight || 'Recalibrated via natural language coaching.',
            },
            ...prev.learningLog.slice(0, 10),
          ],
          interactionCount: prev.interactionCount + 1,
          lastLearnedDate: 'Just now',
        }));

        showToast('Cognitive Profile Updated', newLearnedInsight || 'Preferences re-aligned with your instruction.');
      }
    } finally {
      setIsTeaching(false);
    }
  };

  // Weight updates from sliders
  const handleUpdateWeights = (newWeights: UserPreferences['weights']) => {
    setPreferences(prev => ({
      ...prev,
      weights: newWeights,
      lastLearnedDate: 'Just now',
    }));
  };

  const handleAddKeyword = (kw: string) => {
    if (!preferences.focusKeywords.includes(kw)) {
      setPreferences(prev => ({
        ...prev,
        focusKeywords: [kw, ...prev.focusKeywords],
      }));
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setPreferences(prev => ({
      ...prev,
      focusKeywords: prev.focusKeywords.filter(k => k !== kw),
    }));
  };

  const bookmarkedItems = newsItems.filter(item => item.isBookmarked);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isScanning={isScanning}
        onTriggerScan={handleTriggerScan}
        savedCount={bookmarkedItems.length}
      />

      {/* Persistent Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-start gap-3 max-w-md p-4 rounded-xl border border-cyan-500/40 bg-slate-900/95 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white font-mono">{toastMessage.title}</div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1">
        {/* Radar View */}
        {activeTab === 'radar' && (
          <div>
            <PillarSpotlight
              preferences={preferences}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenPreferences={() => setActiveTab('profile')}
            />
            <DailyRadar
              newsItems={newsItems}
              selectedCategory={selectedCategory}
              onVote={handleVote}
              onToggleBookmark={handleToggleBookmark}
              onInspectItem={handleInspectItem}
              isScanning={isScanning}
              agentThoughtTrace={agentThoughtTrace}
            />
          </div>
        )}

        {/* Weekly Briefing Dossier */}
        {activeTab === 'briefing' && (
          <WeeklyBriefingView
            briefing={briefing}
            isLoading={isGeneratingBriefing}
            onRegenerate={handleGenerateWeeklyBriefing}
          />
        )}

        {/* Learned Preferences & Tuning View */}
        {activeTab === 'profile' && (
          <LearnedProfileView
            preferences={preferences}
            onUpdateWeights={handleUpdateWeights}
            onAddKeyword={handleAddKeyword}
            onRemoveKeyword={handleRemoveKeyword}
            onTeachAgent={handleTeachAgent}
            isTeaching={isTeaching}
          />
        )}

        {/* Reels Studio View */}
        {activeTab === 'reels' && (
          <ReelScriptsView
            scripts={reelScripts}
            onGenerateBatch={handleGenerateReelsBatch}
            isGenerating={isGeneratingReels}
            onToggleBestPick={handleToggleBestPick}
            onUpdateStatus={handleUpdateScriptStatus}
            onOpenTeleprompter={(script) => setTeleprompterScript(script)}
          />
        )}

        {/* Trend Matrix View */}
        {activeTab === 'trends' && (
          <TrendMatrixView />
        )}

        {/* Bookmarked / Saved Items View */}
        {activeTab === 'saved' && (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Curated Dossier</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Saved Research Signals ({bookmarkedItems.length})
                </h1>
              </div>

              <button
                onClick={() => setActiveTab('briefing')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Synthesize into Briefing</span>
              </button>
            </div>

            {bookmarkedItems.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <Bookmark className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-300">No saved articles yet</h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Click the &quot;Save&quot; bookmark button on any signal in the Daily Radar to preserve it for quick reference and weekly synthesis.
                </p>
                <button
                  onClick={() => setActiveTab('radar')}
                  className="mt-4 px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors"
                >
                  Explore Daily Radar
                </button>
              </div>
            ) : (
              <DailyRadar
                newsItems={bookmarkedItems}
                selectedCategory="all"
                onVote={handleVote}
                onToggleBookmark={handleToggleBookmark}
                onInspectItem={handleInspectItem}
                isScanning={false}
              />
            )}
          </div>
        )}
      </main>

      {/* Deep Technical Breakdown Modal Drawer */}
      <DeepBreakdownModal
        item={inspectItem}
        breakdown={deepBreakdown}
        isLoading={isInspecting}
        onClose={() => setInspectItem(null)}
      />

      {/* Teleprompter / Studio Recording Modal */}
      <TeleprompterModal
        script={teleprompterScript}
        onClose={() => setTeleprompterScript(null)}
        onMarkRecorded={handleMarkRecorded}
      />

      {/* Subtle Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Aegis Autonomous AI Research Agent · Daily Radar & Weekly Dossier</span>
          <span>Targeting: AI Coding Tools · Indian Tech Ecosystem · Open-Source Weights</span>
        </div>
      </footer>
    </div>
  );
}

export type CategoryType = 
  | 'ai_coding_tools'
  | 'indian_tech_startups'
  | 'open_source_models'
  | 'frontier_trends';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  keyTakeaways: string[];
  category: CategoryType;
  source: string;
  url: string;
  date: string;
  relevanceScore: number;
  readTime: string;
  tags: string[];
  userVote?: 'up' | 'down' | 'neutral';
  isBookmarked?: boolean;
  technicalImpact: string;
  entitiesMentioned: string[];
}

export interface UserPreferences {
  weights: {
    ai_coding_tools: number;
    indian_tech_startups: number;
    open_source_models: number;
    frontier_trends: number;
  };
  focusKeywords: string[];
  excludedKeywords: string[];
  learnedInsights: string[];
  learningLog: Array<{
    id: string;
    timestamp: string;
    action: string;
    targetTitle: string;
    delta: string;
    reasoning: string;
  }>;
  interactionCount: number;
  lastLearnedDate: string;
}

export interface WeeklyBriefing {
  id: string;
  title: string;
  dateRange: string;
  executiveSummary: string;
  keyThemes: Array<{
    theme: string;
    description: string;
    relevance: string;
  }>;
  codingToolsSection: {
    title: string;
    highlights: string[];
    benchmarkShift: string;
    toolsToWatch: string[];
  };
  indianStartupsSection: {
    title: string;
    highlights: string[];
    fundingAndLaunches: string;
    ecosystemInsight: string;
  };
  openSourceSection: {
    title: string;
    highlights: string[];
    modelBreakdown: string;
    weightsLicenseNote: string;
  };
  strategicRecommendations: string[];
}

export interface DeepBreakdown {
  executiveVerdict: string;
  architectureAndMechanics: string[];
  developerWorkflowImpact: string[];
  ecosystemCounterpoints: string[];
  recommendedAction: string;
}

export type ScriptAngle = 
  | 'mindblowing_fact'
  | 'developer_speed'
  | 'indian_startup'
  | 'open_source_rebellion'
  | 'future_shift';

export interface ReelScript {
  id: string;
  title: string;
  angle: ScriptAngle;
  category: CategoryType | 'tech_facts';
  hook: string;
  body: string;
  cta: string;
  wordCount: number;
  estimatedDurationSec: number;
  isBestPick?: boolean;
  status: 'ready' | 'selected' | 'recorded';
  visualBroll: string[];
  onScreenCaptions: string[];
  relatedNewsTitle?: string;
  keyFactHighlight: string;
}


export interface OptimizedContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  body: string;
  faq: { q: string; a: string }[];
  wordCount?: number;
  readingTime?: number;
}

export interface SemanticKeyword {
  keyword: string;
  relevance: 'High' | 'Medium' | 'Low';
  searchVolume?: number;
  difficulty?: number;
}

export interface SearchIntent {
  primaryIntent: 'Informational' | 'Transactional' | 'Navigational' | 'Commercial';
  intentScores: {
    informational: number;
    transactional: number;
    navigational: number;
    commercial: number;
  };
  recommendations: string[];
  confidence: number;
}

export interface ContentGap {
  topic: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  estimatedValue: string;
}

export interface TopicalAuthorityTopic {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  suggestedKeywords: string[];
  contentType: string;
  targetAudience: string;
}

export interface CompetitorContentAnalysis {
  domain: string;
  contentScore: number;
  wordCount: number;
  headings: number;
  images: number;
  strengths: string[];
  weaknesses: string[];
  uniqueAngles: string[];
}

export interface TechnicalSEOResult {
  mobileFriendly: boolean;
  pageSpeed: string;
  httpsEnabled: boolean;
  structuredData: boolean;
  issues: string[];
  warnings: string[];
  recommendations: {
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    effort: 'Low' | 'Medium' | 'High';
    impact: string;
  }[];
  score: number;
}

export interface AIInsights {
  keyOpportunities: string[];
  contentStrategy: string;
  quickWins: { title: string; action: string; impact: string }[];
  predictedImpact: {
    trafficIncrease: string;
    rankingImprovement: string;
    engagementBoost: string;
    timeframe: string;
  };
  competitiveAdvantage: string[];
  longTermStrategy: string[];
}

export interface SERPResult {
  title: string;
  link: string;
  desc: string;
  favicon?: string;
  position?: number;
  contentLength?: number;
  hasSchema?: boolean;
}

export interface ContentScore {
  overall: number;
  breakdown: {
    readability: number;
    seoOptimization: number;
    keywordUsage: number;
    contentDepth: number;
    technicalSEO: number;
    userEngagement: number;
  };
  grade: string;
  comparison: {
    vsCompetitors: number;
    vsIndustryAvg: number;
  };
}

export interface AnalysisHistory {
  id: string;
  timestamp: Date;
  content: OptimizedContent;
  score: ContentScore;
  keywords: string[];
}

export interface KeywordResearch {
  primary: {
    keyword: string;
    volume: string;
    difficulty: string;
    opportunity: string;
  };
  related: Array<{
    keyword: string;
    relevance: number;
    difficulty: string;
    volume: string;
  }>;
  longTail: string[];
  questions: string[];
  trends: string[];
  clusters: Array<{
    theme: string;
    keywords: string[];
  }>;
}

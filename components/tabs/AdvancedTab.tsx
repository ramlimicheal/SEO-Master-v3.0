import React from 'react';
import { motion } from 'framer-motion';
import { extractDomain } from '../../utils/helpers';
import type { SERPResult, CompetitorContentAnalysis, SemanticKeyword, SearchIntent, ContentGap, TopicalAuthorityTopic, AIInsights, TechnicalSEOResult, OptimizedContent } from '../../types';
import { Search, Loader2, RefreshCw, Activity, ExternalLink, CheckCircle2, AlertCircle, Target, Eye, Package, Layers, Brain, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface AdvancedTabProps {
  competitors: SERPResult[];
  selectedCompetitors: string[];
  setSelectedCompetitors: (value: string[]) => void;
  loadingCompetitors: boolean;
  handleFetchSERP: () => void;
  handleAnalyzeCompetitors: () => void;
  competitorAnalysis: CompetitorContentAnalysis[];
  loadingSemantic: boolean;
  handleSemanticKeywords: () => void;
  loadingIntent: boolean;
  handleSearchIntent: () => void;
  optimized: OptimizedContent | null;
  loadingGaps: boolean;
  handleContentGaps: () => void;
  loadingAuthority: boolean;
  handleTopicalAuthority: () => void;
  semanticKeywords: SemanticKeyword[];
  searchIntent: SearchIntent | null;
  contentGaps: ContentGap[];
  topicalAuthority: TopicalAuthorityTopic[];
  aiInsights: AIInsights | null;
  technicalSEO: TechnicalSEOResult | null;
  loadingInsights: boolean;
  handleAIInsights: () => void;
  loadingSupercharge: boolean;
  handleSupercharge: () => void;
}

const AdvancedTab: React.FC<AdvancedTabProps> = (props) => {
  const {
    competitors, selectedCompetitors, setSelectedCompetitors, loadingCompetitors, handleFetchSERP,
    handleAnalyzeCompetitors, competitorAnalysis, loadingSemantic, handleSemanticKeywords,
    loadingIntent, handleSearchIntent, optimized, loadingGaps, handleContentGaps,
    loadingAuthority, handleTopicalAuthority, semanticKeywords, searchIntent, contentGaps,
    topicalAuthority, aiInsights, technicalSEO, loadingInsights, handleAIInsights,
    loadingSupercharge, handleSupercharge
  } = props;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-sky-400" />
            <h3 className="text-2xl font-bold">SERP Analysis</h3>
          </div>
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleFetchSERP} disabled={loadingCompetitors}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {loadingCompetitors && competitors.length === 0 ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Fetch SERP
            </motion.button>
            {selectedCompetitors.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleAnalyzeCompetitors} disabled={loadingCompetitors}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {loadingCompetitors && competitorAnalysis.length === 0 ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                Analyze ({selectedCompetitors.length})
              </motion.button>
            )}
          </div>
        </div>

        {competitors.length > 0 && (
          <div className="space-y-3">
            {competitors.map((comp, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedCompetitors.includes(comp.link)
                    ? 'bg-sky-900/30 border-sky-500/50'
                    : 'bg-neutral-950/50 border-neutral-700 hover:border-neutral-600'
                }`}
                onClick={() => {
                  setSelectedCompetitors(
                    selectedCompetitors.includes(comp.link)
                      ? selectedCompetitors.filter(c => c !== comp.link)
                      : [...selectedCompetitors, comp.link]
                  );
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-neutral-800 rounded-lg text-neutral-400 font-semibold text-sm">
                  #{i + 1}
                </div>
                {comp.favicon && <img src={comp.favicon} alt="" className="w-6 h-6 rounded" />}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate text-neutral-200">{comp.title}</h4>
                  <p className="text-xs text-neutral-500 truncate">{extractDomain(comp.link)}</p>
                </div>
                <a
                  href={comp.link} target="_blank" rel="noopener noreferrer"
                  className="p-2 hover:bg-neutral-700 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {competitorAnalysis.length > 0 && (
        <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Competitor Content Analysis</h3>
          <div className="grid gap-4">
            {competitorAnalysis.map((comp, i) => (
              <div key={i} className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-amber-400">{comp.domain}</h4>
                  <div className="text-2xl font-bold text-emerald-400">{comp.contentScore}/100</div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-neutral-900/50 rounded-lg">
                    <div className="text-xl font-bold text-neutral-200">{comp.wordCount}</div>
                    <div className="text-xs text-neutral-400">Words</div>
                  </div>
                  <div className="text-center p-3 bg-neutral-900/50 rounded-lg">
                    <div className="text-xl font-bold text-neutral-200">{comp.headings}</div>
                    <div className="text-xs text-neutral-400">Headings</div>
                  </div>
                  <div className="text-center p-3 bg-neutral-900/50 rounded-lg">
                    <div className="text-xl font-bold text-neutral-200">{comp.images}</div>
                    <div className="text-xs text-neutral-400">Images</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {comp.strengths?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-emerald-400 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        {comp.strengths.map((s, j) => (
                          <li key={j} className="text-sm text-neutral-300 flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {comp.weaknesses?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-red-400 mb-2">Weaknesses</h5>
                      <ul className="space-y-1">
                        {comp.weaknesses.map((w, j) => (
                          <li key={j} className="text-sm text-neutral-300 flex items-start gap-2">
                            <AlertCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSemanticKeywords} disabled={loadingSemantic} className="p-6 bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all flex flex-col justify-between items-start">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Target className="w-6 h-6 text-purple-400" />
                      <h4 className="font-semibold">Semantic Keywords</h4>
                  </div>
                  <p className="text-xs text-neutral-400 text-left">Find related LSI keywords.</p>
              </div>
              {loadingSemantic && <Loader2 className="w-5 h-5 animate-spin text-purple-400 mt-2 self-end" />}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearchIntent} disabled={loadingIntent || !optimized} className="p-6 bg-gradient-to-br from-sky-900/50 to-sky-800/50 border border-sky-500/30 rounded-xl hover:border-sky-500/50 transition-all disabled:opacity-50 flex flex-col justify-between items-start">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-6 h-6 text-sky-400" />
                      <h4 className="font-semibold">Search Intent</h4>
                  </div>
                  <p className="text-xs text-neutral-400 text-left">Analyze user search intent.</p>
              </div>
              {loadingIntent && <Loader2 className="w-5 h-5 animate-spin text-sky-400 mt-2 self-end" />}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleContentGaps} disabled={loadingGaps || competitorAnalysis.length === 0} className="p-6 bg-gradient-to-br from-amber-900/50 to-amber-800/50 border border-amber-500/30 rounded-xl hover:border-amber-500/50 transition-all disabled:opacity-50 flex flex-col justify-between items-start">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Package className="w-6 h-6 text-amber-400" />
                      <h4 className="font-semibold">Content Gaps</h4>
                  </div>
                  <p className="text-xs text-neutral-400 text-left">Find gaps vs competitors.</p>
              </div>
              {loadingGaps && <Loader2 className="w-5 h-5 animate-spin text-amber-400 mt-2 self-end" />}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleTopicalAuthority} disabled={loadingAuthority || !optimized} className="p-6 bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border border-emerald-500/30 rounded-xl hover:border-emerald-500/50 transition-all disabled:opacity-50 flex flex-col justify-between items-start">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Layers className="w-6 h-6 text-emerald-400" />
                      <h4 className="font-semibold">Topical Authority</h4>
                  </div>
                  <p className="text-xs text-neutral-400 text-left">Build a topic map.</p>
              </div>
              {loadingAuthority && <Loader2 className="w-5 h-5 animate-spin text-emerald-400 mt-2 self-end" />}
          </motion.button>
      </div>

       {semanticKeywords.length > 0 && (
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Semantic Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {semanticKeywords.map((kw, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    kw.relevance === 'High'
                      ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-500/30'
                      : kw.relevance === 'Medium'
                      ? 'bg-amber-900/50 text-amber-300 border border-amber-500/30'
                      : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  }`}
                >
                  {kw.keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      {/* ... other results rendering ... */}
       <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold">AI Strategic Insights</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleAIInsights} disabled={loadingInsights || !optimized}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loadingInsights ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Insights</>
            )}
          </motion.button>
        </div>

        {aiInsights && (
          <div className="space-y-6">
            {aiInsights.keyOpportunities?.length > 0 && (
              <div className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 border border-purple-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Key Opportunities</h4>
                <ul className="space-y-2">
                  {aiInsights.keyOpportunities.map((opp, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-200"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" /><span>{opp}</span></li>
                  ))}
                </ul>
              </div>
            )}
            {aiInsights.contentStrategy && (
              <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-indigo-400 mb-3 flex items-center gap-2"><Target className="w-5 h-5" /> Recommended Content Strategy</h4>
                <p className="text-neutral-200">{aiInsights.contentStrategy}</p>
              </div>
            )}
            {aiInsights.quickWins?.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2"><Zap className="w-5 h-5" /> Quick Wins</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {aiInsights.quickWins.map((win, i) => (
                    <div key={i} className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-3">
                      <div className="font-semibold text-sm text-emerald-300 mb-1">{win.title}</div>
                      <div className="text-xs text-neutral-300 mb-2">{win.action}</div>
                      {win.impact && <div className="text-xs text-emerald-400">Impact: {win.impact}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {aiInsights.predictedImpact && (
              <div className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Predicted Impact</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-400">{aiInsights.predictedImpact.trafficIncrease}</div>
                    <div className="text-sm text-neutral-400">Traffic Increase</div>
                  </div>
                   <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400">{aiInsights.predictedImpact.rankingImprovement}</div>
                    <div className="text-sm text-neutral-400">Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{aiInsights.predictedImpact.engagementBoost}</div>
                    <div className="text-sm text-neutral-400">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400">{aiInsights.predictedImpact.timeframe}</div>
                    <div className="text-sm text-neutral-400">Timeframe</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {aiInsights && technicalSEO && (
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSupercharge} disabled={loadingSupercharge}
          className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 px-8 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
        >
          {loadingSupercharge ? (
            <><Loader2 className="w-6 h-6 animate-spin" /> Supercharging Content...</>
          ) : (
            <><Zap className="w-6 h-6" /> 🚀 SUPERCHARGE CONTENT 🚀 <Zap className="w-6 h-6" /></>
          )}
        </motion.button>
      )}
    </div>
  );
}

export default AdvancedTab;

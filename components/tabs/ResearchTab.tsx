import React from 'react';
import { motion } from 'framer-motion';
import type { KeywordResearch } from '../../types';
import { Search, Loader2, TrendingUp } from 'lucide-react';

interface ResearchTabProps {
  keywordResearch: KeywordResearch | null;
  loadingKeywordResearch: boolean;
  primaryKeyword: string;
  handleKeywordResearch: () => void;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ keywordResearch, loadingKeywordResearch, primaryKeyword, handleKeywordResearch }) => {
  return (
    <div className="space-y-6">
      {keywordResearch ? (
        <>
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Primary Keyword Analysis</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl">
                <div className="text-sm text-neutral-400 mb-2">Keyword</div>
                <div className="text-xl font-bold text-purple-300">{keywordResearch.primary.keyword}</div>
              </div>
              <div className="text-center p-6 bg-neutral-950/50 border border-neutral-700 rounded-xl">
                <div className="text-sm text-neutral-400 mb-2">Search Volume</div>
                <div className="text-xl font-bold text-sky-400">{keywordResearch.primary.volume}</div>
              </div>
              <div className="text-center p-6 bg-neutral-950/50 border border-neutral-700 rounded-xl">
                <div className="text-sm text-neutral-400 mb-2">Difficulty</div>
                <div className="text-xl font-bold text-amber-400">{keywordResearch.primary.difficulty}</div>
              </div>
              <div className="text-center p-6 bg-neutral-950/50 border border-neutral-700 rounded-xl">
                <div className="text-sm text-neutral-400 mb-2">Opportunity</div>
                <div className="text-xl font-bold text-emerald-400">{keywordResearch.primary.opportunity}</div>
              </div>
            </div>
          </div>

          {keywordResearch.related?.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Related Keywords</h3>
              <div className="grid gap-3">
                {keywordResearch.related.map((kw, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-950/50 border border-neutral-700 rounded-xl hover:border-neutral-600 transition-all">
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-200">{kw.keyword}</div>
                      <div className="text-xs text-neutral-500">Relevance: {Math.round(kw.relevance * 100)}%</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-neutral-400 text-xs">Volume</div>
                        <div className="font-semibold text-sky-400">{kw.volume}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-neutral-400 text-xs">Difficulty</div>
                        <div className="font-semibold text-amber-400">{kw.difficulty}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {keywordResearch.longTail?.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Long-Tail Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywordResearch.longTail.map((kw, i) => (
                  <span key={i} className="px-3 py-2 bg-neutral-950/50 border border-neutral-700 rounded-lg text-sm hover:border-amber-500/50 transition-all cursor-pointer">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {keywordResearch.questions?.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">People Also Ask</h3>
              <div className="space-y-2">
                {keywordResearch.questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-neutral-950/50 border border-neutral-700 rounded-xl">
                    <div className="w-6 h-6 bg-amber-900/30 border border-amber-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-amber-400">Q</span>
                    </div>
                    <p className="text-neutral-200">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {keywordResearch.clusters?.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Keyword Clusters</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {keywordResearch.clusters.map((cluster, i) => (
                  <div key={i} className="bg-neutral-950/50 border border-purple-500/30 rounded-xl p-5">
                    <h4 className="font-semibold text-purple-400 mb-3">{cluster.theme}</h4>
                    <div className="flex flex-wrap gap-1">
                      {cluster.keywords.map((kw, j) => (
                        <span key={j} className="px-2 py-1 bg-neutral-800 rounded text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {keywordResearch.trends?.length > 0 && (
            <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Trending Topics</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {keywordResearch.trends.map((trend, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-neutral-200">{trend}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-12 text-center">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-50 text-neutral-400" />
          <p className="text-neutral-400 mb-6">No keyword research data yet. Enter a primary keyword and run the research.</p>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleKeywordResearch}
            disabled={loadingKeywordResearch || !primaryKeyword}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 mx-auto"
          >
            {loadingKeywordResearch ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Researching...</>
            ) : (
              <><Search className="w-5 h-5" /> Start Keyword Research</>
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ResearchTab;

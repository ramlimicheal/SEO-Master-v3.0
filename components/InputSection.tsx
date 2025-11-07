import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Loader2, Search, BarChart3 } from 'lucide-react';
import type { OptimizedContent } from '../types';

interface InputSectionProps {
  rawContent: string;
  setRawContent: (value: string) => void;
  primaryKeyword: string;
  setPrimaryKeyword: (value: string) => void;
  secondaryKeywords: string;
  setSecondaryKeywords: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  targetUrl: string;
  setTargetUrl: (value: string) => void;
  handleOptimize: () => void;
  handleKeywordResearch: () => void;
  handleCalculateScore: () => void;
  loading: boolean;
  loadingKeywordResearch: boolean;
  loadingScore: boolean;
  loadingStage: string;
  optimized: OptimizedContent | null;
}

const InputSection: React.FC<InputSectionProps> = ({
  rawContent, setRawContent, primaryKeyword, setPrimaryKeyword, secondaryKeywords, setSecondaryKeywords,
  tone, setTone, length, setLength, targetUrl, setTargetUrl,
  handleOptimize, handleKeywordResearch, handleCalculateScore,
  loading, loadingKeywordResearch, loadingScore, loadingStage, optimized
}) => {
  return (
    <section className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold">Content Input</h2>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-300 mb-2">
            Raw Content <span className="text-red-400">*</span>
          </label>
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full h-40 bg-neutral-950/50 border border-neutral-700 rounded-xl p-4 text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-2">
              Primary Keyword <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              placeholder="e.g., best running shoes 2024"
              className="w-full bg-neutral-950/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-2">
              Secondary Keywords
            </label>
            <input
              type="text"
              value={secondaryKeywords}
              onChange={(e) => setSecondaryKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="w-full bg-neutral-950/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-neutral-950/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            >
              <option>Professional</option>
              <option>Conversational</option>
              <option>Academic</option>
              <option>Persuasive</option>
              <option>Informative</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-2">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-neutral-950/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            >
              <option>Short (500-800 words)</option>
              <option>Medium (800-1200 words)</option>
              <option>Long (1200-1800 words)</option>
              <option>Comprehensive (1800+ words)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-300 mb-2">Target URL</label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full bg-neutral-950/50 border border-neutral-700 rounded-xl p-3 text-neutral-200 placeholder-neutral-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOptimize}
            disabled={loading || !rawContent || !primaryKeyword}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Optimize Content
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleKeywordResearch}
            disabled={loadingKeywordResearch || !primaryKeyword}
            className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loadingKeywordResearch ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Keyword Research
          </motion.button>

          {optimized && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculateScore}
              disabled={loadingScore}
              className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loadingScore ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <BarChart3 className="w-5 h-5" />
              )}
              Calculate Score
            </motion.button>
          )}
        </div>

        {loadingStage && (
          <div className="flex items-center gap-3 p-4 bg-amber-900/20 border border-amber-500/30 rounded-xl">
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            <span className="text-amber-300 font-medium">{loadingStage}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default InputSection;

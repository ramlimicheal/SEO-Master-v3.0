import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, FileText, Clock } from 'lucide-react';
import type { ContentScore, OptimizedContent } from '../../types';

interface OptimizeTabProps {
  contentScore: ContentScore | null;
  optimized: OptimizedContent;
  onCopy: (text: string) => void;
  onDownload: () => void;
}

const OptimizeTab: React.FC<OptimizeTabProps> = ({ contentScore, optimized, onCopy, onDownload }) => {
  return (
    <div className="space-y-6">
      {contentScore && (
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-emerald-300">Content Quality Score</h3>
            <div className="text-4xl font-bold text-emerald-400">{contentScore.grade}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-300">{contentScore.overall}</div>
              <div className="text-sm text-neutral-400">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-300">+{contentScore.comparison.vsCompetitors}%</div>
              <div className="text-sm text-neutral-400">vs Competitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">+{contentScore.comparison.vsIndustryAvg}%</div>
              <div className="text-sm text-neutral-400">vs Industry Avg</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(contentScore.breakdown).map(([key, value]) => (
              <div key={key} className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-3">
                <div className="text-lg font-bold text-emerald-400">{value}</div>
                <div className="text-xs text-neutral-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Optimized Content</h3>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onCopy(optimized.body)}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onDownload}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg"
            >
              <Download className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Meta Title</h4>
              <span className="text-xs text-neutral-500">{optimized.metaTitle.length} chars</span>
            </div>
            <div className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-neutral-200">
              {optimized.metaTitle}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Meta Description</h4>
              <span className="text-xs text-neutral-500">{optimized.metaDescription.length} chars</span>
            </div>
            <div className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-3 text-neutral-300 text-sm">
              {optimized.metaDescription}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">H1 Heading</h4>
            <h1 className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-4 text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              {optimized.h1}
            </h1>
          </div>
          {(optimized.wordCount || optimized.readingTime) && (
            <div className="flex gap-4">
              {optimized.wordCount && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{optimized.wordCount} words</span>
                </div>
              )}
              {optimized.readingTime && (
                <div className="flex items-center gap-2 text-neutral-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{optimized.readingTime} min read</span>
                </div>
              )}
            </div>
          )}
          <div>
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-2">Body Content</h4>
            <div
              className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-6 prose-custom max-w-none"
              dangerouslySetInnerHTML={{ __html: optimized.body }}
            />
          </div>
          {optimized.faq && optimized.faq.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">Frequently Asked Questions</h4>
              <div className="space-y-3">
                {optimized.faq.map((faq, i) => (
                  <div key={i} className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-4">
                    <h5 className="font-semibold text-amber-400 mb-2">{faq.q}</h5>
                    <p className="text-neutral-300 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizeTab;

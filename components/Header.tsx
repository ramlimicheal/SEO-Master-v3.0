import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download } from 'lucide-react';
import type { ContentScore, OptimizedContent } from '../types';

interface HeaderProps {
  contentScore: ContentScore | null;
  optimized: OptimizedContent | null;
  onDownload: () => void;
}

const Header: React.FC<HeaderProps> = ({ contentScore, optimized, onDownload }) => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                SEO Master v3.0
              </h1>
              <p className="text-xs text-neutral-400">World-Class AI-Powered SEO Suite</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {contentScore && (
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 border border-emerald-500/30 rounded-xl">
                <div className="text-xs text-emerald-400 mb-1">Content Score</div>
                <div className="text-2xl font-bold text-emerald-300">{contentScore.overall}<span className="text-sm text-neutral-400">/100</span></div>
              </div>
            )}
            {optimized && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownload}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

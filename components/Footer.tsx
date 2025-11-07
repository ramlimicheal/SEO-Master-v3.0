import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-xl mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              SEO Master v3.0
            </span>
          </div>
          <p className="text-neutral-400 text-sm mb-4">
            AI-Powered • World-Class • Enterprise-Grade SEO Optimization
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Content Optimization
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Competitor Analysis
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Technical Audit
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              AI Insights
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Keyword Research
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

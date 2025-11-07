import React from 'react';
import { motion } from 'framer-motion';
import type { TechnicalSEOResult, OptimizedContent } from '../../types';
import { Shield, Loader2, RefreshCw, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface TechnicalTabProps {
  technicalSEO: TechnicalSEOResult | null;
  loadingTechnical: boolean;
  optimized: OptimizedContent | null;
  handleTechnicalAudit: () => void;
}

const TechnicalTab: React.FC<TechnicalTabProps> = ({ technicalSEO, loadingTechnical, optimized, handleTechnicalAudit }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/40 border border-neutral-700/50 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-sky-400" />
            <h3 className="text-2xl font-bold">Technical SEO Audit</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleTechnicalAudit} disabled={loadingTechnical || !optimized}
            className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loadingTechnical ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Auditing...</>
            ) : (
              <><RefreshCw className="w-5 h-5" /> Run Audit</>
            )}
          </motion.button>
        </div>

        {technicalSEO ? (
          <div className="space-y-6">
            <div className="text-center p-8 bg-gradient-to-br from-sky-900/30 to-blue-900/30 border border-sky-500/30 rounded-xl">
              <div className="text-6xl font-bold text-sky-400 mb-2">{technicalSEO.score}</div>
              <div className="text-neutral-400">Technical SEO Score</div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">Mobile Friendly</span>
                  {technicalSEO.mobileFriendly ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                </div>
                <div className="text-2xl font-bold">{technicalSEO.mobileFriendly ? 'Yes' : 'No'}</div>
              </div>
              <div className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">Page Speed</span>
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400">{technicalSEO.pageSpeed}</div>
              </div>
              <div className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">HTTPS</span>
                  {technicalSEO.httpsEnabled ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                </div>
                <div className="text-2xl font-bold">{technicalSEO.httpsEnabled ? 'Enabled' : 'Missing'}</div>
              </div>
              <div className="bg-neutral-950/50 border border-neutral-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">Structured Data</span>
                  {technicalSEO.structuredData ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-amber-400" />}
                </div>
                <div className="text-2xl font-bold">{technicalSEO.structuredData ? 'Found' : 'Add'}</div>
              </div>
            </div>
            {technicalSEO.issues?.length > 0 && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Critical Issues ({technicalSEO.issues.length})
                </h4>
                <ul className="space-y-2">
                  {technicalSEO.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-200">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {technicalSEO.warnings?.length > 0 && (
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Warnings ({technicalSEO.warnings.length})
                </h4>
                <ul className="space-y-2">
                  {technicalSEO.warnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-200">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {technicalSEO.recommendations?.length > 0 && (
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Recommendations
                </h4>
                <ul className="space-y-3">
                  {technicalSEO.recommendations.map((rec, i) => (
                    <li key={i} className="bg-neutral-950/50 border border-neutral-700 rounded-lg p-4">
                      <div className="font-semibold text-emerald-300 mb-1">{rec.title}</div>
                      <div className="text-sm text-neutral-300 mb-2">{rec.description}</div>
                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className={`px-2 py-1 rounded ${
                          rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          rec.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>{rec.priority} Priority</span>
                        <span className="px-2 py-1 bg-neutral-800 rounded text-neutral-400">Effort: {rec.effort}</span>
                        {rec.impact && <span className="px-2 py-1 bg-emerald-900/30 rounded text-emerald-400">{rec.impact}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Run a technical audit to see detailed insights</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalTab;

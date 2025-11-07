import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { seoService } from './services/seoService';
import { downloadFile, faviconUrl, copyToClipboard } from './utils/helpers';
import type { 
  OptimizedContent, SemanticKeyword, SearchIntent, ContentGap, TopicalAuthorityTopic, 
  CompetitorContentAnalysis, TechnicalSEOResult, AIInsights, SERPResult, ContentScore, 
  AnalysisHistory, KeywordResearch 
} from './types';

import { 
  Sparkles, FileText, Download, CheckCircle2, AlertCircle, Info, Loader2,
  Search, BarChart3, Brain, Shield
} from 'lucide-react';

import NotificationToast from './components/NotificationToast';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsTabs from './components/ResultsTabs';
import OptimizeTab from './components/tabs/OptimizeTab';
import AdvancedTab from './components/tabs/AdvancedTab';
import TechnicalTab from './components/tabs/TechnicalTab';
import ResearchTab from './components/tabs/ResearchTab';
import Footer from './components/Footer';


export default function App() {
  // ========== STATE MANAGEMENT ==========
  const [rawContent, setRawContent] = useState('');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium (800-1200 words)');
  const [targetUrl, setTargetUrl] = useState('');
  
  // Analysis Results
  const [optimized, setOptimized] = useState<OptimizedContent | null>(null);
  const [semanticKeywords, setSemanticKeywords] = useState<SemanticKeyword[]>([]);
  const [searchIntent, setSearchIntent] = useState<SearchIntent | null>(null);
  const [contentGaps, setContentGaps] = useState<ContentGap[]>([]);
  const [topicalAuthority, setTopicalAuthority] = useState<TopicalAuthorityTopic[]>([]);
  const [competitors, setCompetitors] = useState<SERPResult[]>([]);
  const [competitorAnalysis, setCompetitorAnalysis] = useState<CompetitorContentAnalysis[]>([]);
  const [technicalSEO, setTechnicalSEO] = useState<TechnicalSEOResult | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsights | null>(null);
  const [contentScore, setContentScore] = useState<ContentScore | null>(null);
  const [keywordResearch, setKeywordResearch] = useState<KeywordResearch | null>(null);
  
  // Loading States
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [loadingSemantic, setLoadingSemantic] = useState(false);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [loadingGaps, setLoadingGaps] = useState(false);
  const [loadingAuthority, setLoadingAuthority] = useState(false);
  const [loadingCompetitors, setLoadingCompetitors] = useState(false);
  const [loadingTechnical, setLoadingTechnical] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loadingSupercharge, setLoadingSupercharge] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingKeywordResearch, setLoadingKeywordResearch] = useState(false);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'optimize' | 'advanced' | 'technical' | 'research'>('optimize');
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // ========== NOTIFICATION SYSTEM ==========
  const showNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // ========== MAIN HANDLERS ==========
  const handleFetchSERP = useCallback(async () => {
    if (!primaryKeyword.trim()) return;

    setLoadingCompetitors(true);
    try {
      const result = await seoService.fetchSERP(primaryKeyword);
      const withFavicons = result.items.map(item => ({
        ...item,
        favicon: faviconUrl(item.link),
      }));
      setCompetitors(withFavicons);
      showNotification('success', `Found ${withFavicons.length} competitors`);
    } catch (error: any) {
      console.error('SERP fetch error:', error);
      showNotification('error', 'Failed to fetch search results');
    } finally {
      setLoadingCompetitors(false);
    }
  }, [primaryKeyword, showNotification]);

  const handleOptimize = async () => {
    if (!rawContent.trim() || !primaryKeyword.trim()) {
      showNotification('error', 'Please provide content and primary keyword');
      return;
    }

    setLoading(true);
    setLoadingStage('Analyzing and optimizing content...');
    // Reset previous results
    setOptimized(null);
    setSemanticKeywords([]);
    setSearchIntent(null);
    setContentGaps([]);
    setTopicalAuthority([]);
    setCompetitors([]);
    setCompetitorAnalysis([]);
    setTechnicalSEO(null);
    setAIInsights(null);
    setContentScore(null);
    setKeywordResearch(null);
    setSelectedCompetitors([]);
    setActiveTab('optimize');

    try {
      const secondaries = secondaryKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const result = await seoService.rewriteContent(rawContent, primaryKeyword, secondaries, tone, length);
      
      setOptimized(result);
      
      const historyEntry: AnalysisHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        content: result,
        score: { overall: 0, breakdown: { readability: 0, seoOptimization: 0, keywordUsage: 0, contentDepth: 0, technicalSEO: 0, userEngagement: 0 }, grade: 'N/A', comparison: { vsCompetitors: 0, vsIndustryAvg: 0 } },
        keywords: [primaryKeyword, ...secondaries],
      };
      setAnalysisHistory(prev => [historyEntry, ...prev]);
      
      showNotification('success', 'Content optimized successfully!');
      
      handleFetchSERP();
    } catch (error: any) {
      console.error('Optimization error:', error);
      showNotification('error', error.message || 'Optimization failed');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  const handleAnalyzeCompetitors = async () => {
    if (selectedCompetitors.length === 0) {
      showNotification('error', 'Please select competitors to analyze');
      return;
    }

    setLoadingCompetitors(true);
    try {
      const result = await seoService.analyzeCompetitorContent(selectedCompetitors);
      setCompetitorAnalysis(result.analysis);
      showNotification('success', `Analyzed ${result.analysis.length} competitors`);
    } catch (error: any) {
      console.error('Competitor analysis error:', error);
      showNotification('error', 'Competitor analysis failed');
    } finally {
      setLoadingCompetitors(false);
    }
  };

  const handleSemanticKeywords = async () => {
    if (!primaryKeyword.trim()) {
      showNotification('error', 'Primary keyword required');
      return;
    }

    setLoadingSemantic(true);
    try {
      const secondaries = secondaryKeywords.split(',').map(k => k.trim()).filter(Boolean);
      const result = await seoService.analyzeSemanticKeywords(primaryKeyword, secondaries);
      setSemanticKeywords(result.semanticKeywords);
      showNotification('success', `Found ${result.semanticKeywords.length} semantic keywords`);
    } catch (error: any) {
      console.error('Semantic keywords error:', error);
      showNotification('error', 'Semantic analysis failed');
    } finally {
      setLoadingSemantic(false);
    }
  };

  const handleSearchIntent = async () => {
    if (!primaryKeyword.trim() || !optimized) {
      showNotification('error', 'Optimize content first');
      return;
    }

    setLoadingIntent(true);
    try {
      const result = await seoService.analyzeSearchIntent(primaryKeyword, optimized.body);
      setSearchIntent(result);
      showNotification('success', 'Search intent analyzed');
    } catch (error: any) {
      console.error('Search intent error:', error);
      showNotification('error', 'Intent analysis failed');
    } finally {
      setLoadingIntent(false);
    }
  };

  const handleContentGaps = async () => {
    if (!primaryKeyword.trim() || competitorAnalysis.length === 0) {
      showNotification('error', 'Analyze competitors first');
      return;
    }

    setLoadingGaps(true);
    try {
      const competitorContent = competitorAnalysis.map(c => 
        `${c.domain}: ${c.strengths.join(', ')}`
      );
      const result = await seoService.findContentGaps(primaryKeyword, competitorContent);
      setContentGaps(result.gaps);
      showNotification('success', `Found ${result.gaps.length} content gaps`);
    } catch (error: any) {
      console.error('Content gaps error:', error);
      showNotification('error', 'Gap analysis failed');
    } finally {
      setLoadingGaps(false);
    }
  };

  const handleTopicalAuthority = async () => {
    if (!primaryKeyword.trim() || !optimized) {
      showNotification('error', 'Optimize content first');
      return;
    }

    setLoadingAuthority(true);
    try {
      const result = await seoService.buildTopicalAuthority(primaryKeyword, optimized.body);
      setTopicalAuthority(result.topics);
      showNotification('success', `Generated ${result.topics.length} authority topics`);
    } catch (error: any) {
      console.error('Topical authority error:', error);
      showNotification('error', 'Authority mapping failed');
    } finally {
      setLoadingAuthority(false);
    }
  };

  const handleTechnicalAudit = async () => {
    if (!optimized) {
      showNotification('error', 'Optimize content first');
      return;
    }

    setLoadingTechnical(true);
    try {
      const result = await seoService.auditTechnicalSEO(optimized, targetUrl || 'https://example.com');
      setTechnicalSEO(result);
      showNotification('success', `Technical score: ${result.score}/100`);
    } catch (error: any) {
      console.error('Technical audit error:', error);
      showNotification('error', 'Technical audit failed');
    } finally {
      setLoadingTechnical(false);
    }
  };

  const handleAIInsights = async () => {
    if (!optimized) {
      showNotification('error', 'Optimize content first');
      return;
    }

    setLoadingInsights(true);
    try {
      const keywords = {
        primary: primaryKeyword,
        secondaries: secondaryKeywords.split(',').map(k => k.trim()).filter(Boolean),
      };
      const result = await seoService.generateAIInsights(optimized, competitors, keywords, contentGaps);
      setAIInsights(result);
      showNotification('success', 'AI insights generated');
    } catch (error: any) {
      console.error('AI insights error:', error);
      showNotification('error', 'Insights generation failed');
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleSupercharge = async () => {
    if (!optimized || !aiInsights || !technicalSEO) {
      showNotification('error', 'Run all analyses first');
      return;
    }

    setLoadingSupercharge(true);
    setLoadingStage('Supercharging content with all insights...');

    try {
      const result = await seoService.superchargeContent(
        optimized,
        aiInsights,
        contentGaps,
        technicalSEO,
        semanticKeywords
      );
      setOptimized(result);
      showNotification('success', 'Content supercharged! 🚀');
    } catch (error: any) {
      console.error('Supercharge error:', error);
      showNotification('error', 'Supercharge failed');
    } finally {
      setLoadingSupercharge(false);
      setLoadingStage('');
    }
  };

  const handleCalculateScore = async () => {
    if (!optimized) {
      showNotification('error', 'Optimize content first');
      return;
    }

    setLoadingScore(true);
    try {
      const result = await seoService.calculateContentScore(optimized, competitorAnalysis);
      setContentScore(result);
      showNotification('success', `Score: ${result.overall}/100 (${result.grade})`);
    } catch (error: any) {
      console.error('Score calculation error:', error);
      showNotification('error', 'Score calculation failed');
    } finally {
      setLoadingScore(false);
    }
  };

  const handleKeywordResearch = async () => {
    if (!primaryKeyword.trim()) {
      showNotification('error', 'Enter a seed keyword');
      return;
    }

    setLoadingKeywordResearch(true);
    try {
      const result = await seoService.comprehensiveKeywordResearch(primaryKeyword);
      setKeywordResearch(result);
      showNotification('success', 'Keyword research complete');
      setActiveTab('research');
    } catch (error: any) {
      console.error('Keyword research error:', error);
      showNotification('error', 'Keyword research failed');
    } finally {
      setLoadingKeywordResearch(false);
    }
  };

  const handleDownload = () => {
    if (!optimized) return;
    const content = `
# ${optimized.h1}

**Meta Title:** ${optimized.metaTitle}
**Meta Description:** ${optimized.metaDescription}
**Word Count:** ${optimized.wordCount || 'N/A'}
**Reading Time:** ${optimized.readingTime || 'N/A'} minutes

---

${optimized.body}

---

## Frequently Asked Questions

${optimized.faq.map(f => `### ${f.q}\n\n${f.a}\n`).join('\n')}

---

*Generated by SEO Master v3.0*
`;
    downloadFile(`seo-content-${Date.now()}.md`, content, 'text/markdown');
    showNotification('success', 'Content downloaded');
  };

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      showNotification('success', 'Copied to clipboard');
    } else {
      showNotification('error', 'Copy failed');
    }
  };
  
  // ========== RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <NotificationToast notification={notification} />
      <Header contentScore={contentScore} optimized={optimized} onDownload={handleDownload} />

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <InputSection
          rawContent={rawContent} setRawContent={setRawContent}
          primaryKeyword={primaryKeyword} setPrimaryKeyword={setPrimaryKeyword}
          secondaryKeywords={secondaryKeywords} setSecondaryKeywords={setSecondaryKeywords}
          tone={tone} setTone={setTone}
          length={length} setLength={setLength}
          targetUrl={targetUrl} setTargetUrl={setTargetUrl}
          handleOptimize={handleOptimize}
          handleKeywordResearch={handleKeywordResearch}
          handleCalculateScore={handleCalculateScore}
          loading={loading}
          loadingKeywordResearch={loadingKeywordResearch}
          loadingScore={loadingScore}
          loadingStage={loadingStage}
          optimized={optimized}
        />
        
        {optimized && (
          <>
            <ResultsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <AnimatePresence mode="wait">
              {activeTab === 'optimize' && (
                <motion.div
                  key="optimize"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <OptimizeTab 
                    contentScore={contentScore}
                    optimized={optimized}
                    onCopy={handleCopy}
                    onDownload={handleDownload}
                  />
                </motion.div>
              )}
               {activeTab === 'advanced' && (
                 <motion.div
                  key="advanced"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                 >
                   <AdvancedTab 
                    competitors={competitors}
                    selectedCompetitors={selectedCompetitors}
                    setSelectedCompetitors={setSelectedCompetitors}
                    loadingCompetitors={loadingCompetitors}
                    handleFetchSERP={handleFetchSERP}
                    handleAnalyzeCompetitors={handleAnalyzeCompetitors}
                    competitorAnalysis={competitorAnalysis}
                    loadingSemantic={loadingSemantic}
                    handleSemanticKeywords={handleSemanticKeywords}
                    loadingIntent={loadingIntent}
                    handleSearchIntent={handleSearchIntent}
                    optimized={optimized}
                    loadingGaps={loadingGaps}
                    handleContentGaps={handleContentGaps}
                    loadingAuthority={loadingAuthority}
                    handleTopicalAuthority={handleTopicalAuthority}
                    semanticKeywords={semanticKeywords}
                    searchIntent={searchIntent}
                    contentGaps={contentGaps}
                    topicalAuthority={topicalAuthority}
                    aiInsights={aiInsights}
                    technicalSEO={technicalSEO}
                    loadingInsights={loadingInsights}
                    handleAIInsights={handleAIInsights}
                    loadingSupercharge={loadingSupercharge}
                    handleSupercharge={handleSupercharge}
                   />
                 </motion.div>
               )}
               {activeTab === 'technical' && (
                 <motion.div
                  key="technical"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                 >
                   <TechnicalTab
                    technicalSEO={technicalSEO}
                    loadingTechnical={loadingTechnical}
                    optimized={optimized}
                    handleTechnicalAudit={handleTechnicalAudit}
                   />
                 </motion.div>
               )}
               {activeTab === 'research' && (
                 <motion.div
                  key="research"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                 >
                    <ResearchTab 
                      keywordResearch={keywordResearch}
                      loadingKeywordResearch={loadingKeywordResearch}
                      primaryKeyword={primaryKeyword}
                      handleKeywordResearch={handleKeywordResearch}
                    />
                 </motion.div>
               )}
            </AnimatePresence>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

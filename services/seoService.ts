import { GoogleGenAI, Type } from "@google/genai";
import {
  OptimizedContent,
  SemanticKeyword,
  SearchIntent,
  ContentGap,
  TopicalAuthorityTopic,
  CompetitorContentAnalysis,
  TechnicalSEOResult,
  AIInsights,
  SERPResult,
  ContentScore,
  KeywordResearch,
} from '../types';

const AI_CONFIG = {
  apiKey: process.env.API_KEY,
  models: {
    fast: 'gemini-2.5-flash',
    balanced: 'gemini-2.5-flash',
    advanced: 'gemini-2.5-pro',
  }
};

if (!AI_CONFIG.apiKey) {
  console.error('❌ API Key not found. Set API_KEY environment variable.');
}

const ai = new GoogleGenAI({ apiKey: AI_CONFIG.apiKey as string });

// Optimized Content Schema
const optimizedContentSchema = {
  type: Type.OBJECT,
  properties: {
    metaTitle: { type: Type.STRING },
    metaDescription: { type: Type.STRING },
    h1: { type: Type.STRING },
    body: { type: Type.STRING },
    faq: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          q: { type: Type.STRING },
          a: { type: Type.STRING },
        },
        required: ['q', 'a'],
      },
    },
    wordCount: { type: Type.NUMBER },
    readingTime: { type: Type.NUMBER },
  },
  required: ['metaTitle', 'metaDescription', 'h1', 'body', 'faq'],
};

// Advanced AI Service Class
class SEOAIService {
  private parseJSON<T,>(text: string): T {
    try {
      const cleaned = text.replace(/^```json\s*|```\s*$/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON Parse Error:', text);
      throw new Error('Invalid AI response format');
    }
  }

  async rewriteContent(
    raw: string,
    primary: string,
    secondaries: string[],
    tone: string,
    length: string
  ): Promise<OptimizedContent> {
    const prompt = `You are a world-class SEO expert and content strategist. Rewrite this content to perfection.

PRIMARY KEYWORD: "${primary}"
SECONDARY KEYWORDS: ${secondaries.join(', ')}
TONE: ${tone}
TARGET LENGTH: ${length}

ORIGINAL CONTENT:
${raw}

REQUIREMENTS:
1. Create an irresistible meta title (50-60 chars) with primary keyword
2. Write a compelling meta description (150-160 chars) that drives clicks
3. Craft a powerful H1 that hooks readers immediately
4. Rewrite body with:
   - Natural keyword integration (avoid stuffing)
   - Clear H2/H3 structure for scannability
   - Engaging introduction that addresses user intent
   - Comprehensive coverage with unique insights
   - Actionable takeaways and examples
   - Strong conclusion with CTA
5. Create 5 highly relevant FAQs based on "People Also Ask"

Format body as semantic HTML with proper headings, paragraphs, lists, and emphasis.
Calculate word count and reading time (250 words/min).`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: optimizedContentSchema,
      }
    });

    return this.parseJSON<OptimizedContent>(response.text);
  }
  
  async superchargeContent(
    original: OptimizedContent,
    insights: AIInsights,
    gaps: ContentGap[],
    techSeo: TechnicalSEOResult,
    semanticKeywords: SemanticKeyword[]
  ): Promise<OptimizedContent> {
    const prompt = `MISSION: Transform good content into EXCEPTIONAL content that dominates search results.

CURRENT CONTENT:
${JSON.stringify(original, null, 2)}

STRATEGIC INSIGHTS:
${JSON.stringify(insights, null, 2)}

CONTENT GAPS TO FILL:
${JSON.stringify(gaps, null, 2)}

TECHNICAL SEO FIXES:
${JSON.stringify(techSeo.recommendations, null, 2)}

SEMANTIC KEYWORDS TO INTEGRATE:
${semanticKeywords.map(k => k.keyword).join(', ')}

YOUR TASK:
1. IMPLEMENT all quick wins and strategic recommendations
2. ADD comprehensive sections covering identified content gaps
3. WEAVE IN semantic keywords naturally (no stuffing)
4. ENHANCE depth, authority, and user value
5. OPTIMIZE for featured snippets and rich results
6. IMPROVE readability and engagement
7. ADD more valuable FAQs addressing user questions

Return enhanced content in the same JSON structure with significantly improved quality.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: optimizedContentSchema,
      }
    });

    return this.parseJSON<OptimizedContent>(response.text);
  }

  async analyzeSemanticKeywords(primary: string, secondaries: string[]): Promise<{ semanticKeywords: SemanticKeyword[] }> {
    const prompt = `Generate LSI (Latent Semantic Indexing) and related keywords for:
PRIMARY: "${primary}"
SECONDARY: ${secondaries.join(', ')}

Include:
- Semantic variations and synonyms
- Related concepts and entities
- User intent variations
- Long-tail opportunities
- Question-based keywords

Return 15-20 high-value semantic keywords with relevance scoring.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.balanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            semanticKeywords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  relevance: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  searchVolume: { type: Type.NUMBER },
                  difficulty: { type: Type.NUMBER },
                },
                required: ['keyword', 'relevance']
              }
            }
          },
          required: ['semanticKeywords']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async analyzeSearchIntent(keyword: string, content: string): Promise<SearchIntent> {
    const prompt = `Deep search intent analysis for: "${keyword}"

CONTENT CONTEXT:
${content.substring(0, 500)}...

ANALYZE:
1. Primary user intent (Informational/Transactional/Navigational/Commercial)
2. Percentage breakdown of each intent type
3. User journey stage
4. Pain points and desires
5. Content alignment recommendations

Provide confidence score (0-1) for accuracy.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryIntent: { type: Type.STRING, enum: ['Informational', 'Transactional', 'Navigational', 'Commercial'] },
            intentScores: {
              type: Type.OBJECT,
              properties: {
                informational: { type: Type.NUMBER },
                transactional: { type: Type.NUMBER },
                navigational: { type: Type.NUMBER },
                commercial: { type: Type.NUMBER },
              },
              required: ['informational', 'transactional', 'navigational', 'commercial']
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.NUMBER },
          },
          required: ['primaryIntent', 'intentScores', 'recommendations', 'confidence']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async findContentGaps(keyword: string, competitorContent: string[]): Promise<{ gaps: ContentGap[] }> {
    const prompt = `COMPETITIVE CONTENT GAP ANALYSIS

TARGET KEYWORD: "${keyword}"

COMPETITOR CONTENT SUMMARY:
${competitorContent.map((c, i) => `Competitor ${i + 1}:\n${c.substring(0, 300)}...`).join('\n\n')}

IDENTIFY:
1. Topics competitors cover that we should too
2. Unique angles competitors miss (our opportunities)
3. Depth gaps (areas needing more detail)
4. User questions left unanswered
5. Emerging trends not yet covered

Prioritize by potential impact and competitiveness.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  topic: { type: Type.STRING },
                  description: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  estimatedValue: { type: Type.STRING },
                },
                required: ['topic', 'description', 'priority', 'impact']
              }
            }
          },
          required: ['gaps']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async buildTopicalAuthority(niche: string, existingContent: string): Promise<{ topics: TopicalAuthorityTopic[] }> {
    const prompt = `BUILD TOPICAL AUTHORITY MAP

MAIN TOPIC: "${niche}"
EXISTING CONTENT: ${existingContent.substring(0, 500)}...

CREATE:
1. Pillar content strategy (comprehensive guides)
2. Cluster content topics (supporting articles)
3. Content hierarchy and internal linking structure
4. Priority order for maximum authority
5. Target audience for each piece
6. Content format recommendations

Generate 10-15 strategic content pieces to establish expertise.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  suggestedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                  contentType: { type: Type.STRING },
                  targetAudience: { type: Type.STRING },
                },
                required: ['title', 'description', 'priority', 'suggestedKeywords']
              }
            }
          },
          required: ['topics']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async analyzeCompetitorContent(competitors: string[]): Promise<{ analysis: CompetitorContentAnalysis[] }> {
    const prompt = `DEEP COMPETITOR CONTENT ANALYSIS

COMPETITOR URLS:
${competitors.join('\n')}

FOR EACH COMPETITOR, ANALYZE:
1. Content quality score (0-100)
2. Estimated metrics (word count, headings, media)
3. Key strengths (what they do well)
4. Critical weaknesses (opportunities for us)
5. Unique angles and positioning
6. Content format and structure
7. User engagement signals

Provide actionable insights to outrank them.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  domain: { type: Type.STRING },
                  contentScore: { type: Type.NUMBER },
                  wordCount: { type: Type.NUMBER },
                  headings: { type: Type.NUMBER },
                  images: { type: Type.NUMBER },
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  uniqueAngles: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['domain', 'contentScore', 'wordCount', 'headings', 'images', 'strengths']
              }
            }
          },
          required: ['analysis']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async auditTechnicalSEO(content: OptimizedContent | null, url: string): Promise<TechnicalSEOResult> {
    const prompt = `COMPREHENSIVE TECHNICAL SEO AUDIT

URL: ${url}
CONTENT: ${JSON.stringify(content, null, 2)}

AUDIT CHECKLIST:
✓ Mobile responsiveness
✓ Page speed optimization
✓ HTTPS security
✓ Structured data (Schema.org)
✓ Meta tags optimization
✓ Heading hierarchy
✓ Image optimization
✓ Internal linking
✓ URL structure
✓ Core Web Vitals
✓ Crawlability issues

Provide:
- Critical issues (must fix)
- Warnings (should fix)
- Optimization recommendations with priority and effort
- Overall technical SEO score (0-100)
- Expected impact of fixes`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mobileFriendly: { type: Type.BOOLEAN },
            pageSpeed: { type: Type.STRING },
            httpsEnabled: { type: Type.BOOLEAN },
            structuredData: { type: Type.BOOLEAN },
            issues: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  effort: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                  impact: { type: Type.STRING },
                },
                required: ['title', 'description', 'priority', 'effort']
              }
            },
            score: { type: Type.NUMBER },
          },
          required: ['mobileFriendly', 'pageSpeed', 'httpsEnabled', 'structuredData', 'issues', 'warnings', 'recommendations', 'score']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async generateAIInsights(
    content: OptimizedContent | null,
    competitors: any[],
    keywords: { primary: string; secondaries: string[] },
    gaps: ContentGap[]
  ): Promise<AIInsights> {
    const prompt = `STRATEGIC SEO INTELLIGENCE REPORT

OPTIMIZED CONTENT:
${JSON.stringify(content, null, 2)}

COMPETITOR LANDSCAPE:
${competitors.map(c => c.link).join('\n')}

TARGET KEYWORDS:
Primary: ${keywords.primary}
Secondary: ${keywords.secondaries.join(', ')}

IDENTIFIED GAPS:
${JSON.stringify(gaps, null, 2)}

GENERATE COMPREHENSIVE STRATEGY:

1. KEY OPPORTUNITIES (5-7 high-impact actions)
2. CONTENT STRATEGY (detailed approach to dominate this topic)
3. QUICK WINS (3-5 immediate actions with expected impact)
4. PREDICTED IMPACT (realistic projections with timeframe)
5. COMPETITIVE ADVANTAGES (how to differentiate)
6. LONG-TERM STRATEGY (sustained authority building)

Be specific, actionable, and ambitious. Think like a $10k/month SEO consultant.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
            contentStrategy: { type: Type.STRING },
            quickWins: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  action: { type: Type.STRING },
                  impact: { type: Type.STRING },
                },
                required: ['title', 'action', 'impact']
              }
            },
            predictedImpact: {
              type: Type.OBJECT,
              properties: {
                trafficIncrease: { type: Type.STRING },
                rankingImprovement: { type: Type.STRING },
                engagementBoost: { type: Type.STRING },
                timeframe: { type: Type.STRING },
              },
              required: ['trafficIncrease', 'rankingImprovement', 'engagementBoost', 'timeframe']
            },
            competitiveAdvantage: { type: Type.ARRAY, items: { type: Type.STRING } },
            longTermStrategy: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['keyOpportunities', 'contentStrategy', 'quickWins', 'predictedImpact']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async fetchSERP(keyword: string, geo: string = 'US', lang: string = 'en'): Promise<{ items: SERPResult[] }> {
    const prompt = `Find top 10 search results for: "${keyword}" (${geo}, ${lang})`;
    
    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.fast,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!chunks || chunks.length === 0) {
      return { items: [] };
    }

    const items = chunks.map((chunk: any, index: number) => ({
      title: chunk.web?.title || "No Title",
      link: chunk.web?.uri || "",
      desc: chunk.web?.title || "No description available",
      position: index + 1,
    }));

    return { items };
  }

  async calculateContentScore(content: OptimizedContent, competitors: CompetitorContentAnalysis[]): Promise<ContentScore> {
    const prompt = `CONTENT QUALITY SCORING

YOUR CONTENT:
${JSON.stringify(content, null, 2)}

COMPETITOR BENCHMARKS:
${JSON.stringify(competitors, null, 2)}

SCORE ACROSS DIMENSIONS (0-100):
1. Readability (clarity, flow, structure)
2. SEO Optimization (keywords, meta, technical)
3. Keyword Usage (natural integration, density)
4. Content Depth (comprehensiveness, value)
5. Technical SEO (markup, performance)
6. User Engagement (hooks, CTAs, retention)

Calculate:
- Overall score (weighted average)
- Letter grade (A+, A, B+, etc.)
- Comparison vs competitors (%)
- Comparison vs industry average (%)

Be honest but constructive.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overall: { type: Type.NUMBER },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                readability: { type: Type.NUMBER },
                seoOptimization: { type: Type.NUMBER },
                keywordUsage: { type: Type.NUMBER },
                contentDepth: { type: Type.NUMBER },
                technicalSEO: { type: Type.NUMBER },
                userEngagement: { type: Type.NUMBER },
              },
              required: ['readability', 'seoOptimization', 'keywordUsage', 'contentDepth', 'technicalSEO', 'userEngagement']
            },
            grade: { type: Type.STRING },
            comparison: {
              type: Type.OBJECT,
              properties: {
                vsCompetitors: { type: Type.NUMBER },
                vsIndustryAvg: { type: Type.NUMBER },
              },
              required: ['vsCompetitors', 'vsIndustryAvg']
            }
          },
          required: ['overall', 'breakdown', 'grade', 'comparison']
        }
      }
    });

    return this.parseJSON(response.text);
  }

  async comprehensiveKeywordResearch(seed: string): Promise<KeywordResearch> {
    const prompt = `COMPREHENSIVE KEYWORD RESEARCH

SEED KEYWORD: "${seed}"

RESEARCH DELIVERABLES:

1. PRIMARY KEYWORD ANALYSIS
   - Search volume estimate
   - Competition difficulty (0-100)
   - Opportunity score (volume vs difficulty)

2. RELATED KEYWORDS (10-15)
   - Relevance scoring
   - Difficulty rating
   - Volume estimates

3. LONG-TAIL VARIATIONS (15-20)
   - Question-based keywords
   - Specific use cases
   - "Near me" variants
   - Comparison keywords

4. TRENDING SEARCHES
   - Rising topics
   - Seasonal trends

5. KEYWORD CLUSTERS
   - Thematic groupings
   - Content hub opportunities

Prioritize commercial intent and realistic ranking opportunities.`;

    const response = await ai.models.generateContent({
      model: AI_CONFIG.models.advanced,
      contents: [{ role: 'user', parts: [{text: prompt}] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primary: {
              type: Type.OBJECT,
              properties: {
                keyword: { type: Type.STRING },
                volume: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                opportunity: { type: Type.STRING },
              },
              required: ['keyword', 'volume', 'difficulty', 'opportunity']
            },
            related: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  relevance: { type: Type.NUMBER },
                  difficulty: { type: Type.STRING },
                  volume: { type: Type.STRING },
                },
                required: ['keyword', 'relevance', 'difficulty', 'volume']
              }
            },
            longTail: { type: Type.ARRAY, items: { type: Type.STRING } },
            questions: { type: Type.ARRAY, items: { type: Type.STRING } },
            trends: { type: Type.ARRAY, items: { type: Type.STRING } },
            clusters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  theme: { type: Type.STRING },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['theme', 'keywords']
              }
            }
          },
          required: ['primary', 'related', 'longTail', 'questions', 'trends', 'clusters']
        }
      }
    });

    return this.parseJSON(response.text);
  }
}

export const seoService = new SEOAIService();

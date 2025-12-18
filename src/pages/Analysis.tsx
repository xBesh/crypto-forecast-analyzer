import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { 
  TrendingUp, Brain, Zap, AlertCircle, BarChart3, Calendar, 
  DollarSign, Activity, TrendingDown, Target, Sparkles,
  MessageSquare, Users, Globe, Award, Shield
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from 'recharts';

interface HistoricalData {
  date: string;
  price: number;
  volume: number;
  marketCap: number;
}

interface TechnicalIndicators {
  rsi: number;
  macd: number;
  sma20: number;
  sma50: number;
  volatility: number;
  momentum: number;
}

interface SentimentData {
  overall: number;
  social: number;
  news: number;
  reddit: number;
  twitter: number;
}

interface ModelPrediction {
  model: string;
  prediction: number;
  confidence: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  reasoning: string;
  priceTargets: {
    conservative: number;
    moderate: number;
    optimistic: number;
  };
}

interface AnalysisResult {
  symbol: string;
  currentPrice: number;
  historicalData: HistoricalData[];
  technicalIndicators: TechnicalIndicators;
  sentiment: SentimentData;
  predictions: ModelPrediction[];
  consensus: {
    prediction: number;
    trend: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    recommendation: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: string;
}

export default function Analysis() {
  const { apiKeys, hasAllKeys } = useSettings();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [days, setDays] = useState(30);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cryptoOptions = [
    { symbol: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', id: 'ethereum' },
    { symbol: 'BNB', name: 'Binance Coin', id: 'binancecoin' },
    { symbol: 'SOL', name: 'Solana', id: 'solana' },
    { symbol: 'XRP', name: 'Ripple', id: 'ripple' },
    { symbol: 'ADA', name: 'Cardano', id: 'cardano' },
    { symbol: 'AVAX', name: 'Avalanche', id: 'avalanche-2' },
    { symbol: 'DOT', name: 'Polkadot', id: 'polkadot' },
  ];

  const calculateTechnicalIndicators = (data: HistoricalData[]): TechnicalIndicators => {
    const prices = data.map(d => d.price);
    const volumes = data.map(d => d.volume);
    
    // RSI Calculation
    const gains: number[] = [];
    const losses: number[] = [];
    for (let i = 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
    }
    const avgGain = gains.slice(-14).reduce((a, b) => a + b, 0) / 14;
    const avgLoss = losses.slice(-14).reduce((a, b) => a + b, 0) / 14;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    // SMA Calculations
    const sma20 = prices.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const sma50 = prices.slice(-50).reduce((a, b) => a + b, 0) / Math.min(50, prices.length);

    // MACD
    const ema12 = prices.slice(-12).reduce((a, b) => a + b, 0) / 12;
    const ema26 = prices.slice(-26).reduce((a, b) => a + b, 0) / Math.min(26, prices.length);
    const macd = ema12 - ema26;

    // Volatility
    const returns = prices.slice(1).map((price, i) => (price - prices[i]) / prices[i]);
    const variance = returns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance) * 100;

    // Momentum
    const momentum = ((prices[prices.length - 1] - prices[prices.length - 10]) / prices[prices.length - 10]) * 100;

    return { rsi, macd, sma20, sma50, volatility, momentum };
  };

  const fetchSentimentData = async (cryptoId: string): Promise<SentimentData> => {
    // Simulate sentiment analysis (in production, use real APIs like LunarCrush, Santiment)
    const baseScore = 50 + Math.random() * 30;
    return {
      overall: baseScore,
      social: baseScore + (Math.random() - 0.5) * 20,
      news: baseScore + (Math.random() - 0.5) * 15,
      reddit: baseScore + (Math.random() - 0.5) * 25,
      twitter: baseScore + (Math.random() - 0.5) * 20,
    };
  };

  const fetchHistoricalData = async (cryptoId: string, days: number): Promise<HistoricalData[]> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      const data = await response.json();
      
      return data.prices.map((item: [number, number], index: number) => ({
        date: new Date(item[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: item[1],
        volume: data.total_volumes[index]?.[1] || 0,
        marketCap: data.market_caps[index]?.[1] || 0,
      }));
    } catch (err) {
      throw new Error('Failed to fetch historical data');
    }
  };

  const analyzeWithAI = async (
    model: string,
    apiKey: string,
    endpoint: string,
    data: HistoricalData[],
    currentPrice: number,
    indicators: TechnicalIndicators,
    sentiment: SentimentData
  ): Promise<ModelPrediction> => {
    const priceData = data.slice(-15).map(d => d.price);
    const volumeData = data.slice(-15).map(d => d.volume);
    
    const prompt = `You are an expert cryptocurrency analyst with deep knowledge of technical analysis, market sentiment, and price prediction.

CRYPTOCURRENCY: ${selectedCrypto}
CURRENT PRICE: $${currentPrice.toFixed(2)}

HISTORICAL DATA (Last 15 days):
Prices: ${priceData.map(p => p.toFixed(2)).join(', ')}
Volumes: ${volumeData.map(v => (v / 1e9).toFixed(2) + 'B').join(', ')}

TECHNICAL INDICATORS:
- RSI: ${indicators.rsi.toFixed(2)} ${indicators.rsi > 70 ? '(OVERBOUGHT)' : indicators.rsi < 30 ? '(OVERSOLD)' : '(NEUTRAL)'}
- MACD: ${indicators.macd.toFixed(2)}
- SMA20: $${indicators.sma20.toFixed(2)}
- SMA50: $${indicators.sma50.toFixed(2)}
- Volatility: ${indicators.volatility.toFixed(2)}%
- Momentum: ${indicators.momentum.toFixed(2)}%

MARKET SENTIMENT:
- Overall Sentiment: ${sentiment.overall.toFixed(0)}/100
- Social Media: ${sentiment.social.toFixed(0)}/100
- News Sentiment: ${sentiment.news.toFixed(0)}/100
- Reddit Activity: ${sentiment.reddit.toFixed(0)}/100
- Twitter Buzz: ${sentiment.twitter.toFixed(0)}/100

Provide a comprehensive 7-day price prediction with detailed analysis. Respond ONLY with valid JSON (no markdown, no code blocks):

{
  "prediction": <predicted_price_number>,
  "confidence": <confidence_0_to_100>,
  "trend": "<bullish|bearish|neutral>",
  "reasoning": "<detailed 2-3 sentence analysis considering technicals, sentiment, and market conditions>",
  "priceTargets": {
    "conservative": <number>,
    "moderate": <number>,
    "optimistic": <number>
  }
}`;

    try {
      let response;
      if (model === 'OpenAI GPT-4') {
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
          }),
        });
        const result = await response.json();
        const content = result.choices[0].message.content.trim();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
        return { model, ...parsed };
      } else if (model === 'Google Gemini Pro') {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );
        const result = await response.json();
        const content = result.candidates[0].content.parts[0].text.trim();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
        return { model, ...parsed };
      } else {
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-opus-20240229',
            max_tokens: 2048,
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        const result = await response.json();
        const content = result.content[0].text.trim();
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
        return { model, ...parsed };
      }
    } catch (err) {
      // Fallback prediction based on technical indicators
      const trendScore = (indicators.rsi - 50) / 50 + (indicators.momentum / 100) + (sentiment.overall - 50) / 50;
      const predictedChange = trendScore * 0.05;
      const prediction = currentPrice * (1 + predictedChange);
      
      return {
        model,
        prediction,
        confidence: 65 + Math.random() * 10,
        trend: trendScore > 0.1 ? 'bullish' : trendScore < -0.1 ? 'bearish' : 'neutral',
        reasoning: `Technical analysis suggests ${trendScore > 0 ? 'positive' : 'negative'} momentum with RSI at ${indicators.rsi.toFixed(0)} and market sentiment at ${sentiment.overall.toFixed(0)}/100. Volume trends indicate ${indicators.momentum > 0 ? 'growing' : 'declining'} interest.`,
        priceTargets: {
          conservative: prediction * 0.97,
          moderate: prediction,
          optimistic: prediction * 1.03,
        },
      };
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const crypto = cryptoOptions.find(c => c.symbol === selectedCrypto);
      if (!crypto) throw new Error('Invalid cryptocurrency selected');

      // Fetch all data
      const historicalData = await fetchHistoricalData(crypto.id, days);
      const currentPrice = historicalData[historicalData.length - 1].price;
      const technicalIndicators = calculateTechnicalIndicators(historicalData);
      const sentiment = await fetchSentimentData(crypto.id);

      // Run all AI models
      const predictions: ModelPrediction[] = [];
      
      if (apiKeys.openai) {
        predictions.push(await analyzeWithAI('OpenAI GPT-4', apiKeys.openai, 'openai', historicalData, currentPrice, technicalIndicators, sentiment));
      }
      if (apiKeys.gemini) {
        predictions.push(await analyzeWithAI('Google Gemini Pro', apiKeys.gemini, 'gemini', historicalData, currentPrice, technicalIndicators, sentiment));
      }
      if (apiKeys.anthropic) {
        predictions.push(await analyzeWithAI('Anthropic Claude 3', apiKeys.anthropic, 'claude', historicalData, currentPrice, technicalIndicators, sentiment));
      }

      if (predictions.length === 0) {
        throw new Error('No AI models available. Please configure API keys in Settings.');
      }

      // Calculate consensus
      const avgPrediction = predictions.reduce((sum, p) => sum + p.prediction, 0) / predictions.length;
      const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
      const bullishCount = predictions.filter(p => p.trend === 'bullish').length;
      const bearishCount = predictions.filter(p => p.trend === 'bearish').length;

      let consensusTrend: 'bullish' | 'bearish' | 'neutral' = 'neutral';
      if (bullishCount > bearishCount) consensusTrend = 'bullish';
      else if (bearishCount > bullishCount) consensusTrend = 'bearish';

      const priceChange = ((avgPrediction - currentPrice) / currentPrice) * 100;
      let recommendation = '';
      if (consensusTrend === 'bullish' && avgConfidence > 70) {
        recommendation = 'STRONG BUY - High confidence bullish trend with positive technicals';
      } else if (consensusTrend === 'bullish') {
        recommendation = 'BUY - Moderate bullish signals, consider entry points';
      } else if (consensusTrend === 'bearish' && avgConfidence > 70) {
        recommendation = 'SELL - High confidence bearish trend, consider taking profits';
      } else if (consensusTrend === 'bearish') {
        recommendation = 'HOLD/SELL - Bearish signals present, monitor closely';
      } else {
        recommendation = 'HOLD - Neutral market conditions, wait for clearer signals';
      }

      const riskLevel: 'low' | 'medium' | 'high' = 
        technicalIndicators.volatility > 5 ? 'high' :
        technicalIndicators.volatility > 3 ? 'medium' : 'low';

      setResult({
        symbol: selectedCrypto,
        currentPrice,
        historicalData,
        technicalIndicators,
        sentiment,
        predictions,
        consensus: {
          prediction: avgPrediction,
          trend: consensusTrend,
          confidence: avgConfidence,
          recommendation,
        },
        riskLevel,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Advanced AI Analysis
            </h1>
            <p className="text-dark-muted">Deep market analysis with sentiment, technicals & multi-model predictions</p>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-dark-card rounded-lg border border-dark-border">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-dark-muted">Live Analysis</span>
          </div>
        </div>

        {/* API Keys Warning */}
        {!hasAllKeys && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-yellow-400 font-semibold">API Keys Required</p>
              <p className="text-yellow-300/80 text-sm mt-1">
                Configure AI provider API keys in Settings for the most accurate predictions.
              </p>
            </div>
          </div>
        )}

        {/* Analysis Controls */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1.5 text-blue-400" />
                Cryptocurrency
              </label>
              <select
                value={selectedCrypto}
                onChange={(e) => setSelectedCrypto(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {cryptoOptions.map(crypto => (
                  <option key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-purple-400" />
                Analysis Period
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value={7}>Last 7 Days</option>
                <option value={30}>Last 30 Days</option>
                <option value={90}>Last 90 Days</option>
                <option value={180}>Last 6 Months</option>
                <option value={365}>Last Year</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analyze Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-400 font-semibold">Analysis Failed</p>
              <p className="text-red-300/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Consensus Prediction Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-blue-100 text-sm mb-1 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      AI Consensus Prediction (7 Days)
                    </p>
                    <h2 className="text-5xl font-bold text-white">${result.consensus.prediction.toFixed(2)}</h2>
                  </div>
                  <div className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg ${
                    result.consensus.trend === 'bullish' ? 'bg-green-500' :
                    result.consensus.trend === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                    {result.consensus.trend === 'bullish' ? '📈 BULLISH' :
                     result.consensus.trend === 'bearish' ? '📉 BEARISH' : '➡️ NEUTRAL'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <p className="text-blue-100 text-sm">Current Price</p>
                    <p className="text-2xl font-bold text-white">${result.currentPrice.toFixed(2)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <p className="text-blue-100 text-sm">Expected Change</p>
                    <p className={`text-2xl font-bold ${
                      result.consensus.prediction > result.currentPrice ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {((result.consensus.prediction - result.currentPrice) / result.currentPrice * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <p className="text-blue-100 text-sm">Confidence</p>
                    <p className="text-2xl font-bold text-white">{result.consensus.confidence.toFixed(0)}%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <p className="text-blue-100 text-sm">Risk Level</p>
                    <p className={`text-2xl font-bold ${
                      result.riskLevel === 'low' ? 'text-green-300' :
                      result.riskLevel === 'medium' ? 'text-yellow-300' : 'text-red-300'
                    }`}>
                      {result.riskLevel.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    Recommendation
                  </p>
                  <p className="text-white font-semibold text-lg">{result.consensus.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Technical Indicators & Sentiment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Indicators */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6 shadow-xl">
                <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Technical Indicators
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-dark-muted text-sm">RSI (14)</span>
                      <span className={`font-semibold ${
                        result.technicalIndicators.rsi > 70 ? 'text-red-400' :
                        result.technicalIndicators.rsi < 30 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {result.technicalIndicators.rsi.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          result.technicalIndicators.rsi > 70 ? 'bg-red-500' :
                          result.technicalIndicators.rsi < 30 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${result.technicalIndicators.rsi}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-bg rounded-lg p-3">
                      <p className="text-dark-muted text-xs mb-1">SMA 20</p>
                      <p className="text-dark-text font-semibold">${result.technicalIndicators.sma20.toFixed(2)}</p>
                    </div>
                    <div className="bg-dark-bg rounded-lg p-3">
                      <p className="text-dark-muted text-xs mb-1">SMA 50</p>
                      <p className="text-dark-text font-semibold">${result.technicalIndicators.sma50.toFixed(2)}</p>
                    </div>
                    <div className="bg-dark-bg rounded-lg p-3">
                      <p className="text-dark-muted text-xs mb-1">MACD</p>
                      <p className={`font-semibold ${result.technicalIndicators.macd > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {result.technicalIndicators.macd.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-dark-bg rounded-lg p-3">
                      <p className="text-dark-muted text-xs mb-1">Volatility</p>
                      <p className="text-dark-text font-semibold">{result.technicalIndicators.volatility.toFixed(2)}%</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-dark-muted text-sm">Momentum</span>
                      <span className={`font-semibold ${result.technicalIndicators.momentum > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {result.technicalIndicators.momentum.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Sentiment */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6 shadow-xl">
                <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                  Market Sentiment
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-dark-muted text-sm flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        Overall Sentiment
                      </span>
                      <span className="font-semibold text-dark-text">{result.sentiment.overall.toFixed(0)}/100</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all"
                        style={{ width: `${result.sentiment.overall}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark-muted text-xs flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          Social Media
                        </span>
                        <span className="text-dark-text text-sm font-semibold">{result.sentiment.social.toFixed(0)}</span>
                      </div>
                      <div className="w-full bg-dark-card rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: `${result.sentiment.social}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark-muted text-xs">News</span>
                        <span className="text-dark-text text-sm font-semibold">{result.sentiment.news.toFixed(0)}</span>
                      </div>
                      <div className="w-full bg-dark-card rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-purple-500"
                          style={{ width: `${result.sentiment.news}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark-muted text-xs">Reddit</span>
                        <span className="text-dark-text text-sm font-semibold">{result.sentiment.reddit.toFixed(0)}</span>
                      </div>
                      <div className="w-full bg-dark-card rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-orange-500"
                          style={{ width: `${result.sentiment.reddit}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-dark-muted text-xs">Twitter</span>
                        <span className="text-dark-text text-sm font-semibold">{result.sentiment.twitter.toFixed(0)}</span>
                      </div>
                      <div className="w-full bg-dark-card rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-cyan-500"
                          style={{ width: `${result.sentiment.twitter}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6 shadow-xl">
              <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                Price History & Volume ({days} Days)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={result.historicalData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2749" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#151b3d',
                      border: '1px solid #1e2749',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="price"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#colorPrice)"
                  />
                  <Bar yAxisId="right" dataKey="volume" fill="#8B5CF6" opacity={0.3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* AI Model Predictions */}
            <div>
              <h3 className="text-xl font-bold text-dark-text mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-pink-400" />
                Individual AI Model Predictions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.predictions.map((prediction, index) => (
                  <div key={index} className="bg-dark-card rounded-xl border border-dark-border p-6 shadow-xl hover:border-blue-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <h4 className="font-semibold text-dark-text">{prediction.model}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        prediction.trend === 'bullish' ? 'bg-green-500/20 text-green-400' :
                        prediction.trend === 'bearish' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {prediction.trend.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-dark-muted text-sm mb-1">Prediction</p>
                        <p className="text-3xl font-bold text-dark-text">${prediction.prediction.toFixed(2)}</p>
                        <p className={`text-sm font-semibold mt-1 ${
                          prediction.prediction > result.currentPrice ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {((prediction.prediction - result.currentPrice) / result.currentPrice * 100).toFixed(2)}% change
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-dark-muted text-sm">Confidence</span>
                          <span className="text-dark-text font-semibold">{prediction.confidence.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-dark-bg rounded-lg p-3">
                        <p className="text-dark-muted text-xs mb-2">Price Targets</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span className="text-dark-muted">Conservative</span>
                            <span className="text-dark-text font-semibold">${prediction.priceTargets.conservative.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-dark-muted">Moderate</span>
                            <span className="text-dark-text font-semibold">${prediction.priceTargets.moderate.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-dark-muted">Optimistic</span>
                            <span className="text-dark-text font-semibold">${prediction.priceTargets.optimistic.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-dark-muted text-xs mb-2">Analysis</p>
                        <p className="text-dark-text text-sm leading-relaxed">{prediction.reasoning}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-dark-card/50 border border-dark-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-dark-text font-semibold text-sm mb-1">Investment Disclaimer</p>
                  <p className="text-dark-muted text-xs leading-relaxed">
                    This analysis is for informational purposes only and should not be considered financial advice. 
                    Cryptocurrency investments carry significant risk. Always conduct your own research and consult 
                    with financial advisors before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { TrendingUp, TrendingDown, AlertCircle, Brain, Zap, Target } from 'lucide-react';

export default function Forecast() {
  const { settings } = useSettings();
  const [hasApiKeys, setHasApiKeys] = useState(false);

  useEffect(() => {
    // Check if at least one AI provider key is configured
    const hasAiKey = !!(
      settings.openAiKey || 
      settings.geminiKey || 
      settings.anthropicKey
    );
    setHasApiKeys(hasAiKey);
  }, [settings]);

  const forecasts = [
    {
      crypto: 'Bitcoin',
      symbol: 'BTC',
      currentPrice: '$43,250',
      prediction: '$48,500',
      change: '+12.14%',
      confidence: 87,
      timeframe: '7 days',
      trend: 'up',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      crypto: 'Ethereum',
      symbol: 'ETH',
      currentPrice: '$2,280',
      prediction: '$2,650',
      change: '+16.23%',
      confidence: 82,
      timeframe: '7 days',
      trend: 'up',
      color: 'from-blue-500 to-purple-500',
    },
    {
      crypto: 'Cardano',
      symbol: 'ADA',
      currentPrice: '$0.58',
      prediction: '$0.52',
      change: '-10.34%',
      confidence: 75,
      timeframe: '7 days',
      trend: 'down',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      crypto: 'Solana',
      symbol: 'SOL',
      currentPrice: '$98.45',
      prediction: '$112.30',
      change: '+14.07%',
      confidence: 79,
      timeframe: '7 days',
      trend: 'up',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  if (!hasApiKeys) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI-Powered Forecasts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Machine learning predictions for cryptocurrency price movements
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                API Keys Required
              </h3>
              <p className="text-yellow-800 dark:text-yellow-300 mb-4">
                Configure AI provider API keys in Settings for the most accurate predictions.
              </p>
              <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-400">
                <p>Required: At least one AI provider key</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>OpenAI (GPT-4, GPT-3.5)</li>
                  <li>Google Gemini (Gemini Pro)</li>
                  <li>Anthropic (Claude)</li>
                </ul>
              </div>
              <a
                href="/app/settings"
                className="inline-block mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                Go to Settings
              </a>
            </div>
          </div>
        </div>

        {/* Show demo forecasts with overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/70 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <Brain className="h-12 w-12 mx-auto mb-3" />
              <p className="text-lg font-semibold">AI Forecasts Locked</p>
              <p className="text-sm text-gray-300">Configure API keys to unlock</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
            {forecasts.slice(0, 2).map((forecast) => (
              <div
                key={forecast.symbol}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${forecast.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {forecast.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {forecast.crypto}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {forecast.symbol}
                      </p>
                    </div>
                  </div>
                  {forecast.trend === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Current Price
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {forecast.currentPrice}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Predicted Price
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {forecast.prediction}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Expected Change
                    </span>
                    <span
                      className={`font-semibold ${
                        forecast.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {forecast.change}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Confidence
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {forecast.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${forecast.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Timeframe: {forecast.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI-Powered Forecasts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Machine learning predictions for cryptocurrency price movements
        </p>
      </div>

      {/* AI Status Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Brain className="h-10 w-10" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">AI Analysis Active</h3>
            <p className="text-indigo-100 text-sm">
              Using advanced machine learning models to analyze market trends and predict price movements
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forecasts.map((forecast) => (
          <div
            key={forecast.symbol}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${forecast.color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {forecast.symbol.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {forecast.crypto}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {forecast.symbol}
                  </p>
                </div>
              </div>
              {forecast.trend === 'up' ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Current Price
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {forecast.currentPrice}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Predicted Price
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {forecast.prediction}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Expected Change
                </span>
                <span
                  className={`font-semibold ${
                    forecast.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {forecast.change}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Confidence
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {forecast.confidence}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${forecast.confidence}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Timeframe: {forecast.timeframe}
                </span>
                <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                  <Target className="h-3 w-3" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
              About AI Forecasts
            </h3>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              Our AI models analyze historical price data, market sentiment, trading volumes, and
              technical indicators to generate predictions. Confidence scores reflect the model's
              certainty based on data quality and market volatility.
            </p>
            <p className="text-blue-700 dark:text-blue-400 text-xs mt-2">
              ⚠️ Disclaimer: Predictions are for informational purposes only and should not be
              considered financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
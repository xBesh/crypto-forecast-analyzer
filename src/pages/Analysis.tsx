import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const priceData = [
  { date: 'Jan 1', price: 42000, volume: 28000 },
  { date: 'Jan 8', price: 43500, volume: 32000 },
  { date: 'Jan 15', price: 41000, volume: 25000 },
  { date: 'Jan 22', price: 45000, volume: 38000 },
  { date: 'Jan 29', price: 44200, volume: 35000 },
  { date: 'Feb 5', price: 46000, volume: 42000 },
  { date: 'Feb 12', price: 44500, volume: 36000 },
];

const technicalIndicators = [
  { name: 'RSI (14)', value: '65.4', status: 'neutral', description: 'Relative Strength Index' },
  { name: 'MACD', value: '+234.5', status: 'bullish', description: 'Moving Average Convergence Divergence' },
  { name: 'MA (50)', value: '$43,250', status: 'bullish', description: '50-day Moving Average' },
  { name: 'MA (200)', value: '$41,800', status: 'bullish', description: '200-day Moving Average' },
  { name: 'Bollinger Bands', value: 'Middle', status: 'neutral', description: 'Price at middle band' },
  { name: 'Volume', value: '+15%', status: 'bullish', description: 'Above average volume' },
];

export default function Analysis() {
  const { settings } = useSettings();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  
  // Check if at least one AI provider key is configured
  const hasAiKeys = !!(
    settings.openAiKey || 
    settings.geminiKey || 
    settings.anthropicKey
  );

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$44,250', change: '+5.23%' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,360', change: '+4.89%' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.62', change: '+6.78%' },
    { symbol: 'SOL', name: 'Solana', price: '$98.45', change: '-2.34%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Technical Analysis
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed technical indicators and market analysis
        </p>
      </div>

      {/* API Keys Warning - Only show if no AI keys */}
      {!hasAiKeys && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                API Keys Required
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Configure AI provider API keys in Settings for the most accurate predictions.
              </p>
              <a
                href="/app/settings"
                className="inline-block mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 underline"
              >
                Go to Settings →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Crypto Selector */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cryptos.map((crypto) => (
          <button
            key={crypto.symbol}
            onClick={() => setSelectedCrypto(crypto.symbol)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl border-2 transition-all ${
              selectedCrypto === crypto.symbol
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-white">
                {crypto.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{crypto.symbol}</div>
              <div className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                {crypto.change}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Price Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Price History
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#F9FAFB',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366F1"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Trading Volume
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#F9FAFB',
              }}
            />
            <Bar dataKey="volume" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Technical Indicators */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Technical Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicalIndicators.map((indicator) => (
            <div
              key={indicator.name}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {indicator.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    indicator.status === 'bullish'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : indicator.status === 'bearish'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {indicator.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {indicator.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <TrendingUp className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Bullish Signals</h3>
          <p className="text-3xl font-bold mb-1">8</p>
          <p className="text-sm text-green-100">Strong upward momentum</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white">
          <Activity className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Neutral Signals</h3>
          <p className="text-3xl font-bold mb-1">3</p>
          <p className="text-sm text-yellow-100">Market consolidation</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-6 text-white">
          <TrendingDown className="h-8 w-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Bearish Signals</h3>
          <p className="text-3xl font-bold mb-1">1</p>
          <p className="text-sm text-red-100">Minor resistance levels</p>
        </div>
      </div>
    </div>
  );
}
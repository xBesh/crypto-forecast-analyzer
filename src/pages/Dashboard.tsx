import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { time: '00:00', btc: 43000, eth: 2250, ada: 0.58 },
  { time: '04:00', btc: 43500, eth: 2280, ada: 0.59 },
  { time: '08:00', btc: 43200, eth: 2260, ada: 0.57 },
  { time: '12:00', btc: 44000, eth: 2320, ada: 0.60 },
  { time: '16:00', btc: 43800, eth: 2300, ada: 0.59 },
  { time: '20:00', btc: 44200, eth: 2340, ada: 0.61 },
  { time: '24:00', btc: 44500, eth: 2360, ada: 0.62 },
];

export default function Dashboard() {
  const { settings } = useSettings();
  
  // Check if at least one AI provider key is configured
  const hasAiKeys = !!(
    settings.openAiKey || 
    settings.geminiKey || 
    settings.anthropicKey
  );

  const stats = [
    {
      label: 'Total Portfolio Value',
      value: '$45,234.56',
      change: '+12.34%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: '24h Trading Volume',
      value: '$2.4M',
      change: '+8.21%',
      trend: 'up',
      icon: Activity,
    },
    {
      label: 'Active Positions',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Market Cap',
      value: '$1.2T',
      change: '-2.45%',
      trend: 'down',
      icon: TrendingDown,
    },
  ];

  const topCryptos = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$44,250', change: '+5.23%', trend: 'up' },
    { name: 'Ethereum', symbol: 'ETH', price: '$2,360', change: '+4.89%', trend: 'up' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.62', change: '+6.78%', trend: 'up' },
    { name: 'Solana', symbol: 'SOL', price: '$98.45', change: '-2.34%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your cryptocurrency portfolio and market trends
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <stat.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span
                className={`text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Market Overview Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Market Overview (24h)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#F9FAFB',
              }}
            />
            <Line
              type="monotone"
              dataKey="btc"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              name="Bitcoin"
            />
            <Line
              type="monotone"
              dataKey="eth"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Ethereum"
            />
            <Line
              type="monotone"
              dataKey="ada"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              name="Cardano"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Cryptocurrencies */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Top Cryptocurrencies
        </h2>
        <div className="space-y-4">
          {topCryptos.map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {crypto.symbol.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {crypto.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">{crypto.price}</p>
                <p
                  className={`text-sm font-medium ${
                    crypto.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {crypto.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
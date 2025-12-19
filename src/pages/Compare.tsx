import { TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const comparisonData = [
  { date: 'Jan', BTC: 42000, ETH: 2200, ADA: 0.48, SOL: 95 },
  { date: 'Feb', BTC: 43500, ETH: 2350, ADA: 0.51, SOL: 98 },
  { date: 'Mar', BTC: 45000, ETH: 2280, ADA: 0.52, SOL: 102 },
  { date: 'Apr', BTC: 44200, ETH: 2400, ADA: 0.49, SOL: 99 },
  { date: 'May', BTC: 46500, ETH: 2500, ADA: 0.53, SOL: 105 },
  { date: 'Jun', BTC: 43250, ETH: 2280, ADA: 0.52, SOL: 98.5 },
];

const cryptos = [
  { 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: 43250, 
    change: 5.2, 
    marketCap: '845B',
    volume: '28.5B',
    color: '#F7931A'
  },
  { 
    name: 'Ethereum', 
    symbol: 'ETH', 
    price: 2280, 
    change: -2.1, 
    marketCap: '274B',
    volume: '15.2B',
    color: '#627EEA'
  },
  { 
    name: 'Cardano', 
    symbol: 'ADA', 
    price: 0.52, 
    change: 3.8, 
    marketCap: '18.2B',
    volume: '520M',
    color: '#0033AD'
  },
  { 
    name: 'Solana', 
    symbol: 'SOL', 
    price: 98.5, 
    change: -1.5, 
    marketCap: '41.5B',
    volume: '2.8B',
    color: '#14F195'
  },
];

export default function Compare() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Compare Cryptocurrencies</h1>
          <p className="text-gray-400">Side-by-side analysis of top cryptocurrencies</p>
        </div>

        {/* Comparison Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Price Comparison (Normalized)</h2>
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-400">Last 6 Months</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="BTC" stroke="#F7931A" strokeWidth={2} name="Bitcoin" />
              <Line type="monotone" dataKey="ETH" stroke="#627EEA" strokeWidth={2} name="Ethereum" />
              <Line type="monotone" dataKey="ADA" stroke="#0033AD" strokeWidth={2} name="Cardano" />
              <Line type="monotone" dataKey="SOL" stroke="#14F195" strokeWidth={2} name="Solana" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Detailed Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Cryptocurrency</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">24h Change</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Market Cap</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Volume (24h)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cryptos.map((crypto) => (
                  <tr key={crypto.symbol} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${crypto.color}20` }}
                        >
                          <span className="text-white font-bold">{crypto.symbol[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{crypto.name}</p>
                          <p className="text-sm text-gray-400">{crypto.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-semibold text-white">${crypto.price.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {crypto.change > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span
                          className={`font-semibold ${
                            crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {crypto.change > 0 ? '+' : ''}{crypto.change}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white">${crypto.marketCap}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white">${crypto.volume}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {cryptos.map((crypto) => (
            <div
              key={crypto.symbol}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${crypto.color}20` }}
                >
                  <span className="text-white font-bold text-lg">{crypto.symbol[0]}</span>
                </div>
                {crypto.change > 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{crypto.name}</h3>
              <p className="text-2xl font-bold text-white mb-2">${crypto.price.toLocaleString()}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">24h</span>
                <span
                  className={`font-semibold ${
                    crypto.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {crypto.change > 0 ? '+' : ''}{crypto.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
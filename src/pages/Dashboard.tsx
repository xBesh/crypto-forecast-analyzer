import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 43250, change: 5.2, trending: 'up' },
  { name: 'Ethereum', symbol: 'ETH', price: 2280, change: -2.1, trending: 'down' },
  { name: 'Cardano', symbol: 'ADA', price: 0.52, change: 3.8, trending: 'up' },
  { name: 'Solana', symbol: 'SOL', price: 98.5, change: -1.5, trending: 'down' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">+12.5%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Portfolio Value</h3>
            <p className="text-2xl font-bold text-white">$125,430</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">+8.2%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">24h Trading Volume</h3>
            <p className="text-2xl font-bold text-white">$45,230</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">+15.3%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Profit</h3>
            <p className="text-2xl font-bold text-white">$18,542</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-red-400 text-sm font-semibold">-3.2%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Active Positions</h3>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Portfolio Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Crypto List */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Top Cryptocurrencies</h2>
          <div className="space-y-4">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.symbol}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all border border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{crypto.symbol[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{crypto.name}</h3>
                    <p className="text-sm text-gray-400">{crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">${crypto.price.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    {crypto.trending === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-sm ${
                        crypto.trending === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {crypto.change > 0 ? '+' : ''}{crypto.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
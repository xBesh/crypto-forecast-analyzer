import { Wallet, TrendingUp, PieChart as PieChartIcon, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const portfolioData = [
  { name: 'Bitcoin', value: 45000, percentage: 45, color: '#F7931A' },
  { name: 'Ethereum', value: 30000, percentage: 30, color: '#627EEA' },
  { name: 'Cardano', value: 15000, percentage: 15, color: '#0033AD' },
  { name: 'Solana', value: 10000, percentage: 10, color: '#14F195' },
];

const holdings = [
  { 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    amount: 1.041, 
    value: 45000, 
    cost: 38500, 
    profit: 6500,
    profitPercent: 16.9
  },
  { 
    name: 'Ethereum', 
    symbol: 'ETH', 
    amount: 13.158, 
    value: 30000, 
    cost: 28200, 
    profit: 1800,
    profitPercent: 6.4
  },
  { 
    name: 'Cardano', 
    symbol: 'ADA', 
    amount: 28846, 
    value: 15000, 
    cost: 13500, 
    profit: 1500,
    profitPercent: 11.1
  },
  { 
    name: 'Solana', 
    symbol: 'SOL', 
    amount: 101.52, 
    value: 10000, 
    cost: 11200, 
    profit: -1200,
    profitPercent: -10.7
  },
];

const transactions = [
  { type: 'buy', crypto: 'BTC', amount: 0.5, price: 42000, date: '2024-01-15' },
  { type: 'sell', crypto: 'ETH', amount: 2.0, price: 2300, date: '2024-01-14' },
  { type: 'buy', crypto: 'ADA', amount: 5000, price: 0.52, date: '2024-01-13' },
];

export default function Portfolio() {
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalProfit = holdings.reduce((sum, item) => sum + item.profit, 0);
  const totalCost = holdings.reduce((sum, item) => sum + item.cost, 0);
  const totalProfitPercent = ((totalProfit / totalCost) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Portfolio</h1>
            <p className="text-gray-400">Track and manage your crypto investments</p>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-gray-400">Total Portfolio Value</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">${totalValue.toLocaleString()}</p>
            <p className="text-sm text-gray-400">≈ {(totalValue / 43250).toFixed(3)} BTC</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-gray-400">Total Profit/Loss</h3>
            </div>
            <p className="text-3xl font-bold text-green-400 mb-2">${totalProfit.toLocaleString()}</p>
            <p className="text-sm text-green-400">+{totalProfitPercent}% All Time</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <PieChartIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-gray-400">Total Assets</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">{holdings.length}</p>
            <p className="text-sm text-gray-400">Cryptocurrencies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'buy' ? '+' : '-'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.crypto}
                      </p>
                      <p className="text-sm text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{tx.amount} {tx.crypto}</p>
                    <p className="text-sm text-gray-400">@ ${tx.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Your Holdings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Asset</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Value</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Cost Basis</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{holding.symbol[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{holding.name}</p>
                          <p className="text-sm text-gray-400">{holding.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white">{holding.amount.toLocaleString()} {holding.symbol}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-semibold text-white">${holding.value.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-gray-400">${holding.cost.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-right">
                        <p className={`font-semibold ${
                          holding.profit >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {holding.profit >= 0 ? '+' : ''}${holding.profit.toLocaleString()}
                        </p>
                        <p className={`text-sm ${
                          holding.profit >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent}%
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
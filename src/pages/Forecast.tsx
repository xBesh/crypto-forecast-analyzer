import { TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const forecastData = [
  { date: '2024-01', actual: 42000, predicted: 42000, upper: 43000, lower: 41000 },
  { date: '2024-02', actual: 43500, predicted: 43200, upper: 44500, lower: 42000 },
  { date: '2024-03', actual: 45000, predicted: 44800, upper: 46200, lower: 43500 },
  { date: '2024-04', actual: 44200, predicted: 46500, upper: 48000, lower: 45000 },
  { date: '2024-05', actual: null, predicted: 48000, upper: 50000, lower: 46000 },
  { date: '2024-06', actual: null, predicted: 50500, upper: 53000, lower: 48000 },
  { date: '2024-07', actual: null, predicted: 52000, upper: 55000, lower: 49000 },
];

const predictions = [
  { 
    crypto: 'Bitcoin', 
    symbol: 'BTC', 
    current: 43250, 
    predicted: 52000, 
    change: 20.2,
    confidence: 85,
    timeframe: '3 months'
  },
  { 
    crypto: 'Ethereum', 
    symbol: 'ETH', 
    current: 2280, 
    predicted: 2850, 
    change: 25.0,
    confidence: 78,
    timeframe: '3 months'
  },
  { 
    crypto: 'Cardano', 
    symbol: 'ADA', 
    current: 0.52, 
    predicted: 0.68, 
    change: 30.8,
    confidence: 72,
    timeframe: '3 months'
  },
];

export default function Forecast() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Price Forecasting</h1>
          <p className="text-gray-400">AI-powered cryptocurrency price predictions</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">Forecast Disclaimer</h3>
            <p className="text-gray-300 text-sm">
              These predictions are based on historical data and machine learning models. 
              Cryptocurrency markets are highly volatile. Always do your own research.
            </p>
          </div>
        </div>

        {/* Main Forecast Chart */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Bitcoin Price Forecast</h2>
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Next 3 Months</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
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
                  color: '#F3F4F6'
                }} 
              />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#colorConfidence)" />
              <Area type="monotone" dataKey="lower" stroke="none" fill="url(#colorConfidence)" />
              <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
              <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#3B82F6' }} />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Actual Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">Predicted Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500/50 rounded-full"></div>
              <span className="text-gray-400">Confidence Range</span>
            </div>
          </div>
        </div>

        {/* Prediction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((pred) => (
            <div
              key={pred.symbol}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{pred.symbol[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{pred.crypto}</h3>
                    <p className="text-sm text-gray-400">{pred.symbol}</p>
                  </div>
                </div>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Current Price</span>
                  <span className="text-white font-semibold">${pred.current.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Predicted Price</span>
                  <span className="text-blue-400 font-semibold">${pred.predicted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Expected Change</span>
                  <span className="text-green-400 font-semibold">+{pred.change}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Timeframe</span>
                  <span className="text-gray-300 text-sm">{pred.timeframe}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400 text-sm">Confidence</span>
                  </div>
                  <span className="text-purple-400 font-semibold">{pred.confidence}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${pred.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
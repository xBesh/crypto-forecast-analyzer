import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, BarChart3, GitCompare, Wallet, LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">CryptoForecast</span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              to="/app/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/app/dashboard')
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/app/forecast"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/app/forecast')
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Forecast</span>
            </Link>

            <Link
              to="/app/compare"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/app/compare')
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span className="font-medium">Compare</span>
            </Link>

            <Link
              to="/app/portfolio"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/app/portfolio')
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Portfolio</span>
            </Link>
          </div>

          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
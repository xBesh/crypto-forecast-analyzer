import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Brain, Shield, Zap, BarChart3, Target } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">CryptoForecast AI</span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-white hover:text-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI-Powered Crypto
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">
              Market Predictions
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Harness the power of OpenAI, Google Gemini, and Anthropic Claude to analyze 
            cryptocurrency markets and predict the next big winners with AI consensus.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-white/20 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Powered by Leading AI Models
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Brain className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Multi-AI Consensus</h3>
              <p className="text-gray-300">
                Combines predictions from OpenAI, Gemini, and Claude for accurate forecasts
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <BarChart3 className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">30-Day Analysis</h3>
              <p className="text-gray-300">
                Deep historical data analysis using CoinGecko API for informed predictions
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
              <Target className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Top 5 Winners</h3>
              <p className="text-gray-300">
                Identifies the most profitable cryptocurrencies for the next 30 days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Make Data-Driven Investment Decisions
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Secure & Private</h3>
                    <p className="text-gray-300">Your API keys are stored locally and never shared</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Real-Time Updates</h3>
                    <p className="text-gray-300">Live market data and instant AI analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">AI Consensus</h3>
                    <p className="text-gray-300">Multiple AI models validate each prediction</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-lg border border-green-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Bitcoin (BTC)</span>
                    <span className="text-green-400 font-bold">+23.4%</span>
                  </div>
                  <div className="text-sm text-gray-300">AI Confidence: 94%</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Ethereum (ETH)</span>
                    <span className="text-green-400 font-bold">+18.7%</span>
                  </div>
                  <div className="text-sm text-gray-300">AI Confidence: 89%</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-4 rounded-lg border border-purple-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Solana (SOL)</span>
                    <span className="text-green-400 font-bold">+31.2%</span>
                  </div>
                  <div className="text-sm text-gray-300">AI Confidence: 87%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Crypto Trading?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of traders using AI-powered predictions to maximize returns
          </p>
          <Link
            to="/signup"
            className="inline-block px-12 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 CryptoForecast AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
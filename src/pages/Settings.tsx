import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Save, Key, Bell, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {/* Crypto Data Provider API Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Key className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Crypto Data Provider API Keys
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CoinMarketCap API Key
            </label>
            <input
              type="password"
              value={localSettings.coinMarketCapKey || ''}
              onChange={(e) => handleChange('coinMarketCapKey', e.target.value)}
              placeholder="Enter your CoinMarketCap API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://coinmarketcap.com/api/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                CoinMarketCap
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CoinGecko API Key
            </label>
            <input
              type="password"
              value={localSettings.coinGeckoKey || ''}
              onChange={(e) => handleChange('coinGeckoKey', e.target.value)}
              placeholder="Enter your CoinGecko API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://www.coingecko.com/en/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                CoinGecko
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CryptoCompare API Key
            </label>
            <input
              type="password"
              value={localSettings.cryptoCompareKey || ''}
              onChange={(e) => handleChange('cryptoCompareKey', e.target.value)}
              placeholder="Enter your CryptoCompare API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://www.cryptocompare.com/cryptopian/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                CryptoCompare
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* AI Provider API Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Key className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Provider API Keys
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={localSettings.openAiKey || ''}
              onChange={(e) => handleChange('openAiKey', e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={localSettings.geminiKey || ''}
              onChange={(e) => handleChange('geminiKey', e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Anthropic API Key
            </label>
            <input
              type="password"
              value={localSettings.anthropicKey || ''}
              onChange={(e) => handleChange('anthropicKey', e.target.value)}
              placeholder="sk-ant-..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Get your API key from{' '}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Anthropic Console
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          {localSettings.theme === 'dark' ? (
            <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Sun className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <select
              value={localSettings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price Alerts
            </span>
            <input
              type="checkbox"
              checked={localSettings.notifications?.priceAlerts ?? true}
              onChange={(e) =>
                handleChange('notifications', {
                  ...localSettings.notifications,
                  priceAlerts: e.target.checked
                })
              }
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Forecast Updates
            </span>
            <input
              type="checkbox"
              checked={localSettings.notifications?.forecastUpdates ?? true}
              onChange={(e) =>
                handleChange('notifications', {
                  ...localSettings.notifications,
                  forecastUpdates: e.target.checked
                })
              }
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Portfolio Changes
            </span>
            <input
              type="checkbox"
              checked={localSettings.notifications?.portfolioChanges ?? true}
              onChange={(e) =>
                handleChange('notifications', {
                  ...localSettings.notifications,
                  portfolioChanges: e.target.checked
                })
              }
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
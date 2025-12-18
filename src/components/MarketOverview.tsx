import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketOverview() {
  const topCryptos = [
    { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: 43250, change: 2.45, marketCap: '845B', color: '#f7931a' },
    { rank: 2, symbol: 'ETH', name: 'Ethereum', price: 2280, change: 3.21, marketCap: '274B', color: '#627eea' },
    { rank: 3, symbol: 'BNB', name: 'Binance Coin', price: 312, change: -1.15, marketCap: '48B', color: '#f3ba2f' },
    { rank: 4, symbol: 'SOL', name: 'Solana', price: 98, change: 5.67, marketCap: '42B', color: '#00d4aa' },
    { rank: 5, symbol: 'ADA', name: 'Cardano', price: 0.52, change: 1.89, marketCap: '18B', color: '#0033ad' }
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2 className="chart-title">Top Cryptocurrencies</h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>#</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 500 }}>Price</th>
              <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 500 }}>24h %</th>
              <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 500 }}>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {topCryptos.map((crypto) => (
              <tr key={crypto.symbol} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>{crypto.rank}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      backgroundColor: `${crypto.color}20`,
                      color: crypto.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600
                    }}>
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{crypto.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>
                  ${crypto.price.toLocaleString()}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <span className={`stat-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                    {crypto.change >= 0 ? <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} /> : <TrendingDown size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                    {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 500 }}>
                  ${crypto.marketCap}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
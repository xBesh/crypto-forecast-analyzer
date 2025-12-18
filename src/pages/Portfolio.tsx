import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import PortfolioChart from '../components/PortfolioChart';

export default function Portfolio() {
  const holdings = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      value: 21625,
      change: 2.45,
      allocation: 45,
      color: '#f7931a'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 5.2,
      value: 11856,
      change: 3.21,
      allocation: 25,
      color: '#627eea'
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: 15,
      value: 4680,
      change: -1.15,
      allocation: 10,
      color: '#f3ba2f'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 50,
      value: 4900,
      change: 5.67,
      allocation: 10,
      color: '#00d4aa'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 9000,
      value: 4680,
      change: 1.89,
      allocation: 10,
      color: '#0033ad'
    }
  ];

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = 2.67;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Portfolio</h1>
        <p className="page-description">Track and manage your cryptocurrency investments</p>
      </div>

      <div className="portfolio-summary">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Portfolio Value</div>
          <div className="portfolio-value">${totalValue.toLocaleString()}</div>
          <div className={`portfolio-change ${totalChange >= 0 ? 'positive' : 'negative'}`}>
            {totalChange >= 0 ? <TrendingUp size={20} style={{ display: 'inline', marginRight: '6px' }} /> : <TrendingDown size={20} style={{ display: 'inline', marginRight: '6px' }} />}
            {totalChange >= 0 ? '+' : ''}{totalChange}% (24h)
          </div>
        </div>
        <PortfolioChart holdings={holdings} />
      </div>

      <div className="holdings-list">
        {holdings.map((holding) => (
          <div key={holding.symbol} className="holding-item">
            <div className="holding-crypto">
              <div className="holding-icon" style={{ backgroundColor: `${holding.color}20`, color: holding.color }}>
                {holding.symbol.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>{holding.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{holding.symbol}</div>
              </div>
            </div>

            <div className="holding-details">
              <div className="holding-detail">
                <span className="holding-detail-label">Amount</span>
                <span className="holding-detail-value">{holding.amount} {holding.symbol}</span>
              </div>
              <div className="holding-detail">
                <span className="holding-detail-label">Value</span>
                <span className="holding-detail-value">${holding.value.toLocaleString()}</span>
              </div>
              <div className="holding-detail">
                <span className="holding-detail-label">Allocation</span>
                <span className="holding-detail-value">{holding.allocation}%</span>
              </div>
            </div>

            <div className={`stat-change ${holding.change >= 0 ? 'positive' : 'negative'}`} style={{ fontSize: '1.125rem' }}>
              {holding.change >= 0 ? <TrendingUp size={18} style={{ display: 'inline', marginRight: '4px' }} /> : <TrendingDown size={18} style={{ display: 'inline', marginRight: '4px' }} />}
              {holding.change >= 0 ? '+' : ''}{holding.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
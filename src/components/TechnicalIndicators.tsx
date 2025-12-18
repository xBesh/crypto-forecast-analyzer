import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TechnicalIndicatorsProps {
  crypto: string;
}

export default function TechnicalIndicators({ crypto }: TechnicalIndicatorsProps) {
  const indicators = [
    { name: 'RSI', value: 65, status: 'Neutral', color: '#3b82f6' },
    { name: 'MACD', value: 72, status: 'Bullish', color: '#10b981' },
    { name: 'Stoch', value: 45, status: 'Neutral', color: '#3b82f6' },
    { name: 'MA', value: 80, status: 'Bullish', color: '#10b981' }
  ];

  const volumeData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    volume: Math.random() * 100 + 50
  }));

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="chart-card">
        <div className="chart-header">
          <h2 className="chart-title">Technical Indicators - {crypto}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {indicators.map((indicator) => (
            <div key={indicator.name} style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-secondary)', 
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>{indicator.name}</span>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  backgroundColor: `${indicator.color}20`,
                  color: indicator.color
                }}>
                  {indicator.status}
                </span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{indicator.value}</div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="day" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1f3a', 
                border: '1px solid #2d3748',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="volume" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
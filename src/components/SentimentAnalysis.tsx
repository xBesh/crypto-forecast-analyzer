import React from 'react';
import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface SentimentAnalysisProps {
  crypto: string;
}

export default function SentimentAnalysis({ crypto }: SentimentAnalysisProps) {
  const sentiment = {
    overall: 72,
    bullish: 65,
    bearish: 20,
    neutral: 15,
    sources: [
      { name: 'Twitter', score: 78, trend: 'up' },
      { name: 'Reddit', score: 65, trend: 'up' },
      { name: 'News', score: 70, trend: 'neutral' },
      { name: 'Forums', score: 68, trend: 'down' }
    ]
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div className="chart-card">
        <div className="chart-header">
          <h2 className="chart-title">Market Sentiment - {crypto}</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{sentiment.overall}%</div>
              <div style={{ color: 'var(--text-secondary)' }}>Overall Sentiment</div>
              <div style={{ 
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--accent-green)',
                display: 'inline-block'
              }}>
                Bullish
              </div>
            </div>
          </div>

          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ marginBottom: '1rem', fontWeight: 600 }}>Sentiment Breakdown</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <ThumbsUp size={18} color="#10b981" />
              <span>Bullish</span>
              <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{sentiment.bullish}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <ThumbsDown size={18} color="#ef4444" />
              <span>Bearish</span>
              <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{sentiment.bearish}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Minus size={18} color="#3b82f6" />
              <span>Neutral</span>
              <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{sentiment.neutral}%</span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '1rem' }}>Sentiment by Source</div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {sentiment.sources.map((source) => (
              <div key={source.name} style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontWeight: 500 }}>{source.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '200px', height: '8px', backgroundColor: 'var(--bg-card)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${source.score}%`, 
                      height: '100%', 
                      backgroundColor: source.score >= 70 ? '#10b981' : source.score >= 50 ? '#3b82f6' : '#ef4444',
                      transition: 'width 0.3s'
                    }}></div>
                  </div>
                  <span style={{ fontWeight: 600, minWidth: '40px' }}>{source.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
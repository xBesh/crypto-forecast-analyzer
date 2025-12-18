import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  timeframe: string;
}

export default function PriceChart({ timeframe }: PriceChartProps) {
  const generateData = () => {
    const basePrice = 43000;
    const points = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 12;
    
    return Array.from({ length: points }, (_, i) => ({
      time: timeframe === '24h' ? `${i}:00` : 
            timeframe === '7d' ? `Day ${i + 1}` :
            timeframe === '30d' ? `${i + 1}` :
            `M${i + 1}`,
      price: basePrice + Math.random() * 5000 - 2500
    }));
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
        <XAxis dataKey="time" stroke="#a0aec0" />
        <YAxis stroke="#a0aec0" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a1f3a', 
            border: '1px solid #2d3748',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
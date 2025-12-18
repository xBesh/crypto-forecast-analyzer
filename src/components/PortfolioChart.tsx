import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Holding {
  symbol: string;
  name: string;
  allocation: number;
  color: string;
}

interface PortfolioChartProps {
  holdings: Holding[];
}

export default function PortfolioChart({ holdings }: PortfolioChartProps) {
  const data = holdings.map(h => ({
    name: h.symbol,
    value: h.allocation,
    color: h.color
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a1f3a', 
            border: '1px solid #2d3748',
            borderRadius: '8px'
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
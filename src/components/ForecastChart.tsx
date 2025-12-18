import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ForecastChart() {
  const data = [
    { day: 'Mon', actual: 43000, predicted: 43000 },
    { day: 'Tue', actual: 43500, predicted: 43200 },
    { day: 'Wed', actual: 42800, predicted: 43800 },
    { day: 'Thu', actual: 44200, predicted: 44500 },
    { day: 'Fri', actual: null, predicted: 45800 },
    { day: 'Sat', actual: null, predicted: 47200 },
    { day: 'Sun', actual: null, predicted: 48500 }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
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
        <Legend />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Actual Price"
          dot={{ fill: '#3b82f6', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Predicted Price"
          dot={{ fill: '#8b5cf6', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
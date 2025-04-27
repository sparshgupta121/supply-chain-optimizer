import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

interface PerformanceMetricsCardProps {
  title: string;
  value: string;
  change: number;
  timeframe: string;
  chartData: number[];
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({
  title,
  value,
  change,
  timeframe,
  chartData,
}) => {
  const isPositive = change > 0;
  const data = chartData.map((value) => ({ value }));
  
  // Determine color based on whether increase is good (depends on metric)
  const getIndicatorColor = () => {
    if (title.includes('Cost') || title.includes('Lead Time')) {
      return !isPositive ? 'text-success-500' : 'text-error-500';
    }
    return isPositive ? 'text-success-500' : 'text-error-500';
  };
  
  const getStrokeColor = () => {
    if (title.includes('Cost') || title.includes('Lead Time')) {
      return !isPositive ? '#22c55e' : '#ef4444';
    }
    return isPositive ? '#22c55e' : '#ef4444';
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
      
      <div className="h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={getStrokeColor()} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center mt-2">
        <div className={`flex items-center ${getIndicatorColor()}`}>
          {isPositive ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
        <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">{timeframe}</span>
      </div>
    </div>
  );
};

export default PerformanceMetricsCard;
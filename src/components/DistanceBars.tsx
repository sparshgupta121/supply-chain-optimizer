import React, { useState, useEffect } from 'react';
import { DistanceBar } from '../types';
import { generateDistanceBars } from '../utils/mockData';

interface DistanceBarsProps {
  isRunning: boolean;
}

const DistanceBars: React.FC<DistanceBarsProps> = ({ isRunning }) => {
  const [bars, setBars] = useState<DistanceBar[]>(generateDistanceBars());
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setBars(generateDistanceBars());
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const getEfficiencyColor = (efficiency: DistanceBar['efficiency']) => {
    switch (efficiency) {
      case 'high':
        return 'bg-green-400';
      case 'medium':
        return 'bg-yellow-400';
      case 'low':
        return 'bg-red-400';
    }
  };
  
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Key Timeframes</h2>
      
      <div className="space-y-4">
        {bars.map((bar) => {
          const percentage = (bar.value / bar.max) * 100;
          
          return (
            <div key={bar.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">{bar.name}</span>
                <span className="text-sm font-medium">
                  {bar.value} <span className="text-gray-500">{bar.unit}</span>
                </span>
              </div>
              
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${getEfficiencyColor(bar.efficiency)}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 {bar.unit}</span>
                <span>{bar.max} {bar.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistanceBars;

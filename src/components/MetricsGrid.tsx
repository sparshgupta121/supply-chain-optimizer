import React, { useState, useEffect } from 'react';
import { Metric } from '../types';
import { Activity, Package, Truck, BarChart3 } from 'lucide-react';
import { generateMetrics } from '../utils/mockData';

interface MetricsGridProps {
  isRunning: boolean;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ isRunning }) => {
  const [metrics, setMetrics] = useState<Metric[]>(generateMetrics());
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const getIcon = (id: string) => {
    switch (id) {
      case '1':
        return <Package size={24} />;
      case '2':
        return <Activity size={24} />;
      case '3':
        return <Truck size={24} />;
      case '4':
        return <BarChart3 size={24} />;
      default:
        return <Activity size={24} />;
    }
  };
  
  const getStatusColor = (status: Metric['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-700 text-green-300';
      case 'warning':
        return 'bg-yellow-700 text-yellow-300';
      case 'critical':
        return 'bg-red-700 text-red-300';
    }
  };
  
  const getIconColor = (status: Metric['status']) => {
    switch (status) {
      case 'optimal':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((metric) => (
        <div 
          key={metric.id}
          className="bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full ${getStatusColor(metric.status)} bg-opacity-30`}>
              <div className={`p-1 ${getIconColor(metric.status)}`}>
                {getIcon(metric.id)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-300">{metric.name}</h3>
          </div>
          <div className="ml-2">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              {metric.unit && (
                <span className="text-sm text-gray-400 mb-1">{metric.unit}</span>
              )}
            </div>
            <span
              className={`inline-block px-2 py-0.5 text-xs rounded-full ${getStatusColor(metric.status)}`}
            >
              {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;

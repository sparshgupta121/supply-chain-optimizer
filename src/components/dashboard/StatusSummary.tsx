import React from 'react';
import { AlertCircle as CircleAlert, TrendingDown, TrendingUp } from 'lucide-react';
import { PerformanceMetrics } from '../../stores/supplyChainStore';

interface StatusSummaryProps {
  metrics: PerformanceMetrics;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ metrics }) => {
  // Calculate overall status based on metrics
  const getOverallStatus = () => {
    const averageScore = (
      metrics.resilience + 
      metrics.efficiency + 
      (metrics.orderFulfillmentRate * 100)
    ) / 3;
    
    if (averageScore >= 85) return 'Optimal';
    if (averageScore >= 70) return 'Good';
    if (averageScore >= 50) return 'Needs Attention';
    return 'Critical';
  };
  
  const getStatusColor = () => {
    const status = getOverallStatus();
    switch (status) {
      case 'Optimal': return 'bg-success-500';
      case 'Good': return 'bg-accent-500';
      case 'Needs Attention': return 'bg-warning-500';
      case 'Critical': return 'bg-error-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Supply Chain Status</h2>
      
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()} mr-2`}></div>
        <span className="text-lg font-medium">{getOverallStatus()}</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
          <div className="flex items-center">
            <span className="font-medium">{metrics.efficiency}%</span>
            <TrendingUp size={16} className="ml-1 text-success-500" />
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-secondary-500 h-2 rounded-full" 
            style={{ width: `${metrics.efficiency}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Resilience</span>
          <div className="flex items-center">
            <span className="font-medium">{metrics.resilience}%</span>
            <TrendingUp size={16} className="ml-1 text-success-500" />
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full" 
            style={{ width: `${metrics.resilience}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Order Fulfillment</span>
          <div className="flex items-center">
            <span className="font-medium">{(metrics.orderFulfillmentRate * 100).toFixed(1)}%</span>
            <TrendingDown size={16} className="ml-1 text-error-500" />
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-accent-500 h-2 rounded-full" 
            style={{ width: `${metrics.orderFulfillmentRate * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg flex items-start">
        <CircleAlert size={18} className="text-amber-600 dark:text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 dark:text-amber-300 text-sm">
          Potential disruption detected: Weather conditions in Southeast Asia may impact shipping times.
        </p>
      </div>
    </div>
  );
};

export default StatusSummary;
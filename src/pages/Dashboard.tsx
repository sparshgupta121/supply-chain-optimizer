import React, { useEffect } from 'react';
import { useSupplyChainStore } from '../stores/supplyChainStore';
import SupplyChainVisualization from '../components/visualization/SupplyChainVisualization';
import PerformanceMetricsCard from '../components/dashboard/PerformanceMetricsCard';
import RecommendationList from '../components/dashboard/RecommendationList';
import StatusSummary from '../components/dashboard/StatusSummary';
import { ChevronRight, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    metrics, 
    recommendations, 
    nodes, 
    links, 
    runOptimization 
  } = useSupplyChainStore();
  
  useEffect(() => {
    // Initial data fetch would happen here in a real app
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supply Chain Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor performance and optimize your supply chain in real-time
          </p>
        </div>
        <button 
          onClick={() => runOptimization()}
          className="btn btn-primary flex items-center space-x-2"
        >
          <RefreshCw size={16} />
          <span>Run Optimization</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card h-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Supply Chain Network</h2>
              <button className="text-primary-600 text-sm font-medium flex items-center">
                <span>View Details</span>
                <ChevronRight size={16} />
              </button>
            </div>
            <SupplyChainVisualization nodes={nodes} links={links} />
          </div>
        </div>
        
        <div className="space-y-6">
          <StatusSummary metrics={metrics} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <PerformanceMetricsCard 
          title="Total Cost" 
          value={`$${metrics.totalCost.toLocaleString()}`} 
          change={-5.3} 
          timeframe="vs. Last Month"
          chartData={[65, 59, 80, 81, 56, 55, 40, 56, 76, 85, 101, 98]}
        />
        <PerformanceMetricsCard 
          title="Lead Time" 
          value={`${metrics.averageLeadTime} days`} 
          change={-2.1} 
          timeframe="vs. Last Month"
          chartData={[28, 25, 26, 24, 20, 18, 15, 17, 18, 16, 14, 12]}
        />
        <PerformanceMetricsCard 
          title="Order Fulfillment" 
          value={`${(metrics.orderFulfillmentRate * 100).toFixed(1)}%`} 
          change={3.8} 
          timeframe="vs. Last Month"
          chartData={[85, 82, 84, 87, 86, 90, 91, 89, 90, 92, 94, 93]}
        />
        <PerformanceMetricsCard 
          title="Resilience Score" 
          value={metrics.resilience.toString()} 
          change={5.2} 
          timeframe="vs. Last Month"
          chartData={[65, 68, 67, 64, 63, 65, 68, 70, 71, 73, 76, 79]}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">AI Recommendations</h2>
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
          <div className="space-y-4">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
              <p className="text-primary-800 dark:text-primary-300 text-sm">
                <span className="font-semibold">Bottleneck detected</span> at Distribution Center A due to limited capacity and increasing demand from Retail Center 1.
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' /* light warning background */ }}>
  <p className="text-sm" style={{ color: '#92400E' /* dark warning text color */ }}>
    <span style={{ fontWeight: '600' }}>Risk alert:</span> Supplier B has unreliable delivery times, affecting manufacturing schedule reliability.
  </p>
</div>

<div className="p-3 rounded-lg" style={{ backgroundColor: '#D1FAE5' /* light green */ }}>
  <p className="text-sm" style={{ color: '#065F46' /* dark green */ }}>
    <span style={{ fontWeight: '600' }}>Opportunity:</span> Adding a distribution center in Brisbane could reduce delivery times to Australia by 30%.
  </p>
</div>

            <div className="p-3 bg-secondary-50 dark:bg-secondary-900/30 rounded-lg">
              <p className="text-secondary-800 dark:text-secondary-300 text-sm">
                <span className="font-semibold">Efficiency gain:</span> Inventory turnover has improved by 12% over the last quarter due to better demand forecasting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
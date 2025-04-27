import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, Download, Filter } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  // Sample data for charts
  const performanceData = [
    { month: 'Jan', cost: 23500, leadTime: 4.2, fulfillment: 89 },
    { month: 'Feb', cost: 24200, leadTime: 4.1, fulfillment: 88 },
    { month: 'Mar', cost: 26800, leadTime: 3.9, fulfillment: 90 },
    { month: 'Apr', cost: 25900, leadTime: 3.8, fulfillment: 91 },
    { month: 'May', cost: 25200, leadTime: 3.7, fulfillment: 93 },
    { month: 'Jun', cost: 25600, leadTime: 3.6, fulfillment: 92 },
    { month: 'Jul', cost: 27650, leadTime: 3.6, fulfillment: 93 },
  ];
  
  const nodePerformanceData = [
    { name: 'Supplier A', reliability: 85, utilization: 75, cost: 100 },
    { name: 'Supplier B', reliability: 75, utilization: 50, cost: 80 },
    { name: 'Manufacturing 1', reliability: 90, utilization: 95, cost: 200 },
    { name: 'Manufacturing 2', reliability: 82, utilization: 78, cost: 180 },
    { name: 'Distribution A', reliability: 95, utilization: 85, cost: 120 },
    { name: 'Retail 1', reliability: 92, utilization: 90, cost: 150 },
    { name: 'Retail 2', reliability: 94, utilization: 88, cost: 140 },
  ];
  
  const riskAssessmentData = [
    { factor: 'Weather Disruption', probability: 35, impact: 70, risk: 24.5 },
    { factor: 'Supplier Failure', probability: 20, impact: 90, risk: 18 },
    { factor: 'Demand Fluctuation', probability: 60, impact: 50, risk: 30 },
    { factor: 'Transportation Delay', probability: 45, impact: 60, risk: 27 },
    { factor: 'Quality Issues', probability: 25, impact: 80, risk: 20 },
    { factor: 'Political Factors', probability: 15, impact: 95, risk: 14.25 },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive view of supply chain performance and optimization opportunities
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
            <Filter size={18} className="mr-2" />
            <span>Filter</span>
          </button>
          <button className="btn btn-primary flex items-center">
            <Download size={18} className="mr-2" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Supply Chain Performance Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cost" 
                name="Total Cost ($)" 
                stroke="#3b82f6" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="leadTime" 
                name="Lead Time (days)" 
                stroke="#14b8a6" 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="fulfillment" 
                name="Fulfillment Rate (%)" 
                stroke="#f59e0b" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Node Performance Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nodePerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reliability" name="Reliability (%)" fill="#3b82f6" />
                <Bar dataKey="utilization" name="Utilization (%)" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Risk Assessment Matrix</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskAssessmentData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="factor" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="probability" name="Probability (%)" fill="#3b82f6" />
                <Bar dataKey="impact" name="Impact (%)" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Inventory Turnover</span>
                <span className="font-medium">4.2 times/year</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full" 
                  style={{ width: '70%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Target: 6.0</span>
                <span>Industry Avg: 3.8</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">CO2 Emissions</span>
                <span className="font-medium">15,420 tons</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-error-500 h-2 rounded-full" 
                  style={{ width: '85%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Target: 12,000</span>
                <span>Industry Avg: 17,500</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Cost per Unit</span>
                <span className="font-medium">$8.50</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-success-500 h-2 rounded-full" 
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Target: $7.00</span>
                <span>Industry Avg: $9.20</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</span>
                <span className="font-medium">91.5%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-accent-500 h-2 rounded-full" 
                  style={{ width: '91.5%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Target: 95%</span>
                <span>Industry Avg: 88%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Optimization Impact</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-xl">
                14%
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Cost Reduction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Potential monthly savings of $3,850
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 font-bold text-xl">
                22%
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Lead Time Reduction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average decrease of 0.8 days
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 font-bold text-xl">
                8%
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Reliability Increase</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Improved on-time delivery by 5.3%
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 font-bold text-xl">
                17%
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">CO2 Reduction</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Decrease of 2,600 tons annually
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
          <div className="space-y-4">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-500 rounded-r-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Pattern detected:</span> Seasonal demand variations correlate with 85% increase in stockouts at Retail Center 1.
              </p>
              <a href="#" className="text-primary-600 dark:text-primary-400 text-sm flex items-center mt-2">
                <span>View detailed analysis</span>
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="p-3 bg-secondary-50 dark:bg-secondary-900/30 border-l-4 border-secondary-500 rounded-r-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Efficiency opportunity:</span> Consolidating shipments from Manufacturing Plants 1 and 2 could reduce transportation costs by 12%.
              </p>
              <a href="#" className="text-secondary-600 dark:text-secondary-400 text-sm flex items-center mt-2">
                <span>View implementation plan</span>
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="p-3 bg-accent-50 dark:bg-accent-900/30 border-l-4 border-accent-500 rounded-r-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Multi-objective optimization:</span> Balancing cost, time, and reliability could improve overall performance by 16%.
              </p>
              <a href="#" className="text-accent-600 dark:text-accent-400 text-sm flex items-center mt-2">
                <span>View optimization model</span>
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
            
            <div className="p-3 bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-500 rounded-r-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Predictive insight:</span> Based on current trends, expect a 20% increase in demand from Retail Center 2 in Q3.
              </p>
              <a href="#" className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-2">
                <span>View forecast details</span>
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
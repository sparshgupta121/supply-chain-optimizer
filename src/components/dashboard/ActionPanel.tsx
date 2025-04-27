import React from 'react';
import { Download, Upload, RefreshCw, Save } from 'lucide-react';
import { useSupplyChainStore } from '../../stores/supplyChainStore';

const ActionPanel: React.FC = () => {
  const { runOptimization, initializeRL } = useSupplyChainStore();

  const handleRunSimulation = () => {
    // Initialize RL before running simulation
    initializeRL();
    runOptimization();
  };

  const handleImportData = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // Handle imported data
            console.log('Imported data:', data);
          } catch (error) {
            console.error('Error parsing import file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportReport = () => {
    const data = {
      // Add your export data structure here
      timestamp: new Date().toISOString(),
      metrics: {
        // Add relevant metrics
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supply-chain-report-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveConfiguration = () => {
    // Save current configuration to localStorage
    const config = {
      // Add configuration data
      timestamp: new Date().toISOString(),
      // Add other config data
    };
    localStorage.setItem('supplyChainConfig', JSON.stringify(config));
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-2">
        <button 
          onClick={handleRunSimulation}
          className="w-full btn btn-primary flex items-center justify-center"
        >
          <RefreshCw size={16} className="mr-2" />
          <span>Run Simulation</span>
        </button>
        
        <button 
          onClick={handleImportData}
          className="w-full btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
        >
          <Upload size={16} className="mr-2" />
          <span>Import Data</span>
        </button>
        
        <button 
          onClick={handleExportReport}
          className="w-full btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
        >
          <Download size={16} className="mr-2" />
          <span>Export Report</span>
        </button>
        
        <button 
          onClick={handleSaveConfiguration}
          className="w-full btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center"
        >
          <Save size={16} className="mr-2" />
          <span>Save Configuration</span>
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Optimization Focus</h3>
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            Cost Reduction
          </span>
          <span className="badge bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300">
            Time Optimization
          </span>
          <span className="badge bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300">
            Reliability
          </span>
          <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Sustainability
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
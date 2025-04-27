import React, { useState } from 'react';
import ActionDisplay from './components/ActionDisplay';
import MetricsGrid from './components/MetricsGrid';
import DistanceBars from './components/DistanceBars';
import PerformanceMetrics from './components/PerformanceMetrics';
import TimeSeriesChart from './components/TimeSeriesChart';
import DashboardHeader from './components/DashboardHeader';
import WarehouseDetails from './components/WarehouseDetails';

function Project() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  return (
    <>   

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DashboardHeader isRunning={isRunning} toggleRunning={toggleRunning} />

        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Action Display Panel */}
            <div className="mb-4 card">
              <ActionDisplay isRunning={isRunning} />
            </div>

            {/* Metrics Grid */}
            <div className="mb-6 card">
              <MetricsGrid isRunning={isRunning} />
            </div>

            {/* Main Dashboard Section */}
              <div className="card">
                <TimeSeriesChart isRunning={isRunning} />
              </div>
              <div className="card">
                <DistanceBars isRunning={isRunning} />
              </div>

            {/* Warehouse Details */}
            <div className="mb-6 card">
              <WarehouseDetails isRunning={isRunning} />
            </div>

            {/* Performance Metrics Table */}
            <div className="mb-6 card">
              <PerformanceMetrics isRunning={isRunning} />
            </div>
          </div>
        </div>

        <footer className="bg-white dark:bg-gray-800 py-4 px-6 mt-6">
          <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            Supply Chain Dashboard with Real-time Metrics • {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </>
  );
}

export default Project;

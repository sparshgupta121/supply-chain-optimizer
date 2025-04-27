import React, { useState, useEffect } from 'react';
import { PerformanceMetric } from '../types';
import { generatePerformanceMetrics } from '../utils/mockData';

interface PerformanceMetricsProps {
  isRunning: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ isRunning }) => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(generatePerformanceMetrics());

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMetrics(generatePerformanceMetrics());
    }, 5500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'optimal':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold mb-3">Performance Metrics</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Metric
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Current
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Average
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Min
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Max
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {metrics.map((metric) => (
              <tr key={metric.id} className="transition-colors hover:bg-gray-800">
                <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-100">
                  {metric.name}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-100 font-medium">
                  {metric.current} {metric.unit}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">
                  {metric.average} {metric.unit}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">
                  {metric.min} {metric.unit}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-400">
                  {metric.max} {metric.unit}
                </td>
                <td className={`px-3 py-3 whitespace-nowrap text-sm font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

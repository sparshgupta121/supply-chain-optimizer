import React, { useState, useEffect } from 'react';
import { TimeSeriesData } from '../types';
import { generateTimeSeriesData } from '../utils/mockData';

interface TimeSeriesChartProps {
  isRunning: boolean;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ isRunning }) => {
  const [data, setData] = useState<TimeSeriesData[]>(generateTimeSeriesData());
  const [activeMetric, setActiveMetric] = useState<'stock' | 'efficiency' | 'vehicles'>('stock');
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      setData(generateTimeSeriesData());
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const getMetricData = () => {
    switch (activeMetric) {
      case 'stock':
        return {
          values: data.map(d => d.stockLevel),
          color: 'bg-blue-400',
          label: 'Stock Level',
          unit: 'units'
        };
      case 'efficiency':
        return {
          values: data.map(d => d.efficiency),
          color: 'bg-green-400',
          label: 'Efficiency',
          unit: '%'
        };
      case 'vehicles':
        return {
          values: data.map(d => ({ available: d.availableVehicles, dispatched: d.dispatchedVehicles })),
          color: 'bg-purple-400',
          label: 'Vehicles',
          unit: 'units'
        };
    }
  };
  
  const metricData = getMetricData();
  const maxValue = activeMetric === 'vehicles' 
    ? Math.max(...metricData.values.map(v => (v as { available: number, dispatched: number }).available + (v as { available: number, dispatched: number }).dispatched))
    : Math.max(...metricData.values as number[]);

  const getHeight = (value: number) => `${(value / maxValue) * 100}%`;

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Performance Over Time</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMetric('stock')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeMetric === 'stock' ? 'bg-blue-200 text-blue-700' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Stock
          </button>
          <button
            onClick={() => setActiveMetric('efficiency')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeMetric === 'efficiency' ? 'bg-green-200 text-green-700' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Efficiency
          </button>
          <button
            onClick={() => setActiveMetric('vehicles')}
            className={`px-3 py-1 rounded-full text-sm ${
              activeMetric === 'vehicles' ? 'bg-purple-200 text-purple-700' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Vehicles
          </button>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between gap-1">
        {data.map((point, index) => (
          <div key={index} className="flex-1 h-full flex flex-col justify-end group relative">
            {activeMetric === 'vehicles' ? (
              <>
                <div
                  className="w-full bg-purple-500 transition-all duration-500"
                  style={{ height: getHeight(point.availableVehicles) }}
                />
                <div
                  className="w-full bg-purple-300 transition-all duration-500"
                  style={{ height: getHeight(point.dispatchedVehicles) }}
                />
              </>
            ) : (
              <div
                className={`w-full ${metricData.color} transition-all duration-500`}
                style={{ 
                  height: getHeight(
                    activeMetric === 'stock' ? point.stockLevel : point.efficiency
                  )
                }}
              />
            )}
            
            {/* Hover tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap z-10 mb-2">
              <p className="font-semibold">{point.time}</p>
              {activeMetric === 'vehicles' ? (
                <>
                  <p>Available: {point.availableVehicles}</p>
                  <p>Dispatched: {point.dispatchedVehicles}</p>
                </>
              ) : (
                <p>{metricData.label}: {activeMetric === 'stock' ? point.stockLevel : point.efficiency}{metricData.unit}</p>
              )}
            </div>
            
            {/* X-axis label */}
            <div className="text-xs text-gray-500 mt-1 truncate">{point.time}</div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex mt-4 justify-center gap-6">
        {activeMetric === 'vehicles' ? (
          <>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 mr-1"></div>
              <span className="text-xs text-gray-300">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-300 mr-1"></div>
              <span className="text-xs text-gray-300">Dispatched</span>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <div className={`w-3 h-3 ${metricData.color} mr-1`}></div>
            <span className="text-xs text-gray-300">{metricData.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSeriesChart;

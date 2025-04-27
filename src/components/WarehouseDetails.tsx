import React, { useState, useEffect } from 'react';
import { Warehouse } from '../types';
import { generateWarehouses } from '../utils/mockData';
import { Truck, Package, BarChart2 } from 'lucide-react';

interface WarehouseDetailsProps {
  isRunning: boolean;
}

const WarehouseDetails: React.FC<WarehouseDetailsProps> = ({ isRunning }) => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(generateWarehouses());
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [animatingStock, setAnimatingStock] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const newWarehouses = generateWarehouses();
      setWarehouses(prev => {
        const changed = newWarehouses.find((w, i) => w.currentStock !== prev[i].currentStock);
        if (changed) {
          setAnimatingStock(changed.id);
          setTimeout(() => setAnimatingStock(null), 2000);
        }
        return newWarehouses;
      });

      if (selectedWarehouse) {
        setSelectedWarehouse(
          newWarehouses.find(w => w.id === selectedWarehouse.id) || null
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning, selectedWarehouse]);

  const getStatusColor = (status: Warehouse['status']) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-600 text-green-100';
      case 'warning':
        return 'bg-yellow-600 text-yellow-100';
      case 'critical':
        return 'bg-red-600 text-red-100';
    }
  };

  const getVehicleStatusColor = (status: 'available' | 'dispatched' | 'maintenance') => {
    switch (status) {
      case 'available':
        return 'bg-green-600 text-green-100';
      case 'dispatched':
        return 'bg-blue-600 text-blue-100';
      case 'maintenance':
        return 'bg-red-600 text-red-100';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold text-white mb-4">Warehouse Network</h2>

      <div className="relative">
        {/* Animated truck */}
        {isRunning && (
          <div className="absolute top-1/2 left-0 w-full overflow-hidden h-0">
            <div className="animate-truck absolute">
              <Truck size={24} className="text-blue-400" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              onClick={() => setSelectedWarehouse(warehouse)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all relative
                ${selectedWarehouse?.id === warehouse.id ? 'border-blue-500 bg-blue-800' : 'border-gray-700 hover:border-blue-400'}
                ${animatingStock === warehouse.id ? 'animate-stock' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white">{warehouse.name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(warehouse.status)}`}>
                  {warehouse.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{warehouse.location}</p>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Capacity: {warehouse.capacity}</span>
                <span className={animatingStock === warehouse.id ? 'font-bold text-blue-300' : ''}>
                  Stock: {warehouse.currentStock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedWarehouse && (
        <div className="border-t pt-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capacity Information */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Package size={18} />
                Capacity Utilization
              </h4>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${(selectedWarehouse.currentStock / selectedWarehouse.capacity) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{selectedWarehouse.currentStock} units</span>
                <span>{selectedWarehouse.capacity} units</span>
              </div>
            </div>

            {/* Vehicle Status */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Truck size={18} />
                Vehicle Fleet
              </h4>
              <div className="space-y-1">
                {['available', 'dispatched', 'maintenance'].map((status) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{status}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getVehicleStatusColor(status as any)}`}>
                      {selectedWarehouse.vehicles.filter(v => v.status === status).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <BarChart2 size={18} />
                Performance
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Efficiency</span>
                  <span className="text-sm font-medium">{selectedWarehouse.efficiency}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utilization Rate</span>
                  <span className="text-sm font-medium">{selectedWarehouse.utilizationRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mt-6">
            <h4 className="font-medium text-white mb-3">Vehicle Fleet Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedWarehouse.vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`
                    p-3 rounded-lg border border-gray-700 space-y-2 transition-all
                    ${vehicle.status === 'dispatched' ? 'animate-pulse' : ''}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-sm font-medium">{vehicle.type}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getVehicleStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Capacity</span>
                      <span>{vehicle.capacity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Current Load</span>
                      <span>{vehicle.currentLoad} units</span>
                    </div>
                    {vehicle.status === 'dispatched' && (
                      <div className="h-1 bg-gray-600 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-blue-500 animate-loading" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseDetails;

export interface Metric {
  id: string;
  name: string;
  value: number | string;
  unit?: string;
  status: 'optimal' | 'warning' | 'critical';
  icon?: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  current: number;
  average: number;
  min: number;
  max: number;
  status: 'optimal' | 'warning' | 'critical';
  unit?: string;
}

export interface ActionLog {
  id: string;
  message: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface TimeSeriesData {
  time: string;
  stockLevel: number;
  efficiency: number;
  fulfillmentTime: number;
  availableVehicles: number;
  dispatchedVehicles: number;
}

export interface DistanceBar {
  id: string;
  name: string;
  value: number;
  max: number;
  unit: string;
  efficiency: 'high' | 'medium' | 'low';
}

export interface Vehicle {
  id: string;
  status: 'available' | 'dispatched' | 'maintenance';
  capacity: number;
  currentLoad: number;
  type: 'truck' | 'van' | 'cargo';
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  vehicles: Vehicle[];
  efficiency: number;
  utilizationRate: number;
  status: 'optimal' | 'warning' | 'critical';
}
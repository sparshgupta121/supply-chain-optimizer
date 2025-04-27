import { ActionLog, DistanceBar, Metric, PerformanceMetric, TimeSeriesData, Vehicle, Warehouse } from '../types';

// Generate random number between min and max
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random status based on value
export const getRandomStatus = (): 'optimal' | 'warning' | 'critical' => {
  const random = Math.random();
  if (random > 0.7) return 'warning';
  if (random > 0.9) return 'critical';
  return 'optimal';
};

// Generate mock vehicles
export const generateVehicles = (count: number): Vehicle[] => {
  const vehicles: Vehicle[] = [];
  const types: Vehicle['type'][] = ['truck', 'van', 'cargo'];
  const statuses: Vehicle['status'][] = ['available', 'dispatched', 'maintenance'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const capacity = type === 'truck' ? 1000 : type === 'van' ? 500 : 2000;
    
    vehicles.push({
      id: `v${i + 1}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      capacity,
      currentLoad: getRandomNumber(0, capacity),
      type,
    });
  }
  
  return vehicles;
};

// Generate mock warehouses
export const generateWarehouses = (): Warehouse[] => {
  return [
    {
      id: 'w1',
      name: 'Central Warehouse',
      location: 'Chicago, IL',
      capacity: 10000,
      currentStock: getRandomNumber(6000, 9000),
      vehicles: generateVehicles(8),
      efficiency: getRandomNumber(75, 95),
      utilizationRate: getRandomNumber(60, 90),
      status: getRandomStatus(),
    },
    {
      id: 'w2',
      name: 'East Coast Hub',
      location: 'New York, NY',
      capacity: 8000,
      currentStock: getRandomNumber(4000, 7000),
      vehicles: generateVehicles(6),
      efficiency: getRandomNumber(70, 90),
      utilizationRate: getRandomNumber(65, 85),
      status: getRandomStatus(),
    },
    {
      id: 'w3',
      name: 'West Coast Center',
      location: 'Los Angeles, CA',
      capacity: 12000,
      currentStock: getRandomNumber(7000, 11000),
      vehicles: generateVehicles(10),
      efficiency: getRandomNumber(80, 95),
      utilizationRate: getRandomNumber(70, 90),
      status: getRandomStatus(),
    },
  ];
};

// Generate mock metrics
export const generateMetrics = (): Metric[] => {
  const warehouses = generateWarehouses();
  const totalVehicles = warehouses.reduce((acc, w) => acc + w.vehicles.length, 0);
  const availableVehicles = warehouses.reduce(
    (acc, w) => acc + w.vehicles.filter(v => v.status === 'available').length,
    0
  );
  
  return [
    {
      id: '1',
      name: 'Total Stock Level',
      value: warehouses.reduce((acc, w) => acc + w.currentStock, 0),
      unit: 'units',
      status: getRandomStatus(),
    },
    {
      id: '2',
      name: 'Available Vehicles',
      value: `${availableVehicles}/${totalVehicles}`,
      status: availableVehicles < totalVehicles * 0.3 ? 'critical' : 
             availableVehicles < totalVehicles * 0.5 ? 'warning' : 'optimal',
    },
    {
      id: '3',
      name: 'Order Fulfillment',
      value: getRandomNumber(70, 99),
      unit: '%',
      status: getRandomStatus(),
    },
    {
      id: '4',
      name: 'Supply Chain Efficiency',
      value: getRandomNumber(60, 95),
      unit: '%',
      status: getRandomStatus(),
    },
  ];
};

// Generate mock performance metrics
export const generatePerformanceMetrics = (): PerformanceMetric[] => {
  return [
    {
      id: '1',
      name: 'Stock Level',
      current: getRandomNumber(100, 200),
      average: 120,
      min: 100,
      max: 200,
      status: getRandomStatus(),
      unit: 'units',
    },
    {
      id: '2',
      name: 'Delivery Time',
      current: getRandomNumber(2, 5),
      average: 3.5,
      min: 2,
      max: 7,
      status: getRandomStatus(),
      unit: 'days',
    },
    {
      id: '3',
      name: 'Order Processing',
      current: getRandomNumber(1, 4),
      average: 2.1,
      min: 1,
      max: 5,
      status: getRandomStatus(),
      unit: 'hours',
    },
    {
      id: '4',
      name: 'Fulfillment Rate',
      current: getRandomNumber(80, 98),
      average: 90,
      min: 75,
      max: 100,
      status: getRandomStatus(),
      unit: '%',
    },
  ];
};

// Generate mock distance bars
export const generateDistanceBars = (): DistanceBar[] => {
  return [
    {
      id: '1',
      name: 'Inventory Restocking Time',
      value: getRandomNumber(3, 10),
      max: 14,
      unit: 'days',
      efficiency: Math.random() > 0.7 ? 'medium' : Math.random() > 0.9 ? 'low' : 'high',
    },
    {
      id: '2',
      name: 'Order Delivery Time',
      value: getRandomNumber(1, 5),
      max: 7,
      unit: 'days',
      efficiency: Math.random() > 0.7 ? 'medium' : Math.random() > 0.9 ? 'low' : 'high',
    },
    {
      id: '3',
      name: 'Order Processing Time',
      value: getRandomNumber(1, 4),
      max: 8,
      unit: 'hours',
      efficiency: Math.random() > 0.7 ? 'medium' : Math.random() > 0.9 ? 'low' : 'high',
    },
  ];
};

// Generate mock action messages
export const generateActionMessage = (): ActionLog => {
  const actions = [
    'Increasing inventory at Warehouse A by 15%',
    'Rerouting shipments from Supplier B to Warehouse C',
    'Optimizing delivery routes to reduce transit time by 12%',
    'Adjusting stock levels based on predicted demand spike',
    'Reallocating resources from Warehouse B to Warehouse A',
    'Reducing order processing time by 8%',
    'Inventory level low at Warehouse B, initiating restocking',
    'Detected bottleneck at Distribution Center C, redistributing load',
    'Predicted demand increase, preemptively increasing production',
    'Weather delay detected, rerouting shipments via alternate route',
  ];
  
  const types: ('info' | 'warning' | 'success' | 'error')[] = ['info', 'warning', 'success', 'error'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  
  return {
    id: Date.now().toString(),
    message: randomAction,
    timestamp: new Date(),
    type: randomType,
  };
};

// Generate mock time series data
export const generateTimeSeriesData = (): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      stockLevel: getRandomNumber(90, 180),
      efficiency: getRandomNumber(60, 95),
      fulfillmentTime: getRandomNumber(2, 8),
      availableVehicles: getRandomNumber(15, 25),
      dispatchedVehicles: getRandomNumber(10, 20),
    });
  }
  
  return data;
};
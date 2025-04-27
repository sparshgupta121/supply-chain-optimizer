import { create } from 'zustand';
import { QLearningAgent, State, Action } from '../lib/rl/QLearningAgent';

// Node types in the supply chain
export type NodeType = 'supplier' | 'manufacturer' | 'distributor' | 'retailer';

// Supply chain node representation
export interface SupplyChainNode {
  id: string;
  name: string;
  type: NodeType;
  location: string;
  capacity: number;
  currentInventory: number;
  leadTime: number;
  cost: number;
  reliability: number; // 0-100 score
  coordinates: [number, number]; // For visualization positioning
}

// Connection between nodes
export interface SupplyChainLink {
  id: string;
  source: string; // Source node ID
  target: string; // Target node ID
  distance: number;
  transportCost: number;
  transportTime: number;
  reliability: number; // 0-100 score
  flow: number; // Current material flow volume
  capacity: number; // Maximum capacity
}

// Performance metrics
export interface PerformanceMetrics {
  totalCost: number;
  averageLeadTime: number;
  inventoryTurnover: number;
  orderFulfillmentRate: number;
  resilience: number; // 0-100 score
  efficiency: number; // 0-100 score
  co2Emissions: number;
}

// Optimization parameters
export interface OptimizationParams {
  prioritizeCost: number; // 0-1 weight
  prioritizeTime: number; // 0-1 weight
  prioritizeReliability: number; // 0-1 weight
  prioritizeSustainability: number; // 0-1 weight
  riskTolerance: number; // 0-1 scale
}

// Model recommendations
export interface Recommendation {
  id: string;
  description: string;
  impact: {
    cost: number;
    time: number;
    reliability: number;
    sustainability: number;
  };
  confidence: number; // 0-1 scale
  implementationDifficulty: number; // 0-5 scale
  nodes: string[]; // Affected node IDs
}

// Supply chain state interface
interface SupplyChainState {
  nodes: SupplyChainNode[];
  links: SupplyChainLink[];
  metrics: PerformanceMetrics;
  optimizationParams: OptimizationParams;
  recommendations: Recommendation[];
  simulationRunning: boolean;
  simulationSpeed: number; // 1-10 scale
  simulationStep: number;
  
  // Add RL-specific properties
  rlAgent: QLearningAgent;
  currentState: State;
  lastAction: Action | null;
  episodeRewards: number[];
  trainingMode: boolean;
  
  // Actions
  loadSupplyChain: (preset: string) => void;
  updateNode: (nodeId: string, updates: Partial<SupplyChainNode>) => void;
  updateLink: (linkId: string, updates: Partial<SupplyChainLink>) => void;
  updateOptimizationParams: (params: Partial<OptimizationParams>) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  setSimulationSpeed: (speed: number) => void;
  applyRecommendation: (recommendationId: string) => void;
  runOptimization: () => Promise<void>;
  
  // Add RL-specific actions
  initializeRL: () => void;
  step: (action: Action) => void;
  train: (episodes: number) => Promise<void>;
  toggleTrainingMode: () => void;
}

// Sample data for demonstration
const sampleNodes: SupplyChainNode[] = [
  {
    id: 'sup_1',
    name: 'Raw Materials Supplier A',
    type: 'supplier',
    location: 'Shanghai, China',
    capacity: 1000,
    currentInventory: 750,
    leadTime: 5,
    cost: 100,
    reliability: 85,
    coordinates: [100, 200],
  },
  {
    id: 'sup_2',
    name: 'Raw Materials Supplier B',
    type: 'supplier',
    location: 'Jakarta, Indonesia',
    capacity: 800,
    currentInventory: 400,
    leadTime: 7,
    cost: 80,
    reliability: 75,
    coordinates: [150, 250],
  },
  {
    id: 'man_1',
    name: 'Manufacturing Plant 1',
    type: 'manufacturer',
    location: 'Shenzhen, China',
    capacity: 1200,
    currentInventory: 300,
    leadTime: 3,
    cost: 200,
    reliability: 90,
    coordinates: [250, 200],
  },
  {
    id: 'man_2',
    name: 'Manufacturing Plant 2',
    type: 'manufacturer',
    location: 'Ho Chi Minh City, Vietnam',
    capacity: 800,
    currentInventory: 250,
    leadTime: 4,
    cost: 180,
    reliability: 82,
    coordinates: [300, 250],
  },
  {
    id: 'dist_1',
    name: 'Distribution Center A',
    type: 'distributor',
    location: 'Singapore',
    capacity: 1500,
    currentInventory: 900,
    leadTime: 2,
    cost: 120,
    reliability: 95,
    coordinates: [400, 200],
  },
  {
    id: 'ret_1',
    name: 'Retail Center 1',
    type: 'retailer',
    location: 'Sydney, Australia',
    capacity: 500,
    currentInventory: 350,
    leadTime: 1,
    cost: 150,
    reliability: 92,
    coordinates: [550, 220],
  },
  {
    id: 'ret_2',
    name: 'Retail Center 2',
    type: 'retailer',
    location: 'Melbourne, Australia',
    capacity: 450,
    currentInventory: 300,
    leadTime: 1,
    cost: 140,
    reliability: 94,
    coordinates: [530, 280],
  },
];

const sampleLinks: SupplyChainLink[] = [
  {
    id: 'link_1',
    source: 'sup_1',
    target: 'man_1',
    distance: 1200,
    transportCost: 50,
    transportTime: 3,
    reliability: 88,
    flow: 200,
    capacity: 300,
  },
  {
    id: 'link_2',
    source: 'sup_2',
    target: 'man_1',
    distance: 3000,
    transportCost: 70,
    transportTime: 5,
    reliability: 82,
    flow: 150,
    capacity: 250,
  },
  {
    id: 'link_3',
    source: 'sup_2',
    target: 'man_2',
    distance: 1800,
    transportCost: 60,
    transportTime: 4,
    reliability: 85,
    flow: 180,
    capacity: 250,
  },
  {
    id: 'link_4',
    source: 'man_1',
    target: 'dist_1',
    distance: 2500,
    transportCost: 65,
    transportTime: 4,
    reliability: 90,
    flow: 280,
    capacity: 350,
  },
  {
    id: 'link_5',
    source: 'man_2',
    target: 'dist_1',
    distance: 900,
    transportCost: 40,
    transportTime: 2,
    reliability: 93,
    flow: 200,
    capacity: 300,
  },
  {
    id: 'link_6',
    source: 'dist_1',
    target: 'ret_1',
    distance: 6500,
    transportCost: 90,
    transportTime: 6,
    reliability: 87,
    flow: 150,
    capacity: 200,
  },
  {
    id: 'link_7',
    source: 'dist_1',
    target: 'ret_2',
    distance: 6300,
    transportCost: 85,
    transportTime: 6,
    reliability: 88,
    flow: 120,
    capacity: 200,
  },
];

const sampleMetrics: PerformanceMetrics = {
  totalCost: 27650,
  averageLeadTime: 3.6,
  inventoryTurnover: 4.2,
  orderFulfillmentRate: 0.93,
  resilience: 79,
  efficiency: 83,
  co2Emissions: 15420,
};

// Create a recommended optimization plan
const sampleRecommendations: Recommendation[] = [
  {
    id: 'rec_1',
    description: 'Increase inventory at Supplier B to reduce stockouts at Manufacturing Plant 2',
    impact: {
      cost: -5000,
      time: 0.5,
      reliability: 5,
      sustainability: -2,
    },
    confidence: 0.87,
    implementationDifficulty: 2,
    nodes: ['sup_2', 'man_2'],
  },
  {
    id: 'rec_2',
    description: 'Optimize transportation route between Distribution Center A and Retail Centers',
    impact: {
      cost: 3000,
      time: -0.8,
      reliability: 3,
      sustainability: 5,
    },
    confidence: 0.92,
    implementationDifficulty: 3,
    nodes: ['dist_1', 'ret_1', 'ret_2'],
  },
  {
    id: 'rec_3',
    description: 'Add a new supplier in Thailand to reduce dependency on Supplier A',
    impact: {
      cost: -8000,
      time: -0.3,
      reliability: 8,
      sustainability: 2,
    },
    confidence: 0.76,
    implementationDifficulty: 5,
    nodes: ['sup_1'],
  },
];

export const useSupplyChainStore = create<SupplyChainState>((set, get) => ({
  nodes: sampleNodes,
  links: sampleLinks,
  metrics: sampleMetrics,
  optimizationParams: {
    prioritizeCost: 0.3,
    prioritizeTime: 0.3,
    prioritizeReliability: 0.3,
    prioritizeSustainability: 0.1,
    riskTolerance: 0.5,
  },
  recommendations: sampleRecommendations,
  simulationRunning: false,
  simulationSpeed: 5,
  simulationStep: 0,
  
  // Initialize RL agent
  rlAgent: new QLearningAgent(),
  currentState: {
    inventory: sampleNodes.map(node => node.currentInventory),
    demand: sampleNodes.map(() => Math.random() * 100),
    leadTimes: sampleNodes.map(node => node.leadTime),
    costs: sampleNodes.map(node => node.cost)
  },
  lastAction: null,
  episodeRewards: [],
  trainingMode: false,
  
  loadSupplyChain: (preset) => {
    // For demo purposes, we're just using the sample data
    // In a real app, this would load different presets from API
    set({
      nodes: sampleNodes,
      links: sampleLinks,
      metrics: sampleMetrics,
      recommendations: sampleRecommendations,
      simulationStep: 0,
    });
  },
  
  updateNode: (nodeId, updates) => {
    const { nodes } = get();
    const updatedNodes = nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    );
    set({ nodes: updatedNodes });
  },
  
  updateLink: (linkId, updates) => {
    const { links } = get();
    const updatedLinks = links.map(link => 
      link.id === linkId ? { ...link, ...updates } : link
    );
    set({ links: updatedLinks });
  },
  
  updateOptimizationParams: (params) => {
    set({ optimizationParams: { ...get().optimizationParams, ...params } });
  },
  
  startSimulation: () => {
    set({ simulationRunning: true });
    
    const simulateStep = async () => {
      const { 
        simulationRunning, 
        simulationStep, 
        simulationSpeed,
        currentState,
        rlAgent,
        nodes 
      } = get();
      
      if (!simulationRunning) return;
      
      // Get action from RL agent
      const possibleActions = rlAgent.getPossibleActions(
        currentState,
        nodes.map(n => n.id),
        1000
      );
      const action = rlAgent.chooseAction(currentState, possibleActions);
      
      // Take step
      get().step(action);
      
      // Update simulation state
      set({ simulationStep: simulationStep + 1 });
      
      // Schedule next step
      setTimeout(simulateStep, 1000 / simulationSpeed);
    };
    
    simulateStep();
  },
  
  stopSimulation: () => {
    set({ simulationRunning: false });
  },
  
  setSimulationSpeed: (speed) => {
    set({ simulationSpeed: speed });
  },
  
  applyRecommendation: (recommendationId) => {
    const { recommendations, metrics } = get();
    const recommendation = recommendations.find(r => r.id === recommendationId);
    
    if (!recommendation) return;
    
    // Apply the recommendation's impact to metrics
    // This is a simplified implementation
    const newMetrics = {
      ...metrics,
      totalCost: metrics.totalCost - recommendation.impact.cost,
      averageLeadTime: metrics.averageLeadTime - recommendation.impact.time,
      reliability: Math.min(100, metrics.reliability + recommendation.impact.reliability),
      // Other metric updates would go here
    };
    
    // Remove the applied recommendation
    const newRecommendations = recommendations.filter(r => r.id !== recommendationId);
    
    set({ 
      metrics: newMetrics, 
      recommendations: newRecommendations 
    });
  },
  
  runOptimization: async () => {
    // In a real app, this would call the backend to run the optimization algorithm
    set({ simulationRunning: false });
    
    // Simulate optimization running
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate new recommendations
    const newRecommendations: Recommendation[] = [
      ...sampleRecommendations,
      {
        id: 'rec_4',
        description: 'Implement just-in-time delivery for Manufacturing Plant 1',
        impact: {
          cost: 4500,
          time: -1.2,
          reliability: 2,
          sustainability: 4,
        },
        confidence: 0.83,
        implementationDifficulty: 4,
        nodes: ['man_1', 'sup_1'],
      },
    ];
    
    set({ recommendations: newRecommendations });
  },
  
  initializeRL: () => {
    const { rlAgent } = get();
    rlAgent.load(); // Load previously learned Q-values
    
    // Initialize state
    set({
      currentState: {
        inventory: sampleNodes.map(node => node.currentInventory),
        demand: sampleNodes.map(() => Math.random() * 100),
        leadTimes: sampleNodes.map(node => node.leadTime),
        costs: sampleNodes.map(node => node.cost)
      }
    });
  },
  
  step: (action: Action) => {
    const { nodes, rlAgent, currentState } = get();
    
    // Apply action to the supply chain
    const nodeIndex = nodes.findIndex(n => n.id === action.nodeId);
    if (nodeIndex >= 0) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = {
        ...nodes[nodeIndex],
        currentInventory: nodes[nodeIndex].currentInventory + action.quantity
      };
      
      // Calculate metrics
      const stockouts = nodes.reduce((acc, node) => 
        acc + (node.currentInventory < 0 ? 1 : 0), 0);
      const holdingCost = nodes.reduce((acc, node) => 
        acc + Math.max(0, node.currentInventory) * 0.1, 0);
      const deliveryDelay = nodes.reduce((acc, node) => 
        acc + Math.max(0, node.leadTime - node.type === 'supplier' ? 3 : 2), 0);
      const totalCost = nodes.reduce((acc, node) => acc + node.cost, 0);
      
      // Calculate reward
      const reward = rlAgent.calculateReward(
        stockouts,
        holdingCost,
        deliveryDelay,
        totalCost
      );
      
      // Update state
      const nextState: State = {
        inventory: updatedNodes.map(node => node.currentInventory),
        demand: nodes.map(() => Math.random() * 100), // Simulate new demand
        leadTimes: nodes.map(node => node.leadTime),
        costs: nodes.map(node => node.cost)
      };
      
      // Get possible next actions
      const possibleNextActions = rlAgent.getPossibleActions(
        nextState,
        nodes.map(n => n.id),
        1000 // Max order quantity
      );
      
      // Update Q-values
      rlAgent.update(
        currentState,
        action,
        reward,
        nextState,
        possibleNextActions
      );
      
      // Save updated Q-values
      rlAgent.save();
      
      // Update state
      set({
        nodes: updatedNodes,
        currentState: nextState,
        lastAction: action,
        episodeRewards: [...get().episodeRewards, reward]
      });
    }
  },
  
  train: async (episodes: number) => {
    const { rlAgent, nodes } = get();
    set({ trainingMode: true });
    
    for (let episode = 0; episode < episodes; episode++) {
      // Reset environment
      const initialState: State = {
        inventory: nodes.map(node => node.currentInventory),
        demand: nodes.map(() => Math.random() * 100),
        leadTimes: nodes.map(node => node.leadTime),
        costs: nodes.map(node => node.cost)
      };
      
      set({ currentState: initialState });
      
      // Training episode
      for (let step = 0; step < 100; step++) {
        const { currentState } = get();
        
        // Get possible actions
        const possibleActions = rlAgent.getPossibleActions(
          currentState,
          nodes.map(n => n.id),
          1000
        );
        
        // Choose and take action
        const action = rlAgent.chooseAction(currentState, possibleActions);
        get().step(action);
        
        // Small delay to prevent UI freezing
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    set({ trainingMode: false });
  },
  
  toggleTrainingMode: () => {
    set({ trainingMode: !get().trainingMode });
  },
}));
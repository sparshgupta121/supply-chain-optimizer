import * as tf from '@tensorflow/tfjs';
import { max, random } from 'mathjs';

export interface State {
  inventory: number[];
  demand: number[];
  leadTimes: number[];
  costs: number[];
}

export interface Action {
  nodeId: string;
  quantity: number;
}

export class QLearningAgent {
  private qTable: Map<string, Map<string, number>>;
  private learningRate: number;
  private discountFactor: number;
  private epsilon: number;
  
  constructor(
    learningRate: number = 0.1,
    discountFactor: number = 0.95,
    epsilon: number = 0.1
  ) {
    this.qTable = new Map();
    this.learningRate = learningRate;
    this.discountFactor = discountFactor;
    this.epsilon = epsilon;
  }
  
  private getStateKey(state: State): string {
    // Discretize continuous state values into buckets
    const discretizedState = {
      inventory: state.inventory.map(i => Math.floor(i / 100) * 100),
      demand: state.demand.map(d => Math.floor(d / 10) * 10),
      leadTimes: state.leadTimes.map(l => Math.floor(l)),
      costs: state.costs.map(c => Math.floor(c / 1000) * 1000)
    };
    return JSON.stringify(discretizedState);
  }
  
  private getActionKey(action: Action): string {
    return JSON.stringify(action);
  }
  
  private getQValue(stateKey: string, actionKey: string): number {
    if (!this.qTable.has(stateKey)) {
      this.qTable.set(stateKey, new Map());
    }
    const stateActions = this.qTable.get(stateKey)!;
    return stateActions.get(actionKey) || 0;
  }
  
  private setQValue(stateKey: string, actionKey: string, value: number): void {
    if (!this.qTable.has(stateKey)) {
      this.qTable.set(stateKey, new Map());
    }
    const stateActions = this.qTable.get(stateKey)!;
    stateActions.set(actionKey, value);
  }
  
  chooseAction(state: State, possibleActions: Action[]): Action {
    const stateKey = this.getStateKey(state);
    
    // Epsilon-greedy exploration strategy
    if (Math.random() < this.epsilon) {
      // Explore: choose random action
      return possibleActions[Math.floor(Math.random() * possibleActions.length)];
    }
    
    // Exploit: choose best action based on Q-values
    let bestAction = possibleActions[0];
    let bestValue = this.getQValue(stateKey, this.getActionKey(bestAction));
    
    for (const action of possibleActions) {
      const actionKey = this.getActionKey(action);
      const qValue = this.getQValue(stateKey, actionKey);
      if (qValue > bestValue) {
        bestValue = qValue;
        bestAction = action;
      }
    }
    
    return bestAction;
  }
  
  update(
    state: State,
    action: Action,
    reward: number,
    nextState: State,
    possibleNextActions: Action[]
  ): void {
    const stateKey = this.getStateKey(state);
    const actionKey = this.getActionKey(action);
    const nextStateKey = this.getStateKey(nextState);
    
    // Find maximum Q-value for next state
    let maxNextQ = -Infinity;
    for (const nextAction of possibleNextActions) {
      const nextActionKey = this.getActionKey(nextAction);
      const qValue = this.getQValue(nextStateKey, nextActionKey);
      maxNextQ = Math.max(maxNextQ, qValue);
    }
    
    // Q-learning update rule
    const currentQ = this.getQValue(stateKey, actionKey);
    const newQ = currentQ + this.learningRate * (
      reward + this.discountFactor * maxNextQ - currentQ
    );
    
    this.setQValue(stateKey, actionKey, newQ);
  }
  
  // Calculate reward based on supply chain metrics
  calculateReward(
    stockouts: number,
    holdingCost: number,
    deliveryDelay: number,
    totalCost: number
  ): number {
    const stockoutPenalty = -100 * stockouts;
    const holdingPenalty = -0.1 * holdingCost;
    const delayPenalty = -50 * deliveryDelay;
    const costPenalty = -0.001 * totalCost;
    
    return stockoutPenalty + holdingPenalty + delayPenalty + costPenalty;
  }
  
  // Get possible actions for a given state
  getPossibleActions(
    state: State,
    nodes: string[],
    maxQuantity: number
  ): Action[] {
    const actions: Action[] = [];
    const quantitySteps = 5; // Discretize quantity into steps
    
    for (const nodeId of nodes) {
      for (let i = 0; i <= quantitySteps; i++) {
        const quantity = (i / quantitySteps) * maxQuantity;
        actions.push({ nodeId, quantity });
      }
    }
    
    return actions;
  }
  
  // Save Q-table to localStorage
  save(): void {
    const serialized = JSON.stringify(Array.from(this.qTable.entries()));
    localStorage.setItem('qTable', serialized);
  }
  
  // Load Q-table from localStorage
  load(): void {
    const serialized = localStorage.getItem('qTable');
    if (serialized) {
      const entries = JSON.parse(serialized);
      this.qTable = new Map(entries.map(([key, value]: [string, object]) => [
        key,
        new Map(Object.entries(value))
      ]));
    }
  }
}
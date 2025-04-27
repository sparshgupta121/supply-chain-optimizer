import React, { useState, useEffect } from 'react';
import { useSupplyChainStore } from '../stores/supplyChainStore';
import { Play, Pause, SkipForward, Settings, DownloadCloud, Save } from 'lucide-react';

const SimulationPage: React.FC = () => {
  const { 
    simulationRunning, 
    startSimulation, 
    stopSimulation, 
    simulationSpeed, 
    setSimulationSpeed, 
    optimizationParams, 
    updateOptimizationParams,
    simulationStep,
    initializeRL,
    train
  } = useSupplyChainStore();
  
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    initializeRL();
  }, [initializeRL]);
  
  const handleStartSimulation = async () => {
    await train(10);
    startSimulation();
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Supply Chain Simulation</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test different scenarios and observe their impact on your supply chain
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center"
          >
            <Settings size={18} className="mr-2" />
            <span>Settings</span>
          </button>
          
          <button className="btn btn-secondary flex items-center">
            <Save size={18} className="mr-2" />
            <span>Save Scenario</span>
          </button>
          
          <button className="btn btn-primary flex items-center">
            <DownloadCloud size={18} className="mr-2" />
            <span>Export Results</span>
          </button>
        </div>
      </div>
      
      {showSettings && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Simulation Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Optimization Priorities</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Cost</label>
                    <span className="text-sm font-medium">{optimizationParams.prioritizeCost * 100}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={optimizationParams.prioritizeCost} 
                    onChange={(e) => updateOptimizationParams({ prioritizeCost: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Time</label>
                    <span className="text-sm font-medium">{optimizationParams.prioritizeTime * 100}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={optimizationParams.prioritizeTime} 
                    onChange={(e) => updateOptimizationParams({ prioritizeTime: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Reliability</label>
                    <span className="text-sm font-medium">{optimizationParams.prioritizeReliability * 100}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={optimizationParams.prioritizeReliability} 
                    onChange={(e) => updateOptimizationParams({ prioritizeReliability: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Sustainability</label>
                    <span className="text-sm font-medium">{optimizationParams.prioritizeSustainability * 100}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={optimizationParams.prioritizeSustainability} 
                    onChange={(e) => updateOptimizationParams({ prioritizeSustainability: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Risk Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Risk Tolerance</label>
                    <span className="text-sm font-medium">{optimizationParams.riskTolerance * 100}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={optimizationParams.riskTolerance} 
                    onChange={(e) => updateOptimizationParams({ riskTolerance: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">External Factors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="weather" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      <label htmlFor="weather" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Weather disruptions
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="political" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      <label htmlFor="political" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Political instability
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="demand" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      <label htmlFor="demand" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Demand fluctuations
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="supplier" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      <label htmlFor="supplier" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        Supplier failures
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Simulation Controls</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Speed:</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={simulationSpeed} 
                onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
                className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium">{simulationSpeed}x</span>
            </div>
            
            <div className="flex space-x-2">
              {!simulationRunning ? (
                <button 
                  onClick={handleStartSimulation}
                  className="btn btn-primary flex items-center"
                >
                  <Play size={18} className="mr-1" />
                  <span>Start</span>
                </button>
              ) : (
                <button 
                  onClick={stopSimulation}
                  className="btn btn-secondary flex items-center"
                >
                  <Pause size={18} className="mr-1" />
                  <span>Pause</span>
                </button>
              )}
              
              <button className="btn bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
                <SkipForward size={18} className="mr-1" />
                <span>Skip</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Step:</span>
              <span className="ml-2 text-lg font-bold">{simulationStep}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Day {simulationStep} of Simulation</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((simulationStep / 100) * 100, 100)}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost</div>
              <div className="text-xl font-bold mt-1">$28,450</div>
              <div className="text-sm text-error-600 dark:text-error-400">+$800 from baseline</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Lead Time</div>
              <div className="text-xl font-bold mt-1">3.2 days</div>
              <div className="text-sm text-success-600 dark:text-success-400">-0.4 days from baseline</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Order Fulfillment</div>
              <div className="text-xl font-bold mt-1">94.2%</div>
              <div className="text-sm text-success-600 dark:text-success-400">+1.2% from baseline</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Bottlenecks</div>
              <div className="text-xl font-bold mt-1">2 nodes</div>
              <div className="text-sm text-error-600 dark:text-error-400">+1 from baseline</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card h-96">
            <h2 className="text-lg font-semibold mb-4">Network Simulation</h2>
            <div className="h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Network visualization would render here, showing real-time flow of goods
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Simulation Events</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div className="border-l-4 border-error-500 pl-4 py-1">
                <div className="text-sm font-medium">Day {simulationStep}: Supply Disruption</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Supplier B is experiencing delays due to transportation issues.
                </p>
              </div>
              <div className="border-l-4 border-warning-500 pl-4 py-1">
                <div className="text-sm font-medium">Day {simulationStep - 1}: Demand Spike</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Retail Center 1 has 35% higher demand than forecasted.
                </p>
              </div>
              <div className="border-l-4 border-success-500 pl-4 py-1">
                <div className="text-sm font-medium">Day {simulationStep - 2}: Optimization Applied</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Distribution Center A routes optimized for better efficiency.
                </p>
              </div>
              <div className="border-l-4 border-gray-500 pl-4 py-1">
                <div className="text-sm font-medium">Day {simulationStep - 4}: Parameter Change</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Risk tolerance adjusted from 40% to 50%.
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Real-time Recommendations</h2>
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                <p className="text-primary-800 dark:text-primary-300 text-sm">
                  <span className="font-semibold">High priority:</span> Increase inventory at Manufacturing Plant 1 to handle demand spike.
                </p>
              </div>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-900/30 rounded-lg">
                <p className="text-secondary-800 dark:text-secondary-300 text-sm">
                  <span className="font-semibold">Medium priority:</span> Reroute shipments from Supplier A to avoid congested transport routes.
                </p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-800 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Consider:</span> Adding temporary storage capacity at Distribution Center A.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
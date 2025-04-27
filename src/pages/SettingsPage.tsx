import React, { useState } from 'react';
import { Save, Users, Sliders, Database, Globe, Key, Bell, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure platform settings and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-medium text-gray-900 dark:text-white">Settings</h2>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'general'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Sliders size={18} className="mr-2" />
                <span>General</span>
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'account'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users size={18} className="mr-2" />
                <span>Account & Team</span>
              </button>
              
              <button
                onClick={() => setActiveTab('data')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'data'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Database size={18} className="mr-2" />
                <span>Data Management</span>
              </button>
              
              <button
                onClick={() => setActiveTab('integrations')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'integrations'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Globe size={18} className="mr-2" />
                <span>Integrations</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'security'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Shield size={18} className="mr-2" />
                <span>Security & Privacy</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Bell size={18} className="mr-2" />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md mb-1 ${
                  activeTab === 'api'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Key size={18} className="mr-2" />
                <span>API Access</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            {activeTab === 'general' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Interface Preferences
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Use dark theme by default
                          </span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" checked />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Show real-time analytics on dashboard
                          </span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" checked />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Enable animations
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Simulation Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Default Simulation Speed
                        </label>
                        <select className="select">
                          <option>Very Slow (1x)</option>
                          <option>Slow (2x)</option>
                          <option selected>Normal (5x)</option>
                          <option>Fast (8x)</option>
                          <option>Very Fast (10x)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Default Time Scale
                        </label>
                        <select className="select">
                          <option>Hourly</option>
                          <option selected>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="h-4 w-4 text-primary-600 border-gray-300 rounded" checked />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Apply random events during simulation
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Default Optimization Parameters
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Cost Priority
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="30" 
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Time Priority
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="30" 
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Reliability Priority
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="30" 
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Sustainability Priority
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="10" 
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end">
                    <button className="btn btn-primary flex items-center">
                      <Save size={18} className="mr-2" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'general' && (
              <div className="p-6 flex flex-col items-center justify-center py-16">
                <h2 className="text-lg font-semibold mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">
                  This section is currently under development. Check back soon for more configuration options.
                </p>
                <button className="btn btn-primary">Notify Me When Available</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
import React, { useState, useEffect } from 'react';
import { ActionLog } from '../types';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { generateActionMessage } from '../utils/mockData';

interface ActionDisplayProps {
  isRunning: boolean;
}

const ActionDisplay: React.FC<ActionDisplayProps> = ({ isRunning }) => {
  const [actions, setActions] = useState<ActionLog[]>([]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const initialAction = generateActionMessage();
    setActions([initialAction]);
    
    const interval = setInterval(() => {
      const newAction = generateActionMessage();
      setActions(prev => [newAction, ...prev].slice(0, 5));
    }, Math.random() * 2000 + 3000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const getIcon = (type: ActionLog['type']) => {
    switch (type) {
      case 'info':
        return <Info className="flex-shrink-0" size={20} />;
      case 'warning':
        return <AlertTriangle className="flex-shrink-0" size={20} />;
      case 'success':
        return <CheckCircle className="flex-shrink-0" size={20} />;
      case 'error':
        return <AlertCircle className="flex-shrink-0" size={20} />;
    }
  };
  
  const getColor = (type: ActionLog['type']) => {
    switch (type) {
      case 'info':
        return 'text-blue-500 dark:text-blue-400';
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'error':
        return 'text-red-500 dark:text-red-400';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-full h-[200px] overflow-hidden transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Real-time Actions</h2>
      
      {!isRunning && (
        <div className="flex items-center justify-center h-[140px] text-gray-500 dark:text-gray-400">
          <p>Start the simulation to see RL model actions</p>
        </div>
      )}
      
      {isRunning && actions.length > 0 && (
        <div className="space-y-3 overflow-y-auto max-h-[140px]">
          {actions.map((action) => (
            <div 
              key={action.id}
              className="flex items-start gap-2 p-2 border-l-4 rounded transition-all animate-fadeIn bg-gray-50 dark:bg-gray-800"
              style={{ 
                borderLeftColor: action.type === 'info' ? '#3b82f6' : 
                                action.type === 'warning' ? '#f59e0b' : 
                                action.type === 'success' ? '#10b981' : '#ef4444'
              }}
            >
              <div className={getColor(action.type)}>
                {getIcon(action.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{action.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {action.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionDisplay;

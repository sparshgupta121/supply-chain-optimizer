import React from 'react';
import { Play, Pause } from 'lucide-react';

interface ControlButtonProps {
  isRunning: boolean;
  toggleRunning: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ isRunning, toggleRunning }) => {
  return (
    <button
      className={`
        w-12 h-12 rounded-full flex items-center justify-center shadow-md
        transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${isRunning ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'}
      `}
      onClick={toggleRunning}
      aria-label={isRunning ? 'Stop Simulation' : 'Start Simulation'}
    >
      {isRunning ? (
        <Pause className="text-white" size={20} />
      ) : (
        <Play className="text-white" size={20} />
      )}
    </button>
  );
};

export default ControlButton;

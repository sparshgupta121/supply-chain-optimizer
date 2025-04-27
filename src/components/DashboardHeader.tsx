import React from 'react';
import { Package } from 'lucide-react';
import ControlButton from './ControlButton';

interface DashboardHeaderProps {
  isRunning: boolean;
  toggleRunning: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  isRunning, 
  toggleRunning 
}) => {
  return (
    <div className="bg-gray-900 shadow-sm py-4 px-6 flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Package className="text-blue-400" size={28} />
        <h1 className="text-xl font-bold text-white">Supply Chain Optimizer</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isRunning ? 'text-green-400' : 'text-gray-400'}`}>
          {isRunning ? 'Simulation Running' : 'Simulation Stopped'}
        </span>
        <ControlButton isRunning={isRunning} toggleRunning={toggleRunning} />
      </div>
    </div>
  );
};

export default DashboardHeader;

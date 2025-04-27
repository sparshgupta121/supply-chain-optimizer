import React from 'react';
import { Truck } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="text-primary-500 animate-bounce mb-4">
          <Truck size={64} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-6">SupplyChain DRL Platform</h1>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full animate-pulse-slow" style={{ width: '70%' }}></div>
        </div>
        <p className="mt-4 text-gray-400">Initializing system...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
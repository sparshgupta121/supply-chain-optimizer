import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  BarChart3, 
  PlaySquare, 
  Settings, 
  TrendingUp, 
  Truck, 
  PackageOpen, 
  Users,
  Database
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform bg-primary-900 dark:bg-gray-800 overflow-y-auto lg:translate-x-0 lg:relative lg:inset-0 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-white" />
            <span className="mx-2 text-xl font-semibold text-white">SupplyChain DRL</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 text-white rounded-md hover:bg-primary-800 dark:hover:bg-gray-700 focus:outline-none lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="px-2 py-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-800 dark:bg-gray-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-800 dark:hover:bg-gray-700'
              }`
            }
            end
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/simulation" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mt-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-800 dark:bg-gray-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-800 dark:hover:bg-gray-700'
              }`
            }
          >
            <PlaySquare className="w-5 h-5 mr-3" />
            <span>Simulation</span>
          </NavLink>
          
          <NavLink 
            to="/analytics" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mt-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-800 dark:bg-gray-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-800 dark:hover:bg-gray-700'
              }`
            }
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            <span>Analytics</span>
          </NavLink>
          
          <div className="mt-6 px-4 py-2">
            <h5 className="text-xs font-semibold text-primary-200 uppercase tracking-wider">
              Supply Chain
            </h5>
          </div>
          
          <a href="#suppliers" className="flex items-center px-4 py-3 mt-1 text-primary-100 rounded-lg hover:bg-primary-800 dark:hover:bg-gray-700 transition-colors">
            <TrendingUp className="w-5 h-5 mr-3" />
            <span>Suppliers</span>
          </a>
          
          <a href="#inventory" className="flex items-center px-4 py-3 mt-1 text-primary-100 rounded-lg hover:bg-primary-800 dark:hover:bg-gray-700 transition-colors">
            <PackageOpen className="w-5 h-5 mr-3" />
            <span>Inventory</span>
          </a>
          
          <a href="#distribution" className="flex items-center px-4 py-3 mt-1 text-primary-100 rounded-lg hover:bg-primary-800 dark:hover:bg-gray-700 transition-colors">
            <Truck className="w-5 h-5 mr-3" />
            <span>Distribution</span>
          </a>
          
          <div className="mt-6 px-4 py-2">
            <h5 className="text-xs font-semibold text-primary-200 uppercase tracking-wider">
              Administration
            </h5>
          </div>
          
          <a href="#team" className="flex items-center px-4 py-3 mt-1 text-primary-100 rounded-lg hover:bg-primary-800 dark:hover:bg-gray-700 transition-colors">
            <Users className="w-5 h-5 mr-3" />
            <span>Team</span>
          </a>
          
          <a href="#data" className="flex items-center px-4 py-3 mt-1 text-primary-100 rounded-lg hover:bg-primary-800 dark:hover:bg-gray-700 transition-colors">
            <Database className="w-5 h-5 mr-3" />
            <span>Data Management</span>
          </a>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 mt-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary-800 dark:bg-gray-700 text-white' 
                  : 'text-primary-100 hover:bg-primary-800 dark:hover:bg-gray-700'
              }`
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
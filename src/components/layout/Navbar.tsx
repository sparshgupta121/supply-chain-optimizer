import React from 'react';
import { Menu, Bell, Moon, Sun, Search } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface NavbarProps {
  onMenuClick: () => void;
  user: { name: string; role: string } | null;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, user }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const { logout } = useAuthStore();
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Add/remove dark class for Tailwind dark mode
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 text-gray-600 dark:text-gray-300 rounded-md lg:hidden focus:outline-none"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        
        <div className="ml-2 lg:ml-0">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">SupplyChain</span>
          <span className="hidden md:inline text-xl font-bold text-gray-600 dark:text-gray-300"> DRL Platform</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center relative mx-4 w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell size={20} />
        </button>
        
        <button 
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block text-gray-700 dark:text-gray-300">{user?.name}</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-10 hidden group-hover:block">
            <a href="#profile" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
            <a href="#settings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</a>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
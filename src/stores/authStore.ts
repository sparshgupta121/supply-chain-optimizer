import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    
    try {
      // In a real app, this would be an API call
      // Simulating API call and successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo purposes
      const user: User = {
        id: 'usr_1',
        name: email.split('@')[0],
        email,
        role: 'admin',
      };
      
      localStorage.setItem('auth_token', 'mock_token');
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ isAuthenticated: true, user, loading: false });
    } catch (err) {
      set({ 
        loading: false, 
        error: err instanceof Error ? err.message : 'Failed to login' 
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },
  
  checkAuth: async () => {
    set({ loading: true });
    
    try {
      const token = localStorage.getItem('auth_token');
      const userJson = localStorage.getItem('user');
      
      if (token && userJson) {
        const user = JSON.parse(userJson) as User;
        set({ isAuthenticated: true, user, loading: false });
      } else {
        set({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (err) {
      set({ 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: err instanceof Error ? err.message : 'Authentication check failed' 
      });
    }
  },
}));
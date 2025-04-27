import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import AuthPage from './pages/AuthPage';
import { useAuthStore } from './stores/authStore';
import LoadingScreen from './components/common/LoadingScreen';
import Project from './project';
import Dashboard from './pages/Dashboard';



function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  // Simulating auth check and initial data loading
  useEffect(() => {
    const initialize = async () => {
      await checkAuth();
      // Simulate loading time for demonstration
      setTimeout(() => setLoading(false), 1500);
    };
    
    initialize();
  }, [checkAuth]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} />
        
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/auth" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="simulation" element={<Project />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
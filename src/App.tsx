import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './store/authStore';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  useAuth();

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500'
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff'
              }
            }
          }}
        />
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
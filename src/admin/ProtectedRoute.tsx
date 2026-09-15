import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isDemoMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060a08] flex flex-col items-center justify-center text-[#e8e2d8]">
        <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mb-4" />
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Cargando panel de administración...</span>
        </div>
      </div>
    );
  }

  if (!user && !isDemoMode) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

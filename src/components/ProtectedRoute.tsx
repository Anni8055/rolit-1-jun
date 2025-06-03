import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log(`User role ${user.role} not allowed, allowed roles: ${allowedRoles.join(', ')}`);
    
    if (user.role === 'brand') {
      return <Navigate to="/brand/dashboard" replace />;
    } else if (user.role === 'influencer') {
      return <Navigate to="/influencer/dashboard" replace />;
    }
    
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
} 
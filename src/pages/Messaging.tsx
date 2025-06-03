import React from 'react';
import MessagingInterface from '../components/MessagingInterface';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function Messaging() {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <MessagingInterface />;
} 
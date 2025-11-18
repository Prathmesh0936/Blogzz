import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authStore } from '../store/authStore';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = authStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;


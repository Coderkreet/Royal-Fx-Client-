import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthenticatedRoutes } from '../context/Routes';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to={AuthenticatedRoutes.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute; 
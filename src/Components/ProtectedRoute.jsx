import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthRoutes } from '../context/Routes';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Log the authentication status and loading state for debugging
  console.log('ProtectedRoute isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute loading:', loading);

  // If loading is true, don't redirect yet, you can show a loading spinner or placeholder
  if (loading) {
    return <div>Loading...</div>;  // Or a loading spinner component
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={AuthRoutes.LOGIN} replace />;
  }

  // If authenticated, render the protected children components
  return children;
};

export default ProtectedRoute;

import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/additonalFunc';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    // Check for existing user data on mount
    const currentUser = getCurrentUser();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');
    const adminEmail = localStorage.getItem('adminEmail');

    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }

    // Check for admin authentication
    if (token && role === 'admin' && adminId && adminEmail) {
      setIsAdmin(true);
      setUser({
        id: adminId,
        email: adminEmail,
        role: 'admin'
      });
      setIsAuthenticated(true);
    }

    // Set loading to false after the session is checked
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const adminLogin = (adminData) => {
    const { token, admin } = adminData;
    setUser({
      id: admin.id,
      email: admin.email,
      role: 'admin'
    });
    setIsAuthenticated(true);
    setIsAdmin(true);
    
    // Store admin data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'admin');
    localStorage.setItem('adminId', admin.id);
    localStorage.setItem('adminEmail', admin.email);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    // Clear all storage
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin,
      adminLogin,
      loading  // Passing loading as a prop
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

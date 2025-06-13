import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProductPage from './pages/ProductPage';
import BlogPge from './pages/BlogPge';
import ContectPage from './pages/ContectPage';



import { AuthProvider } from './context/AuthContext';
import { AuthRoutes } from './context/Routes';
import AuthenticatedRoutesComponent from './routes/AuthenticatedRoutes';
import Home from './pages/Home';
import { useEffect } from 'react';
import { MainContent } from './context/MainContent';

import { useSelector } from 'react-redux';
import AdminLogin from './pages/Admin/AdminLogin';

function App() {
  // const { isLoading } = useSelector((state) => state.loading);
  console.clear();
  useEffect(() => {
    document.title = MainContent.appName;
    let faviconLink =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.href = MainContent.appFavicon;
    document.head.appendChild(faviconLink);
    // saveToken(
    //   "67e3fdf463fddc96a30b2eab",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UzZmRmNDYzZmRkYzk2YTMwYjJlYWIiLCJ3YWxsZXRBZGRyZXNzIjoiMHgzYTRGNjJiZmZkMzJBRkFhMDMzNmJFOGU2RDhlNGU2YzlkOGJkYTFmIiwiaWF0IjoxNzQzMTQ0NzEzLCJleHAiOjE3NDU3MzY3MTN9.fA2NLt5aCHM3bgeSSIW0w0ab1VxJlvesZ6Y0XDBBP-I",
    //   "user"
    // );
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route element={<MainLayout />}>
          <Route 
              path={"/"} 
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } 
            />
            <Route 
              path={AuthRoutes.LOGIN} 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path={AuthRoutes.REGISTER} 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
                <Route 
              path={AuthRoutes.ADMIN_LOGIN} 
              element={
                <PublicRoute>
                  <AdminLogin />
                </PublicRoute>
              } 
            />

<Route 
              path={AuthRoutes.FORGOT_PASSWORD} 
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } 
            />

<Route 
              path={AuthRoutes.BLOG} 
              element={
                <PublicRoute>
                  <BlogPge />
                </PublicRoute>
              } 
            />
            
<Route 
              path={AuthRoutes.CONTACT} 
              element={
                <PublicRoute>
                  <ContectPage />
                </PublicRoute>
              } 
            />
<Route 
              path={AuthRoutes.PRODUCT} 
              element={
                <PublicRoute>
                  <ProductPage />
                </PublicRoute>
              } 
            />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AuthenticatedRoutesComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

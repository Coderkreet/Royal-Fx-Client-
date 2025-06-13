import React, { useState, useEffect } from 'react';
import { 
  User, 
  Menu, 
  X, 
  Home, 
  Info, 
  Phone, 
  Settings, 
  LogIn,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

import appLogo from '../../assets/app/Hello.png'
import { useNavigate } from 'react-router-dom';
import { AuthRoutes } from '../../context/Routes';
import { FaBlog, FaProductHunt } from 'react-icons/fa';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock navigation function
//   const navigate = (path) => {
//     console.log(`Navigating to: ${path}`);
//     setOpen(false); // Close sidebar on navigation
//   };

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    // { icon: FaProductHunt, label: 'Product', path: AuthRoutes.PRODUCT },
    // { icon: FaBlog, label: 'Blog', path: AuthRoutes.BLOG },
    // { icon: Phone, label: 'Contact', path: AuthRoutes.CONTACT },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
     'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' 
          
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center cursor-pointer group"
            >
             <img src={appLogo} width={50} alt="" />
            </div>

            {/* Desktop Navigation */}
            {/* <div className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50"
                >
                  {item.label}
                </button>
              ))}
            </div> */}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              
              {/* Search Button - Hidden on mobile */}
              {/* <button className="hidden md:flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200">
                <Search className="w-5 h-5" />
              </button> */}

              {/* Notifications - Hidden on mobile */}
              {/* <button className="hidden md:flex items-center justify-center w-10 h-10 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button> */}

              {/* Login Button */}
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </button>

              {/* Menu Button */}
              <button 
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl lg:hidden"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Desktop Menu Button */}
              <button 
                onClick={() => setOpen(!open)}
                className="hidden lg:flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-slate-900 border-l border-slate-700/50 z-50 transform transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Welcome back!</p>
              <p className="text-slate-400 text-sm">Please login to continue</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="py-6">
          <div className="px-6 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Navigation</h3>
          </div>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-6 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors duration-200" />
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-slate-700/50 mt-auto">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => {
                navigate('/login');
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
            
            <button
               onClick={() => {
                 navigate(AuthRoutes.REGISTER);
                 setOpen(false);
               }}
            className=" px-4 py-3 w-full flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg font-semibold transition-all duration-200">
            <LogIn className="w-4 h-4" />

            Sign Up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 text-center">© 2024 Z-Coin. All rights reserved.</p>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Shield, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  Users, 
  BarChart2, 
  Package, 
  CoinsIcon,
  ChevronRight,
  UserCog,
  Wallet,
  Bell,
  HelpCircle,
  DollarSign,
  PowerOffIcon,
  LucideMonitorPlay,
  UploadIcon
} from 'lucide-react';
import { AuthenticatedRoutes } from '../../context/Routes';

const SidebardAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      id: 'Dashboard',
      icon: <BarChart2 size={20} />,
      label: 'Dashboard',
      path: AuthenticatedRoutes.ADMIN_DASHBOARD
    },
    {
      id: 'users',
      icon: <Users size={20} />,
      label: 'User Management',
      path: '/admin/users',
      submenu: [
        { label: 'All Users', path: AuthenticatedRoutes.ALL_USERS },
        { label: 'Active Users', path: AuthenticatedRoutes.ACTIVE_USERS },
        { label: 'Inactive Users', path: AuthenticatedRoutes.INACTIVE_USERS }
      ]
    },
    {
      id: 'withdrawals',
      icon: <Wallet size={20} />,
      label: 'Withdrawals',
      path: '/admin/withdrawals',
      submenu: [
        { label: 'Withdrawals history', path: AuthenticatedRoutes.Withdrawals_history },
        // { label: 'Completed', path: '/admin/withdrawals/completed' },
        // { label: 'Rejected', path: '/admin/withdrawals/rejected' }
      ]
    },
    // {
    //   id: 'coin-data',
    //   icon: <CoinsIcon size={20} />,
    //   label: 'Coin Data',
    //   path: AuthenticatedRoutes.COIN_INFO
    // },
    {
      id: 'plans',
      icon: <Package size={20} />,
      label: 'Our Plans',
      path: '',
      submenu: [
        { label: 'All Subscription', path: AuthenticatedRoutes.OUR_PLANS },
        { label: 'Subscription History', path: AuthenticatedRoutes.PerchancePlanHistory },
      ]
    },

    {
      id: 'income-history',
      icon: <DollarSign size={20} />,
      label: 'Income History',
      path: AuthenticatedRoutes.INCOME_HISTORY_ALL
    },
      {
      id: 'daily-profit',
      icon: <UploadIcon size={20} />,
      label: 'Daily Profit',
      path: AuthenticatedRoutes.DAILY_PROFIT
    },
    {
      id: 'Roi-Income',
      icon: <DollarSign size={20} />,
      label: 'Transaction History',
      path: AuthenticatedRoutes.ROI_INCOME
    },
    // {
    //   id: 'settings',
    //   icon: <Settings size={20} />,
    //   label: 'Settings',
    //   path: '/admin/settings'
    // }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSubmenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some(item => isActive(item.path));
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button
          onClick={handleMobileMenuToggle}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white md:hidden"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 z-50 flex flex-col
          ${isMobile 
            ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') 
            : 'w-64'
          }
          ${!isMobile && 'relative'}
        `}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Shield className="text-blue-500" size={24} />
            </div>
            <div>
              <span className="font-bold text-lg">Admin Panel</span>
              <p className="text-xs text-gray-400">Control Center</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 min-h-0">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      toggleSubmenu(item.id);
                    } else {
                      handleNavigation(item.path);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                    (isActive(item.path) || isSubmenuActive(item.submenu)) ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded-lg ${
                      (isActive(item.path) || isSubmenuActive(item.submenu)) 
                        ? 'bg-blue-500/20' 
                        : 'bg-gray-700/50'
                    }`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.submenu && (
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform duration-200 ${
                        openMenus[item.id] ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </button>
                
                {/* Submenu */}
                {openMenus[item.id] && item.submenu && (
                  <div className="ml-8 flex flex-col mt-1 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => handleNavigation(subItem.path)}
                        className={`w-fit text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-700 p-4 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Admin v1.0</span>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:text-white transition-colors">
                <HelpCircle size={16} />
              </button>
              <button className="p-1 hover:text-white transition-colors">
                <Bell size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebardAdmin;

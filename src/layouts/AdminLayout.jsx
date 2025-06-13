import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, Settings, Users, BarChart2, Package, CoinsIcon } from 'lucide-react';
import { AuthenticatedRoutes } from '../context/Routes';
import SidebardAdmin from '../pages/Admin/SidebardAdmin';

const AdminLayout = ({ children, className }) => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if user is admin
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const menuItems = [
    { icon: <BarChart2 size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Users size={20} />, label: 'All Users', path: AuthenticatedRoutes.ALL_USERS },
    { icon: <Package size={20} />, label: 'Withdrawals', path: AuthenticatedRoutes.Withdrawals_history },
    { icon: <CoinsIcon size={20}/>, label :"CoinData" , path:AuthenticatedRoutes.COIN_INFO},
    { icon: <Settings size={20} />, label: 'Our Plans', path: AuthenticatedRoutes.OUR_PLANS },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Admin Sidebar */}
      {/* <div 
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-500" size={24} />
            {isExpanded && <span className="font-bold text-lg">Admin Panel</span>}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-gray-700"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              {item.icon}
              {isExpanded && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div> */}
<SidebardAdmin/>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        {/* <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Admin</span>
            </div>
          </div>
        </header> */}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto p-6 ${className || ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 
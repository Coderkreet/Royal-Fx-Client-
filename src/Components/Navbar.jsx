import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../utils/additonalFunc';
import logoimg from '../assets/app/Hello.png'

const Navbar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
          >
            <Menu className="h-5 w-5"/>
          </button>
          <div>
            <img src={logoimg} height={50} width={50} alt="" />
          </div>
          {/* Search Bar */}
          {/* <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-900 text-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div> */}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
              <Bell className="h-5 w-5" />
            </button> */}
            <Link to="/profile" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 
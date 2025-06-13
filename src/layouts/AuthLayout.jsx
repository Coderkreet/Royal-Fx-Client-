import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';

const AuthLayout = ({ inner, className }) => {
  const { isAdmin } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user is admin, use AdminLayout
  if (isAdmin) {
    return <AdminLayout className={className}>{inner}</AdminLayout>;
  }

  // Regular user layout
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className={`flex-1 overflow-y-auto scrollbar-hide p-${isExpanded ? '6' :'2'} ${className || ''}`}>
          {inner}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout; 
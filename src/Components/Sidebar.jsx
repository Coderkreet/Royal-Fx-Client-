import { Home, User, Award, Globe, Calendar, Settings, HelpCircle, LogOut, RotateCwSquareIcon, Wallet, Group } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthenticatedRoutes } from '../context/Routes';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coinlogo from '../assets/app/Hello.png'
import logoimg from '../assets/app/Hello.png'

import { MdCurrencyExchange } from "react-icons/md";

import Swal from 'sweetalert2';
import { SiMarketo, SiTradingview } from 'react-icons/si';
import { HiMiniLanguage } from 'react-icons/hi2';
import { IoMdInformation } from 'react-icons/io';
import { PiHandCoinsFill } from 'react-icons/pi';

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { icon: <Home size={20} />, text: "Home", path: AuthenticatedRoutes.DASHBOARD },
    // { icon: <SiMarketo size={20} />, text: "Market", path: AuthenticatedRoutes.MARKET },
    { icon: <PiHandCoinsFill size={20} />, text: "Royal-Fx", path: AuthenticatedRoutes.NEBULUX_COIN },
    { icon: <MdCurrencyExchange size={20} />, text: "Swapping", path: AuthenticatedRoutes.TRADING },
    { icon: <SiTradingview size={20} />, text: "Packages", path: AuthenticatedRoutes.OUR_PLANS },
    { icon: <Group size={20} />, text: "Referral", path: AuthenticatedRoutes.MY_TEAM },
    // { icon: <RotateCwSquareIcon size={20} />, text: "Rewards", path: AuthenticatedRoutes.REWARDS },
    // { icon: <Globe size={20} />, text: "Leaderboard", path: AuthenticatedRoutes.LEADERBOARD },
    { icon: <Calendar size={20} />, text: "ROI History", path: AuthenticatedRoutes.ROI_HISTORY },
    { icon: <Wallet size={20} />, text: "Wallet", path: AuthenticatedRoutes.WALLET },
    { icon: <Settings size={20} />, text: "Settings", path: AuthenticatedRoutes.SETTINGS },
  ];

  const bottomItems = [
    { icon: <HelpCircle size={20} />, text: "Help", path: AuthenticatedRoutes.HELP },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      background: '#1f2937',
      color: '#f9fafb',
      customClass: {
        popup: 'backdrop-blur-sm'
      }
    });

    if (result.isConfirmed) {
      logout();
      navigate('/');
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const sidebarVariants = {
    expanded: {
      width: 250,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    collapsed: {
      width: 64,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    },
    hidden: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        delay: 0.1
      }
    }
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed lg:static bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white  z-30 flex flex-col border-r border-gray-800/50 shadow-2xl ${isExpanded ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        variants={sidebarVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        initial={false}
      >
        {/* Logo Section */}
        <motion.div
          className="flex items-center justify-center h-20 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-xl font-bold p-2 text-center">
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.img
                  key="logo-expanded"
                  src={logoimg}
                  width={50}
                  alt="Logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.img
                  key="logo-collapsed"
                  src={coinlogo}
                  alt="Logo"
                  width={32}
                  height={32}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Menu Items */}
        <div className="flex-1 flex flex-col space-y-1">
          {menuItems.map((item, index) => {
            const isActive = isActiveRoute(item.path);
            return (
              <div key={index} className="relative px-3">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center px-3 py-2  justify-between rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden ${isActive
                        ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-blue-400 shadow-lg border border-blue-500/30'
                        : 'hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 text-gray-400 hover:text-white'
                      }`}
                    onClick={() => window.innerWidth < 1024 && setIsExpanded(false)}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>

                    {/* Text */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          className="ml-4  font-medium whitespace-nowrap"
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {item.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>

                {/* Enhanced Tooltip */}
                <AnimatePresence>
                  {!isExpanded && hoveredItem === index && (
                    <motion.div
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50 hidden md:block"
                      variants={tooltipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="relative top-[-1rem]">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-lg shadow-2xl border border-gray-600/50 backdrop-blur-sm">
                          <span className="font-medium whitespace-nowrap">{item.text}</span>
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600/50"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className=" border-gray-800/50 py-4 space-y-1 bg-gray-900/30">
          {bottomItems.map((item, index) => {
            const itemIndex = menuItems.length + index;
            const isActive = isActiveRoute(item.path);
            return (
              <div key={itemIndex} className="relative px-3">
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredItem(itemIndex)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${isActive
                        ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-blue-400 shadow-lg border border-blue-500/30'
                        : 'hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 text-gray-400 hover:text-white'
                      }`}
                    onClick={() => window.innerWidth < 1024 && setIsExpanded(false)}
                  >
                    <motion.div
                      className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                        }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          className="ml-4 font-medium whitespace-nowrap"
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {item.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {!isExpanded && hoveredItem === itemIndex && (
                    <motion.div
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50 hidden md:block"
                      variants={tooltipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="relative">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-lg shadow-2xl border border-gray-600/50 backdrop-blur-sm">
                          <span className="font-medium whitespace-nowrap">{item.text}</span>
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600/50"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Logout Button */}
          <div className="relative px-3">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={handleLogout}
                className="w-full relative flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-800/30 text-gray-400 hover:text-red-400"
              >
                <motion.div
                  className="flex-shrink-0 transition-colors duration-300 text-gray-400 group-hover:text-red-400"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <LogOut size={20} />
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      className="ml-4 font-medium whitespace-nowrap"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>

            {/* Logout Tooltip */}
            <AnimatePresence>
              {!isExpanded && hoveredItem === 'logout' && (
                <motion.div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50 hidden md:block"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-red-800 to-red-700 text-white px-4 py-2 rounded-lg shadow-2xl border border-red-600/50 backdrop-blur-sm">
                      <span className="font-medium whitespace-nowrap">Logout</span>
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-red-800 rotate-45 border-l border-b border-red-600/50"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
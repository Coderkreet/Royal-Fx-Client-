import { Award, TrendingUp, TrendingDown, ArrowRight, Copy, Share2, Users, Gift, Star, Eye, RefreshCw, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getUserInfo } from '../api/user-api';
import Swal from 'sweetalert2';
import { Route, useNavigate } from 'react-router-dom';
import { AuthenticatedRoutes } from '../context/Routes';
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/slice/userSlice";

// Mock user data - replace with your actual API call

// const mockUser = {
//   data: {
//     name: "John Doe",
//     referralLink: {
//       referCode: "MINE2024ABC"
//     }
//   }
// };




// Mock market data fetcher - replace with your actual API
const fetchTopMarketData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = Array.from({ length: 5 }, (_, i) => ({
        symbol: `${['BTC', 'ETH', 'BNB', 'ADA', 'SOL'][i]}USDT`,
        lastPrice: (Math.random() * 50000 + 1000).toString(),
        priceChangePercent: ((Math.random() - 0.5) * 20).toString(),
        priceChange: ((Math.random() - 0.5) * 1000).toString(),
        quoteVolume: (Math.random() * 1000000000).toString(),
      }));
      resolve(mockResponse);
    }, 300);
  });
};

const SmallLineChart = ({ data, percentage }) => {
  const isPositive = parseFloat(percentage) >= 0;
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-8 flex items-end gap-px">
        {data?.map((point, index) => {
          const height = Math.abs(parseFloat(point.percentage)) * 2 + 4;
          return (
            <div
              key={index}
              className={`w-1 ${isPositive ? 'bg-green-500' : 'bg-red-500'} opacity-80 transition-all duration-300`}
              style={{ 
                height: `${Math.min(height, 24)}px`,
                animationDelay: `${index * 50}ms`
              }}
            />
          );
        })}
      </div>
      <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{percentage}%
      </span>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="w-11/12 mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-600/40 rounded-3xl p-8 shadow-2xl animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-48"></div>
        </div>

        {/* Stats Card Skeleton */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-600/40 rounded-3xl p-8 shadow-2xl animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-20"></div>
                <div className="h-8 bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Card Skeleton */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-600/40 rounded-3xl p-8 shadow-2xl animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-32 mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({})
  const [dashboardStats, setDashboardStats] = useState({})
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef(null);
  const isActiveRef = useRef(true);
  const navigate = useNavigate();

  // Mock navigation function - replace with your actual navigation
  const handleStartMining = () => {
    navigate(AuthenticatedRoutes.OUR_PLANS)
  };

  const handleSeeMoreCoins = () => {
    navigate(AuthenticatedRoutes.MARKET)
  };

  const fetchMarketData = async () => {
    if (!isActiveRef.current) return;
    
    try {
      const response = await fetchTopMarketData();
      
      if (!isActiveRef.current) return;

      const validatedCoins = response.map((coin) => {
        const symbol = coin.symbol.slice(0, -4).toLowerCase();
        return {
          marketCap: coin.symbol,
          name: coin.symbol.slice(0, -4),
          price: parseFloat(coin.lastPrice).toFixed(2),
          percentage: parseFloat(coin.priceChangePercent).toFixed(2),
          imgSrc: `https://cryptoicon-api.pages.dev/api/icon/${symbol}`,
          priceChange24h: parseFloat(coin.priceChange),
          priceChangePercentage24h: parseFloat(coin.priceChangePercent),
          percentageVal: Array.from({ length: 6 }, (_, i) => ({
            hour: i.toString(),
            percentage: (parseFloat(coin.priceChangePercent) / (1.5 - i * 0.1)).toFixed(2),
          })),
        };
      });

      if (isActiveRef.current) {
        setMarketData(validatedCoins);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading market data", error);
      if (isActiveRef.current) {
        setLoading(false);
      }
    }
  };

  async function GetUserInfo() {
    try {
      setLoading(true);
      const res = await getUserInfo();
      setUser(res.data.userProfile);
      setDashboardStats(res.data.dashboardStats);
      // Save all user data in redux
      dispatch(setUserInfo(res.data.userProfile));
    } catch (error) {
      console.error("Error fetching user info:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load profile data",
      });
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    GetUserInfo();
  }, []);

  useEffect(() => {
    isActiveRef.current = true;
    fetchMarketData();

    intervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        fetchMarketData();
      }
    }, 5000);

    return () => {
      isActiveRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(user?.username || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on CryptoMiner',
          text: `Use my referral code: ${user?.username}`,
          url: window.location.origin + '/refer-and-earn/register?referral=' + user?.username,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyReferralCode();
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-11/12 mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-600/40 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-400 mt-2">Ready to some investment today?</p>
            </div>
            <button 
              onClick={handleStartMining}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Invest Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-600/40 rounded-3xl p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-8">Your Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Total Earned */}
            <div className="text-center p-4 bg-gray-700/20 rounded-2xl border border-gray-600/30 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${Number(dashboardStats?.totalEarning || 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Total Earned</div>
            </div>

            {/* Total Investment */}
            <div className="text-center p-4 bg-gray-700/20 rounded-2xl border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {dashboardStats?.totalInvestment || 0}
              </div>
              <div className="text-sm text-gray-400">Total Investment</div>
            </div>

            {/* Active Strategies */}
            <div className="text-center p-4 bg-gray-700/20 rounded-2xl border border-gray-600/30 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {dashboardStats?.activeStrategy || 0}
              </div>
              <div className="text-sm text-gray-400">Active Strategies</div>
            </div>

            {/* Total Withdrawal */}
            <div className="text-center p-4 bg-gray-700/20 rounded-2xl border border-gray-600/30 hover:border-red-400/50 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingDown className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-red-400 mb-2">
                ${Number(dashboardStats?.totalWithdrawal || 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">Total Withdrawal</div>
            </div>
          </div>
        </div>

        {/* Refer & Earn Section */}
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md border border-purple-500/50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
              Refer & Earn
            </h2>
            <p className="text-gray-300 text-lg">
              Invite friends and earn rewards together
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-black/40 rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-sm text-gray-400 mb-3">Your Referral Code</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-800/50 rounded-xl px-4 py-3 font-mono text-blue-400 text-lg border border-gray-600/30">
                  {user?.username || 'LOADING...'}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl transition-colors duration-200 border border-gray-600/30"
                  title="Copy referral code"
                >
                  <Copy className={`w-5 h-5 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
                </button>
              </div>
              {copied && (
                <div className="text-green-400 text-sm mt-3 animate-pulse">
                  Copied to clipboard!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 text-center">
              <div className="bg-black/30 rounded-2xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-purple-400 mb-2">${user?.account?.totalReferralEarning || 0}</div>
                <div className="text-sm text-gray-400">Total Referral Earnings</div>
              </div>
            </div>

            <button
              onClick={shareReferralLink}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Referral Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
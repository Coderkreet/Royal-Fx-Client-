import { Award, TrendingUp, TrendingDown, ArrowRight, Copy, Share2, Users, Gift, Star, Eye, RefreshCw, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getUserInfo } from '../api/user-api';
import Swal from 'sweetalert2';
import { Route, useNavigate } from 'react-router-dom';
import { AuthenticatedRoutes } from '../context/Routes';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="relative z-10 p-2 lg:p-6">
        {/* Header Skeleton */}
        <header className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-48"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-10 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card Skeleton */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl h-full">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-6"></div>
                <div className="flex gap-4">
                  <div className="h-10 bg-gray-700 rounded w-32"></div>
                  <div className="h-10 bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-40"></div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-40"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Market Overview Skeleton */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="animate-pulse">
                <div className="flex justify-between mb-6">
                  <div className="h-6 bg-gray-700 rounded w-40"></div>
                  <div className="h-6 bg-gray-700 rounded w-24"></div>
                </div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl mb-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-gray-600 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Refer & Earn Section Skeleton */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-6"></div>
                <div className="space-y-4">
                  <div className="bg-black/30 rounded-xl p-4">
                    <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-700 rounded w-full"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-black/20 rounded-lg p-3">
                      <div className="h-8 bg-gray-700 rounded w-24 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-16 mx-auto"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-gray-700 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {

  const [user, setUser] = useState([])
  // const [loading , setLoading] = useState(false)
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
      setUser(res);
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
      await navigator.clipboard.writeText(user?.data?.referralLink || '');
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
          text: `Use my referral code: ${user?.data?.referralLink}`,
          url: window.location.origin + '/refer-and-earn/register?referral=' + user?.data?.referralLink,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 p-2 lg:p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome back, {user?.data?.name}! 👋
                </h1>
                {/* <p className="text-gray-400 mt-2">Ready to mine some crypto today?</p> */}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <div className="text-sm text-gray-400">Live Updates</div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Active</span>
                  </div>
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
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Welcome Card */}
          <div className="xl:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl h-full">
              <div className="flex flex-col lg:flex-row items-center justify-between h-full">
                <div className="flex-1 mb-6 lg:mb-0">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Start  Today!
                  </h2>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Join our investment pool and start earning rewards.<br />
                    Check out our investment guide for beginners and maximize your profits.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={handleStartMining}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Invest Now
                    </button>
                    {/* <button className="bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm border border-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                      Mining Guide
                    </button> */}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600/30 shadow-2xl">
                    <Award size={64} className="text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Investment</h3>
              <p className="text-3xl font-bold text-blue-400"> {user?.data?.account?.totalInvestment}</p>
              {/* <p className="text-sm text-gray-500 mt-1">Start mining to see stats</p> */}
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Earned</h3>
              <p className="text-3xl font-bold text-green-400">${Number(user?.data?.account?.totalEarning).toFixed(2)}</p>
              {/* <p className="text-sm text-gray-500 mt-1">Ready to start earning</p> */}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Market Overview */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white">Market Overview</h2>
                  <p className="text-gray-400 text-xs sm:text-base">Top 5 cryptocurrencies</p>
                </div>
                {/* <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  {loading && <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />}
                  <button
                    onClick={handleSeeMoreCoins}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs sm:text-sm transition-colors duration-200"
                  >
                    See all coins <ExternalLink className="w-4 h-4" />
                  </button>
                </div> */}
              </div>

              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-700/30 rounded-xl">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full"></div>
                        <div className="flex-1 w-full">
                          <div className="h-4 bg-gray-600 rounded w-1/2 sm:w-1/4 mb-2"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/3 sm:w-1/6"></div>
                        </div>
                        <div className="h-8 bg-gray-600 rounded w-16 sm:w-20 mt-2 sm:mt-0"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {marketData.map((coin, index) => {
                    const isPositive = coin.priceChangePercentage24h >= 0;
                    return (
                      <div 
                        key={coin.marketCap}
                        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-700/20 hover:bg-gray-700/40 rounded-xl transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 w-full">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            <img 
                              src={coin.imgSrc} 
                              alt={coin.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/40/40";
                              }}
                            />
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm sm:text-base">{coin.marketCap}</div>
                            <div className="text-gray-400 text-xs sm:text-sm">${coin.price}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <div className={`font-semibold text-xs sm:text-base ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                              <div>${Math.abs(coin.priceChange24h).toFixed(2)}</div>
                              <div className="text-xs sm:text-sm">
                                ({isPositive ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%)
                              </div>
                            </div>
                          </div>
                          <SmallLineChart 
                            data={coin.percentageVal} 
                            percentage={coin.percentage} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* <button
                onClick={handleSeeMoreCoins}
                className="w-full mt-4 sm:mt-6 bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/50 text-white py-2 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <span>View All Cryptocurrencies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button> */}
            </div>
          </div>

          {/* Refer & Earn Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Refer & Earn
                </h2>
                <p className="text-gray-300 text-sm">
                  Invite friends and earn rewards together
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-4 border border-gray-700/50">
                  <div className="text-sm text-gray-400 mb-2">Your Referral Code</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800/50 rounded-lg px-3 py-2 font-mono text-blue-400 text-sm">
                      {user?.data?.referralLink || 'LOADING...'}
                    </div>
                    <button
                      onClick={copyReferralCode}
                      className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                      title="Copy referral code"
                    >
                      <Copy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  {copied && (
                    <div className="text-green-400 text-xs mt-2 animate-pulse">
                      Copied to clipboard!
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 text-center">
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">${user?.data?.account?.totalReferralEarning}</div>
                    <div className="text-xs text-gray-400">Earned</div>
                  </div>
                  {/* <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-400">$0</div>
                    <div className="text-xs text-gray-400"></div>
                  </div> */}
                </div>

                {/* <button
                  onClick={shareReferralLink}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Referral Link</span>
                </button> */}
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
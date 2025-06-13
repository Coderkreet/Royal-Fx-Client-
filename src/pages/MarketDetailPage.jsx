import { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  Search, 
  Star, 
  Share2, 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Volume2,
  ArrowUpDown,
  ShoppingCart,
  RefreshCw
} from "lucide-react";
import MarketCandleChart from "./MarketCandleChart";
import { useLocation, useNavigate } from "react-router-dom";

// Mock MarketCandleChart component
// const MarketCandleChart = ({ candleData }) => {
//   if (!candleData || candleData.length === 0) {
//     return (
//       <div className="w-full h-64 bg-gray-800/30 rounded-lg flex items-center justify-center">
//         <div className="text-gray-400">Loading chart data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-64 bg-gray-800/30 rounded-lg p-4">
//       <div className="w-full h-full flex items-end justify-between gap-1">
//         {candleData.slice(-20).map((candle, index) => {
//           const [open, high, low, close] = candle.y;
//           const isGreen = close > open;
//           const bodyHeight = Math.abs(close - open) * 2 + 2;
//           const wickHeight = (high - low) * 2 + 2;
          
//           return (
//             <div key={index} className="flex flex-col items-center justify-end h-full">
//               <div 
//                 className={`w-0.5 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
//                 style={{ height: `${Math.min(wickHeight, 200)}px` }}
//               />
//               <div 
//                 className={`w-2 ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
//                 style={{ height: `${Math.min(bodyHeight, 150)}px` }}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// Loading Skeleton Components
const SkeletonLoader = () => (
  <div className="min-h-screen bg-black text-white animate-pulse">
    {/* Header Skeleton */}
    <div className=" top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between p-4">
        <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
          <div>
            <div className="w-24 h-6 bg-gray-800 rounded"></div>
            <div className="w-16 h-4 bg-gray-800 rounded mt-2"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 bg-gray-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>

    {/* Main Content Skeleton */}
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Price Info Card Skeleton */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="w-32 h-8 bg-gray-800 rounded"></div>
            <div className="w-48 h-12 bg-gray-800 rounded"></div>
            <div className="w-40 h-6 bg-gray-800 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Chart Card Skeleton */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="w-32 h-6 bg-gray-800 rounded"></div>
          <div className="w-40 h-6 bg-gray-800 rounded"></div>
        </div>
        <div className="w-full h-64 bg-gray-800 rounded-lg"></div>
      </div>

      {/* Market Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <div className="w-24 h-4 bg-gray-800 rounded mb-2"></div>
            <div className="w-32 h-8 bg-gray-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* Action Button Skeleton */}
      <div className="pt-4">
        <div className="w-full h-14 bg-gray-800 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const MarketDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { symbol, coinData: initialCoinData } = location.state || {};
  
  const [coinData, setCoinData] = useState(initialCoinData || null);
  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const intervalRef = useRef(null);
  const isActiveRef = useRef(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const fetchMarketData = async () => {
    if (!isActiveRef.current || !symbol) return;
    
    try {
      console.log(`Fetching data for ${symbol}...`);
      
      const tickerResponse = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
      );
      
      const ticker = await tickerResponse.json();

      const klineResponse = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=15m&limit=60`
      );
      const klines = await klineResponse.json();

      if (!isActiveRef.current) return;

      const formattedCandleData = klines.map((k) => ({
        x: new Date(k[0]),
        y: [
          parseFloat(k[1]), // open
          parseFloat(k[2]), // high
          parseFloat(k[3]), // low
          parseFloat(k[4]), // close
        ],
      }));

      setCoinData(ticker);
      setCandleData(formattedCandleData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    isActiveRef.current = true;
    
    if (symbol && symbol !== "") {
      fetchMarketData();
      intervalRef.current = setInterval(() => {
        if (isActiveRef.current) {
          fetchMarketData();
        }
      }, 3000);
    }

    

    return () => {
      console.log("Cleaning up MarketDetailPage...");
      isActiveRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [symbol]);

  const handleNavigation = (path) => {
    isActiveRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    navigate(path);
  };

  const handleBackNavigation = () => {
    isActiveRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    navigate(-1);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "community", label: "Community" },
    { id: "markets", label: "Markets" },
    { id: "news", label: "News" }
  ];

  const isPositive = coinData?.priceChangePercent > 0;
  const priceChangePercent = coinData ? parseFloat(coinData.priceChangePercent).toFixed(2) : "--";
  const currentPrice = coinData ? parseFloat(coinData.lastPrice).toFixed(2) : "--";
  const volume = coinData ? parseFloat(coinData.volume).toFixed(2) : "--";

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className=" top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          {/* Left - Back Button */}
          <button
            onClick={handleBackNavigation}
            className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Center - Token Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              <img
                src={`https://cryptoicon-api.pages.dev/api/icon/${symbol
                  ?.slice(0, -4)
                  .toLowerCase()}`}
                alt={symbol}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/32/32";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{symbol}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live
              </div>
            </div>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-200">
              <Search className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-yellow-400 rounded-lg transition-all duration-200">
              <Star className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-200">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            
            {/* Price Info Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    {symbol}
                    {loading && <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />}
                  </h2>
                  <div className="text-3xl font-bold text-white">
                    ${currentPrice}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Volume: {volume}</span>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <button className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-200">
                    <Bell className="w-4 h-4" />
                  </button>
                  <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                    isPositive 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {isPositive ? '+' : ''}{priceChangePercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Price Chart</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Volume2 className="w-4 h-4" />
                  15m Interval
                </div>
              </div>
              <MarketCandleChart candleData={candleData} />
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">24h High</div>
                <div className="text-white text-xl font-semibold">
                  ${coinData ? parseFloat(coinData.highPrice).toFixed(2) : "--"}
                </div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">24h Low</div>
                <div className="text-white text-xl font-semibold">
                  ${coinData ? parseFloat(coinData.lowPrice).toFixed(2) : "--"}
                </div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">24h Volume</div>
                <div className="text-white text-xl font-semibold">
                  {coinData ? parseFloat(coinData.quoteVolume).toLocaleString() : "--"}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={() => handleNavigation('/trading')}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>
        )}

        {/* Other Tab Content */}
        {activeTab === "community" && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <div className="text-gray-400 text-center py-8">
              Community features coming soon...
            </div>
          </div>
        )}

        {activeTab === "markets" && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Markets</h3>
            <div className="text-gray-400 text-center py-8">
              Market data coming soon...
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">News</h3>
            <div className="text-gray-400 text-center py-8">
              Latest news coming soon...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketDetailPage;
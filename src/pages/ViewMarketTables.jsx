import { useState, useEffect, useRef } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Star,
  Eye,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../context/Routes";

// Your original SmallLineChart component (assuming it exists)
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
              className={`w-1 ${isPositive ? 'bg-green-500' : 'bg-red-500'} opacity-80`}
              style={{ height: `${Math.min(height, 24)}px` }}
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

// Your original TopMarketFilter component
const TopMarketFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    coinName: "",
    timeFilter: "24h",
    top100: false,
  });

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xxl p-6 mb-6 border border-gray-800">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={filters.coinName}
              onChange={(e) => handleFilterUpdate('coinName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Time Filter */}
          <select
            value={filters.timeFilter}
            onChange={(e) => handleFilterUpdate('timeFilter', e.target.value)}
            className="px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            <option value="1h">1 Hour</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </div>

        {/* Top 100 Toggle */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.top100}
              onChange={(e) => handleFilterUpdate('top100', e.target.checked)}
              className="w-4 h-4 text-blue-500 bg-black border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-sm">Top 100 only</span>
          </label>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewMarketTables = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const intervalRef = useRef(null);
  const isActiveRef = useRef(true); // Track if component is still active
  
  const [filters, setFilters] = useState({
    coinName: "",
    timeFilter: "24h",
    top100: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Updated filters:", newFilters);
  };

  // Your original fetchAllMarketData function (mock implementation)
  const fetchAllMarketData = async () => {
    // Replace this with your actual API call
    // This is just a mock to demonstrate the structure
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = Array.from({ length: 150 }, (_, i) => ({
          symbol: `${['BTC', 'ETH', 'BNB', 'ADA', 'SOL', 'XRP', 'DOT', 'DOGE', 'AVAX', 'MATIC'][i % 10]}USDT`,
          lastPrice: (Math.random() * 50000 + 1000).toString(),
          priceChangePercent: ((Math.random() - 0.5) * 20).toString(),
          priceChange: ((Math.random() - 0.5) * 1000).toString(),
          quoteVolume: (Math.random() * 1000000000).toString(),
        }));
        resolve(mockResponse);
      }, 500);
    });
  };

  const fetchData = async () => {
    // Don't fetch if component is no longer active
    if (!isActiveRef.current) return;
    
    try {
      setLoading(true);
      console.log("Fetching market data...");
      
      const response = await fetchAllMarketData();

      // Check again after async operation
      if (!isActiveRef.current) return;

      const sortedByVolume = response.sort(
        (a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)
      );

      const topCoins = sortedByVolume.slice(0, 100);

      const validatedCoins = await Promise.all(
        topCoins.map(async (coin) => {
          const symbol = coin.symbol.slice(0, -4).toLowerCase();
          let imgUrl = `https://cryptoicon-api.pages.dev/api/icon/${symbol}`;

          return {
            marketCap: coin.symbol,
            price: parseFloat(coin.lastPrice)?.toFixed(2),
            percentage: parseFloat(coin.priceChangePercent).toFixed(2),
            imgSrc: imgUrl,
            priceChange24h: parseFloat(coin.priceChange),
            priceChangePercentage24h: parseFloat(coin.priceChangePercent),
            percentageVal: [
              {
                hour: "0",
                percentage: (coin.priceChangePercent / 2).toFixed(2),
              },
              {
                hour: "1",
                percentage: (coin.priceChangePercent / 1.5).toFixed(2),
              },
              {
                hour: "2",
                percentage: (coin.priceChangePercent / 1.2).toFixed(2),
              },
              {
                hour: "3",
                percentage: (coin.priceChangePercent / 1.1).toFixed(2),
              },
              {
                hour: "4",
                percentage: (coin.priceChangePercent / 1.05).toFixed(2),
              },
              {
                hour: "5",
                percentage: (coin.priceChangePercent / 1.03).toFixed(2),
              },
            ],
          };
        })
      );

      const filteredData = validatedCoins.filter((coin) => coin !== null);
      
      // Final check before setting state
      if (isActiveRef.current) {
      setData(filteredData);
      }
    } catch (error) {
      console.error("Error loading market data", error);
    } finally {
      if (isActiveRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Mark component as active
    isActiveRef.current = true;
    
    // Initial data fetch
    fetchData();

    // Set up interval for polling every 3 seconds
    intervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
      fetchData();
      }
    }, 3000);

    // Cleanup function
    return () => {
      console.log("Cleaning up ViewMarketTables component...");
      isActiveRef.current = false;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const navigateCoinDetail = (coin) => {
    // Stop the interval before navigation
    isActiveRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Navigate to market detail with the specific coin data
    navigate(AuthenticatedRoutes.MARKET_DETAIL, {
      state: {
        symbol: coin.marketCap,
        coinData: coin
      }
    });
  };

  // Apply filters to data
  const filteredData = data.filter(coin => {
    const matchesSearch = filters.coinName === "" || 
      coin.marketCap.toLowerCase().includes(filters.coinName.toLowerCase());
    
    const matchesTop100 = !filters.top100 || data.indexOf(coin) < 100;
    
    return matchesSearch && matchesTop100;
  });

  // Pagination logic - exactly 10 items per page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading && data.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg">Loading market data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-black text-white p-2 lg:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Market Overview</h1>
              <p className="text-gray-400">Real-time cryptocurrency market data</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Updates every 3s</span>
              {loading && <RefreshCw className="w-4 h-4 animate-spin ml-2" />}
            </div>
          </div>
        </div>

        {/* Filters */}
        {/* <TopMarketFilter onFilterChange={handleFilterChange} /> */}

        {/* Table Container */}
        <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Top Cryptocurrencies ({filteredData.length} coins)
              </h2>
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">#</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Market Cap</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Price ($)</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">24h %</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((coin, index) => {
                  const isPositive = coin.priceChangePercentage24h >= 0;
                  const globalIndex = startIndex + index + 1;
                  
                  return (
                    <tr 
                      key={`${coin.marketCap}-${index}`}
                      onClick={() => navigateCoinDetail(coin)}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer transition-all duration-200 group"
                    >
                      {/* Serial Number */}
                      <td className="py-4 px-6">
                        <span className="text-gray-400 font-medium">{globalIndex}</span>
                      </td>

                      {/* Market Cap with Image */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            <img 
                              src={coin.imgSrc} 
                              alt={coin.marketCap}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/32/32";
                              }}
                            />
                          </div>
                          <div>
                            <div className="text-white font-semibold">{coin.marketCap}</div>
                            <div className="text-gray-400 text-sm">${coin.price}</div>
                          </div>
                        </div>
                      </td>

                      {/* Price with 24h Change */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                          <div className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            <div>${Math.abs(coin.priceChange24h).toFixed(2)}</div>
                            <div className="text-sm">
                              ({isPositive ? '+' : ''}{coin.priceChangePercentage24h.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Chart */}
                      <td className="py-4 px-6">
                        <SmallLineChart 
                          data={coin.percentageVal} 
                          percentage={coin.percentage} 
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Starred:", coin.marketCap);
                            }}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          >
                            <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("View details:", coin.marketCap);
                            }}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4 text-gray-400 hover:text-blue-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination - exactly 10 items per page */}
          <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/50">
       


        <div className="w-full text-xs sm:text-sm text-gray-400 text-center sm:text-left px-4 py-2 break-words">
   <p className="text-center">  Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
  <span className="hidden sm:inline"> (10 per page)</span></p>
</div>


            <div className="flex items-center justify-center">
  
              <div className="flex text-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-center hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          currentPage === page 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMarketTables;
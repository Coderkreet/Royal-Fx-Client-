import React, { useState, useEffect, useRef } from "react";
import b1 from "../../assets/website/Group 1321317423.png";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChevronDown } from "react-icons/fa";

const DecentralizedFuture2 = () => {
  const [chartData, setChartData] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const isActiveRef = useRef(true);

  const fetchMarketData = async () => {
    if (!isActiveRef.current) return;
    
    try {
      // Fetch 24hr ticker data
      const tickerResponse = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT`
      );
      const ticker = await tickerResponse.json();

      // Fetch 1-day klines for area chart
      const klineResponse = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24`
      );
      const klines = await klineResponse.json();

      if (!isActiveRef.current) return;

      // Format chart data
      const formattedChartData = klines.map((k) => ({
        name: new Date(k[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(k[4]), // Using close price
      }));

      setMarketData(ticker);
      setChartData(formattedChartData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    isActiveRef.current = true;
    fetchMarketData();
    
    // Update data every 3 seconds
    intervalRef.current = setInterval(() => {
      if (isActiveRef.current) {
        fetchMarketData();
      }
    }, 3000);

    return () => {
      isActiveRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentPrice = marketData ? parseFloat(marketData.lastPrice).toFixed(2) : "--";
  const priceChangePercent = marketData ? parseFloat(marketData.priceChangePercent).toFixed(2) : "--";
  const isPositive = marketData ? parseFloat(marketData.priceChangePercent) > 0 : false;
  const highPrice = marketData ? parseFloat(marketData.highPrice).toFixed(2) : "--";
  const lowPrice = marketData ? parseFloat(marketData.lowPrice).toFixed(2) : "--";
  const volume = marketData ? parseFloat(marketData.volume).toLocaleString() : "--";
  const quoteVolume = marketData ? parseFloat(marketData.quoteVolume).toLocaleString() : "--";

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/30 backdrop-blur-sm border border-blue-600/30 rounded-full mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="text-cyan-300 text-sm font-medium uppercase tracking-wider">
                Decentralized Future
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent leading-tight mb-6">
              Real-time exchange rates
            </h2>
            
            <p className="text-slate-300 text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
              Experience the power of decentralized technology with cutting-edge solutions 
              that shape tomorrow's digital landscape and provide real-time market insights.
            </p>
          </div>

          {/* Chart Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-sm opacity-60"></div>
                    <img 
                      src={b1} 
                      alt="Bitcoin" 
                      className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-orange-400/50" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-xl lg:text-2xl">
                      1 BTC = ${currentPrice}
                    </p>
                    <p className={`${isPositive ? 'text-green-400' : 'text-red-400'} text-sm font-medium`}>
                      {isPositive ? '+' : ''}{priceChangePercent}% (24h)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full px-4 py-3 hover:bg-slate-600/50 transition-colors cursor-pointer">
                  <span className="text-white text-sm lg:text-base font-medium">This Week</span>
                  <FaChevronDown className="text-cyan-400 text-sm" />
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 sm:h-80 lg:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38B7EA" stopOpacity={0.8} />
                        <stop offset="50%" stopColor="#38B7EA" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38B7EA" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(56, 183, 234, 0.3)',
                        borderRadius: '12px',
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'BTC Price']}
                      labelStyle={{ color: '#38B7EA' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#38B7EA"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      dot={{ fill: '#38B7EA', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#38B7EA', strokeWidth: 2, fill: 'white' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Stats */}
              <div className="grid p-2 overflow-hidden grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/50">
                <div className="text-center">
                  <p className="text-slate-400 text-[0.7rem]">24h High</p>
                  <p className="text-white font-semibold text-[0.8rem]">${highPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-[0.7rem]">24h Low</p>
                  <p className="text-white font-semibold text-[0.8rem]">${lowPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-[0.7rem]">Volume</p>
                  <p className="text-white font-semibold text-[0.8rem]">{volume}</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-[0.7rem]">Quote Volume</p>
                  <p className="text-white font-semibold text-[0.8rem]">{quoteVolume}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-slate-900"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-slate-900"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <span>Real-time data from leading exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecentralizedFuture2;

import React, { useState, useEffect } from "react";
import { Wallet, Sparkles, TrendingUp, Shield, Coins, ArrowRight, CheckCircle, Star, ExternalLink } from "lucide-react";
import Mcoin from '../../assets/home/bitcoinsv.png'
import Vcoin from '../../assets/home/vector.jpg'
import Logo from '../../assets/app/Hello.png'
import { ImCoinDollar } from "react-icons/im";

const AboutPretorix = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  // Since we can't import the assets directly, we'll use placeholder paths
  // In your actual implementation, replace these with your asset imports
  const vectorIcon = <ImCoinDollar/>;
  const coinsImage = Logo;

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const supportedCoins = [
    { name: "Bitcoin", symbol: "BTC", color: "from-orange-400 to-orange-600" },
    { name: "Ethereum", symbol: "ETH", color: "from-blue-400 to-blue-600" },
    { name: "Solana", symbol: "SOL", color: "from-purple-400 to-purple-600" },
    { name: "Litecoin", symbol: "LTC", color: "from-gray-400 to-gray-600" },
    { name: "Dogecoin", symbol: "DOGE", color: "from-yellow-400 to-yellow-600" },
    { name: "XRP", symbol: "XRP", color: "from-blue-300 to-blue-500" }
  ];

  return (
    <section id="about" className="relative min-h-screen bg-gradient-to-br from-[#151515] via-[#1a1a1a] to-[#0f0f0f] py-16 px-6 md:px-20 lg:px-32 mt-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#2eb4e0]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full h-full bg-[#1f2022]/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row w-full mt-5 xl:mt-20 items-center">
          {/* Left Content */}
          <div className={`lg:w-1/2 w-full pt-16 lg:pt-20 px-3 xl:px-8 md:px-12 py-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Header with Brand Element */}
            <div className="relative mb-8">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#2eb4e0] to-cyan-300 rounded-full"></div>
              <h1 className="text-4xl lg:text-7xl md:text-5xl sm:text-3xl font-bold bg-gradient-to-r from-[#2eb4e0] via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight ml-8">
                About Z-Coin
              </h1>
            </div>

            {/* Content */}
            <div className="space-y-6 text-lg lg:text-xl text-gray-300 leading-relaxed xl:px-7">
              <div className="bg-gradient-to-r from-[#2eb4e0]/10 to-transparent rounded-2xl p-6 border-l-4 border-[#2eb4e0]">
                <p>
                  <span className="text-[#2eb4e0] font-bold">Z-Coin</span> is a future-focused crypto investment token designed to make digital wealth building easy, secure, and rewarding. Backed by the CryptoZ Investment Plan, it offers a range of flexible investment tiers with fixed monthly returns, transparent tracking, and blockchain-powered security — making it ideal for both new and experienced investors seeking passive income and long-term financial growth in the decentralized economy.
                </p>
              </div>
              
              {/* <p className="bg-slate-800/30 rounded-xl p-6">
                We take pride in our premium-grade UI/UX design, featuring modern, professional graphics and 3D visual elements to enhance user engagement.
              </p> */}
              
              {/* <p className="bg-slate-800/30 rounded-xl p-6">
                Our primary focus is on offering purchasing plans directly through our website, while keeping the Multi-Level Marketing (MLM) features discreet and accessible only to registered users through their affiliate dashboard.
              </p> */}
              
              {/* <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-2xl p-6 border border-[#2eb4e0]/20">
                <p className="mb-4">
                  Pretorix supports a range of top-tier cryptocurrencies, including Bitcoin, Ethereum (ETH), Solana, Litecoin, Dogecoin, and XRP.
                </p>
                <div className="flex items-center gap-2 text-[#2eb4e0] font-semibold text-xl">
                  <Coins className="w-6 h-6" />
                  <span>Introducing NEBULUX</span>
                </div>
                <p className="mt-2 text-gray-400">
                  Our own coin built to empower our ecosystem and offer greater value to our community.
                </p>
              </div> */}
            </div>

            {/* Supported Cryptocurrencies Grid */}
          
          </div>

          {/* Right Image Section */}
          <div className={`lg:w-1/2  w-full relative flex justify-center items-end mt-11 lg:mt-0 lg:-top-48 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2eb4e0]/30 to-cyan-400/30 rounded-full blur-3xl scale-110 animate-pulse"></div>
              
              {/* Main coins image */}
              <img
                src={coinsImage}
                alt="Bitcoin and cryptocurrency coins"
                className="relative z-10 w-80 lg:w-96 h-auto xl:top-[15rem] drop-shadow-2xl 
                animate-[float_6s_ease-in-out_infinite] hover:scale-110 
                transition-all duration-700 ease-in-out"
                style={{
                  transform: 'rotate(0deg)',
                  animation: 'float 6s ease-in-out infinite, rotate 20s linear infinite'
                }}
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <style>
                {`
                  @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                  }
                  @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                `}
              </style>
              
              {/* Fallback visual if image doesn't load */}
              <div className="hidden w-80 lg:w-96 h-80 bg-gradient-to-br from-[#2eb4e0] to-cyan-600 rounded-full items-center justify-center">
                <Coins className="w-32 h-32 text-white animate-spin" style={{animationDuration: '10s'}} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full relative flex flex-col lg:flex-row justify-center items-center lg:h-auto gap-8 p-3 xl:p-8 lg:px-20 mb-8">
          {/* Left CTA */}
          <div className={`lg:w-1/3 w-full text-center lg:text-left transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={() => window.location.href = '/login'}
              className="group relative bg-gradient-to-r from-[#49c0e1] to-[#2eb4e0] hover:from-[#2eb4e0] hover:to-[#49c0e1] text-white font-bold text-xl lg:text-2xl px-12 py-6 rounded-2xl w-full lg:w-auto border-2 border-transparent hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#2eb4e0]/25 overflow-hidden">
              Get Started For Free
              <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
            
            <p className="text-gray-300 text-lg lg:text-xl mt-4 flex items-center justify-center lg:justify-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              No Account Needed to Start
            </p>
          </div>

          {/* Right Feature Cards */}
          <div className={`lg:w-2/3 w-full bg-white/5 backdrop-blur-sm rounded-3xl p-2 xl:p-8 border border-gray-600/30 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Connect Wallet Card */}
              <div className={`w-full bg-[#1f2022] rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-[#2eb4e0]/50 transition-all duration-500 group ${activeCard === 0 ? 'ring-2 ring-[#2eb4e0]/30' : ''}`}>
                <div className="flex gap-4 items-center mb-4">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-[#2eb4e0] to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={vectorIcon}
                      alt="Wallet connection icon"
                      className="w-8 h-8 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <Wallet className="w-6 h-6 text-white hidden" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-[#2eb4e0] transition-colors duration-300">
                    Connect Your Wallet
                  </h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Seamlessly integrate with your favorite crypto wallets. Experience instant connectivity with multi-chain support and enterprise-grade security protocols for safe transactions.
                </p>
              </div>
              
              {/* Explore DApps Card */}
              <div className={`w-full bg-[#1f2022] rounded-2xl p-6 shadow-xl border border-gray-700/50 hover:border-[#2eb4e0]/50 transition-all duration-500 group ${activeCard === 1 ? 'ring-2 ring-[#2eb4e0]/30' : ''}`}>
                <div className="flex gap-4 items-center mb-4">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={vectorIcon}
                      alt="DApps icon"
                      className="w-8 h-8 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <ExternalLink className="w-6 h-6 text-white hidden" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-[#2eb4e0] transition-colors duration-300">
                    Explore Decentralized Apps
                  </h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Access cutting-edge decentralized applications and financial instruments. Discover yield farming, staking, and innovative DeFi investment opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPretorix;
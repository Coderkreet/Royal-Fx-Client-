import React from 'react';
import { TrendingUp, DollarSign, BarChart3, Zap, Shield, Globe } from 'lucide-react';
import round_Circle from '../../assets/round_Circle.png'
import { Link } from 'react-router-dom';
import { AuthRoutes } from '../../context/Routes';

const AdvancedFeatures = () => {
  // Mock data with icons instead of images
  const advancedFeaturedData = [
    {
      id: 1,
      icon: TrendingUp,
      value: "+34.89%",
      label: "ETH"
    },
    {
      id: 2,
      icon: DollarSign,
      value: "$3.67",
      label: "BTC"
    },
    {
      id: 3,
      icon: BarChart3,
      value: "$3.67",
      label: "USDT"
    },
  ];

  const tokenData = [
    { icon: TrendingUp, value: "+34.89", label: "ETH" },
    { icon: DollarSign, value: "+3.67", label: "BTC" },
    { icon: BarChart3, value: "+3.67", label: "USDT" },
    { icon: Zap, value: "+34.89", label: "SOL" },
    { icon: Shield, value: "+3.67", label: "ADA" },
    { icon: Globe, value: "+3.67", label: "DOT" },
  ];

  const features = [
    {
      title: "Yield Farming",
      description: "Participants in Yield farming have the opportunity to earn sustainable returns through strategic liquidity provision.",
      icon: TrendingUp
    },
    {
      title: "Staking Rewards",
      description: "Secure the network while earning passive income through our advanced staking mechanisms.",
      icon: Shield
    }
  ];

  const benefits = [
    "Access and interact with multiple blockchains seamlessly",
    "Advanced portfolio management and analytics tools",
    "Real-time market data and trading signals",
    "Institutional-grade security and compliance",
    "24/7 automated trading and yield optimization"
  ];

  return (
    <section className="bg-[#151515] relative text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Rotating Circle Background */}
      <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none">
        <img 
          src={round_Circle} 
          alt="Background Circle" 
          className="w-full h-full animate-spin-slow"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
              Advanced Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Explore the Decentralized Future
          </h2>
          <p className="text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci.
            At feugiat duis parturient amet scelerisque enim vulputate tortor.
          </p>
        </div>

        {/* Section 1: Transactions Dashboard */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Transaction Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
              <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">Transactions</h3>
                <p className="text-gray-400 text-lg mb-6">Today</p>
                <div className="space-y-4">
                  {advancedFeaturedData.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.id} className="bg-gray-800 border border-gray-600 rounded-xl p-4 lg:p-6 flex items-center justify-between hover:border-blue-500/50 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-gray-300 font-medium">{item.label}</span>
                        </div>
                        <span className={`text-lg font-semibold ${item.value.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="order-1 lg:order-2 flex items-center">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Access Cutting-Edge Financial Tools and Services
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Access and interact with multiple blockchains
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                Learn More
              </button> */}
            </div>
          </div>
        </div>

        {/* Section 2: Multi-Chain Integration */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Content */}
          <div className="flex items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8">
                Seamless Multi-Chain Integration
              </h3>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              {/* <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                Learn More
              </button> */}
            </div>
          </div>

          {/* Right: Token List */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
              <h4 className="text-xl font-semibold mb-6 text-center">Supported Assets</h4>
              <div className="space-y-3">
                {tokenData.map((token, index) => {
                  const IconComponent = token.icon;
                  return (
                    <div key={index} className="bg-gray-700/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium">{token.label}</span>
                      </div>
                      <span className={`font-semibold ${token.value.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
                        {token.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Trading Interface */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Trading Panel */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 lg:p-8">
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Selling</span>
                    <span className="text-red-400 text-sm">SELL</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Ethereum</p>
                      <p className="text-gray-400 text-sm">ETH</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Buying</span>
                    <span className="text-green-400 text-sm">BUY</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Bitcoin</p>
                      <p className="text-gray-400 text-sm">BTC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8">
                Advanced Trading Platform
              </h3>
              <div className="space-y-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci. 
                  At feugiat duis parturient amet scelerisque enim vulputate tortor.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Experience lightning-fast trade execution with institutional-grade 
                  security and advanced order types for professional trading.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our platform supports multiple trading pairs across various 
                  blockchain networks with competitive fees and deep liquidity.
                </p>
              </div>
             <Link to={AuthRoutes.LOGIN} >
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                Start Trading
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
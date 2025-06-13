import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CryptoMiningMarketplace = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const miningPlans = [
    {
      id: 1,
      name: 'SHA256AsicBoost',
      coin: 'Bitcoin',
      symbol: '₿',
      color: '#F7931A',
      hashrate: '0.1',
      unit: 'EH/day',
      duration: '24 hours',
      priceInBTC: '0.04958000',
      priceInUSD: '$5297.01',
      algorithm: 'SHA-256'
    },
    {
      id: 2,
      name: 'Scrypt',
      coin: 'Litecoin',
      symbol: 'Ł',
      color: '#BFBBBB',
      hashrate: '1.0',
      unit: 'TH/day',
      duration: '24 hours',
      priceInBTC: '0.01200000',
      priceInUSD: '$1282.05',
      algorithm: 'Scrypt'
    },
    {
      id: 3,
      name: 'DogeMiner',
      coin: 'Dogecoin',
      symbol: 'Ð',
      color: '#C2A633',
      hashrate: '1.5',
      unit: 'TH/day',
      duration: '24 hours',
      priceInBTC: '0.00950000',
      priceInUSD: '$1015.20',
      algorithm: 'Scrypt'
    },
    {
      id: 4,
      name: 'SolanaStake',
      coin: 'Solana',
      symbol: '◎',
      color: '#14F195',
      hashrate: '2.5',
      unit: 'SOL/day',
      duration: '24 hours',
      priceInBTC: '0.00800000',
      priceInUSD: '$855.40',
      algorithm: 'Proof of Stake'
    },
    {
      id: 5,
      name: 'RippleValidator',
      coin: 'XRP',
      symbol: '✕',
      color: '#23292F',
      hashrate: '5.0',
      unit: 'XRP/day',
      duration: '24 hours',
      priceInBTC: '0.00650000',
      priceInUSD: '$695.75',
      algorithm: 'XRP Ledger'
    },
    {
      id: 6,
      name: 'NebulaBoost',
      coin: 'Z-Coin',
      symbol: '⧫',
      color: '#6C5CE7',
      hashrate: '0.8',
      unit: 'ZCoin/day',
      duration: '24 hours',
      priceInBTC: '0.00450000',
      priceInUSD: '$481.50',
      algorithm: 'Nebula-X11'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Crypto Mining Marketplace
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our selection of mining algorithms and start earning cryptocurrency today. 
              Compare hash power rates and current prices on the marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* Mining Plans Grid */}
      <div className="max-w-7xl mx-auto px-3 py-6  xl:px-6  xl:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {miningPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Card Header */}
              <div className="p-8 text-center border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{plan.name}</h3>
                
                {/* Coin Info */}
                <div className="flex items-center justify-center mb-6">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.symbol}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{plan.coin}</span>
                </div>

                {/* Hash Rate */}
                <div className="mb-6">
                  <div className="text-6xl font-bold text-gray-900 mb-2">
                    {plan.hashrate}
                  </div>
                  <div className="text-xl text-gray-600 font-medium">
                    {plan.unit}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    for {plan.duration}
                  </div>
                </div>

                {/* Algorithm Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-6">
                  {plan.algorithm}
                </div>
              </div>

              {/* Pricing Section */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">starting at</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.priceInBTC} <span className="text-sm font-normal text-gray-500">BTC</span>
                  </div>
                  <div className="text-lg text-gray-600">
                    (≈{plan.priceInUSD})
                  </div>
                </div>

                <Link to="/login" className="block w-full">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95">
                  Buy hashpower
                </button>
                </Link>
              </div>

              <div className="absolute top-4 right-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Prices Button */}
        <div className="text-center mt-12">
          <Link to="/login" className="block w-full">
          <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 transform hover:scale-105">
            See all prices
          </button>
          </Link>
        </div>

        {/* Market Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Market Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
              <div className="text-sm text-gray-600">Active Miners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-sm text-gray-600">Cryptocurrencies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoMiningMarketplace;
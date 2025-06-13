import React from 'react';
import { TrendingUp, Users, Shield, Zap, Star, Activity, Lock, Gift, Flame, Rocket, Target, Megaphone } from 'lucide-react';

const TokenomicsTable = () => {
  const tokenomicsData = [
    {
      category: "Total Supply",
      allocation: "100M Zcoin Supply",
      details: "Fixed supply on BNB Chain",
      icon: <Target className="w-5 h-5" />
    },
    {
      category: "Locked Supply",
      allocation: "30% (30M ZCOIN)",
      details: "Released over 5 years",
      icon: <Lock className="w-5 h-5" />
    },
    {
      category: "Team",
      allocation: "3% (3M ZCOIN)",
      details: "Core team allocation",
      icon: <Users className="w-5 h-5" />
    },
    {
      category: "Advisors",
      allocation: "2% (2M ZCOIN)",
      details: "Advisory board allocation",
      icon: <Star className="w-5 h-5" />
    },
    {
      category: "Z COIN Ecosystem",
      allocation: "5% (5M ZCOIN)",
      details: "Supports ecosystem projects",
      icon: <Activity className="w-5 h-5" />
    },
    {
      category: "Burning Mechanism",
      allocation: "20% (20M Z COIN)",
      details: "Periodic burns to reduce supply",
      icon: <Flame className="w-5 h-5" />
    },
    {
      category: "Airdrop & Referral",
      allocation: "3% (3M ZCOIN)",
      details: "Community incentives",
      icon: <Gift className="w-5 h-5" />
    },
    {
      category: "Community Users",
      allocation: "25% (25M ZCOIN)",
      details: "Staking & Private Sale",
      icon: <Users className="w-5 h-5" />
    },
    {
      category: "Reserve & Future Dev.",
      allocation: "7% (7M ZCOIN)",
      details: "Expansion & innovation",
      icon: <Rocket className="w-5 h-5" />
    },
    {
      category: "Marketing & Partnerships",
      allocation: "8% (8M ZCOIN)",
      details: "Growth & strategic collaborations",
      icon: <Megaphone className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
          Royal-Fx Tokenomics
        </h2>
        <p className="text-gray-400 text-lg">
          Complete token distribution and allocation details
        </p>
      </div>

      {/* Total Supply Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-xl p-6 border border-cyan-400/30">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">100M ZCOIN</h3>
              <p className="text-cyan-300">Total Supply on BNB Chain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700/50">
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400 font-semibold">Category</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center">
                  <span className="text-cyan-400 font-semibold">Allocation</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-cyan-400 font-semibold">Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenomicsData.slice(1).map((item, index) => (
                <tr 
                  key={index}
                  className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-lg">
                        {item.icon}
                      </div>
                      <span className="text-white font-medium">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-lg">
                      <span className="text-cyan-300 font-bold">{item.allocation}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.details}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-xl p-6 border border-cyan-400/30">
          <h3 className="text-xl font-bold text-white mb-2">Locked Supply</h3>
          <p className="text-cyan-300 text-2xl font-bold">30M ZCOIN</p>
          <p className="text-gray-400 text-sm mt-1">Released over 5 years</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-xl p-6 border border-cyan-400/30">
          <h3 className="text-xl font-bold text-white mb-2">Circulating Supply</h3>
          <p className="text-cyan-300 text-2xl font-bold">70M ZCOIN</p>
          <p className="text-gray-400 text-sm mt-1">Available for trading and staking</p>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsTable; 
import React from 'react';
import Logo from '../../assets/app/Hello.png'
import TokenomicsTable from './TokenomicsTable';
const ZcoinTokenomics = () => {
  const tokenomicsData = [
    {
      category: "Total Supply",
      allocation: "100M Zcoin Supply",
      details: "Fixed supply on BNB Chain"
    },
    {
      category: "Locked Supply",
      allocation: "30% (30M ZCOIN)",
      details: "Released over 5 years"
    },
    {
      category: "Team",
      allocation: "3% (3M ZCOIN)",
      details: "Core team allocation"
    },
    {
      category: "Advisors",
      allocation: "2% (2M ZCOIN)",
      details: "Advisory board allocation"
    },
    {
      category: "Z COIN Ecosystem",
      allocation: "5% (5M ZCOIN)",
      details: "Supports ecosystem projects"
    },
    {
      category: "Burning Mechanism",
      allocation: "20% (20M Z COIN)",
      details: "Periodic burns to reduce supply"
    },
    {
      category: "Airdrop & Referral",
      allocation: "3% (3M ZCOIN)",
      details: "Community incentives"
    },
    {
      category: "Community Users",
      allocation: "25% (25M ZCOIN)",
      details: "Staking & Private Sale"
    },
    {
      category: "Reserve & Future Dev.",
      allocation: "7% (7M ZCOIN)",
      details: "Expansion & innovation"
    },
    {
      category: "Marketing & Partnerships",
      allocation: "8% (8M ZCOIN)",
      details: "Growth & strategic collaborations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[black] to-slate-800 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center ">
             <img src={Logo} alt="" /> 
            </div>
          
        </div>

        {/* Tokenomics Grid */}
    
        <TokenomicsTable/>

       

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-slate-900/50 rounded-lg p-6 border border-cyan-400/30">
            <p className="text-cyan-300 text-lg">
              ZCOIN implements a deflationary mechanism through periodic token burns,
              ensuring long-term value appreciation for holders while supporting ecosystem growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZcoinTokenomics;
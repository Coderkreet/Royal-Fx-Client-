import React from 'react';
import Hello from '../../assets/app/Hello.png'
const ZcoinReferralPlan = () => {
  const referralData = [
    {
      level: "LEVEL 1 DIRECT",
      commission: "6%",
      qualification: "1 DIRECT ACTIVE"
    },
    {
      level: "LEVEL 2",
      commission: "3%",
      qualification: "2 DIRECTS"
    },
    {
      level: "LEVEL 3",
      commission: "2%",
      qualification: "3 DIRECTS"
    },
    {
      level: "LEVEL 4",
      commission: "2%",
      qualification: "4 DIRECTS"
    },
    {
      level: "LEVEL 5",
      commission: "1.5%",
      qualification: "5 DIRECTS"
    },
    {
      level: "LEVEL 6",
      commission: "1.5%",
      qualification: "6 DIRECTS"
    },
    {
      level: "LEVEL 7",
      commission: "1%",
      qualification: "7 DIRECTS"
    },
    {
      level: "LEVEL 8",
      commission: "1%",
      qualification: "8 DIRECTS"
    },
    {
      level: "LEVEL 9",
      commission: "1%",
      qualification: "9 DIRECTS"
    },
    {
      level: "LEVEL 10",
      commission: "1%",
      qualification: "10 DIRECTS"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-950 via-black to-blue-950 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
             
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur opacity-75 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 tracking-wide leading-tight">
            REFERRAL INCOME PLAN
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-cyan-300 mt-2 opacity-90">
            (10-LEVEL MLM DISTRIBUTION)
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl rounded-2xl border border-cyan-400/30 shadow-xl shadow-blue-500/20 overflow-hidden">
          
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white">
            <div className="p-3 text-center border-r border-white/20">
              <h2 className="text-lg font-bold tracking-wider">LEVEL</h2>
            </div>
            <div className="p-3 text-center border-r border-white/20">
              <h2 className="text-lg font-bold tracking-wider">COMMISSION %</h2>
            </div>
            <div className="p-3 text-center">
              <h2 className="text-lg font-bold tracking-wider">QUALIFICATION</h2>
            </div>
          </div>

          {/* Data Rows */}
          <div className="divide-y divide-cyan-400/20">
            {referralData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 transition-all duration-500 group ${
                  index % 2 === 0 ? 'bg-slate-800/30' : 'bg-blue-900/20'
                }`}
              >
                {/* Level Column */}
                <div className="p-3 flex items-center justify-center border-r border-cyan-400/20">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm mb-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {item.level}
                    </h3>
                  </div>
                </div>

                {/* Commission Column */}
                <div className="p-3 flex items-center justify-center border-r border-cyan-400/20">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 transition-all duration-300 ${
                      index === 0 ? 'text-emerald-400 group-hover:text-emerald-300' : 
                      index <= 2 ? 'text-cyan-400 group-hover:text-cyan-300' :
                      'text-blue-400 group-hover:text-blue-300'
                    }`}>
                      {item.commission}
                    </div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Qualification Column */}
                <div className="p-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-slate-700 to-blue-800 px-3 py-1 rounded-full border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300">
                      <span className="text-sm font-semibold text-cyan-200 group-hover:text-white">
                        {item.qualification}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30 hover:border-emerald-400/60 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold text-white">%</span>
              </div>
              <h3 className="text-lg font-bold text-emerald-400 mb-1">Max Commission</h3>
              <p className="text-2xl font-bold text-white">6%</p>
              <p className="text-emerald-300 text-xs mt-1">Level 1 Direct</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold text-white">10</span>
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-1">Total Levels</h3>
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-cyan-300 text-xs mt-1">Deep Network</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl font-bold text-white">∑</span>
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-1">Total Potential</h3>
              <p className="text-2xl font-bold text-white">20%</p>
              <p className="text-blue-300 text-xs mt-1">All Levels Combined</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-slate-800/60 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl rounded-xl p-4 border border-cyan-400/30 shadow-lg">
            <p className="text-cyan-300 text-sm leading-relaxed">
              Build your network and earn passive income through our comprehensive 10-level MLM distribution system.
              <br />
              <span className="text-white font-semibold">Higher levels require more direct referrals to unlock maximum earning potential.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZcoinReferralPlan;
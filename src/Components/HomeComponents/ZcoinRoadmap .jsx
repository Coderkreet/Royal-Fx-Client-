import React, { useState } from 'react';
import Logo from '../../assets/app/Hello.png'
const ZcoinRoadmap = () => {
  const [activeYear, setActiveYear] = useState(2025);

  const roadmapData = {
    2025: {
      title: "2025: FOUNDATION YEAR",
      quarters: [
        {
          quarter: "Q1",
          items: [
            "Launch of ZCOIN Website and Staking Dashboard",
            "Smart Contract Audit Report",
            "Launch of Flagship Game"
          ]
        },
        {
          quarter: "Q2",
          items: [
            "CoinMarketCap and CoinGecko Listing",
            "Airdrop and Referral Campaign"
          ]
        },
        {
          quarter: "Q3",
          items: [
            "NFT Marketplace Launch",
            "Real Estate Tokenization Platform"
          ]
        },
        {
          quarter: "Q4",
          items: [
            "Metaverse Mall and Events Arena Launch",
            "Integration of Import/Export Services"
          ]
        }
      ]
    },
    2026: {
      title: "2026: ECOSYSTEM EXPANSION",
      quarters: [
        {
          quarter: "Q1",
          items: [
            "DAO Launch for Governance",
            "Expansion of Gaming Ecosystem with 3rd-party developers"
          ]
        },
        {
          quarter: "Q2",
          items: [
            "Real-world partnerships with trade firms and real estate agencies"
          ]
        },
        {
          quarter: "Q3",
          items: [
            "Launch of ZCOIN Mobile Wallet & DApp",
            "Release of Two New Games in the Ecosystem"
          ]
        },
        {
          quarter: "Q4",
          items: [
            "Centralized Exchange Listing:",
            "• Gate.io",
            "• BitMart",
            "• LBank",
            "Pre-development of ZCOIN Metaverse Net & Shopping World"
          ]
        }
      ]
    },
    2027: {
      title: "2027: INNOVATION & SCALE",
      quarters: [
        {
          quarter: "Q1",
          items: [
            "Growth and Expansion of Ecosystem",
            "Partnerships with global gaming studios"
          ]
        },
        {
          quarter: "Q2",
          items: [
            "Launch of ZCOIN Proprietary Blockchain with API Suite",
            "Developer onboarding and dApp migration"
          ]
        },
        {
          quarter: "Q3",
          items: [
            "Global promotion campaign and CEX expansion"
          ]
        },
        {
          quarter: "Q4",
          items: [
            "Global promotion campaign and CEX expansion"
          ]
        }
      ]
    },
    2028: {
      title: "2028: FINANCIAL REVOLUTION",
      quarters: [
        {
          quarter: "Q1-Q4",
          items: [
            "Launch of ZCOIN Stablecoin: ZUSD (1 USD = 1 ZUSD)",
            "Global Adoption & Integrations Campaign"
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-black p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <span className="text-3xl font-bold text-white"> <img src={Logo} alt="" /> </span>
              </div>
              {/* <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur opacity-50 animate-pulse"></div> */}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 mb-4">
            ZCOIN.WORLD 3 YEAR PLAN
          </h1>
          <p className="text-2xl text-cyan-300 font-semibold">(2025-2028)</p>
        </div>

        {/* Year Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-2 border border-cyan-400/30 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(roadmapData).map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(parseInt(year))}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
                    activeYear === parseInt(year)
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-cyan-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Year Content */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-12">
            {roadmapData[activeYear].title}
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>

            {/* Quarters */}
            <div className="space-y-16">
              {roadmapData[activeYear].quarters.map((quarter, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-500/50"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full max-w-lg ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-gradient-to-br from-slate-800/60 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl rounded-2xl border border-cyan-400/30 shadow-xl shadow-blue-500/10 hover:shadow-cyan-500/20 transition-all duration-500 group">
                        
                        {/* Quarter Header */}
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-t-2xl p-4">
                          <h3 className="text-2xl font-bold text-white text-center tracking-wider">
                            {quarter.quarter}
                          </h3>
                        </div>

                        {/* Quarter Content */}
                        <div className="p-6">
                          <div className="space-y-4">
                            {quarter.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-white text-sm leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 bg-gradient-to-r from-slate-800/60 via-blue-900/40 to-indigo-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-cyan-400/30">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-4 sm:mb-6">Roadmap Progress</h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {Object.keys(roadmapData).map((year, index) => (
                <div key={year} className="text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                    parseInt(year) <= activeYear 
                      ? 'bg-gradient-to-br from-emerald-500 to-cyan-600' 
                      : 'bg-gradient-to-br from-slate-600 to-slate-700'
                  }`}>
                    {year}
                  </div>
                  <p className={`text-xs sm:text-sm ${
                    parseInt(year) <= activeYear ? 'text-cyan-300' : 'text-slate-400'
                  }`}>
                    {parseInt(year) <= activeYear ? 'Active' : 'Upcoming'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-400/30">
            <p className="text-cyan-300 text-lg leading-relaxed max-w-4xl mx-auto">
              Join us on this revolutionary journey as we build the future of decentralized finance, gaming, and digital commerce. 
              <br />
              <span className="text-white font-semibold">ZCOIN.WORLD - Shaping the Digital Economy of Tomorrow</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZcoinRoadmap;
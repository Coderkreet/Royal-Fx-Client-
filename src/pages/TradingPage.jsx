import { useState } from "react";
import SwapHoldingHistory from "../Components/SwapHoldingHistory";
import SwapConversionMain from "../Components/SwapConversionMain";

const Tradings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ["Convert",
    //  "Holdings"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-2 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-slate-300 text-lg">Manage your conversions and holdings</p>
        </div>

        {/* Main Container */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-slate-700/50 bg-slate-800/30">
            <div className="flex">
              {tabNames?.map((tab, index) => (
                <button
                  key={index}
                  className={`
                    relative flex-1 px-6 py-4 md:py-5 text-base md:text-lg font-semibold
                    transition-all duration-300 ease-in-out
                    ${
                      activeTab === index
                        ? "text-white bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-b-2 border-blue-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
                    }
                  `}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="relative z-10">{tab}</span>
                  {activeTab === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-500/10 rounded-t-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-2 md:p-8">
            <div className="transition-all duration-500 ease-in-out">
              {activeTab === 0 ? (
                <div className="animate-fade-in">
                  <SwapConversionMain />
                </div>
              ) : activeTab === 1 ? (
                <div className="animate-fade-in">
                  <SwapHoldingHistory />
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-xl mb-4">No Data Available</div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Tradings;
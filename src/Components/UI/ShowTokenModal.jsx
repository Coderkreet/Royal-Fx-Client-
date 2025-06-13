/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";

const ShowTokenModal = ({ hide, chooseOption, tokenOptions }) => {
  const selectHandler = (walletName) => {
    chooseOption(walletName);
    hide();
  };



  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900/95 w-full max-w-md mx-4 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Select Token</h2>
          <button 
            onClick={hide}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
          >
            <CgClose className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-700/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or paste address"
              className="w-full bg-slate-800/50 text-white placeholder-slate-400 rounded-xl px-4 py-2 pl-10 border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Token List */}
        <div className="p-3 max-h-[40vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {tokenOptions?.map((data, i) => (
              <button
                key={`token-${i}`}
                onClick={() => selectHandler(data)}
                className="w-full flex items-center space-x-4 p-2 rounded-xl hover:bg-slate-800/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-slate-800/50 flex items-center justify-center">
                  <img
                    src={data?.imgSrc}
                    alt={data?.name}
                    className="w-7 h-7 rounded-full"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium group-hover:text-blue-400 transition-colors text-base">
                    {data?.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {data?.symbol}
                  </div>
                </div>
                <div className="text-slate-400 group-hover:text-blue-400 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/50">
          <button
            onClick={hide}
            className="w-full bg-slate-800/50 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTokenModal;

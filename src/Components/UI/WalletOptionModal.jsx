/* eslint-disable react/prop-types */
import { CgClose } from "react-icons/cg";
import spIcon from "../../assets/safepal.png";
import twIcon from "../../assets/trustWallet.png";

const WalletOptionModal = ({ hide, connectWallet }) => {
  const selectHandler = (walletName) => {
    connectWallet(walletName);
    hide();
  };

  const walletOptions = [
    {
      name: "MetaMask",
      icon: "https://img.icons8.com/color/48/metamask-logo.png",
      description: "Connect with MetaMask wallet"
    },
    { 
      name: "SafePal", 
      icon: spIcon,
      description: "Connect with SafePal wallet"
    },
    { 
      name: "Trust Wallet", 
      icon: twIcon,
      description: "Connect with Trust Wallet"
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900/95 w-full max-w-md mx-4 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-semibold text-white">Choose Wallet</h2>
          <button 
            onClick={hide}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
          >
            <CgClose className="w-6 h-6" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="p-6">
          <div className="space-y-3">
            {walletOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => selectHandler(option.name.toLowerCase().replaceAll(" ", ""))}
                className="w-full flex items-center space-x-4 p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <img 
                    src={option.icon} 
                    alt={option.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    {option.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {option.description}
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
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={hide}
            className="w-full bg-slate-800/50 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletOptionModal;

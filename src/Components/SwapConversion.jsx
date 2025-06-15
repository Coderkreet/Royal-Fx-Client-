/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { SastaButton } from "../UI/Buttons";
import ShowTokenModal from "../Components/UI/ShowTokenModal";
import {
  calculateTokenInUsdtAmount,
  fetchTokenDetails,
  tokenOptionsWithIcon,
} from "../utils/tokenOptions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { getUserSwapingData, postswapConvertData } from "../api/token-api";
import Swal from "sweetalert2";
import ConversionDetail from "./ConversionDetail";
import { NumberFormatCommas } from "../utils/FormatText";
import { getNebuluxData, getUserInfo, transferToTopup } from "../api/user-api";
import zCoin from "../assets/icons/zCoin.png"; // Assuming you have a Royal-Fx image in your assets

const WALLET_OPTIONS = [
  { label: "DepositWallet Wallet", value: "depositWallet" },
  { label: "IncomeWallet Wallet", value: "incomeWallet" },
];

const SwapConversion = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [sourceWallet, setSourceWallet] = useState(WALLET_OPTIONS[0].value);
  const [amount, setAmount] = useState(0);

  // Fetch user data and wallet balances
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo();
        setUser(response.data);
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };
    
    fetchUserData();
  }, []);

  // Get wallet balances from user data
  const getWalletBalance = (walletType) => {
    if (!user?.wallet) return 0;
    
    switch (walletType) {
      case "depositWallet":
        return user.wallet.depositWallet || 0;
      case "incomeWallet":
        return user.wallet.incomeWallet || 0;
      case "topup":
        return user.wallet.topupWallet || 0;
      default:
        return 0;
    }
  };

  const handleTransfer = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    
    const sourceBalance = getWalletBalance(sourceWallet);
    if (amount > sourceBalance) {
      toast.error("Insufficient balance in selected wallet.");
      return;
    }
    
    try {
      dispatch(setLoading(true));
      // Call your transfer API here
      // await transferToTopup({ fromWallet: sourceWallet, toWallet: "topup", amount: Number(amount) });
      // Call your transfer API here
      await transferToTopup({ fromWallet: sourceWallet, toWallet: "topupWallet", amount: Number(amount) });
      // console.log({ fromWallet: sourceWallet, toWallet: "topup", amount: Number(amount) })
      // For now, just show success message
      toast.success("Transfer successful!");
      setAmount(0);
      
      // Refresh user data after transfer
      const response = await getUserInfo();
      setUser(response.data);
    } catch (error) {
      toast.error("Transfer failed.");
      
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* From Section */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">From</h3>
          <div className="text-right">
            <span className="text-sm text-slate-400">Available</span>
            <div className="text-sm font-medium text-blue-400">
              {getWalletBalance(sourceWallet)} {sourceWallet === "depositWallet" ? "Deposit" : "Incoming"} Wallet
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <select
            className="bg-slate-700/50 text-white rounded-lg px-3 py-2"
            value={sourceWallet}
            onChange={(e) => setSourceWallet(e.target.value)}
          >
            {WALLET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          className="w-full bg-transparent text-right text-white text-xl font-semibold placeholder-slate-500 border-none outline-none"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
      </div>

      {/* To Section */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">To</h3>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-slate-700/50 text-white rounded-lg px-3 py-2">
            Topup Wallet
          </div>
        </div>
        <div className="text-right text-blue-400 text-sm font-medium">
          Available: {getWalletBalance("topup")} Topup Wallet
        </div>
      </div>

      {/* Transfer Button */}
      <button
        onClick={handleTransfer}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!amount || amount <= 0 || amount > getWalletBalance(sourceWallet)}
      >
        <div className="flex items-center justify-center space-x-2">
          <span>Transfer to Topup Wallet</span>
        </div>
      </button>
    </div>
  );
};

export default SwapConversion;
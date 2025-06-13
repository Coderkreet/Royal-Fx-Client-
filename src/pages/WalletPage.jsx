import { useEffect, useState } from 'react';
import { Download, Upload, ArrowLeftRight, File, HelpCircle, Info, Link, ArrowDown, ArrowUp, History } from 'lucide-react';
import { getUserDepositHistory, getUserInfo, getUserTransactionHistory, getWalletBalance } from '../api/user-api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';
import { addDepositAmount, sendWithdrawalAmountRequest } from '../api/payment-api';
import Swal from 'sweetalert2';
import WalletOptionModal from '../Components/UI/WalletOptionModal';
import USDTPaymentMain from '../Components/wallet/USDTPaymentMain';
// import { Modal } from 'react-bootstrap';
import { MainContent } from '../context/MainContent';
import { ethers } from 'ethers';
import { AuthenticatedRoutes } from '../context/Routes';
import { useNavigate } from 'react-router-dom';

export default function WalletPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [balance, setBalance] = useState(0);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWithdrawalWalletModal, setShowWithdrawalWalletModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [withdrawalPayload, setWithdrawalPayload] = useState({
    walletAddress: "",
    amount: "",
  });
  const [walletType, setWalletType] = useState(null);
  const [depositPayload, setDepositPayload] = useState(null);
  const [activeHistoryTab, setActiveHistoryTab] = useState('transactions');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);

  const bel = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getWalletBalance();
      setBalance(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    // bel();
    // GetUserInfo();
    // getTransactionHistory();
    getAllData();
  }, []);

  const getAllData = async () => {
    bel();
    GetUserInfo();
    getTransactionHistory();
    getDepositHistory();
  }

  const [user, setUser] = useState(null);

  async function GetUserInfo() {
    try {
      setLoading(true);
      const res = await getUserInfo();
      setUser(res.data);
      // console.log("User Info:", user, res.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load profile data",
      });
    } finally {
      setLoading(false);
    }
  }

  const getDepositHistory = async () => {
    try {
      setLoading(true);
      const res = await getUserDepositHistory();
      console.log("Deposit History:", res?.data?.history);
      setDepositHistory(res?.data?.history);
    } catch (error) {
      console.error("Error fetching deposit history:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load deposit history",
      });
    } finally {
      setLoading(false);
    }
  }

  // const [transactionHistory, setTransactionHistory] = useState({});
  const getTransactionHistory = async () => {
    try {
      setLoading(true);
      const res = await getUserTransactionHistory();
      console.log("Transaction History:", res.data.history);
      const filData = res.data.history
        .filter((item) => item.type === "deposit" || item.type === "withdrawal")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactionHistory(filData);
      const filterdata = res.data.history
        .filter((item) => item.type === "withdrawal")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setWithdrawalHistory(filterdata);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load transaction history",
      });
    } finally {
      setLoading(false);
    }
  }

  const addDepositAmountHandler = async (data) => {
    console.log("data is deposite", data);
    try {
      dispatch(setLoading(true));
      const response = await addDepositAmount({
        ...data,
      });
      setShowPaymentModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response?.data?.message || "Your Deposit Amount has been successfully processed!",
        timer: 3000,
      });
      getAllData()
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong!",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addDepositAmountSwal = () => {
    Swal.fire({
      title: "Deposit Amount",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Add Amount",
      inputPlaceholder: "Enter deposit amount",
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        return new Promise((resolve, reject) => {
          if (!amount || isNaN(amount)) {
            reject("Please enter a valid amount greater than 0.");
          } else {
            setTimeout(() => {
              resolve(amount);
            }, 1000);
          }
        });
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          setDepositPayload({
            amount: result.value,
          });
          setShowWalletModal(true);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Invalid Amount",
          text: error,
        });
      });
  };

  const sendWithdrawalRequest = () => {
    Swal.fire({
      title: "Withdrawal Amount",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "Withdraw",
      inputPlaceholder: "Enter Withdraw amount",
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(amount);
          }, 1000);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value > user?.usdt) {
          Swal.fire({
            icon: "error",
            title: "Insufficient Balance",
            text: "You do not have enough USDT balance to withdraw this amount.",
          });
          return;
        }
        setShowWithdrawalWalletModal(true);
        setWithdrawalPayload((prev) => ({
          ...prev,
          amount: result.value,
        }));
      }
    });
  };

  const sendWithdrawalAmountHandler = async (userAddress) => {
    try {
      dispatch(setLoading(true));
      const response = await sendWithdrawalAmountRequest({
        ...withdrawalPayload,
        type: "withdrawal",
        walletAddress: userAddress,
      });
      setShowPaymentModal(false);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response?.message || "Your Withdrawal Amount has been successfully processed!",
        timer: 3000,
      }).then(() => {
        getAllData();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Something went wrong!",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleConnectWallet = async () => {
    console.log("withdrawalPayload :", withdrawalPayload)
    try {
      if (!window.ethereum) {
        Swal.fire({
          icon: "error",
          title: "Wallet Not Found",
          text: "Please install a Web3 wallet (MetaMask, SafePal, or Trust Wallet) to continue.",
          footer: '<a href="https://metamask.io/download/" target="_blank">Download MetaMask</a>'
        });
        return;
      }

      // Check for specific wallet type
      if (walletType === "safepal") {
        const isSafePal = window.ethereum.isSafePal || navigator.userAgent.toLowerCase().includes("safepal");
        if (!isSafePal) {
          Swal.fire({
            icon: "error",
            title: "SafePal Required",
            text: "Please use SafePal wallet to continue.",
            footer: '<a href="https://www.safepal.com/download" target="_blank">Download SafePal</a>'
          });
          return;
        }
      }
      if (walletType === "metamask") {
        const isMetaMask = window.ethereum.isMetaMask;
        if (!isMetaMask) {
          Swal.fire({
            icon: "error",
            title: "MetaMask Required",
            text: "Please use MetaMask wallet to continue.",
            footer: '<a href="https://metamask.io/download/" target="_blank">Download MetaMask</a>'
          });
          return;
        }
      }
      if (walletType === "trustwallet") {
        const isTrustWallet = window.ethereum.isTrust;
        if (!isTrustWallet) {
          Swal.fire({
            icon: "error",
            title: "Trust Wallet Required",
            text: "Please use Trust Wallet to continue.",
            footer: '<a href="https://trustwallet.com/browser-extension" target="_blank">Download Trust Wallet</a>'
          });
          return;
        }
      }

      // Request account access
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        if (error.code === 4001) {
          Swal.fire({
            icon: "error",
            title: "Connection Rejected",
            text: "Please connect your wallet to continue with the withdrawal.",
          });
          return;
        }
        throw error;
      }

      // Switch to BSC network
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "Binance Smart Chain",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com/"],
                },
              ],
            });
          } catch (addError) {
            console.error("Error adding BSC network:", addError);
            Swal.fire({
              icon: "error",
              title: "Network Error",
              text: "Failed to add BSC network. Please try adding it manually in your wallet.",
            });
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please switch to BSC network in your wallet to continue.",
          });
          return;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected wallet address:", userAddress);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Wallet Connected",
        text: "Your wallet has been successfully connected.",
        timer: 2000,
        showConfirmButton: false
      });

      sendWithdrawalAmountHandler(userAddress);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  // Skeleton loading template for amounts
  const amountSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-8 w-32 bg-slate-700/50 rounded-lg"></div>
    </div>
  );

  // Skeleton loading template for history items
  const historySkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                <div className="h-3 w-32 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-700 rounded"></div>
              <div className="h-3 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // History item template
  const HistoryItem = ({ type, amount, date, status, transactionID, createdAt }) => {
    const getIcon = () => {
      switch (type) {
        case 'deposit':
          return <ArrowDown className="w-5 h-5 text-green-400" />;
        case 'withdrawal':
          return <ArrowUp className="w-5 h-5 text-red-400" />;
        default:
          return <ArrowLeftRight className="w-5 h-5 text-blue-400" />;
      }
    };

    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'completed':
          return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'pending':
          return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        case 'failed':
          return 'text-red-400 bg-red-400/10 border-red-400/20';
        default:
          return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      }
    };

    // Format date to a readable string
    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    return (
      <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700/50 rounded-full flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <div className="font-medium text-white capitalize">{type}</div>
              <div className="text-sm text-gray-400">ID: {transactionID}</div>
              <div className="text-sm text-gray-400">Date: {formatDate(createdAt)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-semibold ${type === 'deposit' ? 'text-green-400' : type === 'withdrawal' ? 'text-red-400' : 'text-blue-400'}`}>
              {type === 'deposit' ? '+' : type === 'withdrawal' ? '-' : ''}{amount} USDT
            </div>
            <div className="text-sm text-gray-400">{formatDate(date)}</div>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-gray-400">{formatDate(date)}</div>
          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#1f2937] rounded-xl text-white p-4 sm:p-6 min-h-screen">
      {/* Total Bitcoin Balance */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <span>Total Fund Added</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 rounded-full p-1">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M23.38,14.35l-2-6.08a.5.5,0,0,0-.47-.35H17.48V6.5A2.47,2.47,0,0,0,15.65,4H14.77a2.38,2.38,0,0,0-2.51,2.5V7.92H10.63V6.5A2.47,2.47,0,0,0,8.8,4H7.92A2.38,2.38,0,0,0,5.41,6.5V7.92H3.06a.5.5,0,0,0-.47.35l-2,6.08a.5.5,0,0,0,.47.65H3.06v4.42a.5.5,0,0,0,.5.5H20.38a.5.5,0,0,0,.5-.5V15H22.9A.5.5,0,0,0,23.38,14.35ZM13.26,6.5c0-1.18.47-1.5,1.5-1.5h.88C17,5,17,6.19,17,6.5V7.92H13.26Zm-6.85,0c0-1.18.47-1.5,1.5-1.5h.88c1.38,0,1.38,1.19,1.38,1.5V7.92H6.41ZM19.89,19H4.06V15H19.89Zm1.57-5H2.49L4.06,9H19.89l1.57,5Z" />
              </svg>
            </div>
            {isLoading ? (
              amountSkeleton()
            ) : (
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {(user?.fund || 0).toFixed(2)} Z Token
                </h1>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          {/* <button
            onClick={addDepositAmountSwal}
            className="flex-1 sm:flex-none bg-white text-black hover:bg-gray-200 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
          >
            Deposit
          </button> */}
          <button
            onClick={sendWithdrawalRequest}
            className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
          >
            Withdraw
          </button>
          {/* <button
            onClick={() => navigate(AuthenticatedRoutes.MARKET)}
            className="flex-1 sm:flex-none bg-white text-black hover:bg-gray-200 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
          >
            Buy/Sell
          </button> */}
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
        {/* Available Balance Card */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-5 relative">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm sm:text-base">Current Income</span>
              {/* <Info className="w-4 h-4" /> */}
            </div>
          </div>
          {isLoading ? (
            amountSkeleton()
          ) : (
            <>
                <div className="text-lg sm:text-xl font-bold mb-1">{Number(user?.account?.currentIncome).toFixed(2)} Z-Coin</div>
            </>
          )}

          {/* Circular progress */}
          <div className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2">
            <img width="96" height="96" src="https://img.icons8.com/fluency/96/card-wallet.png" alt="card-wallet" />
          </div>
        </div>


        <div className="bg-gray-900 rounded-lg p-4 sm:p-5 relative">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm sm:text-base">USDT Balance</span>
              {/* <Info className="w-4 h-4" /> */}
            </div>
          </div>
          {isLoading ? (
            amountSkeleton()
          ) : (
            <>
              <div className="text-lg sm:text-xl font-bold mb-1">{user?.usdt} USDT</div>
            </>
          )}

          {/* Circular progress */}
          <div className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2">
            <img width="96" height="96" src="https://img.icons8.com/color/96/tether--v1.png" alt="tether--v1" />
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold">Activity</h2>
            <div className="bg-gray-800 text-purple-400 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* <button className="flex items-center gap-1 text-blue-400 bg-blue-400/10 px-2 sm:px-3 py-1 rounded-md hover:bg-blue-400/20 transition-colors text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Export</span>
          </button> */}
        </div>

        {/* History Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveHistoryTab('transactions')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm ${activeHistoryTab === 'transactions'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            <History className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>All Transactions</span>
          </button>
          <button
            onClick={() => setActiveHistoryTab('deposits')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm ${activeHistoryTab === 'deposits'
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Deposits</span>
          </button>
          <button
            onClick={() => setActiveHistoryTab('withdrawals')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm ${activeHistoryTab === 'withdrawals'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Withdrawals</span>
          </button>
        </div>

        {/* History Content */}
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            historySkeleton()
          ) : (
            <>
              {activeHistoryTab === 'transactions' && (
                <>
                  {transactionHistory.length > 0 ? (
                      transactionHistory.reverse().map((item, index) => (
                      <HistoryItem key={index} {...item} />
                    ))
                  ) : (
                    <div className="bg-gray-900 rounded-lg py-20 px-4 flex flex-col items-center justify-center">
                      <div className="bg-gray-800 rounded-full p-8 mb-4">
                        <History className="w-12 h-12 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No transactions yet</h3>
                      <p className="text-gray-400 mb-6">Your transaction history will appear here</p>
                    </div>
                  )}
                </>
              )}

              {activeHistoryTab === 'deposits' && (
                <>
                  {depositHistory.length > 0 ? (
                    depositHistory.map((item, index) => (
                      <HistoryItem key={index} {...item} type="deposit" />
                    ))
                  ) : (
                        <div className="bg-gray-900 rounded-lg py-20 px-4 flex flex-col items-center justify-center">
                          <div className="bg-gray-800 rounded-full p-8 mb-4">
                        <ArrowDown className="w-12 h-12 text-gray-500" />
                          </div>
                      <h3 className="text-xl font-bold mb-2">No deposits yet</h3>
                      <p className="text-gray-400 mb-6">Your deposit history will appear here</p>
                          <button
                        onClick={addDepositAmountSwal}
                        className="border-2 border-white hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-full"
                      >
                            Make a deposit
                          </button>
                    </div>
                  )}
                </>
              )}

              {activeHistoryTab === 'withdrawals' && (
                <>
                  {withdrawalHistory.length > 0 ? (
                    withdrawalHistory.map((item, index) => (
                      <HistoryItem key={index} {...item} type="withdrawal" />
                    ))
                  ) : (
                    <div className="bg-gray-900 rounded-lg py-20 px-4 flex flex-col items-center justify-center">
                      <div className="bg-gray-800 rounded-full p-8 mb-4">
                        <ArrowUp className="w-12 h-12 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No withdrawals yet</h3>
                      <p className="text-gray-400 mb-6">Your withdrawal history will appear here</p>
                          <button
                        onClick={sendWithdrawalRequest}
                        className="border-2 border-white hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-full"
                      >
                        Make a withdrawal
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Help button */}
      <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8">
        <button className="bg-blue-700 hover:bg-blue-800 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* Modals */}
      {showWalletModal && (
        <WalletOptionModal
          hide={() => setShowWalletModal(false)}
          connectWallet={(walletName) => {
            setWalletType(walletName);
            setShowPaymentModal(true);
          }}
        />
      )}
      {showWithdrawalWalletModal && (
        <WalletOptionModal
          hide={() => setShowWithdrawalWalletModal(false)}
          connectWallet={(walletName) => {
            setWalletType(walletName);
            handleConnectWallet();
          }}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900/95 w-full max-w-md mx-4 rounded-2xl border border-slate-700/50 shadow-2xl">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6">
                  <img src={MainContent.appLogo} alt="App Logo" className="w-full h-full object-contain" />
                </div>
                <USDTPaymentMain
                  amount={depositPayload?.amount}
                  walletType={walletType}
                  onSuccess={addDepositAmountHandler}
                  onFailure={() => setShowPaymentModal(false)}
                />
                <div className="mt-6 w-full">
                  <button
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
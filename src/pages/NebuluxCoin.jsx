import { useEffect, useState } from "react";
import {
  getNebuluxPurchaseData,
  getNebuluxData,
  purchaseNebuluxCoin,
} from "../api/user-api";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import WalletOptionModal from "../Components/UI/WalletOptionModal";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import { MainContent } from "../context/MainContent";
import USDTPaymentMain from "../Components/wallet/USDTPaymentMain";
import lOGO from '../assets/app/Hello.png'

export default function NebuluxCoin() {
  const [purchases, setPurchases] = useState([]);
  const [nebuluxData, setNebuluxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [walletType, setWalletType] = useState("");

  async function fetchAllData() {
    setLoading(true);
    setError(null);
    try {
      const res2 = await getNebuluxData();
      const res1 = await getNebuluxPurchaseData();

      if (res2.success) setNebuluxData(res2.data);
      else setError("Failed to fetch Nebulux data.");

      if (res1.success) {
        const filterData = res1.data.reverse();
        setPurchases(filterData);
      } else {
        setError("Failed to fetch purchase data.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message ||
          JSON.stringify(err.response.data) ||
          "An error occurred while fetching data."
        );
      } else {
        setError("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  async function handlePurchase(data) {
    setPurchaseLoading(true);
    setPurchaseError(null);
    setPurchaseSuccess(null);

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setPurchaseError("Please enter a valid amount.");
      setPurchaseLoading(false);
      return;
    }

    try {
      const res = await purchaseNebuluxCoin({ amount: data?.amount, recipientAddress: data?.recipientAddress, userAddress: data?.userAddress, txResponse: data?.txResponse });

      if (res.success) {
        setPurchaseSuccess("Purchase successful!");
        fetchAllData();
        setShowPaymentModal(false)
        setShowWalletModal(false);
        Swal.fire({
          icon: "success",
          title: "Purchase Successful",
          text: `You have successfully purchased ${amount} Z-Coin.`,
          confirmButtonText: "OK",
          timer: 5000,
          showConfirmButton: true,
        });
        setAmount("");
      } else {
        setPurchaseError(res.message || "Purchase failed.");
      }
    } catch (err) {
      console.error(err);
      setPurchaseError("An error occurred during purchase.");
    } finally {
      setPurchaseLoading(false);
    }
  }

  const serialNumberTemplate = (rowData, options) => {
    return <span>{options.rowIndex + 1}</span>;
  };

  const handleConnectWallet = async () => {
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
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const checkValidPurchaseAmount = () => {
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Minimum purchase amount is $100. Please enter a valid amount.",
        confirmButtonText: "OK",
        timer: 5000,
        showConfirmButton: true,
      })
    } else {
      setShowPaymentModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6 max-w-7xl mx-auto text-white">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black mb-4 text-white">
            <span className="text-4xl"> <img src={lOGO} width={100} height={100} alt="Z Coins Logo" /></span> Z Coins
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Explore the cosmos of cryptocurrency
          </p>
        </div>

        {/* Stats Overview */}
        {nebuluxData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-2xl font-bold text-purple-300">${(nebuluxData.price || 0).toFixed(2)}</div>
              <div className="text-sm text-gray-400">Current Price</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-blue-300">
                {(nebuluxData.supply + nebuluxData.sold).toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Supply</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-yellow-300">{(nebuluxData.supply).toLocaleString()}</div>
              <div className="text-sm text-gray-400">Coins Left</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-green-300">{nebuluxData.sold.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Coins Sold</div>
            </div>
          </div>
        )}

        {/* Purchase Form */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 text-white">
                💳 Purchase Coins
              </h2>
              <p className="text-gray-300">Invest in the future of space currency</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter USDT
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                      className="w-full bg-gray-700 text-white text-xl font-semibold pl-8 pr-4 py-4 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  {amount && (
                    <div className="mt-2 text-base text-gray-400">
                      ≈ {(Number(amount) * (nebuluxData?.price || 1)).toFixed(2)} Z Coin
                    </div>
                  )}
                </div>
              </div>

              {purchaseError && (
                <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
                  <p className="text-red-400 text-center font-medium">{purchaseError}</p>
                </div>
              )}

              {purchaseSuccess && (
                <div className="bg-green-500/10 border border-green-500 rounded-xl p-4">
                  <p className="text-green-400 text-center font-medium">{purchaseSuccess}</p>
                </div>
              )}

              <button
                disabled={purchaseLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                onClick={() => checkValidPurchaseAmount()}
              >
                🚀 Purchase Z Coins
              </button>
            </div>
          </div>
        </section>

        {/* Purchase History */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              📈 Purchase History
            </h2>
            <button
              onClick={fetchAllData}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 transition-colors"
            >
              🔄 Refresh
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <span className="ml-4 text-gray-300">Loading purchase history...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 text-center">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}

          {!loading && purchases.length === 0 && !error && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-gray-400 text-lg">No purchases yet. Start your journey!</p>
            </div>
          )}

          {!loading && (
            <div className="w-full">
              <DataTable
                value={purchases}
                className="w-full rounded-xl shadow-md border border-gray-700 bg-gray-800"
                size="small"
                paginator
                rows={15}
                rowsPerPageOptions={[5, 10, 25, 50]}
                stripedRows
                showGridlines
              >
                <Column
                  header="S No."
                  body={serialNumberTemplate}
                  style={{ width: '60px', textAlign: 'center' }}
                  headerClassName="text-center"
                />

                <Column
                  field="quantity"
                  header="Quantity"
                  body={(rowData) => (
                    <span className="font-medium text-blue-400">
                      {rowData.quantity} Coins
                    </span>
                  )}
                  style={{ textAlign: 'center' }}
                  headerClassName="text-center"
                  sortable
                />

                <Column
                  field="totalPrice"
                  header="Total Price"
                  body={(rowData) => (
                    <span className="text-green-400 font-semibold">
                      ${rowData.totalPrice?.toFixed(2) ?? '0.00'}
                    </span>
                  )}
                  style={{ textAlign: 'center' }}
                  headerClassName="text-center"
                  sortable
                />

                <Column
                  field="purchaseDate"
                  header="Purchase Date"
                  body={(rowData) => (
                    <span className="text-gray-300">
                      {new Date(rowData.purchaseDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                  style={{ textAlign: 'center' }}
                  headerClassName="text-center"
                  sortable
                />
              </DataTable>
            </div>
          )}
        </section>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 w-full max-w-md mx-4 rounded-xl border border-gray-700 shadow-2xl">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6">
                  <img src={MainContent.appLogo} alt="App Logo" className="w-full h-full object-contain" />
                </div>
                <USDTPaymentMain
                  amount={amount * nebuluxData.price}
                  walletType={walletType}
                  onSuccess={handlePurchase}
                  onFailure={() => setShowPaymentModal(false)}
                />
                <div className="mt-6 w-full">
                  <button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
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
};
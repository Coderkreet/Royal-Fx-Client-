import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { SSButton } from "../UI/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slice/loadingSlice";

const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// eslint-disable-next-line react/prop-types
const USDTPaymentMain = ({ amount, onSuccess, onFailure, walletType }) => {
  // const userInfo = useSelector((state) => state?.userInfo?.userInfo);

  const [USDTAmount, setUSDTAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const dispatch = useDispatch();
  const [recipientAddress, setRecipientAddress] = useState(
    import.meta.env.VITE_PAYMENT_ADDRESS
  );
  useEffect(() => {
    setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS);
  }, []);

  useEffect(() => {
    if (!amount) return;
    setUSDTAmount(amount);
  }, [amount]);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        if (walletType === "safepal") {
          const isSafePal =
            window.ethereum.isSafePal ||
            navigator.userAgent.toLowerCase().includes("safepal");
          if (!isSafePal) {
            throw new Error("Please use SafePal wallet.");
          }
        }
        if (walletType === "metamask") {
          const isMetaMask = window.ethereum.isMetaMask;
          if (!isMetaMask) {
            throw new Error("Please use MetaMask wallet.");
          }
        }
        if (walletType === "trustwallet") {
          const isTrustWallet = window.ethereum.isTrust;
          if (!isTrustWallet) {
            throw new Error("Please use Trust Wallet.");
          }
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
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
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        setWalletConnected(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Wallet is not installed.",
        });
        throw new Error("Wallet is not installed.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleConnectAndPayment = async () => {
    try {
      dispatch(setLoading(true));

      // Step 1: Connect to the wallet
      if (window.ethereum) {
        if (walletType === "safepal") {
          const isSafePal =
            window.ethereum.isSafePal ||
            navigator.userAgent.toLowerCase().includes("safepal");
          if (!isSafePal) {
            throw new Error("Please use SafePal wallet.");
          }
        }
        if (walletType === "metamask") {
          const isMetaMask = window.ethereum.isMetaMask;
          if (!isMetaMask) {
            throw new Error("Please use MetaMask wallet.");
          }
        }
        if (walletType === "trustwallet") {
          const isTrustWallet = window.ethereum.isTrust;
          if (!isTrustWallet) {
            throw new Error("Please use Trust Wallet.");
          }
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });

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
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        // if (userInfo?.walletAddress !== userAddress) {
        //   dispatch(setLoading(false));
        //   return Swal.fire({
        //     icon: "error",
        //     title: "Connection Failed",
        //     text: "Please connect to the wallet associated with your account.",
        //     timer: 3000,
        //   });
        // }
        setWalletConnected(true);

        // Step 2: Payment Handling
        if (!recipientAddress) {
          Swal.fire({
            icon: "error",
            title: "Invalid Address",
            text: "Please enter a valid recipient address",
          });
          return;
        }

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId !== "0x38") {
          throw new Error("Please connect to BSC network first");
        }

        const usdtContract = new ethers.Contract(
          USDT_ADDRESS,
          USDT_ABI,
          signer
        );

        try {
          const decimals = await usdtContract.decimals();
          console.log(`Token decimals: ${decimals}`);
        } catch (error) {
          console.error("Error fetching USDT decimals:", error);
          throw new Error("Invalid USDT contract on BSC network");
        }

        const balance = await usdtContract.balanceOf(userAddress);
        const amountInUSDT = ethers.parseUnits(USDTAmount.toString(), 18);

        if (balance < amountInUSDT) {
          throw new Error("Insufficient USDT balance");
        }

        const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);
        console.log(tx);

        // await transactionHandler({ txResponse: tx, amount: amount , packageId });
        await onSuccess({
          txResponse: tx,
          amount,
          recipientAddress,
          userAddress,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Wallet is not installed.",
        });
        throw new Error("Wallet is not installed.");
      }
    } catch (error) {
      console.error("Error during wallet connection or payment:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text:
          error.message ||
          "Failed to connect wallet or complete payment. Please try again.",
      });
      onFailure();
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Pay <span className="text-blue-400">{USDTAmount}</span> USDT
        </h3>
        <p className="text-slate-400 text-sm">
          Please connect your wallet to proceed with the payment
        </p>
      </div>

      <div className="space-y-4">
        {!walletConnected ? (
          <button
            onClick={handleConnectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Connect Wallet
          </button>
        ) : (
          <div className="text-center">
            <p className="text-green-400 text-lg font-medium mb-4">
              Wallet Connected Successfully
            </p>
            <button
              onClick={handleConnectAndPayment}
              disabled={!walletConnected || !recipientAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12H16M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Pay USDT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default USDTPaymentMain;

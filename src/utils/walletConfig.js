import { ethers } from "ethers";
import Swal from "sweetalert2";

export const connectWallet = async (type, setLoading, handleSubmit) => {
  if (window.ethereum) {
    try {
      setLoading(true);
      if (type === "safepal") {
        const isSafePal =
          window.ethereum.isSafePal ||
          navigator.userAgent.toLowerCase().includes("safepal");
        if (!isSafePal) {
          throw new Error("Please use SafePal wallet.");
        }
      }
      if (type === "metamask") {
        const isMetaMask = window.ethereum.isMetaMask;
        if (!isMetaMask) {
          throw new Error("Please use MetaMask wallet.");
        }
      }
      if (type === "trustwallet") {
        const isTrustWallet = window.ethereum.isTrust;
        if (!isTrustWallet) {
          throw new Error("Please use Trust Wallet.");
        }
      }

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const walletAddress = await signer.getAddress();

      // eslint-disable-next-line no-unused-vars
      const bscProvider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );
      await handleSubmit({
        walletAddress: walletAddress,
        type: type,
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      Swal.fire({
        icon: "error",
        title: "Wallet Connection Failed",
        text:
          error.message || "An error occurred while connecting to MetaMask.",
      });
    } finally {
      setLoading(false);
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Wallet Connection Failed",
      text: "MetaMask or SafePal is not installed!",
      timer: 3000,
    });
  }
};



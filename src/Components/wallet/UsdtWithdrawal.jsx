/* eslint-disable react/prop-types */
import { useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
// import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const UsdtWithdrawal = ({
  amount,
  isModalOpen,
  setIsModalOpen,
  walletType,
}) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [loading, setLoading] = useState(false);

  const withdrawalAddress = import.meta.env.VITE_PAYMENT_ADDRESS;
  const withdrawalPrivateKey = import.meta.env.VITE_PRIVATE_KEY;
  const handleWithdrawal = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        if (walletType === "safepal") {
          const isSafePal =
            window.ethereum.isSafePal ||
            navigator.userAgent.toLowerCase().includes("safepal");
          if (!isSafePal) {
            throw new Error("Please use SafePal wallet.");
          }
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userWalletAddress = await signer.getAddress();

        console.log("User wallet address:", userWalletAddress);

        const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
        const usdtABI = [
          "function transfer(address recipient, uint256 amount) public returns (bool)",
          "function balanceOf(address account) public view returns (uint256)",
          "function approve(address spender, uint256 amount) public returns (bool)",
          "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
        ];

        const usdtContract = new ethers.Contract(
          usdtAddress,
          usdtABI,
          provider
        );

        const amountInWei = ethers.parseUnits(amount.toString(), 18);

        const adminBalance = await usdtContract.balanceOf(withdrawalAddress);
        console.log("Admin balance:", adminBalance.toString());

        // if (BigInt(adminBalance) < BigInt(amountInWei)) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Insufficient USDT",
        //     text: "The admin wallet doesn't have enough USDT to complete the withdrawal.",
        //   });
        //   setLoading(false);
        //   return;
        // }

        const adminWallet = new ethers.Wallet(withdrawalPrivateKey, provider);
        const contractWithAdminSigner = usdtContract.connect(adminWallet);

        const tx = await contractWithAdminSigner.transfer(
          userWalletAddress,
          amountInWei
        );
        await tx.wait();
        await transactionHandler({
          txResponse: tx,
          amount: amount,
          walletType: walletType,
          userAddress: userWalletAddress,
          adminAddress: withdrawalAddress,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "MetaMask or SafePal is not installed.",
        });
        throw new Error("MetaMask or SafePal is not installed.");
      }
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Withdrawal Failed",
        text: "Failed to process withdrawal. Please try again.",
      });
    }
  };

  const transactionHandler = async (payload) => {
    try {
      await sendWithdrawalresponse(payload);
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction confirmed. You have successfully sent ${amount} USDT.`,
        confirmButtonText: "Ok",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error during USDT payment:", error);
    }
  };

  return (
    <>
      {loading && <PageLoader />}

      <div className="USDTPaymentModal">
        <Modal
          show={isModalOpen}
          onHide={!isModalOpen}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
        >
          <Modal.Body>
            <div className="inner">
              <h3 className="heading mb-5">{MainContent.appName}</h3>
              <p className="para">
                Current wallet balance: $ {userInfo?.totalIncome || "0"}
              </p>
              <p className="para">Withdrawal amount: {amount} USDT</p>

              <div className="btns">
                <Button2
                  name={"Confirm Withdrawal"}
                  onClick={handleWithdrawal}
                  disabled={loading}
                />
                <Button2
                  className="closeBtn"
                  name={"Cancel"}
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UsdtWithdrawal;

/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import spIcon from "../../assets/wallet/safepal.png";

// Add Trust Wallet logo
import trustWalletIcon from "../../assets//wallet/trustwallet.png"; // Make sure you have this image in your assets folder

const WalletOptionModal = ({ hide, connectWallet }) => {
  const selectHandler = (walletName) => {
    connectWallet(walletName);
    hide();
  };

  return (
    <div className="modelContainer">
      <div className="card-container">
        <span onClick={hide} className="xicon">
          <X />
        </span>
        <h2 className="text-[2rem]">Choose Wallet</h2>
        <div className="inner-wrapper">
          <button onClick={() => selectHandler("metamask")} className="btn-custom">
            <div className="iconImg">
              <img src="https://img.icons8.com/color/48/metamask-logo.png" alt="MetaMask" />
            </div>
            <span>MetaMask</span>
          </button>

          <button onClick={() => selectHandler("safepal")} className="btn-custom">
            <div className="iconImg">
              <img src={spIcon} alt="SafePal" />
            </div>
            <span>SafePal</span>
          </button>

          <button onClick={() => selectHandler("trustwallet")} className="btn-custom">
            <div className="iconImg">
              <img src={trustWalletIcon} style={{width:"100%", height:"100%"}} alt="Trust Wallet" />
            </div>
            <span>Trust Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletOptionModal;

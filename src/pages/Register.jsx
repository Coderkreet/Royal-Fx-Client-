import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';
import { registerWithWallet } from '../api/auth-api';
import { saveToken } from '../utils/additonalFunc';
import { AuthenticatedRoutes, AuthRoutes } from '../context/Routes';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import WalletOptionModal from '../Components/UI/WalletOptionModal';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const walletAddRef = useRef(null);
  const referralRef = useRef(null);

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.DASHBOARD);
  };

  const handleWalletRegister = async () => {
    try {
      if (!window.ethereum) {
        Swal.fire({
          icon: 'error',
          title: 'Web3 wallet not found',
          text: 'Please install a Web3 wallet to continue',
        });
        return;
      }

      dispatch(setLoading(true));
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      walletAddRef.current = walletAddress;

      await signer.signMessage('Sign this message to verify your wallet ownership');

      const response = await registerWithWallet({
        walletAddress: walletAddRef.current,
        referral: referralRef.current?.value || '',
      });

      saveToken(response?.id, response?.token, 'user');

      await Swal.fire({
        icon: 'success',
        title: 'Registration Success',
        text: 'You have registered successfully',
        timer: 2000,
      });

      navigate(AuthenticatedRoutes.DASHBOARD);
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error?.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  // const WalletOptionModal = ({ connectWallet, hide }) => (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
  //     <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300">
  //       {/* Glow Effect */}
  //       <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>

  //       <div className="relative">
  //         <div className="flex items-center justify-between mb-8">
  //           <h3 className="text-2xl font-bold text-white">Connect to World</h3>
  //           <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
  //             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
  //               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  //             </svg>
  //           </div>
  //         </div>

  //         <div className="space-y-4">
  //           <button
  //             onClick={() => connectWallet("metamask")}
  //             className="group w-full flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 border border-orange-500/20 hover:border-orange-400/40 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
  //           >
  //             <div className="flex items-center space-x-4">
  //               <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
  //                 <img src="https://img.icons8.com/color/48/metamask-logo.png" alt="MetaMask" className="w-6 h-6" />
  //               </div>
  //               <div className="text-left">
  //                 <div className="font-semibold">MetaMask</div>
  //                 <div className="text-xs text-gray-400">Global Web3 Wallet</div>
  //               </div>
  //             </div>
  //             <svg className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  //             </svg>
  //           </button>

  //           <button
  //             onClick={() => connectWallet("safepal")}
  //             className="group w-full flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 hover:border-blue-400/40 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
  //           >
  //             <div className="flex items-center space-x-4">
  //               <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
  //                 <img src="/safepal.svg" alt="SafePal" className="w-6 h-6" />
  //               </div>
  //               <div className="text-left">
  //                 <div className="font-semibold">SafePal</div>
  //                 <div className="text-xs text-gray-400">Secure Digital Assets</div>
  //               </div>
  //             </div>
  //             <svg className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  //             </svg>
  //           </button>

  //           <button
  //             onClick={() => connectWallet("trustwallet")}
  //             className="group w-full flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20 border border-cyan-500/20 hover:border-cyan-400/40 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
  //           >
  //             <div className="flex items-center space-x-4">
  //               <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center">
  //                 <img src="/trustwallet.svg" alt="Trust Wallet" className="w-6 h-6" />
  //               </div>
  //               <div className="text-left">
  //                 <div className="font-semibold">Trust Wallet</div>
  //                 <div className="text-xs text-gray-400">Trusted Worldwide</div>
  //               </div>
  //             </div>
  //             <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  //             </svg>
  //           </button>
  //         </div>

  //         <button
  //           onClick={hide}
  //           className="w-full mt-6 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300"
  //         >
  //           Cancel
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated World Background */}
      <div className="absolute inset-0">
        {/* World Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-gradient-to-r from-green-400/20 to-cyan-600/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        {/* Globe representation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
          <div className="w-full h-full rounded-full border-2 border-cyan-500/20 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/20"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-500/20"></div>
            <div className="absolute top-1/4 left-0 right-0 h-px bg-cyan-500/10 transform rotate-12"></div>
            <div className="absolute top-3/4 left-0 right-0 h-px bg-cyan-500/10 transform -rotate-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">®</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-2">
                  Z-Coin
                </h1>
                <p className="text-cyan-400 text-sm font-medium tracking-wide">GLOBAL BLOCKCHAIN PLATFORM</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Join the World</h2>
                <p className="text-gray-400 leading-relaxed">
                  Create your account and become part of the global blockchain ecosystem. Secure, fast, and trusted.
                </p>
              </div>

              {/* Connect Button */}
              <div>
                <label htmlFor="referralCode" className="text-white text-sm">Referral Code*</label>
                <input
                  id="referralCode"
                  type="text"
                  ref={referralRef}
                  placeholder="Referral Code*"
                  className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
              </div>
              <button
                onClick={() => setShowWalletModal(true)}
                className="group relative w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 mb-4"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" />
                    <circle cx="16" cy="12" r="1.5" />
                  </svg>
                  <span>Connect Wallet</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {/* Login Link */}
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 mb-6"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Already have an account? Login</span>
                </div>
              </button>

              {/* Footer */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Secure</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Global</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Trusted</span>
                  </span>
                </div>
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy & Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWalletModal && (
        <WalletOptionModal
          connectWallet={handleWalletRegister}
          hide={() => setShowWalletModal(false)}
        />
      )}
    </div>
  );
};

export default Register; 
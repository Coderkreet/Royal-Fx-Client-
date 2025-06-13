import { useEffect, useState } from "react";
import { getOurPlans, purchaseProduct } from "../api/product-api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { Zap, DollarSign, TrendingUp, Clock, LockKeyholeOpen, Wallet } from "lucide-react";
import Swal from "sweetalert2";
import { getUserInfo } from "../api/user-api";
import MinersPurchaseHistory from "../Components/MinersPurchaseHistory";

// Skeleton Loader for Plan Card
const PlanSkeleton = () => (
  <div className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse">
    <div className="p-6 space-y-4">
      <div>
        <div className="h-6 bg-slate-700 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
          <div className="h-4 w-20 bg-slate-700 rounded"></div>
          <div className="h-4 w-16 bg-slate-700 rounded"></div>
        </div>
      </div>
      <div className="w-full h-10 bg-slate-700 rounded-xl"></div>
    </div>
  </div>
);

const MiningProducts = ({ className }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [plans, setPlans] = useState([]);
  const [loading, setLoadingState] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const userId = localStorage.getItem("UserId")
  const [formData, setFormData] = useState({
    tradingAcc: '',
    mainPassword: '',
    tradingPlatform: '',
    serverName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    planId: '',
    investmentAmount: '',
    userId: '' // Add userId to form data

  });
  const [investmentError, setInvestmentError] = useState('');

  const fetchPlans = async () => {
    try {
      dispatch(setLoading(true));
      setLoadingState(true);
      const response = await getOurPlans();
      setPlans(response?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
      setLoadingState(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'investmentAmount') {
      const amount = Number(value);
      if (amount % 100 !== 0) {
        setInvestmentError('Amount must be a multiple of 100 (e.g., 100, 200, 300...)');
      } else {
        setInvestmentError('');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      planId: plan._id
    }));
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate investment amount before submission
    if (Number(formData.investmentAmount) % 100 !== 0) {
      Swal.fire({
        title: "Invalid Amount",
        text: "Investment amount must be a multiple of 100",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      const response = await purchaseProduct(formData);
      if (response.message == "Trading account created successfully") {
        Swal.fire({
          title: "Success!",
          text: "Your plan has been purchased successfully.",
          icon: "success",
          confirmButtonText: "Great!",
        });
        setShowPopup(false);
        setFormData({
          tradingAcc: '',
          mainPassword: '',
          tradingPlatform: '',
          serverName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          planId: '',
          investmentAmount: ''
        });
        setInvestmentError('');
      }
    } catch (error) {
      // Handle error response properly
      const errorMessage = error?.response?.data?.message || error?.message || "An error occurred while processing your request. Please try again.";
      
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 ${className ? className : ""}`}>
      {/* Header Section */}
      <div className="px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Our Plans
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose from our premium mining plans and start earning cryptocurrency today
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <PlanSkeleton key={i} />)
            : plans?.map((plan) => {
                const isActivePlan = userInfo?.plan?.isActive && userInfo?.plan?.planId === plan._id;
                
                return (
                  <div
                    key={plan._id}
                    className={`group bg-slate-800/50 backdrop-blur-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isActivePlan 
                        ? 'border-green-500/50 shadow-2xl shadow-green-500/10' 
                        : userInfo?.plan?.isActive 
                          ? 'border-slate-700/50 opacity-50 cursor-not-allowed'
                          : 'border-slate-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2'
                    }`}
                  >
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-center text-slate-200 mb-2 group-hover:text-blue-300 transition-colors">
                          {plan.name}
                        </h3>
                        {isActivePlan && (
                          <div className="flex items-center justify-center mb-2">
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
                              Active Plan
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <DollarSign size={16} className="text-green-400" />
                            <span className="text-slate-300 text-sm">Total Investment</span>
                          </div>
                          <span className="text-green-400 font-semibold">
                            {plan.totalInvestment} USDT
                          </span>
                        </div>
                      </div>

                      {isActivePlan ? (
                        <button
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center space-x-2"
                          onClick={() => {
                            Swal.fire({
                              title: "Stop Active Plan?",
                              text: "Are you sure you want to stop your active mining plan?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, stop it!",
                              cancelButtonText: "Cancel"
                            }).then((result) => {
                              if (result.isConfirmed) {
                                // Add your stop plan API call here
                                Swal.fire(
                                  "Stopped!",
                                  "Your mining plan has been stopped.",
                                  "success"
                                );
                              }
                            });
                          }}
                        >
                          <Zap size={18} />
                          <span>Stop Plan</span>
                        </button>
                      ) : (
                        <button
                          className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center space-x-2 ${
                            userInfo?.plan?.isActive
                              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 focus:ring-blue-500'
                          }`}
                          onClick={() => {
                            if (!userInfo?.plan?.isActive) {
                              handleSelectPlan(plan);
                            } else {
                              Swal.fire({
                                title: "Plan Already Active",
                                text: "You already have an active mining plan. Please stop your current plan before selecting a new one.",
                                icon: "info",
                                confirmButtonText: "Okay"
                              });
                            }
                          }}
                          disabled={userInfo?.plan?.isActive}
                        >
                          <Zap size={18} />
                          <span>
                            {userInfo?.plan?.isActive ? 'Plan Active' : 'Select Plan'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Empty State */}
        {!loading && plans?.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 max-w-md mx-auto">
              <Clock size={48} className="text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No Plans Available
              </h3>
              <p className="text-slate-500">
                Mining plans will appear here when available.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Complete Your Purchase</h2>
            
            {/* Topup Wallet Balance Display */}
            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 font-medium">Topup Wallet Balance</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-400">
                    {Number(userInfo?.wallet?.topupWallet || 0).toFixed(2)} USDT
                  </div>
                  <div className="text-sm text-slate-400">Available for investment</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-2">Investment Amount</label>
                  <input
                    type="number"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                      investmentError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    required
                    min="100"
                    step="100"
                    placeholder="Enter amount (e.g., 100, 200, 300...)"
                    max={userInfo?.wallet?.topupWallet || 0}
                  />
                  {investmentError && (
                    <p className="mt-1 text-sm text-red-400">{investmentError}</p>
                  )}
                  {Number(formData.investmentAmount) > (userInfo?.wallet?.topupWallet || 0) && (
                    <p className="mt-1 text-sm text-red-400">
                      Investment amount cannot exceed your topup wallet balance
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Trading Account</label>
                  <input
                    type="text"
                    name="tradingAcc"
                    value={formData.tradingAcc}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Main Password</label>
                  <input
                    type="password"
                    name="mainPassword"
                    value={formData.mainPassword}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Trading Platform</label>
                  <input
                    type="text"
                    name="tradingPlatform"
                    value={formData.tradingPlatform}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Server Name</label>
                  <input
                    type="text"
                    name="serverName"
                    value={formData.serverName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !formData.investmentAmount ||
                    investmentError ||
                    Number(formData.investmentAmount) % 100 !== 0 ||
                    Number(formData.investmentAmount) < 100 ||
                    Number(formData.investmentAmount) > (userInfo?.wallet?.topupWallet || 0)
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MinersPurchaseHistory/>
    </div>
  );
};

export default MiningProducts;
import { useEffect, useState } from "react";
// import { getOurPlans } from "../api/product-api";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/loadingSlice";
import { Zap, DollarSign, TrendingUp, Clock } from "lucide-react";
import { getOurPlans } from "../../api/product-api";
import MinersPurchaseHistory from "../../Components/MinersPurchaseHistory";

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
        <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
          <div className="h-4 w-20 bg-slate-700 rounded"></div>
          <div className="h-4 w-16 bg-slate-700 rounded"></div>
        </div>
      </div>
      <div className="w-full h-10 bg-slate-700 rounded-xl"></div>
    </div>
  </div>
);

const OurPlans = ({ className }) => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [loading, setLoadingState] = useState(true);

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
            : plans?.map((plan, index) => (
              <div
                key={plan._id}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
              >
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-200 mb-2 group-hover:text-blue-300 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Lock-in Period: {plan.lockin} months
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} className="text-green-400" />
                        <span className="text-slate-300 text-sm">Investment</span>
                      </div>
                      <span className="text-green-400 font-semibold">
                        {plan.price} USDT
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp size={16} className="text-blue-400" />
                        <span className="text-slate-300 text-sm">Monthly ROI</span>
                      </div>
                      <span className="text-blue-400 font-semibold">
                        {plan.monthlyROIpercentage}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp size={16} className="text-purple-400" />
                        <span className="text-slate-300 text-sm">Total ROI</span>
                      </div>
                      <span className="text-purple-400 font-semibold">
                        {plan.totalROIpercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center space-x-2"
                  >
                    <Zap size={18} />
                    <span>Select Plan</span>
                  </button> */}
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default OurPlans;
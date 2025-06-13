import { Check, TrendingUp, Shield, BarChart, Wallet, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../context/Routes";

export default function ZCoinInvestmentPlans() {
  const plans = [
    {
      name: "Starter Plan",
      color: "green",
      emoji: "🟢",
      investment: "100 Z-Coin",
      monthlyROI: "6%",
      lockPeriod: "6 Months",
      totalROI: "36%",
      description: "Ideal for beginners taking their first step into crypto investing.",
      colorClasses: {
        border: "border-green-500",
        bg: "bg-green-600",
        text: "text-green-400",
        bgOpacity: "bg-green-600 bg-opacity-20"
      }
    },
    {
      name: "Bronze Plan",
      color: "orange",
      emoji: "🟠",
      investment: "500 Z-Coin",
      monthlyROI: "7%",
      lockPeriod: "8 Months",
      totalROI: "56%",
      description: "A perfect balance between low investment and higher returns.",
      badge: "🔥",
      colorClasses: {
        border: "border-orange-500",
        bg: "bg-orange-600",
        text: "text-orange-400",
        bgOpacity: "bg-orange-600 bg-opacity-20"
      }
    },
    {
      name: "Silver Plan",
      color: "gray",
      emoji: "⚪",
      investment: "1000 Z-Coin",
      monthlyROI: "8%",
      lockPeriod: "10 Months",
      totalROI: "80%",
      description: "Great for steady growth with medium-term commitment.",
      badge: "⚙️",
      colorClasses: {
        border: "border-gray-500",
        bg: "bg-gray-600",
        text: "text-gray-400",
        bgOpacity: "bg-gray-600 bg-opacity-20"
      }
    },
    {
      name: "Gold Plan",
      color: "yellow",
      emoji: "🟡",
      investment: "2000 Z-Coin",
      monthlyROI: "9%",
      lockPeriod: "12 Months",
      totalROI: "108%",
      description: "Double your crypto! Designed for serious investors aiming high.",
      badge: "💸",
      popular: true,
      colorClasses: {
        border: "border-yellow-500",
        bg: "bg-yellow-600",
        text: "text-yellow-400",
        bgOpacity: "bg-yellow-600 bg-opacity-20"
      }
    },
    {
      name: "Platinum Plan",
      color: "blue",
      emoji: "🔵",
      investment: "5000 Z-Coin",
      monthlyROI: "10%",
      lockPeriod: "15 Months",
      totalROI: "150%",
      description: "Our most powerful plan — built for long-term crypto success.",
      badge: "👑",
      colorClasses: {
        border: "border-blue-500",
        bg: "bg-blue-600",
        text: "text-blue-400",
        bgOpacity: "bg-blue-600 bg-opacity-20"
      }
    }
  ];

  const benefits = [
    { icon: TrendingUp, text: "Automated monthly ROI" },
    { icon: Shield, text: "Secure blockchain-backed investment" },
    { icon: BarChart, text: "Transparent tracking dashboard" },
    { icon: Wallet, text: "Hassle-free withdrawal after lock-in" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 bg-opacity-20 backdrop-blur-sm rounded-full mb-6 border border-blue-500 border-opacity-30">
            <Wallet className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Our Investment <span className="text-blue-400">Plans</span>
          </h1>
          <h2 className="text-2xl text-gray-300 mb-6">
            Choose the Right Plan, Start Earning Today
          </h2>
          <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
            At Z-Coin, we offer flexible and profitable investment plans tailored to fit every kind of investor — from beginners to serious crypto earners. Whether you're just starting out or scaling up, there's a Z-Coin plan built for you.
          </p>
        </div>

        {/* Investment Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border ${plan.colorClasses.border} border-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:transform hover:scale-105 ${plan.popular ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${plan.colorClasses.bgOpacity} rounded-lg mb-3 border ${plan.colorClasses.border} border-opacity-30`}>
                  <span className="text-2xl">{plan.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="text-lg">{plan.badge}</span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Investment:</span>
                  <span className="font-semibold text-white">{plan.investment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly ROI:</span>
                  <span className={`font-bold ${plan.colorClasses.text}`}>{plan.monthlyROI}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lock-in Period:</span>
                  <span className="font-semibold text-white">{plan.lockPeriod}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                  <span className="text-gray-300 font-medium">Total ROI:</span>
                  <span className={`font-bold text-xl ${plan.colorClasses.text}`}>{plan.totalROI}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {plan.description}
              </p>

           <Link to={AuthRoutes.LOGIN}>    <button 
                className={`w-full ${plan.colorClasses.bg} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg`}
              >
                Choose Plan
              </button></Link>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <div className="flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <span>Why Choose a Plan?</span>
              </div>
            </h2>
            <p className="text-gray-400">All plans come with:</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 border-opacity-50 text-center"
                >
                  <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-500 border-opacity-30">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-gray-300 font-medium">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 border-opacity-50 max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="text-2xl">🔗</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Start Your Crypto Journey Today
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              <strong>Start your crypto journey with the plan that fits your vision.</strong> With Z-Coin, your investment works for you — every single day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/25">
                Get Started Now
              </button>
              <button className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Compare Plans
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
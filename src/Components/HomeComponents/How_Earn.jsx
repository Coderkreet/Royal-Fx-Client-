import { Search, Lock, TrendingUp, Trophy, ArrowRight, Coins, Calendar, BarChart, Wallet } from "lucide-react";

export default function ZCoinEarningGuide() {
  const steps = [
    {
      // number: 1,
      title: "Choose Your Investment Plan",
      description: "Browse through our flexible plans — Starter, Bronze, Silver, Gold, or Platinum. Each plan comes with a fixed Monthly ROI, lock-in period, and total ROI.",
      highlight: "Start with as low as 100 Royal-Fx.",
      icon: Search,
      color: "blue"
    },
    {
      // number: 2,
      title: "Invest & Lock-In",
      description: "Once you select your plan, invest your Royal-Fxs and lock in for the chosen duration. Your funds are securely held and start generating monthly returns immediately.",
      icon: Lock,
      color: "green"
    },
    {
      // number: 3,
      title: "Earn Passive Monthly Income",
      description: "Sit back and relax while your investment automatically generates monthly ROI. Track your earnings in real time via your dashboard. After the lock-in period ends, withdraw your capital + total returns hassle-free.",
      highlight: "automatically generates monthly ROI",
      highlight2: "withdraw your capital + total returns hassle-free.",
      icon: TrendingUp,
      color: "purple"
    }
  ];

  const bonusFeatures = [
    {
      icon: Coins,
      title: "More Royal-Fxs = Higher Monthly ROI",
      description: "Increase your investment amount for better returns"
    },
    {
      icon: Calendar,
      title: "Longer Lock-in = Bigger Total ROI",
      description: "Extended commitment periods yield maximum profits"
    },
    {
      icon: BarChart,
      title: "Auto-staking for passive growth",
      description: "Your investments work automatically in the background"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-600 bg-opacity-20",
        border: "border-blue-500 border-opacity-30",
        text: "text-blue-400",
        accent: "bg-blue-600"
      },
      green: {
        bg: "bg-green-600 bg-opacity-20",
        border: "border-green-500 border-opacity-30",
        text: "text-green-400",
        accent: "bg-green-600"
      },
      purple: {
        bg: "bg-purple-600 bg-opacity-20",
        border: "border-purple-500 border-opacity-30",
        text: "text-purple-400",
        accent: "bg-purple-600"
      }
    };
    return colorMap[color];
  };

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
            <Wallet className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            How to Earn with <span className="text-blue-400">Royal-Fx</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <strong>Start earning in 3 simple steps. No hassle. Just crypto rewards.</strong>
          </p>
        </div>

        {/* Steps Section */}
        <div className="max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colors = getColorClasses(step.color);
            
            return (
              <div key={index} className="mb-12 last:mb-0">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 border-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row items-start gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} mb-4`}>
                        <IconComponent className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div className="text-3xl font-bold text-center">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      
                      {/* Highlights */}
                      {step.highlight && (
                        <div className={`inline-block ${colors.bg} ${colors.text} text-sm font-semibold px-4 py-2 rounded-full border ${colors.border} mb-2`}>
                          👉 {step.highlight}
                        </div>
                      )}
                      
                      {step.highlight2 && (
                        <div className={`block ${colors.bg} ${colors.text} text-sm font-semibold px-4 py-2 rounded-full border ${colors.border} mt-2`}>
                          {step.highlight2}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow Between Steps */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-6">
                    <div className="w-12 h-12 bg-gray-700 bg-opacity-50 rounded-full flex items-center justify-center border border-gray-600 border-opacity-50">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bonus Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 bg-opacity-20 backdrop-blur-sm rounded-full mb-4 border border-yellow-500 border-opacity-30">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              🏆 Bonus: <span className="text-yellow-400">Higher the Plan, Greater the Returns</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {bonusFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 border-opacity-50 hover:bg-opacity-70 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-yellow-500 border-opacity-30">
                    <IconComponent className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

  
      </div>
    </div>
  );
}
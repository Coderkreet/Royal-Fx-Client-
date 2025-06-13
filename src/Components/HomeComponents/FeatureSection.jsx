import { Layers, TrendingUp, Lock, DollarSign, BarChart3, Zap, Shield, Globe, Check, Star } from "lucide-react";

export default function ZCoinKeyFeatures() {
  const features = [
    {
      icon: Layers,
      title: "Multiple Investment Tiers",
      highlight: "Five tailored plans",
      description: "From Starter to Platinum, choose from five tailored plans based on your budget, risk level, and growth goals.",
      color: "blue",
      colorClasses: {
        bg: "bg-blue-600 bg-opacity-20",
        border: "border-blue-500 border-opacity-30",
        text: "text-blue-400",
        glow: "hover:shadow-blue-500/20"
      }
    },
    {
      icon: TrendingUp,
      title: "Fixed Monthly ROI",
      highlight: "6% to 10%",
      description: "Enjoy consistent returns every month — ranging from 6% to 10%, depending on your selected plan.",
      color: "green",
      colorClasses: {
        bg: "bg-green-600 bg-opacity-20",
        border: "border-green-500 border-opacity-30",
        text: "text-green-400",
        glow: "hover:shadow-green-500/20"
      }
    },
    {
      icon: Lock,
      title: "Lock-In Periods for Stability",
      highlight: "6 to 15 months",
      description: "Each plan comes with a pre-defined lock-in duration (6 to 15 months) to ensure investment discipline and structured growth.",
      color: "orange",
      colorClasses: {
        bg: "bg-orange-600 bg-opacity-20",
        border: "border-orange-500 border-opacity-30",
        text: "text-orange-400",
        glow: "hover:shadow-orange-500/20"
      }
    },
    {
      icon: DollarSign,
      title: "High Total ROI",
      highlight: "Up to 150% ROI",
      description: "Get up to 150% ROI with our premium Platinum plan — your investment grows while you sit back.",
      color: "yellow",
      colorClasses: {
        bg: "bg-yellow-600 bg-opacity-20",
        border: "border-yellow-500 border-opacity-30",
        text: "text-yellow-400",
        glow: "hover:shadow-yellow-500/20"
      }
    },
    {
      icon: BarChart3,
      title: "Transparent & Real-Time Tracking",
      highlight: "User-friendly dashboard",
      description: "Track your earnings and ROI with our user-friendly dashboard designed for clarity and full control.",
      color: "purple",
      colorClasses: {
        bg: "bg-purple-600 bg-opacity-20",
        border: "border-purple-500 border-opacity-30",
        text: "text-purple-400",
        glow: "hover:shadow-purple-500/20"
      }
    },
    {
      icon: Zap,
      title: "Instant Plan Activation",
      highlight: "Start earning immediately",
      description: "Choose a plan, invest Royal-Fxs, and start earning immediately — no complicated setup or waiting.",
      color: "cyan",
      colorClasses: {
        bg: "bg-cyan-600 bg-opacity-20",
        border: "border-cyan-500 border-opacity-30",
        text: "text-cyan-400",
        glow: "hover:shadow-cyan-500/20"
      }
    },
    {
      icon: Shield,
      title: "Blockchain-Backed Security",
      highlight: "Advanced blockchain protocols",
      description: "Your funds and transactions are secured with advanced blockchain protocols and wallet protection.",
      color: "red",
      colorClasses: {
        bg: "bg-red-600 bg-opacity-20",
        border: "border-red-500 border-opacity-30",
        text: "text-red-400",
        glow: "hover:shadow-red-500/20"
      }
    },
    {
      icon: Globe,
      title: "Decentralized & User-Focused",
      highlight: "Trustless, transparent ecosystem",
      description: "No middlemen, no hidden fees — Royal-Fx operates on a trustless, transparent ecosystem designed for investors.",
      color: "indigo",
      colorClasses: {
        bg: "bg-indigo-600 bg-opacity-20",
        border: "border-indigo-500 border-opacity-30",
        text: "text-indigo-400",
        glow: "hover:shadow-indigo-500/20"
      }
    }
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
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Key Features of <span className="text-blue-400">Royal-Fx</span> Investment Plans
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Royal-Fx is not just an investment — it's a well-structured, reward-driven crypto opportunity tailored for every type of investor. Here's what makes Royal-Fx plans stand out:
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border ${feature.colorClasses.border} hover:bg-opacity-60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${feature.colorClasses.glow}`}
              >
                {/* Icon and Check Mark */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${feature.colorClasses.bg} rounded-xl flex items-center justify-center border ${feature.colorClasses.border} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${feature.colorClasses.text}`} />
                  </div>
                  <div className="text-green-400 text-xl">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {feature.title}
                </h3>

                {/* Highlight Badge */}
                <div className={`inline-block ${feature.colorClasses.bg} ${feature.colorClasses.text} text-sm font-semibold px-3 py-1 rounded-full mb-4 border ${feature.colorClasses.border}`}>
                  {feature.highlight}
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`mt-6 h-1 bg-gradient-to-r from-transparent via-${feature.color}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></div>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}
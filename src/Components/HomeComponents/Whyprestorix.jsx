import { Shield, TrendingUp, Globe, Users, Rocket, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../context/Routes";

export default function ZCoinLanding() {
  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Your investments are safeguarded with advanced blockchain technology, multi-layer encryption, and secure wallet integrations — ensuring maximum protection for your assets."
    },
    {
      icon: TrendingUp,
      title: "Smart Investment Plans",
      description: "Z-Coin is part of the CryptoZ Investment Plan, which means it's designed for consistent growth, passive income opportunities, and long-term returns."
    },
    {
      icon: Globe,
      title: "Decentralized & Transparent",
      description: "Say goodbye to middlemen. Our decentralized ecosystem ensures 100% transparency, allowing you to track your investments and transactions in real-time."
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "We believe in the power of community. Z-Coin thrives on collective participation, giving users a voice in development, governance, and future updates."
    },
    {
      icon: Rocket,
      title: "Future-Ready",
      description: "Z-Coin is built on scalable, future-proof architecture, keeping you ahead in the rapidly evolving crypto world — from DeFi to NFTs and beyond."
    },
    {
      icon: BookOpen,
      title: "Beginner Friendly",
      description: "Our platform is intuitive and easy to use, making it perfect for both first-time investors and experienced crypto enthusiasts."
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
            <Lightbulb className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Why Choose <span className="text-blue-400">Z-Coin</span>?
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Z-Coin isn't just another digital currency — it's a{" "}
            <span className="text-blue-400 font-semibold">strategic investment platform</span>{" "}
            built to help you grow, secure, and future-proof your financial journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 border-opacity-50 hover:bg-opacity-70 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-lg flex items-center justify-center mr-4 border border-blue-500 border-opacity-30">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 border-opacity-50 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of investors who have chosen Z-Coin as their gateway to the future of finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={AuthRoutes.LOGIN}>    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/25">
                Get Started Today
              </button> </Link>
              {/* <button className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
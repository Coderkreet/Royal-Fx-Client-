import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap,
  Star,
  Play,
  ChevronDown  
} from "lucide-react";
import Logo from '../../assets/app/Hello.png'
import { AuthRoutes } from "../../context/Routes";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "50K+", label: "Active Investors" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "$2.5M+", label: "Total Investment" },
    { icon: <Shield className="w-6 h-6" />, value: "99.9%", label: "Security Rate" },
    { icon: <Zap className="w-6 h-6" />, value: "24/7", label: "Support" }
  ];

  // Floating coins data
  const floatingCoins = [
    { 
      id: 1, 
      size: 'w-16 h-16', 
      delay: 'delay-0', 
      duration: 'duration-[8s]', 
      top: 'top-[10%]', 
      left: 'left-[10%]',
      translate: 'translate-x-[20px] translate-y-[30px]'
    },
    { 
      id: 2, 
      size: 'w-20 h-20', 
      delay: 'delay-1000', 
      duration: 'duration-[12s]', 
      top: 'top-[20%]', 
      left: 'left-[80%]',
      translate: 'translate-x-[-30px] translate-y-[20px]'
    },
    { 
      id: 3, 
      size: 'w-12 h-12', 
      delay: 'delay-2000', 
      duration: 'duration-[10s]', 
      top: 'top-[60%]', 
      left: 'left-[15%]',
      translate: 'translate-x-[25px] translate-y-[-15px]'
    },
    { 
      id: 4, 
      size: 'w-24 h-24', 
      delay: 'delay-3000', 
      duration: 'duration-[15s]', 
      top: 'top-[40%]', 
      left: 'left-[70%]',
      translate: 'translate-x-[-20px] translate-y-[25px]'
    },
    { 
      id: 5, 
      size: 'w-16 h-16', 
      delay: 'delay-4000', 
      duration: 'duration-[9s]', 
      top: 'top-[80%]', 
      left: 'left-[30%]',
      translate: 'translate-x-[15px] translate-y-[-20px]'
    },
    { 
      id: 6, 
      size: 'w-20 h-20', 
      delay: 'delay-5000', 
      duration: 'duration-[11s]', 
      top: 'top-[30%]', 
      left: 'left-[50%]',
      translate: 'translate-x-[-25px] translate-y-[15px]'
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black">
      {/* Video Background Container */}
      {/* <div className="fixed top-0 left-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          src="https://ik.imagekit.io/Priy12345/9feaf9df4bc57c00d54c1e220f66eb830e5872a6.mp4?updatedAt=1747631933529"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Floating Coins Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingCoins.map((coin) => (
            <div
              key={coin.id}
              className={`hidden md:block absolute ${coin.size} ${coin.delay} ${coin.duration} ${coin.top} ${coin.left} animate-float`}
              style={{
                transform: coin.translate,
              }}
            >
                  <span className="text-white font-bold text-lg"><img src={Logo} alt="" /></span>
                  </div>
          ))}
        </div>

        <div className={`w-full max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-white font-medium">Next-Gen Investment Platform</span>
          </div>

          {/* Main title */}
          <div className="flex items-center justify-between gap-8 mb-12">
            {/* Left side - Logo */}
            <div className="w-1/3">
              <img src={Logo} alt="Logo data" className="w-full h-auto" />
            </div>

            {/* Right side - Content */}
            <div className="w-2/3 text-left">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black mb-6 relative">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-pulse">
                  Z-Coin
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10"></div>
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 mb-6 leading-relaxed">
                Revolutionizing Digital Finance with 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold"> Smart Investments</span>
              </h2>
              
              {/* Decorative line */}
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Description card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="backdrop-blur-xl bg-white/5 p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5"></div>
              
              <div className="relative z-10">
                {/* Logo and intro */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">Z</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Z-Coin Platform</h3>
                    <p className="text-cyan-300 text-sm">CryptoZ Investment Plan</p>
                  </div>
                </div>
                
                <p className="text-gray-200 text-lg sm:text-xl leading-relaxed tracking-wide">
                  In the fast-paced world of digital finance, <strong className="text-cyan-400">Z-Coin</strong> emerges as a next-generation investment solution designed for both beginners and seasoned investors. Built under the CryptoZ Investment Plan, Z-Coin is more than just a cryptocurrency — it's a 
                  <strong className="text-purple-400"> secure, innovative, and community-driven</strong> digital asset that empowers users to grow their wealth through smart, transparent, and decentralized investments.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to={AuthRoutes.LOGIN}>  <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg">
              Start Investing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button></Link>
            
            {/* <button className="group bg-white/10 backdrop-blur-md hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2 text-lg">
              <Play className="w-5 h-5" />
              Watch Demo
            </button> */}
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-4 rounded-xl backdrop-blur-md transition-all duration-500 ${
                  currentStat === index 
                    ? 'bg-white/15 border border-cyan-400/50 scale-105' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 ${
                  currentStat === index 
                    ? 'bg-cyan-400/20 text-cyan-400' 
                    : 'bg-white/10 text-white'
                }`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
import React from "react";
import icon1 from "../../assets/website/t1.png";
import icon2 from "../../assets/website/t2.png";
import icon3 from "../../assets/website/t3.png";
import icon4 from "../../assets/website/t4.png";
import icon5 from "../../assets/website/t1.png";
import icon6 from "../../assets/website/t2.png";
import icon7 from "../../assets/website/t3.png";
import icon8 from "../../assets/website/t4.png";
import icon9 from "../../assets/website/t1.png";
import icon10 from "../../assets/website/t2.png";
import icon11 from "../../assets/website/t3.png";
import icon12 from "../../assets/website/t4.png";

const icons = [
  { src: icon1, bg: "bg-[#F84F71]" },
  { src: icon2, bg: "bg-[#FFB629]" },
  { src: icon3, bg: "bg-[#299DFF]" },
  { src: icon4, bg: "bg-[#F84F71]" },
  { src: icon5, bg: "bg-[#B77BD3]" },
  { src: icon6, bg: "bg-[#B77BD3]" },
  { src: icon7, bg: "bg-[#F84F71]" },
  { src: icon8, bg: "bg-[#FFB629]" },
  { src: icon9, bg: "bg-[#299DFF]" },
  { src: icon10, bg: "bg-[#F84F71]" },
  { src: icon11, bg: "bg-[#6C52D3]" },
  { src: icon12, bg: "bg-[#B77BD3]" },
];

const NextGenSection = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-6 md:px-16 text-white overflow-hidden">
    {/* Background decorations */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
    
    <div className="relative max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/30 backdrop-blur-sm border border-blue-600/30 rounded-full">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <p className="text-cyan-300 text-sm font-medium uppercase tracking-wider">
            Decentralized Future
          </p>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent leading-tight">
          The next generation of the internet
        </h2>
        
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Experience the power of decentralized technology with cutting-edge solutions 
          that shape tomorrow's digital landscape.
        </p>
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-8 justify-items-center max-w-4xl mx-auto">
        {icons.map((item, index) => (
          <div
            key={index}
            className="group relative"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 ${item.bg} rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 scale-110`}></div>
            
            {/* Main icon container */}
            <div className={`relative ${item.bg} w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border border-white/10`}>
              <img 
                src={item.src} 
                alt={`Technology icon ${index + 1}`} 
                className="w-10 h-10 rounded-lg object-cover filter brightness-110 contrast-110" 
              />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Floating particles effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
          <div className="flex -space-x-1">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-slate-900"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-slate-900"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <span>Trusted by innovators worldwide</span>
        </div>
      </div>
    </div>
  </section>
  );
};

export default NextGenSection;
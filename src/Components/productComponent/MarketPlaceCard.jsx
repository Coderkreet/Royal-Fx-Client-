import React from 'react';

const MarketPlaceCard = ({ icon, title, description }) => {
  return (
    <div className="border h-full border-blue-500 rounded-xl p-8 text-center hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm shadow-md">
      
      <div className="flex items-center justify-center w-[4rem] h-[4rem] text-4xl bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-6 text-white shadow-lg">
        {icon}
      </div>

      <h3 className="text-[1rem] font-semibold text-blue-400 mb-2">
        {title}
      </h3>

      <p className="text-[1rem] text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default MarketPlaceCard;

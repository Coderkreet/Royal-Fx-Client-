import React from 'react';

const BestSellerCard = ({ image, title }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gradient-to-b from-[#0c8ce9] to-[#00c0fa] p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center gap-4">
      
      <div className="bg-white rounded-xl w-full h-40 flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-contain w-full h-full p-2"
        />
      </div>
      
      <p className="text-white text-center font-semibold text-lg sm:text-xl md:text-2xl">
        {title}
      </p>
    </div>
  );
};

export default BestSellerCard;

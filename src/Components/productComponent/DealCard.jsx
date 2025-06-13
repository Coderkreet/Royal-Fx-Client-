import React from 'react';
import { FaMicrochip } from 'react-icons/fa';
import { ImPower } from 'react-icons/im';

const DealCard = ({ img, power, processor, price, title }) => {
  return (
    <div className="bg-white w-full max-w-sm lg:max-w-xs rounded-2xl text-black p-6 shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
      
      {/* Image */}
      <div className="flex justify-center">
        <img 
          src={img} 
          alt={title} 
          className="h-40 w-40 object-contain"
        />
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-base text-gray-700">
          <p className="flex items-center gap-2">
            <ImPower className="text-[#019adf]" />
            <span className="text-sm sm:text-base">{power}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaMicrochip className="text-[#019adf]" />
            <span className="text-sm sm:text-base">{processor}</span>
          </p>
        </div>

        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <h2 className="text-xl font-bold text-[#019adf]">{price}$</h2>
      </div>
    </div>
  );
};

export default DealCard;

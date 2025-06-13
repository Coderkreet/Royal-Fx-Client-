import React from 'react';
import { FaMicrochip } from 'react-icons/fa';
import { ImPower } from 'react-icons/im';
import { MdShoppingCart } from 'react-icons/md';

const FeaturedProductCard = ({ img, power, processor, price, title }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 text-black transition-transform duration-300 hover:scale-[1.03] cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="flex justify-center">
        <img 
          src={img} 
          alt={title} 
          className="w-full max-w-[160px] h-auto object-contain"
        />
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="space-y-3">
        <div className="flex justify-between text-sm sm:text-base text-gray-700">
          <span className="flex items-center gap-2">
            <ImPower className="text-[#00BFFF]" />
            <span>{power}</span>
          </span>
          <span className="flex items-center gap-2">
            <FaMicrochip className="text-[#00BFFF]" />
            <span>{processor}</span>
          </span>
        </div>

        <h2 className="text-[1rem] sm:text-[1.2rem] font-semibold text-gray-900">
          {title}
        </h2>

        <div className="flex items-center justify-between mt-4">
          <span className="text-[0.8rem] sm:text-[1rem] font-bold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#0068DA] to-[#00D5E6]">
            ${price}
          </span>
          <button className="text-white text-[1.2rem] sm:text-[1.3rem] p-2 rounded-lg bg-gradient-to-r from-[#0068DA] to-[#00D5E6] hover:opacity-90">
            <MdShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;

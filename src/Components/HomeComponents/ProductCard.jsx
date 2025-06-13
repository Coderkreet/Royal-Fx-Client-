import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ contract, expiry, price, crypto }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto">
      {/* Card Background with Gradient Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 rounded-2xl p-8 h-full flex flex-col justify-between border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* Decorative Corner Element */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
        
        {/* Top Section */}
        <div className="space-y-6">
          {/* Contract Info */}
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
              <p className="text-sm font-medium text-cyan-300 uppercase tracking-wider">
                Contract
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-200 ml-3">
              {contract}
            </p>
          </div>
          
          {/* Crypto Name */}
          <div className="text-center py-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200 leading-tight">
              {crypto.toUpperCase()}
            </h2>
            <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="space-y-6 py-6">
          {/* Expiry */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-slate-500 rounded-full"></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Expiry
              </p>
            </div>
            <p className="text-xl font-semibold text-gray-200 ml-3">
              {expiry}
            </p>
          </div>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Min. Price
              </p>
            </div>
            <p className="text-xl font-semibold text-gray-200 ml-3">
              {price} <span className="text-sm text-slate-400">Per 10 GH/s</span>
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="pt-4">
          <Link to="/login" className="block w-full">
            <button className="relative w-full group/btn overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-500 hover:via-blue-600 hover:to-cyan-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:translate-y-[-2px] active:translate-y-0">
              
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button Content */}
              <div className="relative flex items-center justify-center space-x-3">
                <span className="text-lg font-light tracking-wide">
                  START MINING
                </span>
                <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            </button>
          </Link>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-4 left-4 flex space-x-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
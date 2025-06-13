
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const EarnCard = ({ img, title, price }) => {
  const [showScanning, setShowScanning] = useState(false);

  const handleClick = () => {
    setShowScanning(true);
    document.body.style.overflow = "hidden"; // prevent scroll

    setTimeout(() => {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Your Device is not capable to buy this plan",
        timer: 2500,
        showConfirmButton: false,
      });

      setShowScanning(false);
      document.body.style.overflow = ""; // restore scroll
    }, 5000);
  };

  // Full-screen scan overlay component
  const ScanWindowPopup = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <img
        src="/src/assets/home/scan-gif.gif"
        alt="Scanning..."
        className="min-h-screen object-cover" // full screen GIF
      />
    </div>
  );

  return (
    <div className="group flex flex-col space-y-4">
      {showScanning && <ScanWindowPopup />}
      
      {/* Card with hover effects */}
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-slate-800 shadow-lg border border-gray-800 hover:shadow-2xl hover:border-cyan-500/50 transition-all duration-300">
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
          {price}
        </div>
        
        {/* Image Section */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Potential earnings
            </div>
          </div>
        </div>
        
        {/* Subtle overlay gradient for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      {/* Buy Now Button - Separated to maintain card height uniformity */}
      <Link to="/login" className="block w-full">
        <button
          onClick={handleClick}
          className="w-full group flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1"
        >
          <span className="font-semibold">BUY NOW</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </Link>
    </div>
  );
};

export default EarnCard;

import React from 'react';
import ProductCard from './ProductCard';
import { productCardData } from '../../utils/constant';

const ProductSection = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(148,163,184,0.05)_50%,transparent_100%)]"></div>
            
            {/* Main Content Container */}
            <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-24 lg:py-32">
                
                {/* Top Heading Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8 mb-20">
                    
                    {/* Product Title */}
                    <div className="relative group">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full transform group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="pl-8">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-gray-300 leading-tight tracking-tight">
                                Product
                            </h1>
                            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                        </div>
                    </div>
                    
                    {/* Mission Statement */}
                    <div className="relative group max-w-md">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full transform group-hover:scale-y-110 transition-transform duration-300"></div>
                        <div className="pl-8 space-y-2">
                            <p className="text-xl sm:text-2xl text-gray-200 font-medium leading-relaxed">
                                We are on a mission to empower innovation
                            </p>
                            <p className="text-xl sm:text-2xl text-gray-200 font-medium leading-relaxed">
                                and revolutionize.
                            </p>
                            <div className="mt-4 flex space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Cards Section */}
                <div className="relative">
                    {/* Section Background Blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 to-transparent rounded-3xl backdrop-blur-sm"></div>
                    
                    {/* Cards Container */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
                        {productCardData.map((card, index) => (
                            <div 
                                key={index} 
                                className="transform hover:scale-105 transition-all duration-300 hover:z-20"
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <ProductCard
                                    contract={card.contract}
                                    crypto={card.crypto}
                                    expiry={card.expiry}
                                    price={card.price}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Decorative Elements */}
                <div className="mt-20 flex justify-center space-x-8 opacity-30">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-0.5"></div>
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-slate-400 rounded-full -mt-0.5"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full mt-0.5"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSection;
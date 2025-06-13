import React from 'react';

const FeatureCard = ({ title, subTitle, pointOne, pointTwo }) => {
    return (
        <div className="group relative w-full max-w-lg mx-auto h-full">
            {/* Animated Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur-sm"></div>
            
            {/* Main Card */}
            <div className="relative h-full bg-gradient-to-br from-white via-blue-50/50 to-slate-100/30 border-2 border-slate-200/60 hover:border-blue-300/60 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.04),transparent_60%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(34,197,94,0.02)_50%,transparent_100%)]"></div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300 opacity-60"></div>
                <div className="absolute top-4 right-4 w-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full group-hover:scale-200 transition-transform duration-500 opacity-40"></div>
                
                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                    
                    {/* Header Section */}
                    <div className="space-y-6">
                        {/* Title with Accent Border */}
                        <div className="relative">
                            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 rounded-full group-hover:scale-y-110 transition-transform duration-300"></div>
                            <div className="pl-6">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-900 to-slate-700 leading-tight tracking-tight">
                                    {title}
                                </h1>
                                <div className="mt-3 h-0.5 w-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transform group-hover:w-24 transition-all duration-300"></div>
                            </div>
                        </div>
                        
                        {/* Subtitle */}
                        <div className="pl-6">
                            <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-700 leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                                {subTitle}
                            </p>
                        </div>
                    </div>
                    
                    {/* Features/Points Section */}
                    <div className="space-y-6 pl-6">
                        {/* Point One */}
                        <div className="group/point flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover/point:scale-125 transition-transform duration-300"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light text-slate-600 leading-relaxed group-hover/point:text-slate-700 transition-colors duration-300">
                                {pointOne}
                            </p>
                        </div>
                        
                        {/* Point Two */}
                        <div className="group/point flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover/point:scale-125 transition-transform duration-300"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light text-slate-600 leading-relaxed group-hover/point:text-slate-700 transition-colors duration-300">
                                {pointTwo}
                            </p>
                        </div>
                    </div>
                    
                    {/* Bottom Accent */}
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex space-x-2 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <span>Explore</span>
                                <div className="w-4 h-4 border border-slate-400 rounded-full flex items-center justify-center">
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Side Accent Line */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-l-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                
                {/* Bottom Highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
        </div>
    );
};

export default FeatureCard;
import React from 'react';

const ServiceCard = ({ img, title }) => {
    return (
        <div className="group   relative w-full max-w-sm mx-auto cursor-pointer">
            {/* Animated Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-lg"></div>
            
            {/* Main Card Container */}
            <div className="relative h-[15rem]  bg-gradient-to-br from-slate-50 via-white to-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="absolute top-5 right-5 w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-40 group-hover:scale-200 transition-transform duration-500"></div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(148,163,184,0.02)_50%,transparent_100%)]"></div>
                
                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-start space-y-4">
                    
                    {/* Icon Container */}
                    <div className="relative group/icon">
                        {/* Icon Background Glow */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-opacity duration-300"></div>
                        
                        {/* Icon Wrapper */}
                        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 rounded-full p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-slate-700 group-hover:border-blue-500/50">
                            {/* Inner Glow */}
                            <div className="absolute inset-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Icon Image */}
                            <img 
                                src={img} 
                                alt="Service icon" 
                                className="relative z-10 w-12 h-12 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300" 
                            />
                        </div>
                        
                        {/* Floating Accent */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    
                    {/* Title Section */}
                    <div className="space-y-2">
                        {/* Accent Line */}
                        <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transform group-hover:w-16 transition-all duration-300"></div>
                        
                        {/* Title */}
                        <h2 className="text-[1.4rem] font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                            {title}
                        </h2>
                        
                        {/* Subtle Description Line */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                            <span className="text-xs text-slate-600 font-medium">Learn more</span>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                {/* Side Accent */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
            </div>
        </div>
    );
};

export default ServiceCard;
import React from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { ArrowRight, Zap, Shield, TrendingUp, Star } from 'lucide-react';

const ProductHeroSection = () => {
    const features = [
        { icon: Zap, text: "Lightning Fast Mining" },
        { icon: Shield, text: "Secure & Reliable" },
        { icon: TrendingUp, text: "Maximum Profitability" }
    ];

    return (
        <div className='relative bg-gradient-to-br from-[#00D5E6] via-[#0068DA] to-[#004BB5] overflow-hidden rounded-3xl shadow-2xl'>
            {/* Background decorations */}
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full translate-y-32 -translate-x-32 blur-2xl"></div>
            
            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-3 h-3 bg-cyan-200/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-white/50 rounded-full animate-ping delay-700"></div>

            <div className='relative z-10 flex flex-col lg:flex-row min-h-[600px]'>
                {/* Left Side (Content Section) */}
                <div className='w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center'>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white mb-6 w-fit">
                        <Star className="w-4 h-4 text-yellow-300" />
                        <span>Trusted by 10,000+ Miners</span>
                    </div>

                    {/* Main Heading */}
                    <div className='space-y-2 mb-6'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight'>
                            Get Your First
                        </h1>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-gradient-to-r from-cyan-200 to-white bg-clip-text leading-tight'>
                            MINING
                        </h1>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight'>
                            Output Today
                        </h1>
                        <p className='text-lg sm:text-xl lg:text-2xl font-semibold text-cyan-100 mt-4'>
                            Get a Piece of the Future
                        </p>
                    </div>

                    {/* Description */}
                    <p className='text-base sm:text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-md'>
                        Our goal is to provide high quality cryptocurrency miners at the best rate possible to our clients. Start your mining journey today.
                    </p>

                    {/* Feature highlights */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                                    <IconComponent className="w-4 h-4 text-cyan-200" />
                                    <span className="text-sm text-white font-medium">{feature.text}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            Start Mining Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        
                        <button className='group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2'>
                            <BiSolidOffer className='text-cyan-200 group-hover:rotate-12 transition-transform duration-300' />
                            Latest Offers
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-8 pt-8 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">99.9%</div>
                            <div className="text-sm text-cyan-200">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">24/7</div>
                            <div className="text-sm text-cyan-200">Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">50+</div>
                            <div className="text-sm text-cyan-200">Cryptocurrencies</div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Visual Section) */}
                <div className='w-full lg:w-1/2 relative flex items-center justify-center p-6'>
                    {/* 3D-style illustration placeholder */}
                    <div className="relative w-full max-w-lg h-96 lg:h-full flex items-center justify-center">
                        {/* Main mining rig visualization */}
                        <div className="relative">
                            {/* Central mining device */}
                            <div className="w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl border border-white/30 flex items-center justify-center shadow-2xl">
                                <div className="w-48 h-48 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-2xl flex items-center justify-center">
                                    <div className="text-white text-6xl font-bold">₿</div>
                                </div>
                            </div>

                            {/* Floating coins */}
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                                <span className="text-white font-bold text-xl">₿</span>
                            </div>
                            <div className="absolute -bottom-4 -left-8 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                                <span className="text-white font-bold">Ξ</span>
                            </div>
                            <div className="absolute top-16 -left-12 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-700">
                                <span className="text-white font-bold text-sm">◊</span>
                            </div>

                            {/* Connection lines */}
                            <div className="absolute inset-0 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 300 300">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                                            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M150 150 L200 100 M150 150 L100 250 M150 150 L50 180"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="2"
                                        fill="none"
                                        className="animate-pulse"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"></path>
                </svg>
            </div>
        </div>
    );
};

export default ProductHeroSection;
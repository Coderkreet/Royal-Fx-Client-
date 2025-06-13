import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Eye, Share2, ChevronRight } from "lucide-react";

import robotImage from "../../assets/blog/robot.png";
import svg1 from "../../assets/blog/1.svg";
import svg2 from "../../assets/blog/2.svg";
import svg3 from "../../assets/blog/3.svg";
import svg4 from "../../assets/blog/4.svg";const createPlaceholderImage = (width, height, text, color = "#374151") => 
  `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23D1D5DB' text-anchor='middle' dy='.3em'%3E${text}%3C/text%3E%3C/svg%3E`;

// Replace these with your actual image imports
const images = {
  robotImage,
  svg1,
  svg2,
  svg3,
  svg4,
};

// Uncomment and replace with your actual imports:


const relatedArticles = [
  {
    id: 1,
    title: "Integer Malesuada Eget Viverra",
    image: images.svg1, // Replace with: svg1
  },
  {
    id: 2,
    title: "A Pretium Enim Dolor Donec Eu Venenatis Curabitur",
    image: images.svg2, // Replace with: svg2
  },
  {
    id: 3,
    title: "A Vivamus Penatibus Enim Sit Et Quam Vel Consequat",
    image: images.svg3, // Replace with: svg3
  },
  {
    id: 4,
    title: "Integer Malesuada Eget Viverra",
    image: images.svg4, // Replace with: svg4
  },
];

export default function BlogHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white  px-4 py-6 lg:px-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className={`text-sm text-gray-400 mb-6 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="flex items-center space-x-2 text-lg">
            {/* <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300">Home</span>
            <ChevronRight size={16} className="text-gray-500" />
            <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300">Blog</span>
            <ChevronRight size={16} className="text-gray-500 text-[1rem]" /> */}
            <span className="text-gray-300">5 Efficient Rules How To Organize Your Working Place</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`flex-1 relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={images.robotImage} 
                alt="Robot with money"
                className="w-full h-[500px] overflow-hidden object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
              />

              <div className="absolute w-full h-full  inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>
              
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + i * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Text Overlay with staggered animations */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white transition-all duration-1000 delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Aenean Eleifend', 'Aenean Eleifend', 'Aliquam'].map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm text-blue-300 hover:bg-blue-500/30 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Main Title */}
                <h1 className={`text-3xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent transition-all duration-1000 delay-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  5 EFFICIENT RULES HOW TO ORGANIZE YOUR WORKING PLACE
                </h1>

                {/* Subtitle */}
                <p className={`text-gray-200 mb-4 text-lg md:text-xl transition-all duration-1000 delay-900 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  Relationship tips couples therapists are giving all the time
                </p>

                {/* Meta Information */}
                <div className={`flex flex-wrap items-center gap-4 text-gray-300 transition-all duration-1000 delay-1100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
                    <span className="font-medium">by Joanna Welllick</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-300">
                    <Clock size={16} />
                    <span>2 minute read</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-300">
                    <Eye size={16} />
                    <span>1.6K views</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-pink-400 transition-colors duration-300">
                    <Share2 size={16} />
                    <span>12K shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Sidebar */}
          <div className={`w-full lg:w-1/3 space-y-6 transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
                Related Articles
                <ArrowRight className="ml-2 text-blue-400" size={20} />
              </h3>
              
              <div className="space-y-4">
                {relatedArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className={`group flex items-center gap-4 p-4 rounded-xl bg-slate-700/30 hover:bg-slate-700/60 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${800 + index * 150}ms`,
                      transition: `all 0.5s ease ${800 + index * 150}ms`
                    }}
                  >
                    <div className="relative overflow-hidden rounded-full border-2 border-slate-600 group-hover:border-blue-500 transition-colors duration-300">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-white text-lg font-medium leading-snug group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </p>
                      <div className="flex items-center mt-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <span className="text-sm">Read more</span>
                        <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 transition-all duration-1000 delay-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h4 className="text-lg font-semibold mb-4 text-white">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {['Productivity', 'Workspace', 'Organization', 'Tips'].map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm hover:from-blue-500/30 hover:to-purple-500/30 cursor-pointer transition-all duration-300 transform hover:scale-105"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import img1 from "../../assets/auth/authBg.jpg"
import img2 from "../../assets/auth/AuthUserBg.png"
import { 
  CheckCircle2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MessageCircle,
  Share2,
  Heart,
  BookOpen,
  ArrowRight
} from "lucide-react";

const socialStats = [
  { icon: Facebook, label: "Facebook", stats: "96 Likes", color: "text-blue-600" },
  { icon: Twitter, label: "Twitter", stats: "40K Followers", color: "text-sky-400" },
  { icon: Instagram, label: "Instagram", stats: "20K Followers", color: "text-pink-500" },
  { icon: MessageCircle, label: "Pinterest", stats: "13K Likes", color: "text-red-600" },
  { icon: Youtube, label: "Youtube", stats: "625K Subscribers", color: "text-red-500" },
  { icon: Share2, label: "SoundCloud", stats: "20K Followers", color: "text-orange-500" },
  { icon: BookOpen, label: "Medium", stats: "13K Likes", color: "text-green-500" },
  { icon: Heart, label: "Vimeo", stats: "20K Followers", color: "text-blue-400" },
  { icon: ArrowRight, label: "Telegram", stats: "90K Followers", color: "text-cyan-400" },
];

export default function BlogContentSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [shareCount, setShareCount] = useState(966);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShare = (platform) => {
    setShareCount(prev => prev + 1);
    // Add ripple effect or other feedback
  };

  // Create placeholder image URLs (replace these with your local images)
  const createPlaceholderImage = (width, height, text) => 
    `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23D1D5DB' text-anchor='middle' dy='.3em'%3E${text}%3C/text%3E%3C/svg%3E`;

  const images = {
    img1: createPlaceholderImage(400, 300, "Blog Image 1"),
    img2: createPlaceholderImage(400, 300, "Blog Image 2"),
    // Replace these with your actual local images:
    // img1: "/path/to/your/Rectangle (1).png",
    // img2: "/path/to/your/Rectangle (2).png",
  };

  return (
    <div className="bg-slate-900 text-white px-4 md:px-8 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Share Sidebar */}
          <div className={`lg:col-span-1  flex lg:flex-col items-center lg:items-start space-y-6 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="text-center mt-4 group">
              <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {shareCount}
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Shares
              </div>
            </div>
            
            <div className="flex lg:flex-col items-center ml-8 sm:ml-4  space-x-4 lg:space-x-0 lg:space-y-4">
              <button 
                onClick={() => handleShare('facebook')}
                className="group bg-white text-blue-600 rounded-full p-3 hover:bg-blue-600 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <Facebook size={20} />
              </button>
              <div className="text-xs text-gray-300 text-center lg:text-left">520</div>
              
              <button 
                onClick={() => handleShare('twitter')}
                className="group bg-white text-sky-400 rounded-full p-3 hover:bg-sky-400 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
              >
                <Twitter size={20} />
              </button>
              <div className="text-xs text-gray-300 text-center lg:text-left">528</div>
              
              <button 
                onClick={() => handleShare('google')}
                className="group bg-white text-red-600 rounded-full p-3 hover:bg-red-600 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Intro Paragraph */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <p className="text-gray-400 text-lg leading-relaxed hover:text-gray-300 transition-colors duration-500">
                Aenean eleifend ante maecenas pulvinar montes lorem et pede dis
                dolor pretium donec dictum. Vici consequat justo enim. Venenatis eget
                adipiscing luctus lorem. Adipiscing veni amet luctus enim sem libero
                tellus viverra venenatis aliquam. Commodo natoque quam pulvinar elit.
              </p>
            </div>

            <hr className="border-gray-600" />

            {/* Table of Contents */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-6 font-semibold hover:text-white transition-colors duration-300">
                Table of Contents
              </h3>
              <div className="space-y-3">
                <div className="group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    <span>1. Nam condimentum varius justo</span>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-center space-x-3 text-emerald-400 hover:text-emerald-300">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    <span>2. Faucibus nullam luctus felis pretium donec</span>
                  </div>
                </div>
                
                <div className="ml-8 space-y-2">
                  <div className="group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                    <div className="flex items-center space-x-3 text-emerald-300 hover:text-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                      <span className="text-sm">Trincidunt vent tellus orci aenean consectetur</span>
                    </div>
                  </div>
                  
                  <div className="group cursor-pointer transform hover:translate-x-2 transition-all duration-300">
                    <div className="flex items-center space-x-3 text-emerald-300 hover:text-emerald-200">
                      <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                      <span className="text-sm">Eu ridiculus fringilla</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className={`space-y-8 transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent hover:from-blue-400 hover:to-purple-400 transition-all duration-500">
                Eu ridiculus fringilla aenean
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed hover:text-white transition-colors duration-500">
                Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium
                metus nullam quam aenean sociis quis sem neque vel libero. Venenatis
                nullam fringilla pretium mauris aliquam nunc vulputate integer augue
                ultricies cras. Eget viverra feugiat cras sit. Sit natoque montes
                tempus ligula eget vitae pede rhoncus maecenas consectetur commodo
                condimentum aenean.
              </p>

              {/* Quote Box */}
              <div className="group bg-slate-800 text-gray-200 p-6 mt-6 rounded-xl border-l-4 border-blue-500 hover:border-blue-400 hover:bg-slate-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-400 text-4xl group-hover:text-blue-300 transition-colors duration-300">
                    "
                  </div>
                  <div>
                    <p className="text-lg italic">
                      Quis adipiscing ligula donec ullamcorper tellus. Id odio vulputate
                      aliquam nullam vitae tincidunt semper etiam quam donec quis.
                    </p>
                    <p className="mt-4 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      — Donec Massa Integer
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="group overflow-hidden rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                  <img
                    // src={images.img1}
                    src={img1}
                    alt="Blog Image 1"
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="group overflow-hidden rounded-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  <img
                    // src={images.img2}
                    src={img2}
                    alt="Blog Image 2"
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 "></div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-8 font-semibold ">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {socialStats.map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={i}
                        className={`group flex items-center space-x-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700/70 transition-all duration-500 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{ 
                          animationDelay: `${800 + i * 100}ms`,
                          transition: `all 0.5s ease ${800 + i * 100}ms`
                        }}
                      >
                        <div className={`bg-white p-3 rounded-full ${item.color} group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-blue-400 transition-colors duration-300">
                            {item.label}
                          </p>
                          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                            {item.stats}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Optional) */}
          <div className={`lg:col-span-4 transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="sticky top-8 space-y-6">
              {/* <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                    JD
                  </div>
                  <h4 className="text-white font-semibold mb-2">John Doe</h4>
                  <p className="text-gray-400 text-sm">Content Creator & Blogger</p>
                </div>
              </div> */}

              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700/50">
                <h4 className="text-white font-semibold mb-4">Popular Posts</h4>
                <div className="space-y-3">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="flex space-x-3 group cursor-pointer">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 group-hover:bg-slate-600 transition-colors duration-300"></div>
                      <div>
                        <p className="text-sm text-white group-hover:text-blue-400 transition-colors duration-300">
                          Popular post title #{post}
                        </p>
                        <p className="text-xs text-gray-400">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
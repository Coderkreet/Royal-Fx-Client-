import React, { useState, useEffect } from "react";
import { Rocket, Send, Star, Sparkles, Moon } from "lucide-react";
import animat from "../../assets/contact/Animation.png";
import moon from "../../assets/contact/Imagemoon.png";

const createPlaceholderImage = (width, height, text, gradient = false) => {
  const colors = gradient
    ? `%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E`
    : '';
  const fill = gradient ? 'url(%23grad)' : '%23374151';

  return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg'%3E${colors}%3Crect width='100%25' height='100%25' fill='${fill}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23D1D5DB' text-anchor='middle' dy='.3em'%3E${text}%3C/text%3E%3C/svg%3E`;
};

const images = {
  animat,
  moon,
};

// Uncomment and replace with your actual imports:
// import animat from "../../assets/contact/Animation.png";
// import moon from "../../assets/contact/Imagemoon.png";

const GetTouchContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Form submitted:', formData);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white py-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30 transition-opacity duration-1000"
          style={{ backgroundImage: `url(${images.animat})` }}
        ></div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-300 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star size={Math.random() * 16 + 8} className="animate-spin" style={{
              animationDuration: `${4 + Math.random() * 4}s`
            }} />
          </div>
        ))}
      </div>

      <div className={`relative max-w-7xl mx-auto p-6 flex flex-col lg:flex-row items-center justify-between rounded-3xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}>


        <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
          <div className="text-center lg:text-left mb-8">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="text-yellow-400 mr-2 animate-pulse" size={24} />
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Let's connect constellations
              </h1>

              <Sparkles className="text-yellow-400 ml-2 animate-pulse" size={24} />
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Let's align our constellations! Reach out and let the magic of
              collaboration illuminate our skies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`flex flex-col md:flex-row gap-4 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
              <div className="flex-1 relative group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-slate-700/80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
              <div className="flex-1 relative group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-slate-700/80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className={`relative group transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-slate-700/80"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Phone Field */}
            <div className={`relative group transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-slate-700/80"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Message Field */}
            <div className={`relative group transition-all duration-700 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:bg-slate-700/80 resize-none"
              ></textarea>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-xl font-semibold flex justify-center items-center gap-3 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              style={{ transitionDelay: '900ms' }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Launching...
                </>
              ) : (
                <>
                  Send it to the moon
                  <Rocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={20} />
                </>
              )}
            </button>
          </form>
        </div>


        <div className={`w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0 lg:pl-8 transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
          <div className="relative group">

            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-700"></div>

            <div className="relative bg-black/20 backdrop-blur-sm mx-auto rounded-3xl p-4 border border-white/10">
              <img
                src={images.moon}
                alt="Astronaut on moon"
                className="w-full h-auto  rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Quote overlay with enhanced styling */}
              <div className="absolute w-[32rem] sm:mx-auto bottom-6 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 hidden md:block">
                <div className="flex items-start mb-3">
                  <Moon className="text-yellow-400 mr-2 flex-shrink-0 mt-1" size={20} />
                  <p className="italic text-white leading-relaxed text-[0.9rem]">
                    "Two lunar months revealed Earth's fragile beauty against vast silence, transforming my view of our place in the universe."
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <div className="text-right">
                    <p className="text-blue-300 font-medium text-[0.9rem]">— Irinel Traista</p>
                    <p className="text-gray-400 text-sm">Astronaut & Explorer</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTouchContact;
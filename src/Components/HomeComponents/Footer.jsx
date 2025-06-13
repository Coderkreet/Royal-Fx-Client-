import React from "react";
import { FaFacebookF, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io5";
import logo from "../../assets/app/Hello.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-white relative overflow-hidden" style={{ backgroundColor: "#0B1A2F" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} width={50} alt="Logo" className="w-40 h-auto brightness-110" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering the future of cryptocurrency mining with innovative solutions.
            </p>
            <div className="space-y-3">
              <h3 className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                Connect With Us
              </h3>
              <div className="flex gap-3 flex-wrap">
                {[FaFacebookF, FaInstagram, IoLogoTwitter, IoLogoLinkedin, FaTelegramPlane].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-[#1A2A42] hover:bg-blue-500/20 p-2 rounded-full transition-all duration-300 border border-blue-900/50 hover:border-blue-500/50"
                  >
                    <Icon className="text-blue-400 text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-blue-400 text-base font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/product", label: "Product" },
                { to: "/AdvancedFeatures", label: "Features" },
                { to: "/customers", label: "Customers" },
                { to: "/social", label: "Social Media" },
                { to: "/control", label: "Control Panel" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h3 className="text-blue-400 text-base font-semibold">Frequently Asked</h3>
            <ul className="space-y-2">
              {[
                { to: "/faq/bitcoin", label: "What is Bitcoin?" },
                { to: "/faq/mining", label: "What is Mining?" },
                { to: "/faq/how-it-works", label: "How it works?" },
                { to: "/about", label: "Who we are" },
                { to: "/faq/anonymous-miner", label: "How Anonymous Miner Works" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-blue-400 text-base font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Subscribe to our newsletter for updates.</p>
            <form className="space-y-3 w-full">
  <div className="flex flex-col  gap-3 w-full">
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full sm:w-auto flex-1 px-4 py-2 bg-[#1A2A42] border border-blue-900/50 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-colors duration-300 text-sm"
    />
    <button
      type="submit"
      className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 text-sm"
    >
      Subscribe
    </button>
  </div>
</form>

          </div>
        </div>
      </div>

     
      <div className="border-t border-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
            <p className="text-gray-400 text-xs">
              © 2025 Royal-Fx. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
            {/* <p className="text-gray-400 text-xs">
              Developed by <span className="text-blue-400 font-medium">Nexachain.ai</span>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

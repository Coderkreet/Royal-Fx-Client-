import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../context/Routes";
import { FaUser, FaShieldAlt, FaChartLine, FaRocket, FaLock, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import HeroSection from "../Components/HomeComponents/HeroSection";
import OurTopIntegration from "../Components/HomeComponents/OurTopIntegration";

import ProductSection from "../Components/HomeComponents/ProductSection";
import ServiceSection from "../Components/HomeComponents/ServiceSection";
import FeatureSection from "../Components/HomeComponents/FeatureSection";
import CoinDoxSection from "../Components/HomeComponents/CoinDoxSection";
import How_Earn from "../Components/HomeComponents/How_Earn";
// import QuestionPage from "../Components/HomeComponents/QuestionPage";
// import { StartMining } from "../Components/HomeComponents/StartMining";
// import SuscribeNews from "../Components/HomeComponents/SuscribeNews";
// import GetTouchContact from "../contactComponent/GetTouchContact";
import Whyprestorix from "../Components/HomeComponents/Whyprestorix";
import AboutPretorix from "../Components/HomeComponents/AboutPretorix";
// import AdvancedFeatures from "../AdvanceFeatures";
// import BenefitsSection from "../BenefitsSection";
// import FAQSection from "../Components/HomeComponents/users/FAQSection";
// import NextGenSection from "./NextGenSection ";
// import Testimonials from "../Testimonials";
// import DecentralizedFuture2 from "./DecentralizedFuture2";
import JourneySection from "../Components/HomeComponents/JourneySection/JourneySection";
import CountrySlider from "../Components/HomeComponents/CountrySlider";
import AdvancedFeatures from "../Components/HomeComponents/AdvancedFeatures";
import BenefitsSection from "../Components/HomeComponents/BenefitsSection";
import NextGenSection from "../Components/HomeComponents/NextGenSection ";
import Testimonials from "../Components/HomeComponents/Testimonials";
import DecentralizedFuture2 from "../Components/HomeComponents/DecentralizedFuture2";
import FAQSection from "../Components/HomeComponents/FAQSection";
import CryptoMiningMarketplace from "../Components/HomeComponents/CryptoMiningMarketplace ";
import ZCoinLanding from "../Components/HomeComponents/Whyprestorix";
import ZcoinReferralPlan from "../Components/HomeComponents/ZcoinReferralPlan";
import ZcoinRoadmap from "../Components/HomeComponents/ZcoinRoadmap ";




const Home = () => {
  const features = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Fast Mining",
      description: "Experience lightning-fast mining operations with our optimized platform"
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Your security is our priority with advanced encryption and protection"
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Monitor your mining performance with detailed analytics and insights"
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with miners worldwide through our decentralized network"
    }
  ];

  return (
    <div className="">

<HeroSection />
{/* <CountrySlider/> */}
{/* <Whyprestorix /> */}
<ZCoinLanding/>
{/* <JourneySection/> */}

<div className="w-full text-white ">
  <div>

        <OurTopIntegration />
  </div>
        <div className="p-2 xl:p-5">
          {/* <ProductSection /> */}
          {/* <CryptoMiningMarketplace/> */}
        </div>
     {/* <ServiceSection /> */}
        <FeatureSection />
            {/* <CoinDoxSection /> */}
            <AboutPretorix />
              <How_Earn />
         <AdvancedFeatures />
        {/* <BenefitsSection /> */}
        {/* <NextGenSection /> */}
        <ZcoinRoadmap/>
        <Testimonials />
        <ZcoinReferralPlan/>
       {/* <DecentralizedFuture2 /> */}
        <FAQSection /> 
        {/* <AdvancedFeatures></AdvancedFeatures> */}
      </div>

    </div>
  );
};

export default Home;

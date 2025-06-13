import React from "react";
import arrowImage from "../../assets/product/arrow.png";
import { dealCardData } from "../../utils/constant";
import DealCard from "./DealCard";

const DealOfWeek = () => {
  return (
    <section className="bg-gradient-to-l from-[#0068DA] to-[#00D5E6] rounded-2xl my-10 px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">

      {/* Left: Heading */}
      <div className="w-full lg:w-1/3 text-white text-center lg:text-left flex flex-col justify-center items-center lg:items-start gap-4 px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Deal of the</h1>
        <div className="flex items-center justify-center lg:justify-start gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Week</h1>
          <img 
            src={arrowImage} 
            alt="arrow" 
            className="w-32 lg:w-52 hidden lg:block"
          />
        </div>
      </div>

      {/* Right: Deal Cards */}
      <div className="w-full lg:w-2/3 flex flex-wrap justify-center gap-6 px-2">
        {dealCardData.map((card, index) => (
          <DealCard
            key={index}
            img={card.img}
            power={card.power}
            processor={card.processor}
            price={card.price}
            title={card.title}
          />
        ))}
      </div>
    </section>
  );
};

export default DealOfWeek;

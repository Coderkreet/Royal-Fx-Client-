import React from 'react';
import zicZacImage from '../../assets/product/zic-zack.png';
import { marketPlaceData } from '../../utils/constant';
import MarketPlaceCard from './MarketPlaceCard';

const MarketPlaceSection = () => {
  return (
    <section className="px-4 h-full  sm:px-12 lg:px-32 xl:px-8 py-16 space-y-12 flex flex-col items-center text-center">
      <div className="space-y-4">
        <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-semibold">
          Why Choose Asic Marketplace
        </h1>
        <img
          src={zicZacImage}
          alt="underline"
          className="w-40 sm:w-52 lg:w-60 mx-auto"
        />
      </div>

      <p className="text-lg  sm:text-xl text-gray-300 max-w-3xl">
        Our goal is to provide high quality cryptocurrency miners at the best rate possible to our clients.
      </p>

=      <div className="grid   relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
        {marketPlaceData.map((card, index) => (
          <MarketPlaceCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default MarketPlaceSection;

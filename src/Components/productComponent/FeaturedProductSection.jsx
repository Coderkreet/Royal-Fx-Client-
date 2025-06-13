import React from 'react';
import zicZacImage from '../../assets/product/zic-zack.png';
import FeaturedProductCard from './FeaturedProductCard';
import { featuredProductCardData } from '../../utils/constant';

const FeaturedProductSection = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-32 py-10 space-y-12">
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-semibold">Featured Products</h1>
        <img 
          src={zicZacImage} 
          alt="underline" 
          className="mx-auto w-32 sm:w-40 lg:w-60" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2    lg:grid-cols-3 gap-6">
  {featuredProductCardData.map((card, index) => (
    <FeaturedProductCard
      key={index}
      img={card.img}
      power={card.power}
      processor={card.processor}
      price={card.price}
      title={card.title}
    />
  ))}
</div>

    </div>
  );
};

export default FeaturedProductSection;

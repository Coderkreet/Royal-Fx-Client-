import React from 'react';
import zicZacImage from '../../assets/product/zic-zack.png';
import { bestSellerCardData } from '../../utils/constant';
import BestSellerCard from './BestSellerCard'; 

const BestSellerSection = () => {
    return (
        <section className="py-16 px-4 sm:px-8 space-y-12">
            {/* Heading */}
            <div className="text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-bold text-gray-800">
                    Best Seller Brands
                </h1>
                <img 
                    src={zicZacImage} 
                    alt="underline" 
                    className="w-32 sm:w-40 lg:w-60"
                />
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-items-center">
                {bestSellerCardData.map((card, index) => (
                    <BestSellerCard
                        key={index}
                        title={card.title}
                        image={card.image}
                    />
                ))}
            </div>
        </section>
    );
};

export default BestSellerSection;

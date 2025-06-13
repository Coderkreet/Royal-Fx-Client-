import React from 'react';
import { serviceCardData } from '../../utils/constant';
import ServiceCard from './ServiceCard';

const ServiceSection = () => {
    return (
        <div className="text-white bg-black/90 sm:!py-[7rem] !py-[4rem] px-4 sm:px-6 md:px-8 !space-y-16">
            {/* Heading */}
            <div className="flex items-center justify-between">
                <div className="border-l-4 border-[#2eb4e0] !pl-[2rem] text-md">
                    <h1 className="!text-[3rem] md:!text-[6rem] !font-bold text-color">Service</h1>
                </div>
            </div>

            {/* Responsive Grid */}
            <div className="w-full py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-between gap-10">
                {serviceCardData.map((card, index) => (
                    <ServiceCard key={index} img={card.img} title={card.title} />
                ))}
            </div>
        </div>
    );
};

export default ServiceSection;

import React from 'react';
import coinDox from '../../assets/home/coindox.png';

const CoinDoxSection = () => {
    return (
        <div className="text-black py-5 btn-color flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row gap-10 md:gap-30 px-0 md:px-20 items-center">
                {/* Image */}
                <div className="w-full md:w-[40%]">
                    <img src={coinDox} alt="coindox" className="w-full h-auto" />
                </div>

                {/* Text Content */}
                <div className="w-full !space-y-10 py-6 md:py-10 text-center md:text-left">
                    <div className="!text-start font-semibold space-y-1">
                        <h2 className='md:!text-[3.5rem] !text-[2.2rem]'>About Coindox - We Translate Your</h2>
                        <h2 className='md:!text-[3.5rem] !text-[2.2rem]'>Dream Into Reality</h2>
                    </div>
                    <div className="w-full md:w-[70%] !space-y-7">
                        <p className='md:!text-[1.7rem] !text-[1.5rem] !text-start !font-light'>
                            Welcome to Coindox Bitcoin Mining, where your dreams of entering
                            the world of cryptocurrency mining transform into tangible
                            reality. Our mission is simple yet powerful: to provide you with
                            the tools, expertise,
                        </p>
                        <p className='md:!text-[1.7rem] !text-[1.5rem] !text-start !font-light'>
                            Support needed to navigate the intricate world of Bitcoin mining
                            and turn your aspirations into profitable outcomes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinDoxSection;

import React from "react";
import bg1 from "../assets/bg1.png";
import { SlArrowRight } from "react-icons/sl";

export const StartMining = () => {
  return (
    <div className="text-white !py-[4rem] md:!py-[7rem] px-4">
      <div
        className="h-[60vh] bg-center bg-no-repeat bg-cover mx-auto flex items-center justify-center px-4"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="flex flex-col items-center justify-center bg-opacity-50 p-4 sm:p-6 rounded-lg w-full text-center !space-y-10">
          <h1 className="!text-[3rem] sm:text-4xl md:!text-[7rem] lg:text-6xl font-semibold">
            Ready To Start Your Mining
          </h1>
          <span className="text-sm sm:text-base text-[2rem]">
            Just create an account on our site and start your first mining.
          </span>
          <div className="flex items-center justify-center bg-white !text-[1.5rem] font-bold sm:!px-[4rem]">
            <button className="w-full px-4 py-3 sm:py-4 flex items-center justify-between text-black bg-white text-base sm:text-lg ">
            Start Mining Now
          </button>
           <SlArrowRight className="!text-[1.5rem] text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

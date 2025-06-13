import React from "react";
import { SlArrowRight } from "react-icons/sl";

const SubscribeNews = () => {
  return (
    <div className=" text-white md:!py-[7rem] px-4 !space-y-[3rem]">
      <div className="text-3xl sm:text-4xl  text-color">
        <h1 className="tracking-tight leading-tight !text-[3.5rem] md:!text-[8rem]">
          Join our mailing list to get the latest updates &{" "}<br/>
          <span className="font-semibold">announcements</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-10 w-full">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Email@gmail.com"
          className="w-full sm:w-[70%] !text-[1.5rem] font-light py-4 px-3 bg-gray-600 rounded text-white lg:!text-[3rem]"
        />

        {/* Button */}
        <button className="w-full sm:w-[30%] !px-[7rem] md:!px-[5rem] py-4 flex items-center justify-between  btn-color !text-[1.5rem] lg:!text-[3rem] font-bold rounded flex-1 ">
          Start Mining Now <SlArrowRight />
        </button>
      </div>
    </div>
  );
};

export default SubscribeNews;

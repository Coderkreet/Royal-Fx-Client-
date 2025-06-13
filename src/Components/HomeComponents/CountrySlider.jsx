import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const countryData = [
  { name: "United States", flag: "🇺🇸", amount: "$43,335" },
  { name: "Netherlands", flag: "🇳🇱", amount: "$41,678" },
  { name: "Lithuania", flag: "🇱🇹", amount: "$41,106" },
  { name: "Germany", flag: "🇩🇪", amount: "$140,354" },
  { name: "Thailand", flag: "🇹🇭", amount: "$50,197" },
  { name: "Japan", flag: "🇯🇵", amount: "$66,212" },
  { name: "Canada", flag: "🇨🇦", amount: "$71,500" },
];

export default function CountrySlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.5}
        spaceBetween={16}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
        className="px-4"
      >
        {countryData.map((country, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#dfe0f442] mt-4 border relative border-white/30 text-white rounded-xl px-4 py-5 h-full w-full">
              <div className="flex items-center   w-[13rem] h-[2rem] gap-2 p-4 text-2xl mb-3">
                <span className="text-lg">{country.flag}</span>
                <span>{country.name}</span>
              </div>
              <div className="text-2xl p-4 font-bold">{country.amount}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

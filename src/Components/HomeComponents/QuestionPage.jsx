import React from 'react'
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from '../utils/constant';

export default function QuestionPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <div className=" text-white py-10 px-4 !w-full">
    <div className="mt-19 p-4 ">
      <h2 className="!text-[3rem] md:!text-[6rem] border-l-4 border-[#34c9fb] !pl-[2rem] !font-bold !mb-[4rem]  text-color">Questions</h2>
      <div className="!space-y-5">
        {faqs.map((item, index) => (
          <div
            key={index}
            className=" overflow-hidden hover:border-[rgb(68,111,120)] hover:bg-[#1b7a99] transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center !w-full px-4 py-3 text-left font-medium  transition"
            >
              <span className='text-2xl md:text-[3.5rem] mt-6'>{item.question}</span>
              <ChevronDown
                className={`md:!w-[5rem] md:!h-[5rem] transform  transition-transform btn-color duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 md:!text-[2.5rem] !font-light text-white ">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
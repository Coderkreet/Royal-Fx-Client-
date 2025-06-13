import React from "react";
import icon2 from "../../assets/website/img7.png";
import icon1 from "../../assets/website/img6.png";
import icon3 from "../../assets/website/img8.png";

const cardData = [
  {
    img: icon1,
    title: "Decentralized Future",
    desc: "Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci. At feugiat duis parturient amet scelerisque enim vulputate tortor.",
  },
  {
    img: icon2,
    title: "Decentralized Future",
    desc: "Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci. At feugiat duis parturient amet scelerisque enim vulputate tortor.",
  },
  {
    img: icon3,
    title: "Decentralized Future",
    desc: "Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci. At feugiat duis parturient amet scelerisque enim vulputate tortor.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="!bg-[#151515] !mb-10 text-white px-6 md:px-12 lg:px-24 py-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h6 className="!text-5xl !text-blue-400 text-font-semibold  bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
          BENEFITS
        </h6>
        <h2 className="text-3xl md:text-4xl font-bold !mt-7">
          Web3 revolution with Next3Gen
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto !mt-7 !text-xl md:!text-2xl  leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Diam et quis sit pretium orci.
          At feugiat duis parturient amet scelerisque enim vulputate tortor.
        </p>
      </div>

      {/* Cards */}
      <div className="flex  !mb-10 flex-col md:flex-row gap-8 justify-center items-stretch !mt-7">
        {cardData.map((card, index) => (
          <div
            key={index}
            className=" border border-[#2A2A2A] rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={card.img}
              alt={`icon-${index}`}
              className={`object-contain ${
                index === 2 ? "!w-[35rem]" : "!w-[39rem]"
              } mx-auto mb-6`}
            />
            <h3 className="text-md font-semibold !mt-4 text-white">
              {card.title}
            </h3>
            <p className="!text-2xl text-gray-400 !mt-3">
              {card.desc}
            </p>
            <a
              href="#"
              className="!mt-6 inline-flex items-center text-white font-semibold !text-2xl hover:underline"
            >
              Learn More <span className="ml-2 text-lg">&gt;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
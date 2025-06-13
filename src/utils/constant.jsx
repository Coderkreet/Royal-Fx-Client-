import payout from "../assets/home/payout.png";
import integration from "../assets/home/integration.png";
import security from "../assets/home/security.png";
import cryptocurrency from "../assets/home/cryptocurrency.png";
import protection from "../assets/home/protection.png";
import support from "../assets/home/support.png";
import {
  FaHome,
  FaMicroblog,
  FaProductHunt,
  FaSuperpowers,
} from "react-icons/fa";
import { BiSolidContact, BiSupport } from "react-icons/bi";
import img1 from "../assets/home/img1.png";
import img2 from "../assets/home/img2.png";
import img3 from "../assets/home/img3.png";
import cpu from "../assets/product/cpu.png";
import gpu from "../assets/product/gpu.png";
import antminer from "../assets/product/antminer.png";
import antminer2 from "../assets/product/antminer2.png";
import goldshell from "../assets/product/goldshell.png";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbTaxEuro, TbTruckDelivery } from "react-icons/tb";
import hand from "../assets/home/hand1.png"
import thumb from "../assets/home/thumps2.png"
import reward from "../assets/home/reward.png"
import dollar from "../assets/home/dollar.png"
export const sidebarData = [
  { icon: <FaHome />, title: "Home", link: "/" },
  { icon: <FaProductHunt />, title: "Products", link: "/product" },
  { icon: <FaMicroblog />, title: "Blog", link: "/blog" },
  { icon: <BiSolidContact />, title: "Contact", link: "/contact" },
];

export const productCardData = [
  { contract: "919", crypto: "Bitcoin", expiry: "01 Year", price: "$4.20" },
  { contract: "149", crypto: "Ethereum", expiry: "01 Year", price: "$4.20" },
  { contract: "A40", crypto: "Litecoin", expiry: "01 Year", price: "$4.20" },
];

export const serviceCardData = [
  { img: payout, title: "Instant Payout" },
  { img: integration, title: "Internal Integration" },
  { img: security, title: "Granted Security" },
  { img: cryptocurrency, title: "Multiple Cryptocurrencies" },
  { img: protection, title: "Data Protection" },
  { img: support, title: "Expert Support Team" },
];

export const preStorixCardData = [
  {
    img: hand,
    title: "Zero Reward Denials.",
    desc: "Trade with a peace of mind and get more ",
  },
  {
    img: thumb,
    title: "Your Favorite Platforms.",
    desc: "MetaTrader 5, Match‑Trader and cTrader.",
  },
  {
    img: reward,
    title: "Flexible Reward Cycles.",
    desc: "The choice is yours: weekly or monthly.",
  },
  {
    img: dollar,
    title: "We Grow Together.",
    desc: "Trade up to $300.000 in simulated capital.",
  },
];

export const featuresCardData = [
  {
    title: "Start build you",
    subTitle: "Career",
    pointOne:
      "As the world of cryptocurrencies continues to evolve, Bitcoin mining offers a unique opportunity to be part of the blockchain revolution while potentially reaping substantial",
    pointTwo:
      "Cloud mining is the easiest and most efficient way to earn money from cryptocurrency",
  },
  {
    title: "Best cloud mining ",
    subTitle: "service with",
    pointOne:
      "In the rapidly evolving landscape of cryptocurrency, cloud mining has emerged as an enticing solution for individuals seeking to participate in hardware setup and maintenance.",
    pointTwo:
      "Among the various options available, one service stands out as a leader in the realm of cloud mining.",
  },
  {
    title: "Receive daily your",
    subTitle: " mind bitcoins",
    pointOne:
      "Imagine waking up every day to a stream of Bitcoin rewards flowing directly into your digital wallet. With our advanced cloud mining service, you can turn this reality.",
    pointTwo:
      "We’re excited to introduce a seamless and secure way for you to daily Bitcoin mining rewards",
  },
];

export const earnCardData = [
  { img: img1, title: "Gamming PC", price: "$99/ $79.00" },
  { img: img2, title: "Mining RIG", price: "$299/ $189.00" },
  { img: img3, title: "Mining Farm", price: "$299/ $199.00" },
];

export const faqs = [
  {
    question: "How does it work?",
    answer:
      "Bitcoin mining is the process by which new bitcoins are created and added to the circulating supply. It also serves as the mechanism through which transactions are",
  },
  {
    question: "How to withdraw my income?",
    answer:
      "Tailwind CSS is a utility-first CSS framework for rapid UI development.",
  },
  {
    question: "Do I need to purchase equipment?",
    answer: "You can use the useState hook to manage component state in React.",
  },
  {
    question: "Can I open multiple accounts in your program?",
    answer: "You can use the useState hook to manage component state in React.",
  },
  {
    question: "Do you charge withdrawal fees?",
    answer: "You can use the useState hook to manage component state in React.",
  },
  {
    question: "How does the affiliate program work?",
    answer: "You can use the useState hook to manage component state in React.",
  },
];

// productData

export const dealCardData = [
  {
    img: cpu,
    power: "500 W",
    processor: "300 MH/s",
    title: "Iceriver AE1 Lite Aleo Miner (300Mh)",
    price: "US$3,149.00",
  },
  {
    img: gpu,
    power: "72 W",
    processor: "4.8T H/s",
    title: "NerdMiner NerdQaxe++ Bitcoin Miner",
    price: "US$520.00",
  },
  {
    img: cpu,
    power: "500 W",
    processor: "300 MH/s",
    title: "Iceriver AE1 Lite Aleo Miner (300Mh)",
    price: "US$3,149.00",
  },
];

export const featuredProductCardData = [
  {
    img: cpu,
    power: "500 W",
    processor: "300 MH/s",
    title: "Iceriver AE1 Lite Aleo Miner (300Mh)",
    price: "US$3,149.00",
  },
  {
    img: gpu,
    power: "72 W",
    processor: "4.8T H/s",
    title: "NerdMiner NerdQaxe++ Bitcoin Miner",
    price: "US$520.00",
  },
  {
    img: antminer,
    power: "500 W",
    processor: "300 MH/s",
    title: "Bitmain Antminer KS7 Kaspa Miner",
    price: "US$3,149.00",
  },
  {
    img: goldshell,
    power: "72 W",
    processor: "4.8T H/s",
    title: "Goldshell Byte Aleo Miner & Dogecoin Miner",
    price: "US$520.00",
  },
  {
    img: cpu,
    power: "500 W",
    processor: "300 MH/s",
    title: "Iceriver AE1 Lite Aleo Miner (300Mh)",
    price: "US$3,149.00",
  },
  {
    img: gpu,
    power: "72 W",
    processor: "4.8T H/s",
    title: "NerdMiner NerdQaxe++ Bitcoin Miner",
    price: "US$520.00",
  },
  {
    img: antminer,
    power: "500 W",
    processor: "300 MH/s",
    title: "Bitmain Antminer KS7 Kaspa Miner",
    price: "US$3,149.00",
  },
  {
    img: goldshell,
    power: "72 W",
    processor: "4.8T H/s",
    title: "Goldshell Byte Aleo Miner & Dogecoin Miner",
    price: "US$520.00",
  },
];

export const popularBrands = [
  "Bitmain",
  "Iceriver",
  "Fluminer",
  "Goldshell",
  "Canaan Avalon",
  "NerdMiner",
  "VolcMiner",
  "Bitaxe",
  "ElphaPex",
  "Jasminer",
  "Lucky Miner",
];

export const popularProducts = [
  {
    id: 1,
    brand: "Bitmain",
    title: "Data Processor Unit",
    price: 520,
    img: antminer, // use your image paths
    soldOut: true,
  },
  {
    id: 2,
    brand: "Bitmain",
    title: "Antminer KS7 Kaspa Miner",
    price: 520,
    img: goldshell,
    soldOut: true,
  },
  {
    id: 3,
    brand: "Bitmain",
    title: "Antminer S21e Hydro Bitcoin Miner",
    price: 520,
    img: antminer2,
    soldOut: true,
  },
  // Add more products
];

export const marketPlaceData = [
  {
    icon: <BiSupport />,
    title: "24/7 Support",
    description: "When You're online. No matter the time, We're there for you.",
  },
  {
    icon: <RiSecurePaymentFill />,
    title: "Payments",
    description:
      "Pay with Peace of mind - Secure System With Bank (TT) And Crypto Payment Gateway",
  },
  {
    icon: <FaSuperpowers />,
    title: "PSU",
    description: "A Miner That Comes With Free Power Supply Unit",
  },
  {
    icon: <TbTruckDelivery />,
    title: "Delivery",
    description:
      "Ship with Smooth and Speedy Process from our Warehouse to Your Doorstep",
  },
  {
    icon: <TbTaxEuro />,
    title: "Import Tax & Duty",
    description:
      "Get a Low-Value Declaration with us to Save Tax or DDP Service",
  },
];

import dragonball from "../assets/product/dragonball.png";
import elpha from "../assets/product/elpha.png";
import fluminer from "../assets/product/fluminer.png";
import gold from "../assets/product/gold.png";
import ibelink from "../assets/product/ibelink.png";
import iceriver from "../assets/product/iceriver.png";
import innosilicon from "../assets/product/innosilicon.png";
import ipollo from "../assets/product/ipollo.png";

export const bestSellerCardData = [
  {
    title: "DragonBall",
    image: dragonball,
  },
  {
    title: "ElphaPex",
    image: elpha,
  },
  {
    title: "Fluminer",
    image: fluminer,
  },
  {
    title: "Goldshell",
    image: gold,
  },
  {
    title: "Ibelink",
    image: ibelink,
  },
  {
    title: "Iceriver",
    image: iceriver,
  },
  {
    title: "Innosilicon",
    image: innosilicon,
  },
  {
    title: "Ipallo",
    image: ipollo,
  },
];

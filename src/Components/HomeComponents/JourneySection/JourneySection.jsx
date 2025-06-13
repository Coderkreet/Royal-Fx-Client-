import React, { useState } from "react";

const TABS = ["Zero", "1 step", "2 step"];
const AMOUNTS = ["$5K", "$10K", "$25K", "$50K",];

const CONFIGURATIONS = [
  {
    plans: ["FundingPips", "FundingPips Pro"],
    data: {
      Zero: {
        cards: [
          {
            title: "Master",
            highlight: true,
            items: {
              FundingPips: [
                { label: "Maximum Daily Loss", value: "5%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "10%", tooltip: "The total loss limit across all trading days." },
                { label: "Rewards & Split", value: "Weekly 85%", tooltip: "Weekly payout with 85% profit split." },
              ],
              "FundingPips Pro": [
                { label: "Maximum Daily Loss", value: "6%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "12%", tooltip: "The total loss limit across all trading days." },
                { label: "Rewards & Split", value: "Weekly 90%", tooltip: "Weekly payout with 90% profit split." },
              ],
            },
          },
        ],
        leverage: {
          FundingPips: "1:50",
          "FundingPips Pro": "1:60",
        },
      },
      "1 step": {
        cards: [
          {
            title: "Student",
            items: {
              FundingPips: [
                { label: "Minimum Trading Days", value: "1 day", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "3%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "6%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$6,000 (6%)", baseAmount: 6000, tooltip: "Target profit to achieve (6% of account)." },
              ],
              "FundingPips Pro": [
                { label: "Minimum Trading Days", value: "2 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "4%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "7%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$7,000 (7%)", baseAmount: 7000, tooltip: "Target profit to achieve (7% of account)." },
              ],
            },
          },
          {
            title: "Practitioner",
            items: {
              FundingPips: [
                { label: "Minimum Trading Days", value: "1 day", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "3%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "6%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$6,000 (6%)", baseAmount: 6000, tooltip: "Target profit to achieve (6% of account)." },
              ],
              "FundingPips Pro": [
                { label: "Minimum Trading Days", value: "2 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "4%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "7%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$7,000 (7%)", baseAmount: 7000, tooltip: "Target profit to achieve (7% of account)." },
              ],
            },
          },
        ],
        leverage: {
          FundingPips: "1:100",
          "FundingPips Pro": "1:120",
        },
      },
      "2 step": {
        cards: [
          {
            title: "Student",
            items: {
              FundingPips: [
                { label: "Minimum Trading Days", value: "3 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "5%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "10%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$8,000 (8%)", baseAmount: 8000, tooltip: "Target profit to achieve (8% of account)." },
              ],
              "FundingPips Pro": [
                { label: "Minimum Trading Days", value: "4 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "6%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "11%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$9,000 (9%)", baseAmount: 9000, tooltip: "Target profit to achieve (9% of account)." },
              ],
            },
          },
          {
            title: "Practitioner",
            items: {
              FundingPips: [
                { label: "Minimum Trading Days", value: "3 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "5%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "10%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$5,000 (5%)", baseAmount: 5000, tooltip: "Target profit to achieve (5% of account)." },
              ],
              "FundingPips Pro": [
                { label: "Minimum Trading Days", value: "4 days", tooltip: "Minimum days required to trade." },
                { label: "Maximum Daily Loss", value: "6%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "11%", tooltip: "The total loss limit across all trading days." },
                { label: "Profit Target", value: "$6,000 (6%)", baseAmount: 6000, tooltip: "Target profit to achieve (6% of account)." },
              ],
            },
          },
          {
            title: "Master",
            highlight: true,
            items: {
              FundingPips: [
                { label: "Maximum Daily Loss", value: "5%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "10%", tooltip: "The total loss limit across all trading days." },
              ],
              "FundingPips Pro": [
                { label: "Maximum Daily Loss", value: "6%", tooltip: "The maximum loss allowed in a single trading day." },
                { label: "Maximum Loss", value: "12%", tooltip: "The total loss limit across all trading days." },
              ],
            },
          },
        ],
        leverage: {
          FundingPips: "1:30",
          "FundingPips Pro": "1:40",
        },
      },
    },
  },
];

const EvaluationCard = ({ title, items, highlight }) => (
  <div
    className={`rounded-2xl p-8 w-full md:w-[350px] p-5 text-left transition-all duration-300 ${
      highlight
        ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30"
        : "bg-[#1c1c4d] text-white"
    }`}
  >
    <h4 className="text-4xl text-gray-300 mb-3">Evaluation Stage</h4>
    <h2 className="text-7xl font-semibold mb-6 cursor-pointer">{title}</h2>
    <ul className="space-y-4 ">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="flex justify-between p-3 items-center text-4xl text-white relative group"
        >
          <span className="text-gray-300 cursor-pointer relative">
            {item.label}
            {item.tooltip && (
              <div className="absolute left-0 top-full mt-3 hidden group-hover:block bg-blue-400 text-white text-2xl rounded-lg p-4 w-72 z-10 shadow-lg">
                {item.tooltip}
              </div>
            )}
          </span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function JourneySection() {
  const [configIndex, setConfigIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("2 step");
  const [activePlan, setActivePlan] = useState(CONFIGURATIONS[0].plans[0]);
  const [activeAmount, setActiveAmount] = useState("$100K");

  const { plans, data } = CONFIGURATIONS[configIndex];

  const getScalingFactor = (amount) => {
    const amountValues = {
      "$5K": 0.05,
      "$10K": 0.1,
      "$25K": 0.25,
      "$50K": 0.5,
      "$100K": 1,
    };
    return amountValues[amount] || 1;
  };

  const formatProfitTarget = (baseAmount, scalingFactor, percentage) => {
    const scaledAmount = Math.round(baseAmount * scalingFactor);
    return `$${scaledAmount.toLocaleString()} (${percentage})`;
  };

  const getCardsToShow = () => {
    const tabData = data[activeTab] || { cards: [], leverage: {} };
    const leverageValue = tabData.leverage?.[activePlan] || "N/A";
    const scalingFactor = getScalingFactor(activeAmount);

    return tabData.cards.map((card) => {
      const planItems = card.items[activePlan] || card.items.FundingPips || [];
      const adjustedItems = planItems.map((item) => {
        if (item.label === "Profit Target" && item.baseAmount) {
          const percentage = item.value.match(/\((\d+%)\)/)?.[1] || "";
          return {
            ...item,
            value: formatProfitTarget(item.baseAmount, scalingFactor, percentage),
          };
        }
        return item;
      });

      return {
        ...card,
        items: [
          ...adjustedItems.filter((item) => item.label !== "Leverage"),
          { label: "Leverage", value: leverageValue, tooltip: "The leverage ratio for trading." },
        ],
      };
    });
  };

  return (
    <div className="bg-[#0d0d2b] mb-5  text-white py-16 px-6 md:px-16 text-4xl">
      <div className="text-center flex flex-col gap-4 mb-16">
        <h1 className="!text-7xl font-bold mb-6 leading-snug mt-5">
          Buckle Up, Your Journey <br /> Starts Here!
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-2xl">
          We evaluate according to objectives that best fit your style. From
          beginners to experts, traders from 195+ countries trust our platform.
        </p>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-6 my-8 p-3 mt-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg border border-2 p-4 mt-4 text-4xl font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-[#1c1c4d] text-gray-300 hover:bg-[#2a2a6a]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PLAN */}
      <div className="flex flex-wrap justify-center gap-6 p-3 my-6 mt-4">
        {plans.map((plan) => (
          <button
            key={plan}
            onClick={() => setActivePlan(plan)}
            className={`px-6 py-3 rounded-full p-4 text-4xl font-medium transition-all duration-300 ${
              activePlan === plan
                ? "bg-blue-500 text-white shadow-md shadow-blue-400/40"
                : "bg-[#2a2a6a] text-gray-300 hover:bg-[#3a3a7a]"
            }`}
          >
            {plan}
          </button>
        ))}
      </div>

      {/* AMOUNT */}
    <div className="flex flex-wrap justify-center gap-6 p-3 my-6 mt-4">
  {AMOUNTS.map((amount) => (
    <button
      key={amount}
      onClick={() => setActiveAmount(amount)}
      className={`px-6 p-4 mb-2 py-3 rounded-md text-4xl border border-2  font-medium transition-all duration-300 ${
        activeAmount === amount
          ? "bg-blue-600 text-white shadow  shadow-blue-500/30"
          : "bg-[#1f1f50] text-gray-300 hover:bg-[#33336d]"
      }`}
      data-order={amount}
    >
      {amount}
    </button>
  ))}
</div>  

      {/* CARDS */}
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {getCardsToShow().map((card, idx) => (
          <EvaluationCard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Plus, Minus, Mail } from "lucide-react";

const faqs = [
  {
    question: "What is Royal-Fx?",
    answer: "Royal-Fx is a digital investment token powered by the CryptoZ Investment Plan, offering fixed monthly returns, secure blockchain-backed transactions, and multiple earning opportunities.",
  },
  {
    question: "How do I start investing in Royal-Fx?",
    answer: "Simply register on the platform, choose an investment plan (Starter to Platinum), deposit the required Royal-Fx amount, and your plan will activate immediately.",
  },
  {
    question: "What is the minimum amount required to invest?",
    answer: "You can start investing with as little as 100 Royal-Fx under the Starter Plan, making it accessible for beginners.",
  },
  {
    question: "How much return will I earn?",
    answer: "Each plan offers a fixed Monthly ROI ranging from 6% to 10%, depending on the plan you choose. Returns are credited monthly until the lock-in period ends.",
  },
  {
    question: "What is the lock-in period?",
    answer: "Every investment plan has a predefined lock-in period ranging from 6 to 15 months, during which your funds remain secured and generate steady ROI.",
  },
  {
    question: "Can I withdraw my funds before the lock-in period ends?",
    answer: "No, early withdrawal is not allowed to maintain system stability. However, you can withdraw your full capital + returns after the lock-in period is over.",
  },
  {
    question: "How is my investment secured?",
    answer: "Royal-Fx uses advanced blockchain encryption, decentralized smart contracts, and secure wallet integrations to protect your funds and data.",
  },
  {
    question: "Is Royal-Fx suitable for beginners?",
    answer: "Absolutely! Royal-Fx is designed with a user-friendly interface and flexible entry points, making it ideal for both beginners and seasoned crypto investors.",
  },
  {
    question: "Are there any hidden charges or fees?",
    answer: "No hidden charges. All fees and returns are transparently displayed. You only pay the gas/transaction fees based on your wallet or exchange provider.",
  },
  {
    question: "How do I track my investment?",
    answer: "You can view your ROI, plan duration, earnings history, and upcoming withdrawals through the real-time dashboard available on the platform.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleContactSupport = () => {
    const email = "zcoinworld7@gmail.com"; // Replace with your actual support email
    const subject = "Royal-Fx Support Request";
    const body = "Hello Support Team,\n\nI need assistance with:";
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="bg-gray-900 z-50 text-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Support
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our platform, features, and services. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 hover:border-blue-500/50 ${
                openIndex === index ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' : ''
              }`}
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer group"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors duration-200 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-400 transition-transform duration-200" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                  )}
                </div>
              </div>
              
              {/* Animated Answer */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Our support team is here to help you with any additional questions you might have.
            </p>
            <button 
              onClick={handleContactSupport}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2 mx-auto group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
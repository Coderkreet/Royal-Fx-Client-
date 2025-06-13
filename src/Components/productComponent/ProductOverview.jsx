import React from 'react'

const ProductOverview = () => {
  const overviewData = [
    {
      value: "12800",
      desc: "Cloud Mining Sold"
    },
    {
      value: "4300",
      desc: "Happy Customers around the World"
    },
    {
      value: "80",
      desc: "Countries delivered to"
    },
  ]

  return (
    <div className="px-6 sm:px-10 lg:px-16 py-8 lg:py-16 mt-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-6 lg:gap-12">
        {overviewData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl p-6 rounded-xl bg-white dark:bg-gray-700"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {data.value}
              <span className="text-indigo-400 dark:text-indigo-300">+</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-medium max-w-[180px] sm:max-w-[250px] lg:max-w-[240px]">
              {data.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductOverview
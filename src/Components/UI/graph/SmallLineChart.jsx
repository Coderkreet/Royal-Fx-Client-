/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

const SmallLineChart = ({ data, percentage }) => {
  const hours = data.map((item) => item.hour);
  const percentages = data.map((item) => item.percentage);

  const lineColor = percentage > 0 ? "#4CAF50" : "#FF5722";

  const options = {
    chart: {
      type: "area",
      height: 50,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    fill: {
      opacity: 0,
    },
    yaxis: {
      labels: {
        show: false,
      },
      forceNiceScale: true,
    },
    xaxis: {
      categories: hours,
      labels: {
        show: false,
      },
    },
    colors: [lineColor],
    title: {
      show: false,
    },
    tooltip: {
      enabled: false,
      x: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 40,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 30,
            width: 80,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Market Fluctuation",
      data: percentages,
    },
  ];

  return (
    <div className="SmallLineChart">
      <ReactApexChart
        options={options}
        series={series}
        type="area" 
        height={50}
      />
    </div>
  );
};

export default SmallLineChart;

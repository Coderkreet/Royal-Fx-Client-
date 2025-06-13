import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

function MarketCandleChart({ candleData = [] }) {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "candlestick",
        background: "transparent",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          },
          theme: 'dark'
        },
        animations: {
          enabled: true,
        },
        foreColor: '#9CA3AF' // Gray-400 for text
      },
      theme: {
        mode: 'dark'
      },
      grid: {
        show: true,
        borderColor: '#374151', // Gray-700
        strokeDashArray: 1,
        position: 'back',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        row: {
          colors: undefined,
          opacity: 0.1
        },
        column: {
          colors: undefined,
          opacity: 0.1
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#10B981', // Green-500
            downward: '#EF4444' // Red-500
          },
          wick: {
            useFillColor: true
          }
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        },
        custom: function({ seriesIndex, dataPointIndex, w }) {
          const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          const [open, high, low, close] = data.y;
          const change = close - open;
          const changePercent = ((change / open) * 100).toFixed(2);
          const isPositive = change >= 0;
          
          return `
            <div class="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
              <div class="text-white font-semibold mb-2">${dayjs(data.x).format("MMM DD, YYYY HH:mm")}</div>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-400">Open:</span>
                  <span class="text-white">$${open.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">High:</span>
                  <span class="text-green-400">$${high.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Low:</span>
                  <span class="text-red-400">$${low.toFixed(2)}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-400">Close:</span>
                  <span class="text-white">$${close.toFixed(2)}</span>
                </div>
                <hr class="border-gray-700 my-2">
                <div class="flex justify-between">
                  <span class="text-gray-400">Change:</span>
                  <span class="${isPositive ? 'text-green-400' : 'text-red-400'}">
                    ${isPositive ? '+' : ''}$${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent}%)
                  </span>
                </div>
              </div>
            </div>
          `;
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          formatter: function (val) {
            return dayjs(val).format("MMM DD HH:mm");
          },
          rotate: -45,
          rotateAlways: false
        },
        axisBorder: {
          show: true,
          color: '#4B5563', // Gray-600
          height: 1
        },
        axisTicks: {
          show: true,
          color: '#4B5563',
          height: 6
        }
      },
      yaxis: {
        opposite: true,
        labels: {
          show: true,
          style: {
            colors: '#9CA3AF',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          formatter: function (val) {
            return '$' + val.toFixed(2);
          }
        },
        axisBorder: {
          show: true,
          color: '#4B5563'
        },
        axisTicks: {
          show: true,
          color: '#4B5563'
        },
        tooltip: {
          enabled: true
        }
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: false
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 250
            },
            xaxis: {
              labels: {
                rotate: -90
              }
            }
          }
        }
      ]
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (candleData.length) {
      setChartState((prev) => ({
        ...prev,
        series: [{ 
          name: 'Price',
          data: candleData 
        }]
      }));
    }
  }, [candleData]);

  // Loading state
  if (!candleData || candleData.length === 0) {
    return (
      <div className="w-full h-[350px] bg-gray-800/30 rounded-lg flex items-center justify-center border border-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-gray-400 text-sm">Loading chart data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900/20 rounded-lg border border-gray-800 p-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-semibold text-lg">Price Chart</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-xs text-gray-400">Bull</span>
            <div className="w-3 h-3 bg-red-500 rounded-sm ml-2"></div>
            <span className="text-xs text-gray-400">Bear</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="candlestick"
          height={350}
        />
      </div>

      {/* Chart Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div className="text-xs text-gray-400">
          Showing {candleData.length} data points
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Interval: 15m</span>
          <span>•</span>
          <span>Last updated: {dayjs().format("HH:mm:ss")}</span>
        </div>
      </div>
    </div>
  );
}

export default MarketCandleChart;
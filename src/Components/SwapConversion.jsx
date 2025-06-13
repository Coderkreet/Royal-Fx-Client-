/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { SastaButton } from "../UI/Buttons";
import ShowTokenModal from "../Components/UI/ShowTokenModal";
import {
  calculateTokenInUsdtAmount,
  fetchTokenDetails,
  tokenOptionsWithIcon,
} from "../utils/tokenOptions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { getUserSwapingData, postswapConvertData } from "../api/token-api";
import Swal from "sweetalert2";
import ConversionDetail from "./ConversionDetail";
import { NumberFormatCommas } from "../utils/FormatText";
import { getNebuluxData } from "../api/user-api";
import zCoin from "../assets/icons/zCoin.png"; // Assuming you have a Z-Coin image in your assets

const SwapConversion = ({ swapHandler }) => {
  const dispatch = useDispatch();
  const [showTokens, setShowTokens] = useState(false);
  const [showConversionDetail, setShowConversionDetail] = useState({
    show: false,
    data: null,
  });
  const [userSwapingData, setuserSwapingData] = useState(null);
  const [selectedToken, setSelectedToken] = useState(tokenOptionsWithIcon?.[0]);
  const [tokenDetails, setTokenDetails] = useState({
    name: "Tether USDT",
    symbol: "USDT",
    price: 1,
    // image: zCoin, // Default image for Z-Coin
  });
  const [swapPayload, setSwapPayload] = useState({
    fromValue: 0,
    toValue: 0,
  });

  const [nebuluxData, setNebuluxData] = useState(null);

  const fetchZCoinData = async () => {
    try {
      const response = await getNebuluxData();
      setNebuluxData(response?.data);
    } catch (error) {
      console.error("Error fetching Z-Coin data:", error);
      toast.error("Failed to fetch Z-Coin data.");
    }
  };

  useEffect(() => {
    fetchZCoinData();
  }, []);

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     const data = await fetchTokenDetails(selectedToken);
  //     setTokenDetails(data);
  //   };

  //   if (selectedToken) {
  //     fetchDetails();
  //     const interval = setInterval(() => {
  //       fetchDetails();
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [selectedToken]);

  useEffect(() => {
    if (swapPayload?.fromValue > 0) {
      const calculateAmount = async () => {
        const swapAmt = await calculateTokenInUsdtAmount(
          tokenDetails?.price,
          swapPayload?.fromValue,
          tokenDetails?.name
        );
        if (swapAmt !== null) {
          setSwapPayload((prevState) => ({
            ...prevState,
            toValue: swapAmt,
          }));
        }
      };

      calculateAmount();
    } else {
      setSwapPayload((prevState) => ({
        ...prevState,
        toValue: 0,
      }));
    }
  }, [swapPayload?.fromValue, tokenDetails?.price, tokenDetails?.name]);

  const oneUsdtInTokenValue = () => {
    const tokenVal = nebuluxData?.price;
    const amount = 1 / tokenVal;
    return `1 Z-Coin = ${amount?.toFixed(2)} USDT`;
  };

  const fetchUserSwapingData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getUserSwapingData();
      setuserSwapingData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserSwapingData();
  }, []);

  const swapConvertHandler = async () => {
    if (swapPayload?.fromValue <= 0) {
      return toast.error("Please enter a valid amount.");
    }
    try {
      dispatch(setLoading(true));
      await postswapConvertData({
        to: {
          value: swapPayload?.toValue,
          token: "USDT",
          currentPrice: tokenDetails?.price,
        },
        from: {
          value: swapPayload?.fromValue,
          token: "Z-Coin",
        },
        initialValue: tokenDetails?.price,
      });
      fetchUserSwapingData();
      setSwapPayload({
        fromValue: 0,
        toValue: 0,
      });
      setShowConversionDetail({
        show: true,
        data: {
          to: {
            value: swapPayload?.toValue,
            token: tokenDetails?.symbol,
            currentPrice: tokenDetails?.price,
          },
          from: {
            value: swapPayload?.fromValue,
            token: "Z-Coin",
          },
          initialValue: tokenDetails?.price,
          date: new Date().toLocaleString(),
        },
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Swapping is UnSuccssfull!",
        icon: "error",
        timer: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    setShowTokens(false);
  };

  return (
    <>
      {showTokens && (
        <ShowTokenModal
          hide={() => setShowTokens(false)}
          chooseOption={handleTokenSelect}
          tokenOptions={tokenOptionsWithIcon}
        />
      )}
      {showConversionDetail.show && (
        <ConversionDetail
          show={showConversionDetail?.show}
          onHide={() => setShowConversionDetail({ show: false, data: null })}
          data={showConversionDetail?.data}
        />
      )}
      
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Swap Container */}
        <div className="relative">
          {/* From Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">From</h3>
              <div className="text-right">
                <span className="text-sm text-slate-400">Available</span>
                <div className="text-sm font-medium text-blue-400">
                  <NumberFormatCommas decimalScale={2} value={userSwapingData?.currentIncome || 0} /> Z-Coin
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <img
                    src={zCoin}
                    alt="Z-Coin"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">Z-Coin</div>
                  <div className="text-slate-400 text-sm">Z Token (Bep20)</div>
                </div>
              </div>
              
              <div className="flex-1 max-w-32">
                <input
                  type="text"
                  className="w-full bg-transparent text-right text-white text-xl font-semibold placeholder-slate-500 border-none outline-none"
                  placeholder="0.00"
                  onChange={(e) => {
                    const { value } = e.target;
                    const availableAmt = userSwapingData?.total || 0;

                    if (isNaN(value)) {
                      toast.error("Please enter a valid amount.");
                      return;
                    }

                    // if (parseFloat(value) > availableAmt) {
                    //   toast.error(
                    //     `You can't enter more than ${availableAmt} USDT.`
                    //   );
                    //   return;
                    // }
                    setSwapPayload({
                      ...swapPayload,
                      fromValue: value,
                    });
                  }}
                  value={swapPayload?.fromValue}
                />
              </div>
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center my-4">
            <button 
              // onClick={swapHandler}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">To</h3>
            </div>
            
            {/* <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">From</h3>
              <div className="text-right">
                <span className="text-sm text-slate-400">Available</span>
                <div className="text-sm font-medium text-blue-400">
                  <NumberFormatCommas decimalScale={6} value={userSwapingData?.total || 0} /> USDT
                </div>
              </div>
            </div> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/color/48/tether--v1.png"
                    alt="USDT"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">USDT</div>
                  <div className="text-slate-400 text-sm">Tether USD</div>
                </div>
              </div>

              <div className="flex-1 max-w-32">
                <input
                  type="text"
                  className="w-full bg-transparent text-right text-white text-xl font-semibold placeholder-slate-500 border-none outline-none"
                  placeholder="0.00"
                  onChange={(e) => {
                    const { value } = e.target;
                    const availableAmt = userSwapingData?.total || 0;

                    if (isNaN(value)) {
                      toast.error("Please enter a valid amount.");
                      return;
                    }

                    if (parseFloat(value) > availableAmt) {
                      toast.error(
                        `You can't enter more than ${availableAmt} USDT.`
                      );
                      return;
                    }
                    setSwapPayload({
                      ...swapPayload,
                      fromValue: value,
                    });
                  }}
                  value={swapPayload?.fromValue}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="text-center">
          <div className="inline-flex items-center bg-slate-800/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
            <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-slate-300 text-sm">{oneUsdtInTokenValue()}</span>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={swapConvertHandler}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!swapPayload?.fromValue || swapPayload?.fromValue <= 0}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Swap Tokens</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SwapConversion;
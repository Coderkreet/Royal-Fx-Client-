/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import { SastaButton } from "../UI/Buttons";
// import ShowTokenModal from "../UI/ShowTokenModal";
import {
  calculateTokenToUsdtAmount,
  fetchTokenDetails,
  tokenOptionsWithIcon,
} from "../utils/tokenOptions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import {
  getHoldTokenHistory,
  postreSwapConvertData,
} from "../api/token-api";
import Swal from "sweetalert2";
import referIcon from "../assets/icons/referIcon.png";
import ConversionDetail from "./ConversionDetail";
import { NumberFormatCommas } from "../utils/FormatText";

const SwapConversionReverse = ({ swapHandler }) => {
  const dispatch = useDispatch();
  const [showTokens, setShowTokens] = useState(false);
  const [reswapFilterOptions, setReswapFilterOptions] = useState(null);
  const [userHoldingData, setuserHoldingData] = useState(null);
  const [selectedToken, setSelectedToken] = useState(reswapFilterOptions?.[0]);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [swapPayload, setSwapPayload] = useState({
    fromValue: 0,
    toValue: 0,
  });
  const [showConversionDetail, setShowConversionDetail] = useState({
    show: false,
    data: null,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchTokenDetails(selectedToken);
      const selectToken = userHoldingData?.find(
        (item) => item.symbol === selectedToken?.symbol
      );
      const pftAndLossToken =
        Math.abs(selectToken?.totalPnLValue) / data?.price;

      setTokenDetails({
        ...data,
        totalHold:
          selectToken?.totalPnLValue > 0
            ? selectToken?.holding + pftAndLossToken
            : selectToken?.holding - pftAndLossToken,
      });
    };

    if (selectedToken) {
      fetchDetails();
      const interval = setInterval(() => {
        fetchDetails();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedToken]);

  useEffect(() => {
    if (swapPayload?.fromValue > 0) {
      const calculateAmount = async () => {
        const swapAmt = await calculateTokenToUsdtAmount(
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
    const tokenVal = tokenDetails?.price;
    const amount = 1 / tokenVal;
    return ` ${
      amount ? `1 USDT = ${amount?.toFixed(6)} ${tokenDetails?.symbol}` : ""
    }  `;
  };

  const fetchUserSwapingData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getHoldTokenHistory();
      const data = response?.data;
      setuserHoldingData(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserSwapingData();
  }, []);

  const reSwapConvertHandler = async () => {
    if (swapPayload?.fromValue <= 0) {
      return toast.error("Please enter a valid amount.");
    }
    try {
      dispatch(setLoading(true));
      await postreSwapConvertData({
        to: {
          value: swapPayload?.toValue,
          token: "USDT",
          currentPrice: tokenDetails?.price,
        },
        from: {
          value: swapPayload?.fromValue,
          token: tokenDetails?.symbol,
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
            token: "USDT",
            currentPrice: tokenDetails?.price,
          },
          from: {
            value: swapPayload?.fromValue,
            token: tokenDetails?.symbol,
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

  useEffect(() => {
    const filterOptions = userHoldingData
      ?.map((item) => {
        const token = tokenOptionsWithIcon?.find(
          (option) => option.symbol === item.symbol
        );
        return token ? { ...token, value: item.value } : null;
      })
      .filter(Boolean);
    setSelectedToken(filterOptions?.[0]);
    setReswapFilterOptions(filterOptions);
  }, [userHoldingData]);

  const hasHoldingTokens = reswapFilterOptions?.length > 0;

  return (
    <>
      {showTokens && (
        <div></div>
      )}
      {showConversionDetail.show && (
        <ConversionDetail
          show={showConversionDetail?.show}
          onHide={() => setShowConversionDetail({ show: false, data: null })}
          data={showConversionDetail?.data}
        />
      )}
      
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Warning Message for No Holdings */}
        {!hasHoldingTokens && (
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-800/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.67 1.732-2.5L13.732 4c-.77-.83-2.694-.83-3.464 0L3.34 16.5c-.77.83.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-red-300 font-medium">No Holdings Available</h4>
                <p className="text-red-400 text-sm">You don't have any holding tokens to swap.</p>
              </div>
            </div>
          </div>
        )}

        {/* Swap Container */}
        <div className="relative">
          {/* From Section */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">From</h3>
              <div className="text-right">
                <span className="text-sm text-slate-400">Available</span>
                <div className="text-sm font-medium text-blue-400">
                  <NumberFormatCommas decimalScale={6} value={tokenDetails?.totalHold || 0} />
                  {tokenDetails?.symbol && ` ${tokenDetails.symbol}`}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div 
                className={`flex items-center space-x-3 ${
                  hasHoldingTokens 
                    ? 'cursor-pointer hover:bg-slate-700/30 rounded-lg p-2 -m-2 transition-colors' 
                    : 'cursor-not-allowed opacity-50'
                }`}
                onClick={() => {
                  if (hasHoldingTokens) {
                    setShowTokens(true);
                  } else {
                    toast.error("You don't have any holding tokens.");
                  }
                }}
              >
                {tokenDetails?.imgSrc ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center">
                      <img
                        src={tokenDetails?.imgSrc}
                        alt="token"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-white font-medium">{tokenDetails?.name}</div>
                      <div className="text-slate-400 text-sm">{tokenDetails?.symbol}</div>
                    </div>
                    <div className="ml-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700/30 border-2 border-dashed border-slate-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-red-400 font-medium">No Tokens</div>
                      <div className="text-red-500 text-sm">Select a token</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 max-w-32">
                <input
                  type="text"
                  className={`w-full bg-transparent text-right text-white text-xl font-semibold placeholder-slate-500 border-none outline-none ${
                    !hasHoldingTokens ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  placeholder="0.00"
                  disabled={!hasHoldingTokens}
                  onChange={(e) => {
                    const { value } = e.target;
                    const availableAmt = tokenDetails?.totalHold;

                    if (isNaN(value)) {
                      toast.error("Please enter a valid amount.");
                      return;
                    }

                    if (parseFloat(value) > availableAmt) {
                      toast.error(
                        `You can't enter more than ${availableAmt} ${selectedToken?.symbol}.`
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

          {/* Swap Icon */}
          <div className="flex justify-center my-4">
            <button 
              onClick={swapHandler}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-180"
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
                <div className="ml-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 max-w-32">
                <div className="text-right text-white text-xl font-semibold">
                  {swapPayload?.toValue?.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        {tokenDetails?.symbol && (
          <div className="text-center">
            <div className="inline-flex items-center bg-slate-800/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-slate-300 text-sm">{oneUsdtInTokenValue()}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={reSwapConvertHandler}
          className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform ${
            hasHoldingTokens && swapPayload?.fromValue > 0
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white hover:shadow-xl hover:scale-[1.02]'
              : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
          }`}
          disabled={!hasHoldingTokens || !swapPayload?.fromValue || swapPayload?.fromValue <= 0}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>
              {hasHoldingTokens ? 'Swap to USDT' : 'No Holdings Available'}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SwapConversionReverse;
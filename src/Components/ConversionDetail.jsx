/* eslint-disable react/prop-types */
// import { Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ConversionDetail = ({ onHide, data }) => {
  console.log(data)
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-900/95 w-full max-w-md mx-4 rounded-2xl border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center space-x-4 p-4 border-b border-slate-700/50">
          <button 
            onClick={onHide}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-white">Conversion Details</h2>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Status Section */}
          <div className="flex items-center justify-between mb-4 p-3 bg-slate-800/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center">
                <IoMdCheckmarkCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Status</div>
                <div className="text-green-400 font-medium">Completed</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Amount</div>
              <div className="text-xl font-bold text-green-400">
                +{data?.from?.value} Z-Coin
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-3">
            {/* Main Info */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-slate-800/30 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Type</div>
                <div className="text-white font-medium">Instant</div>
              </div>
              {/* <div className="p-3 bg-slate-800/30 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Fee</div>
                <div className="text-white font-medium">0 USDT</div>
              </div> */}
            </div>

            {/* Conversion Details */}
            <div className="p-3 bg-slate-800/30 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-400">From</div>
                <div className="text-sm text-slate-400">To</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-medium">
                  {data?.from?.value} {data?.from?.token}
                </div>
                <div className="text-white font-medium">
                  {data?.to?.value} {data?.to?.token}
                </div>
              </div>
            </div>

            {/* Rate and Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-800/30 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Rate</div>
                <div className="text-white font-medium text-sm">
                  1 {data?.from?.token} = {data?.initialValue} {data?.to?.token}
                </div>
              </div>
              <div className="p-3 bg-slate-800/30 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">Date</div>
                <div className="text-white font-medium text-sm">{data?.date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onHide}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionDetail;

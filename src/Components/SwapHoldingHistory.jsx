import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { getHoldTokenHistory } from "../api/token-api";
import { tokenOptionsWithIcon } from "../utils/tokenOptions";
// import { SSButton } from "../UI/Buttons";
import { NumberFormatCommas } from "../utils/FormatText";
import { RefreshCw, TrendingUp, Coins, DollarSign } from "lucide-react";

const SwapHoldingHistory = () => {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  
  const fetchHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getHoldTokenHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    fetchHistory();
  }, []);
  
  // Skeleton loading template for each column
  const skeletonTemplate = () => (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-700/50 rounded-lg"></div>
    </div>
  );

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    if (isLoading) return skeletonTemplate();
    return (
      <div className="flex items-center justify-center">
        <span className="bg-slate-700 text-blue-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
          {rowIndex + 1}
        </span>
      </div>
    );
  };

  const tokenTemplate = (rowData) => {
    if (isLoading) return skeletonTemplate();
    const token = tokenOptionsWithIcon?.find(
      (item) => item?.symbol === rowData?.symbol
    );
    return (
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <Coins className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-semibold text-slate-200">{token?.name}</div>
          <div className="text-sm text-slate-400">{rowData?.symbol}</div>
        </div>
      </div>
    );
  };

  const priceTemplate = (rowData) => {
    if (isLoading) return skeletonTemplate();
    return (
      <div className="flex items-center space-x-2">
        <DollarSign className="w-4 h-4 text-green-400" />
        <span className="font-bold text-green-400 text-lg">
          <NumberFormatCommas value={rowData?.currentAmount} />
        </span>
      </div>
    );
  };

  const holdingTemplate = (rowData) => {
    if (isLoading) return skeletonTemplate();
    return (
      <div className="text-slate-200 font-medium">
        {rowData?.holding?.toFixed(6)}
      </div>
    );
  };

  const profitLossTemplate = (rowData) => {
    if (isLoading) return skeletonTemplate();
    const isProfit = rowData?.totalPnLValue > 0;
    return (
      <div className="flex items-center space-x-2">
        <TrendingUp className={`w-4 h-4 ${isProfit ? 'text-green-400 rotate-0' : 'text-red-400 rotate-180'}`} />
        <span
          className={`font-bold text-lg ${
            isProfit ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isProfit ? '+' : ''}{rowData?.totalPnLValue?.toFixed(6)}
        </span>
      </div>
    );
  };

  // Generate skeleton data for loading state
  const skeletonData = Array(5).fill({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-2  xl:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Swap Holding History
              </h1>
              <p className="text-slate-400">
                Track your token holdings and portfolio performance
              </p>
            </div>
            <button
              onClick={fetchHistory}
              className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Tokens</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-slate-700/50 rounded-lg animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-white">{history.length}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Profitable Positions</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-slate-700/50 rounded-lg animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-green-400">
                    {history.filter(item => item?.totalPnLValue > 0).length}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-400 rotate-180" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Loss Positions</p>
                {isLoading ? (
                  <div className="h-8 w-16 bg-slate-700/50 rounded-lg animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-red-400">
                    {history.filter(item => item?.totalPnLValue <= 0).length}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Holdings Overview</h2>
          </div>
          
          <div className="overflow-x-auto">
            <style jsx global>{`
              .p-datatable {
                background: transparent !important;
                border: none !important;
              }
              .p-datatable .p-datatable-thead > tr > th {
                background: rgb(51 65 85 / 0.8) !important;
                border: 1px solid rgb(71 85 105) !important;
                color: rgb(226 232 240) !important;
                font-weight: 600 !important;
                padding: 1rem !important;
              }
              .p-datatable .p-datatable-tbody > tr {
                background: rgb(30 41 59 / 0.3) !important;
                border: 1px solid rgb(71 85 105 / 0.3) !important;
                transition: all 0.3s ease !important;
              }
              .p-datatable .p-datatable-tbody > tr:hover {
                background: rgb(51 65 85 / 0.5) !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15) !important;
              }
              .p-datatable .p-datatable-tbody > tr > td {
                border: 1px solid rgb(71 85 105 / 0.3) !important;
                color: rgb(226 232 240) !important;
                padding: 1rem !important;
              }
              .p-paginator {
                background: rgb(51 65 85 / 0.8) !important;
                border: 1px solid rgb(71 85 105) !important;
                border-radius: 0 0 1rem 1rem !important;
              }
              .p-paginator .p-paginator-pages .p-paginator-page {
                background: transparent !important;
                color: rgb(226 232 240) !important;
                border: 1px solid rgb(71 85 105) !important;
                margin: 0 2px !important;
                border-radius: 0.5rem !important;
              }
              .p-paginator .p-paginator-pages .p-paginator-page:hover {
                background: rgb(59 130 246) !important;
                color: white !important;
              }
              .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
                background: rgb(59 130 246) !important;
                color: white !important;
              }
              .p-dropdown {
                background: rgb(51 65 85) !important;
                border: 1px solid rgb(71 85 105) !important;
                color: rgb(226 232 240) !important;
              }
            `}</style>
            
            <DataTable
              value={isLoading ? skeletonData : history}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              filterDisplay="row"
              className="custom-datatable"
              stripedRows
            >
              <Column
                style={{ width: "10%" }}
                body={serialNumberTemplate}
                header="S.No"
                filter
                sortable
              />
              <Column
                field="symbol"
                header="Token"
                filter
                body={tokenTemplate}
                sortable
              />
              <Column
                field="currentAmount"
                header="Current Price"
                filter
                body={priceTemplate}
                sortable
              />
              <Column
                field="swapId.to.value"
                header="Holding"
                filter
                body={holdingTemplate}
                sortable
              />
              <Column
                field="rowData.initialAmount"
                header="Profit/Loss (USDT)"
                body={profitLossTemplate}
                filter
                sortable
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapHoldingHistory;
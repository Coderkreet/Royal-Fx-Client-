/* eslint-disable react/prop-types */
import { useState, useMemo, useEffect } from "react";
import PropTypes from 'prop-types';
import { PiLockKeyBold, PiLockKeyOpenBold } from "react-icons/pi";
import { formatDateTime, getMoneySymbol } from "../utils/additonalFunc";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { changeStatusTOUnlock } from "../api/product-api";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Calendar, 
  DollarSign,
  Hash,
  Tag,
  Activity
} from "lucide-react";
import { getPurchasedMiners } from "../api/user-api";

const MinersPurchaseHistory = ({ className }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [purchasedMiners, setPurchasedMiners] = useState([]);
  
  useEffect(() => {
    fetchPurchasedMiners();
  }, []);

  const fetchPurchasedMiners = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getPurchasedMiners();
      if (response.success) {
        setPurchasedMiners(response.data);
      }
    } catch (error) {
      console.error("Error fetching purchased miners:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = purchasedMiners?.filter(item => 
      item?.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.plan?.price?.toString().includes(searchTerm)
    ) || [];

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'name':
            aValue = a?.plan?.name || '';
            bValue = b?.plan?.name || '';
            break;
          case 'price':
            aValue = a?.plan?.price || 0;
            bValue = b?.plan?.price || 0;
            break;
          case 'investmentDate':
            aValue = new Date(a?.investmentDate || 0);
            bValue = new Date(b?.investmentDate || 0);
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [purchasedMiners, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const lockedPlanHandler = () => {
    Swal.fire({
      title: "Warning!",
      text: "You can't unlock this miner before 6 months!",
      icon: "warning",
      timer: 3000,
    });
  };

  const unLockPlanHandler = (rowData) => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure to unlock this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, unlock it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusTOUnlockHandler(rowData?._id);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You have successfully unlocked this plan",
          timer: 3000,
        }).then(() => {
          fetchPurchasedMiners();
        });
      }
    });
  };

  const changeStatusTOUnlockHandler = async (id) => {
    try {
      dispatch(setLoading(true));
      await changeStatusTOUnlock({
        id: id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const StatusButton = ({ rowData }) => {
    if (rowData?.isLocked) {
      return (
        <button
          onClick={lockedPlanHandler}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <PiLockKeyBold className="text-lg" />
          <span className="text-sm font-medium">Locked</span>
        </button>
      );
    } else if (rowData?.unlocked && !rowData?.isLocked) {
      return (
        <button
          disabled
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-75"
        >
          <PiLockKeyOpenBold className="text-lg" />
          <span className="text-sm font-medium">Unlocked</span>
        </button>
      );
    } else if (!rowData?.unlocked && !rowData?.isLocked) {
      return (
        <button
          onClick={() => unLockPlanHandler(rowData)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <PiLockKeyBold className="text-lg" />
          <span className="text-sm font-medium">Unlock</span>
        </button>
      );
    }
  };

  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 min-h-screen ${className ? className : ""}`}>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Purchase History
          </h2>
          <p className="text-slate-400">Track your mining investments and earnings</p>
        </div>

        {/* Controls */}
        <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by plan name or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Rows per page */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm">Show:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span className="text-slate-300 text-sm">rows</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
          {paginatedData.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <div className="flex items-center space-x-2">
                          <Hash size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">S.No</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                        >
                          <Tag size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">Plan Name</span>
                          {sortField === 'name' && (
                            <span className="text-blue-400">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleSort('price')}
                          className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                        >
                          <DollarSign size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">Investment</span>
                          {sortField === 'price' && (
                            <span className="text-blue-400">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <div className="flex items-center space-x-2">
                          <Activity size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">Status</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => handleSort('investmentDate')}
                          className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                        >
                          <Calendar size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">Purchase Date</span>
                          {sortField === 'investmentDate' && (
                            <span className="text-blue-400">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="text-slate-300 font-semibold text-sm">Lock-in Period</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr
                        key={item._id}
                        className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-slate-300 font-medium">
                            {startIndex + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-200 font-medium">
                            {item.plan.name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-slate-200 font-semibold">
                              {getMoneySymbol()}{item.plan.price?.toFixed(2)}
                            </div>
                            <div className="text-green-400 text-sm">
                              ROI: {item.plan.monthlyROIpercentage}% monthly
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusButton rowData={item} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300 text-sm">
                            {formatDateTime(item.investmentDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300 text-sm">
                            {formatDateTime(item.lockinPeriod)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="border-t border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-slate-400 text-sm">
                    Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-slate-500 mb-4">
                <Activity size={48} className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">
                  No Purchase History Found
                </h3>
                <p className="text-slate-500">
                  {searchTerm ? 'No results match your search criteria.' : 'Your purchase history will appear here once you make investments.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

MinersPurchaseHistory.propTypes = {
  className: PropTypes.string
};

MinersPurchaseHistory.defaultProps = {
  className: ''
};

export default MinersPurchaseHistory;
import React, { useEffect, useState, useMemo } from 'react';
import { getMinerPurchaseHistory } from '../../api/admin-api';
import { formatDateTime } from '../../utils/additonalFunc';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Calendar, 
  User,
  Hash,
  Activity
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slice/loadingSlice';

const PerchancePlanHistory = () => {
  const dispatch = useDispatch();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getMinerPurchaseHistory();
      if (response.message === "fetched") {
        setPurchaseHistory(response.data);
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = purchaseHistory?.filter(item => 
      item?.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.plan?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'userId':
            aValue = a?.userId || '';
            bValue = b?.userId || '';
            break;
          case 'plan':
            aValue = a?.plan || '';
            bValue = b?.plan || '';
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
  }, [purchaseHistory, searchTerm, sortField, sortOrder]);

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

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          Purchase History
        </h2>
        <p className="text-slate-400">View all mining plan purchases across users</p>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by user ID or plan ID..."
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
                        onClick={() => handleSort('userId')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <User size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">User ID</span>
                        {sortField === 'userId' && (
                          <span className="text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('plan')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <span className="text-slate-300 font-semibold text-sm">Plan ID</span>
                        {sortField === 'plan' && (
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
                          {item.userId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-200 font-medium">
                          {item.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.isLocked 
                            ? 'bg-red-600/20 text-red-300'
                            : 'bg-green-600/20 text-green-300'
                        }`}>
                          {item.isLocked ? 'Locked' : 'Unlocked'}
                        </span>
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
                  {/* First Page Button */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>First</span>
                  </button>

                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {(() => {
                      const pages = [];
                      const maxVisiblePages = 5;
                      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                      if (endPage - startPage + 1 < maxVisiblePages) {
                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                      }

                      // Add first page and ellipsis if needed
                      if (startPage > 1) {
                        pages.push(
                          <button
                            key={1}
                            onClick={() => setCurrentPage(1)}
                            className="px-3 py-2 rounded-lg transition-colors bg-slate-700 hover:bg-slate-600 text-slate-300"
                          >
                            1
                          </button>
                        );
                        if (startPage > 2) {
                          pages.push(
                            <span key="ellipsis1" className="px-2 py-2 text-slate-400">
                              ...
                            </span>
                          );
                        }
                      }

                      // Add page numbers
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              currentPage === i
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                            }`}
                          >
                            {i}
                          </button>
                        );
                      }

                      // Add ellipsis and last page if needed
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span key="ellipsis2" className="px-2 py-2 text-slate-400">
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <button
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-2 rounded-lg transition-colors bg-slate-700 hover:bg-slate-600 text-slate-300"
                          >
                            {totalPages}
                          </button>
                        );
                      }

                      return pages;
                    })()}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>

                  {/* Last Page Button */}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>Last</span>
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
                {searchTerm ? 'No results match your search criteria.' : 'No purchase history available.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerchancePlanHistory;

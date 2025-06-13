import React, { useEffect, useState, useMemo } from 'react';
import { getAdminWithdrawalHistory } from '../api/admin-api';
import { formatDateTime } from '../utils/additonalFunc';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Calendar, 
  User,
  Hash,
  Activity,
  DollarSign,
  Wallet
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';

const WithdrawalHistory = () => {
  const dispatch = useDispatch();
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const fetchWithdrawalHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAdminWithdrawalHistory();
      if (response.success) {
        setWithdrawalHistory(response.data);
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = withdrawalHistory?.filter(item => 
      item?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.amount?.toString().includes(searchTerm)
    ) || [];

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortField) {
          case 'name':
            aValue = a?.userId?.name || '';
            bValue = b?.userId?.name || '';
            break;
          case 'amount':
            aValue = a?.amount || 0;
            bValue = b?.amount || 0;
            break;
          case 'status':
            aValue = a?.status || '';
            bValue = b?.status || '';
            break;
          case 'createdAt':
            aValue = new Date(a?.createdAt || 0);
            bValue = new Date(b?.createdAt || 0);
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
  }, [withdrawalHistory, searchTerm, sortField, sortOrder]);

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
          Withdrawal History
        </h2>
        <p className="text-slate-400">Track all withdrawal transactions across users</p>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, transaction ID, or amount..."
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
                        <User size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">User</span>
                        {sortField === 'name' && (
                          <span className="text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('amount')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <DollarSign size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Amount</span>
                        {sortField === 'amount' && (
                          <span className="text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center space-x-2">
                        <Wallet size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Wallet Address</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center space-x-2">
                        <Hash size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Transaction ID</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <Activity size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Status</span>
                        {sortField === 'status' && (
                          <span className="text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('createdAt')}
                        className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                      >
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Date</span>
                        {sortField === 'createdAt' && (
                          <span className="text-blue-400">
                            {sortOrder === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </button>
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
                        <div className="space-y-1">
                          <span className="text-slate-200 font-medium">
                            {item.userId.name}
                          </span>
                          <div className="text-slate-400 text-sm">
                            {item.userId.userId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-slate-200 font-semibold">
                            ${item.amount}
                          </div>
                          <div className="text-slate-400 text-sm">
                            {item.type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">
                          <span className="text-slate-300 text-sm">
                            {item.clientAddress}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {item.transactionId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'Completed' 
                            ? 'bg-green-600/20 text-green-300'
                            : 'bg-yellow-600/20 text-yellow-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {formatDateTime(item.createdAt)}
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
                No Withdrawal History Found
              </h3>
              <p className="text-slate-500">
                {searchTerm ? 'No results match your search criteria.' : 'No withdrawal history available.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalHistory;

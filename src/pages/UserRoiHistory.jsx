import React, { useEffect, useState } from 'react'
import { getUserRoi } from '../api/user-api'
import { Search, DollarSign, Calendar, Activity, CoinsIcon } from 'lucide-react'

const UserRoiHistory = () => {
  const [roiData, setRoiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUserRoi();
  }, []);

  const fetchUserRoi = async () => {
    try {
      const response = await getUserRoi();
      if (response.success) {
        setRoiData(response.data);
      }
    } catch (error) {
      setRoiData([]);
    }
  };

  // Filter data
  const filteredData = roiData.filter(item =>
    item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user?.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.amount?.toString().includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Calculate total amount
  const totalAmount = roiData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          My ROI Income History
        </h2>
        <p className="text-slate-400">View all your ROI transactions</p>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, user ID or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          {/* Total Amount */}
          <div className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/20">
            Total Amount: {totalAmount.toFixed(2)} Royal-Fx
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
                      <span className="flex items-center space-x-2">
                        <span className="text-slate-300 font-semibold text-sm">Name</span>
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="flex items-center space-x-2">
                        <span className="text-slate-300 font-semibold text-sm">User ID</span>
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="flex items-center space-x-2">
                        <CoinsIcon size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Amount</span>
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="flex items-center space-x-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Date</span>
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="flex items-center space-x-2">
                        <Activity size={16} className="text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Created At</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-slate-200 font-medium">
                          {item.user?.name || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-200 font-medium">
                          {item.user?.userId || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-200 font-medium">
                          {item.amount?.toFixed(2)} Royal-Fx
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {item.date ? new Date(item.date).toLocaleDateString() : '-'}
                        </span>
                        <div className="text-slate-400 text-xs">
                          {item.date ? new Date(item.date).toLocaleTimeString() : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                        </span>
                        <div className="text-slate-400 text-xs">
                          {item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ''}
                        </div>
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
                  Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>First</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>Prev</span>
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors"
                  >
                    <span>Next</span>
                  </button>
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
                No ROI History Found
              </h3>
              <p className="text-slate-500">
                {searchTerm ? 'No results match your search criteria.' : 'No ROI history available.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRoiHistory

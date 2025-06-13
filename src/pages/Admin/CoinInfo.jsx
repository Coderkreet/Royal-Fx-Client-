import React, { useEffect, useState } from 'react';
import { getCoinData, getNebuluxPurchaseHistory } from '../../api/admin-api';
import { Coins, Users, DollarSign, TrendingUp, Calendar, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const CoinInfo = () => {
  const [coinData, setCoinData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coinResponse, historyResponse] = await Promise.all([
          getCoinData(),
          getNebuluxPurchaseHistory()
        ]);

        if (coinResponse?.data) {
          setCoinData(coinResponse.data);
        }
        if (historyResponse?.data) {
          setPurchaseHistory(historyResponse.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {-
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHistory = [...purchaseHistory].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.key === 'purchaseDate') {
      return sortConfig.direction === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredHistory = sortedHistory.filter(record =>
    record.userId.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userId.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userId.walletAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + rowsPerPage);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-800 rounded-xl"></div>
          ))}
        </div>
        <div className="h-12 bg-gray-800 rounded-lg"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Coin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Token Name</p>
              <h3 className="text-xl font-bold text-white mt-1">{coinData?.tokenName}</h3>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Coins className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Current Price</p>
              <h3 className="text-xl font-bold text-white mt-1">${coinData?.price}</h3>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Supply</p>
              <h3 className="text-xl font-bold text-white mt-1">{coinData?.supply?.toLocaleString()}</h3>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <TrendingUp className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Sold</p>
              <h3 className="text-xl font-bold text-white mt-1">{coinData?.sold?.toLocaleString()}</h3>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Users className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Purchase History</h2>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, ID, or wallet address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Rows per page selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm">Show:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span className="text-gray-300 text-sm">rows</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('userId.name')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <Users size={16} />
                    <span>User</span>
                    {sortConfig.key === 'userId.name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('quantity')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <Coins size={16} />
                    <span>Quantity</span>
                    {sortConfig.key === 'quantity' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('totalPrice')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <DollarSign size={16} />
                    <span>Total Price</span>
                    {sortConfig.key === 'totalPrice' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('purchaseDate')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <Calendar size={16} />
                    <span>Purchase Date</span>
                    {sortConfig.key === 'purchaseDate' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedHistory.map((record) => (
                <tr key={record._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <Users className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{record.userId.name}</div>
                        <div className="text-gray-400 text-sm">{record.userId.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{record.quantity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">${record.totalPrice}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-300">
                      {new Date(record.purchaseDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(record.purchaseDate).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredHistory.length)} of {filteredHistory.length} entries
            </div>
            <div className="flex items-center space-x-2">
              {/* First Page Button */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg transition-colors"
              >
                <span>First</span>
              </button>

              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg transition-colors"
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
                        className="px-3 py-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600 text-gray-300"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 py-2 text-gray-400">
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
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
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
                        <span key="ellipsis2" className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600 text-gray-300"
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
                className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>

              {/* Last Page Button */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded-lg transition-colors"
              >
                <span>Last</span>
              </button>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No purchase history found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinInfo;

import React, { useEffect, useState } from 'react'
import { getRoiHistory } from '../../api/admin-api'
import { Search, ChevronLeft, ChevronRight, Users, DollarSign, Calendar, Activity, Wallet, ArrowRight } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slice/loadingSlice'

const ROiIncome = () => {
    const dispatch = useDispatch();
    const [transactionData, setTransactionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    const fetchTransactionHistory = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getRoiHistory();
            if (response.success) {
                setTransactionData(response.data);
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Filter and sort data
    const filteredAndSortedData = transactionData.filter(item => 
        item?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.amount?.toString().includes(searchTerm)
    ).sort((a, b) => {
        if (!sortField) return 0;

        let aValue, bValue;
        switch (sortField) {
            case 'user':
                aValue = a.userId?.name || '';
                bValue = b.userId?.name || '';
                break;
            case 'amount':
                aValue = a.amount || 0;
                bValue = b.amount || 0;
                break;
            case 'type':
                aValue = a.type || '';
                bValue = b.type || '';
                break;
            case 'status':
                aValue = a.status || '';
                bValue = b.status || '';
                break;
            case 'date':
                aValue = new Date(a.createdAt || 0);
                bValue = new Date(b.createdAt || 0);
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

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

    // Calculate total amount
    const totalAmount = transactionData.reduce((sum, item) => sum + item.amount, 0);

    // Get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-green-600/20 text-green-300';
            case 'pending':
                return 'bg-yellow-600/20 text-yellow-300';
            case 'failed':
                return 'bg-red-600/20 text-red-300';
            default:
                return 'bg-gray-600/20 text-gray-300';
        }
    };

    // Get type color
    const getTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'topup':
                return 'bg-blue-600/20 text-blue-300';
            case 'withdrawal':
                return 'bg-purple-600/20 text-purple-300';
            case 'transfer':
                return 'bg-orange-600/20 text-orange-300';
            default:
                return 'bg-gray-600/20 text-gray-300';
        }
    };

  return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 min-h-screen p-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    Transaction History
                </h2>
                <p className="text-slate-400">View all user transactions across the platform</p>
            </div>

            {/* Controls */}
            <div className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by user name, type, status, or amount..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Total Amount */}
                    <div className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/20">
                        Total Amount: ${totalAmount.toFixed(2)}
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
                                            <button
                                                onClick={() => handleSort('user')}
                                                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                                            >
                                                <Users size={16} className="text-slate-400" />
                                                <span className="text-slate-300 font-semibold text-sm">User</span>
                                                {sortField === 'user' && (
                                                    <span className="text-blue-400">
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <button
                                                onClick={() => handleSort('type')}
                                                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                                            >
                                                <Activity size={16} className="text-slate-400" />
                                                <span className="text-slate-300 font-semibold text-sm">Type</span>
                                                {sortField === 'type' && (
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
                                                <span className="text-slate-300 font-semibold text-sm">From → To</span>
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
                                                onClick={() => handleSort('date')}
                                                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                                            >
                                                <Calendar size={16} className="text-slate-400" />
                                                <span className="text-slate-300 font-semibold text-sm">Date</span>
                                                {sortField === 'date' && (
                                                    <span className="text-blue-400">
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </button>
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
                                                <div>
                                                    <span className="text-slate-200 font-medium">
                                                        {item.userId?.name || 'N/A'}
                                                    </span>
                                                    <div className="text-slate-400 text-xs">
                                                        ID: {item.userId?._id || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-200 font-medium">
                                                    ${item.amount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-slate-300 text-sm capitalize">
                                                        {item.fromWallet}
                                                    </span>
                                                    <ArrowRight size={12} className="text-slate-400" />
                                                    <span className="text-slate-300 text-sm capitalize">
                                                        {item.toWallet}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-sm">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                                <div className="text-slate-400 text-xs">
                                                    {new Date(item.createdAt).toLocaleTimeString()}
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
                                No Transaction History Found
                            </h3>
                            <p className="text-slate-500">
                                {searchTerm ? 'No results match your search criteria.' : 'No transaction history available.'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ROiIncome;

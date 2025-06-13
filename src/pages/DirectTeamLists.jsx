import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "../redux/slice/loadingSlice";
import { getDirectUsers } from "../api/user-api";
import { formatDateTime, maskEmailAddress } from "../utils/additonalFunc";
import { Search, Users, Filter } from "lucide-react";

const DirectTeamLists = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const isLoading = useSelector((state) => state.loading.isLoading);
  
  const fetchHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getDirectUsers();
      setHistory(response?.data || []);
      setFilteredData(response?.data || []);
    } catch (error) {
      console.log(error);
      setHistory([]);
      setFilteredData([]);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = history;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId?.toString().includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(user => 
        statusFilter === "active" ? user.isActive : !user.isActive
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, statusFilter, history]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const LoadingSkeleton = () => (
    <tr className="animate-pulse">
      {Array.from({length: 6}).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="h-4 bg-gray-600 rounded"></div>
        </td>
      ))}
    </tr>
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <div className="h-8 bg-gray-600 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-400 rounded w-96 animate-pulse"></div>
        </div>
        <div className="bg-black rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-500">
              <tr>
                {['S.No', 'User ID', 'Name', 'Email', 'Status', 'Join Date'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-600">
              {Array.from({length: 5}).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Direct Team Lists</h1>
        </div>
        <p className="text-gray-300">Manage and monitor your direct team members</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] rounded-lg shadow p-4 border border-[#232b3b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Members</p>
              <p className="text-2xl font-semibold text-white">{history.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-300" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] rounded-lg shadow p-4 border border-[#232b3b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Active Users</p>
              <p className="text-2xl font-semibold text-green-400">
                {history.filter(user => user.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] rounded-lg shadow p-4 border border-[#232b3b]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Inactive Users</p>
              <p className="text-2xl font-semibold text-red-400">
                {history.filter(user => !user.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] rounded-lg shadow mb-6 p-4 border border-[#232b3b]">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#232b3b] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#1f2937] text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#232b3b] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#1f2937] text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-[#232b3b] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[#1f2937] text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] rounded-lg shadow overflow-hidden border border-[#232b3b]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#232b3b]">
            <thead className="bg-[#121921]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Join Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1f2937] divide-y divide-[#232b3b]">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No team members found
                  </td>
                </tr>
              ) : (
                currentData.map((user, index) => (
                  <tr key={user.userId || index} className="hover:bg-[#232b3b]">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-white bg-[#232b3b] px-2 py-1 rounded">
                        {user.userId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <span className="text-sm font-medium text-white">{user.name}</span>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {maskEmailAddress(user?.email)}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user?.createdAt).toUTCString() || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-br from-[#121921] via-[#1f2937] to-[#121921] px-4 py-3 flex items-center justify-between border-t border-[#232b3b] sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-[#232b3b] text-sm font-medium rounded-md text-white bg-[#1f2937] hover:bg-[#232b3b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-[#232b3b] text-sm font-medium rounded-md text-white bg-[#1f2937] hover:bg-[#232b3b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-300">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
                  <span className="font-medium">{filteredData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#232b3b] bg-[#1f2937] text-sm font-medium text-white hover:bg-[#232b3b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-900 border-blue-500 text-white'
                          : 'bg-[#1f2937] border-[#232b3b] text-gray-300 hover:bg-[#232b3b]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#232b3b] bg-[#1f2937] text-sm font-medium text-white hover:bg-[#232b3b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectTeamLists;
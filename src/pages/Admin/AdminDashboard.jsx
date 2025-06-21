import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../api/admin-api';
import { Users, UserCheck, UserX, DollarSign, Wallet, TrendingUp, Coins, ArrowUpRight, ArrowDownRight, Briefcase, PieChart } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, trendUp }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-gray-700 rounded-lg">
          <Icon className="text-blue-500" size={24} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trendUp ? (
            <ArrowUpRight className="text-green-500" size={16} />
          ) : (
            <ArrowDownRight className="text-red-500" size={16} />
          )}
          <span className={`text-sm ml-1 ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trendValue}
          </span>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData();
        if (response?.data) {
          setDashboardData(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 h-32"></div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardData?.totalUsers || 0}
          icon={Users}
          trend={true}
          trendValue="All Time"
          trendUp={true}
        />
        <StatCard
          title="Active Users"
          value={dashboardData?.activeUsers || 0}
          icon={UserCheck}
          trend={true}
          trendValue="Currently Active"
          trendUp={true}
        />
        <StatCard
          title="Inactive Users"
          value={dashboardData?.inactiveUsers || 0}
          icon={UserX}
          trend={true}
          trendValue="Currently Inactive"
          trendUp={false}
        />
        <StatCard
          title="Total Investment"
          value={`$${dashboardData?.totalInvestment || 0}`}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Earning"
          value={`$${dashboardData?.totalEarning || 0}`}
          icon={Coins}
        />
        <StatCard
          title="Total Income"
          value={`$${dashboardData?.totalIncome || 0}`}
          icon={DollarSign}
        />
        <StatCard
          title="Total Withdrawal"
          value={`$${dashboardData?.totalWithdrawal || 0}`}
          icon={Wallet}
        />
        <StatCard
          title="Total Brokerage"
          value={`$${dashboardData?.totalBrokerage || 0}`}
          icon={Briefcase}
        />
        <StatCard
          title="Total Plans"
          value={dashboardData?.totalPlans || 0}
          icon={PieChart}
        />
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Investment</span>
              <span className="text-white font-semibold">${dashboardData?.totalInvestment || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Earning</span>
              <span className="text-white font-semibold">${dashboardData?.totalEarning || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Income</span>
              <span className="text-white font-semibold">${dashboardData?.totalIncome || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Brokerage</span>
              <span className="text-white font-semibold">${dashboardData?.totalBrokerage || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">User Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Users</span>
              <span className="text-white font-semibold">{dashboardData?.totalUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Users</span>
              <span className="text-white font-semibold">{dashboardData?.activeUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Inactive Users</span>
              <span className="text-white font-semibold">{dashboardData?.inactiveUsers || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Plans</span>
              <span className="text-white font-semibold">{dashboardData?.totalPlans || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

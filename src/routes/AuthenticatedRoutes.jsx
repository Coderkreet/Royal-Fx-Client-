import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../context/Routes";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Rewards from "../pages/Rewards";
import Leaderboard from "../pages/Leaderboard";
import WalletPage from "../pages/WalletPage";
import Settingspage from "../pages/Settingspage";
import { getCurrentUser } from "../utils/additonalFunc";
import ViewMarketTables from "../pages/ViewMarketTables";
import MarketDetailPage from "../pages/MarketDetailPage";
import Tradings from "../pages/TradingPage";
import DirectTeamLists from "../pages/DirectTeamLists";
import MiningProducts from "../pages/MiningProducts";
import NebuluxCoin from "../pages/NebuluxCoin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AllUser from "../pages/Admin/AllUser";
import CoinInfo from "../pages/Admin/CoinInfo";
import WithdrawalHistory from "../layouts/WithdrawalHistory";
import OurPlans from "../pages/Admin/OurPlans";
import PerchancePlanHistory from "../pages/Admin/PerchancePlanHistory";
import InactiveUserHistory from "../pages/Admin/InactiveUserHistory";
import ActiveUser from "../pages/Admin/ActiveUser";
import GetIncomeHistory from "../pages/Admin/GetIncomeHistory";
import ROiIncome from "../pages/Admin/ROiIncome";
import UserRoiHistory from "../pages/UserRoiHistory";

const AuthenticatedRoutesComponent = () => {
  const role = getCurrentUser()?.role;
  console.log(role);
  const adminRole = localStorage.getItem("role");

  console.log(adminRole);
  // const isAdmin = adminRole === 'admin';

  return (
    <>
      {adminRole === "admin" ? (
        <Routes>
          {/* Admin Routes */}
          <Route
            path="*"
            element={
              <AuthLayout inner={<AdminDashboard />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.ADMIN_DASHBOARD}
            element={
              <AuthLayout inner={<AdminDashboard />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.ALL_USERS}
            element={<AuthLayout inner={<AllUser />} className="admin" />}
          />
          <Route
            path={AuthenticatedRoutes.COIN_INFO}
            element={<AuthLayout inner={<CoinInfo />} className="admin" />}
          />
          <Route
            path={AuthenticatedRoutes.Withdrawals_history}
            element={
              <AuthLayout inner={<WithdrawalHistory />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.OUR_PLANS}
            element={<AuthLayout inner={<OurPlans />} className="admin" />}
          />
          <Route
            path={AuthenticatedRoutes.PerchancePlanHistory}
            element={
              <AuthLayout inner={<PerchancePlanHistory />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.INACTIVE_USERS}
            element={
              <AuthLayout inner={<InactiveUserHistory />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.ACTIVE_USERS}
            element={<AuthLayout inner={<ActiveUser />} className="admin" />}
          />
          <Route
            path={AuthenticatedRoutes.INCOME_HISTORY_ALL}
            element={
              <AuthLayout inner={<GetIncomeHistory />} className="admin" />
            }
          />
          <Route
            path={AuthenticatedRoutes.ROI_INCOME}
            element={<AuthLayout inner={<ROiIncome />} className="admin" />}
          />
          {/* Add more admin routes here */}
        </Routes>
      ) : (
        <Routes>
          {/* User Routes */}
          <Route
            path={AuthenticatedRoutes.DASHBOARD}
            element={<AuthLayout inner={<Dashboard />} />}
          />
          <Route
            path={AuthenticatedRoutes.MARKET}
            element={<AuthLayout inner={<ViewMarketTables />} />}
          />

          <Route
            path={AuthenticatedRoutes.NEBULUX_COIN}
            element={<AuthLayout inner={<NebuluxCoin />} />}
          />

          <Route
            path={AuthenticatedRoutes.ROI_HISTORY}
            element={<AuthLayout inner={<UserRoiHistory />} />}
          />

          <Route
            path={AuthenticatedRoutes.MARKET_DETAIL}
            element={<AuthLayout inner={<MarketDetailPage />} />}
          />
          <Route
            path={AuthenticatedRoutes.PROFILE}
            element={<AuthLayout inner={<Profile />} />}
          />
          <Route
            path={AuthenticatedRoutes.REWARDS}
            element={<AuthLayout inner={<Rewards />} />}
          />
          <Route
            path={AuthenticatedRoutes.LEADERBOARD}
            element={<AuthLayout inner={<Leaderboard />} />}
          />
          <Route
            path={AuthenticatedRoutes.WALLET}
            element={<AuthLayout inner={<WalletPage />} />}
          />
          <Route
            path={AuthenticatedRoutes.MY_TEAM}
            element={<AuthLayout inner={<DirectTeamLists />} />}
          />
          <Route
            path={AuthenticatedRoutes.OUR_PLANS}
            element={<AuthLayout inner={<MiningProducts />} />}
          />
          <Route
            path={AuthenticatedRoutes.SETTINGS}
            element={<AuthLayout inner={<Settingspage />} />}
          />
          <Route
            path={AuthenticatedRoutes.TRADING}
            element={<AuthLayout inner={<Tradings />} />}
          />
          {/* Default route - redirect to dashboard */}
          <Route path="*" element={<AuthLayout inner={<Dashboard />} />} />
        </Routes>
      )}
    </>
  );
};

export default AuthenticatedRoutesComponent;

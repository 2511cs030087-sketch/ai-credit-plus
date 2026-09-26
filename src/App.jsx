import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import UploadPage from './pages/UploadPage';
import CreditScorePage from './pages/CreditScorePage';
import FinancialHealthPage from './pages/FinancialHealthPage';
import TransactionsPage from './pages/TransactionsPage';
import LoansPage from './pages/LoansPage';
import EMIPlannerPage from './pages/EMIPlannerPage';
import RiskAlertsPage from './pages/RiskAlertsPage';
import ReportPage from './pages/ReportPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="credit-score" element={<CreditScorePage />} />
        <Route path="financial-health" element={<FinancialHealthPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="emi-planner" element={<EMIPlannerPage />} />
        <Route path="risk-alerts" element={<RiskAlertsPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

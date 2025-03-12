
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Bots from "./pages/Bots";
import History from "./pages/History";
import Wallet from "./pages/Wallet";
import CreditPlans from "./pages/CreditPlans";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/bots" element={<DashboardLayout><Bots /></DashboardLayout>} />
        <Route path="/history" element={<DashboardLayout><History /></DashboardLayout>} />
        <Route path="/wallet" element={<DashboardLayout><Wallet /></DashboardLayout>} />
        <Route path="/wallet/plans" element={<DashboardLayout><CreditPlans /></DashboardLayout>} />
        <Route path="/credit-plans" element={<DashboardLayout><CreditPlans /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="*" element={<DashboardLayout><NotFound /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;

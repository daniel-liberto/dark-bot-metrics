
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetail from "./pages/AdminUserDetail";
import "./App.css";

function AdminApp() {
  return (
    <div className="min-h-screen bg-crypto-darker text-white">
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/users/:userId" element={<AdminUserDetail />} />
      </Routes>
    </div>
  );
}

export default AdminApp;

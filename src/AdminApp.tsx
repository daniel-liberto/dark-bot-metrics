import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetail from "./pages/AdminUserDetail";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import { AdminLayout } from "./components/admin/AdminLayout";
import "./App.css";

function AdminApp() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/users/:userId" element={<AdminLayout><AdminUserDetail /></AdminLayout>} />
      <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
      {/* Adicione mais rotas administrativas conforme necessário */}
      <Route path="/admin/*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    </Routes>
  );
}

export default AdminApp;

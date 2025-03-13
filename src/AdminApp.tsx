
import AdminDashboard from "./pages/AdminDashboard";
import { AdminLayout } from "./components/admin/AdminLayout";
import "./App.css";

function AdminApp() {
  return (
    <div className="min-h-screen bg-crypto-darker text-white">
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </div>
  );
}

export default AdminApp;

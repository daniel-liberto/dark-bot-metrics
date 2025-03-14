import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Home,
  Activity,
  Bot,
  DollarSign,
  Wrench
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const AdminSidebarItem = ({ icon, label, to, active }: AdminSidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors mb-1",
        active 
          ? "bg-crypto-card text-crypto-green" 
          : "text-gray-400 hover:bg-crypto-card hover:text-gray-100"
      )}
    >
      <div className="h-5 w-5 flex-shrink-0">{icon}</div>
      <span className="truncate">{label}</span>
    </Link>
  );
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="flex h-screen w-screen bg-crypto-darker text-white overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="flex h-full w-64 flex-col border-r border-crypto-card bg-crypto-darker shadow-xl">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          <AdminSidebarItem 
            icon={<LayoutDashboard />} 
            label="Visão Geral" 
            to="/admin" 
            active={path === "/admin"} 
          />
          <AdminSidebarItem 
            icon={<Users />} 
            label="Usuários" 
            to="/admin/users" 
            active={path === "/admin/users" || path.startsWith("/admin/users/")} 
          />
          <AdminSidebarItem 
            icon={<Activity />} 
            label="Monitorar Operações" 
            to="/admin/operations" 
            active={path === "/admin/operations"} 
          />
          <AdminSidebarItem 
            icon={<Bot />} 
            label="Configurações do Bot" 
            to="/admin/bot-settings" 
            active={path === "/admin/bot-settings"} 
          />
          <AdminSidebarItem 
            icon={<DollarSign />} 
            label="Financeiro e Faturamento" 
            to="/admin/finance" 
            active={path === "/admin/finance"} 
          />
          <AdminSidebarItem 
            icon={<Wrench />} 
            label="Ferramentas de Administração" 
            to="/admin/tools" 
            active={path === "/admin/tools"} 
          />
          
          <div className="pt-6 mt-6 border-t border-crypto-card">
            <AdminSidebarItem 
              icon={<Home />} 
              label="Painel do Cliente" 
              to="/" 
            />
            <AdminSidebarItem 
              icon={<LogOut />} 
              label="Sair" 
              to="/logout" 
            />
          </div>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-crypto-card bg-crypto-darker px-6">
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin</span>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

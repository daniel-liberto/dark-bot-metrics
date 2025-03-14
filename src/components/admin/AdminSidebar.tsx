
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  LineChart, 
  Settings, 
  LogOut, 
  ShieldAlert,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
  isCollapsed?: boolean;
}

const AdminSidebarItem = ({ icon, label, to, active, onClick, isCollapsed }: AdminSidebarItemProps) => {
  // If there's a "to" prop, render a Link, otherwise render a Button
  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          "flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          active 
            ? "bg-crypto-card text-crypto-green" 
            : "text-gray-400 hover:bg-crypto-card hover:text-gray-100"
        )}
      >
        <div className="h-5 w-5 flex-shrink-0">{icon}</div>
        {!isCollapsed && (
          <span className="truncate">{label}</span>
        )}
      </Link>
    );
  }
  
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active 
          ? "bg-crypto-card text-crypto-green" 
          : "text-gray-400 hover:bg-crypto-card hover:text-gray-100"
      )}
    >
      <div className="h-5 w-5 flex-shrink-0">{icon}</div>
      {!isCollapsed && (
        <span className="truncate">{label}</span>
      )}
    </Button>
  );
};

interface AdminSidebarProps {
  isCollapsed?: boolean;
}

export function AdminSidebar({ isCollapsed = false }: AdminSidebarProps) {
  const location = useLocation();
  const path = location.pathname;
  
  const goToMainApp = () => {
    window.location.href = "/";
  };
  
  return (
    <aside className={cn(
      "flex h-full flex-col border-r border-crypto-card bg-crypto-darker shadow-xl",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-center p-4">
        {!isCollapsed ? (
          <div className="flex items-center">
            <ShieldAlert className="h-6 w-6 mr-2 text-crypto-green" />
            <span className="font-bold text-white">Admin Panel</span>
          </div>
        ) : (
          <ShieldAlert className="h-8 w-8 text-crypto-green" />
        )}
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        <AdminSidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/" 
          active={path === "/" || path === "/admin"} 
          isCollapsed={isCollapsed}
        />
        <AdminSidebarItem 
          icon={<Users />} 
          label="Usuários" 
          to="/users" 
          active={path.includes("/users")} 
          isCollapsed={isCollapsed}
        />
        <AdminSidebarItem 
          icon={<CreditCard />} 
          label="Pagamentos" 
          to="/payments"
          active={path === "/payments"}
          isCollapsed={isCollapsed}
        />
        <AdminSidebarItem 
          icon={<LineChart />} 
          label="Estatísticas" 
          to="/stats"
          active={path === "/stats"}
          isCollapsed={isCollapsed}
        />
        <AdminSidebarItem 
          icon={<Home />} 
          label="Voltar ao App" 
          onClick={goToMainApp}
          isCollapsed={isCollapsed}
        />
      </nav>
      
      <div className="border-t border-crypto-card p-4">
        <AdminSidebarItem 
          icon={<Settings />} 
          label="Configurações" 
          to="/settings"
          active={path === "/settings"}
          isCollapsed={isCollapsed}
        />
        <AdminSidebarItem 
          icon={<LogOut />} 
          label="Sair" 
          to="/logout"
          active={path === "/logout"}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}

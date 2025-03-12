
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Bot, 
  LineChart, 
  History, 
  Settings, 
  LogOut, 
  Wallet,
  Bitcoin
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  badge?: number;
}

const SidebarItem = ({ icon, label, to, active, badge }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active 
          ? "bg-crypto-card text-crypto-green" 
          : "text-gray-400 hover:bg-crypto-card hover:text-gray-100"
      )}
    >
      <div className="h-5 w-5">{icon}</div>
      <span>{label}</span>
      {badge ? (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-crypto-green px-1.5 text-[10px] font-medium text-black">
          {badge}
        </span>
      ) : null}
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-crypto-card bg-crypto-darker p-4">
      <div className="flex items-center gap-3 px-3 py-4">
        <Bitcoin className="h-8 w-8 text-crypto-green" />
        <div>
          <h1 className="text-xl font-bold text-white">CryptoBot</h1>
          <p className="text-xs text-crypto-muted">Trading Dashboard</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 py-4">
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/" 
          active={location.pathname === "/"} 
        />
        <SidebarItem 
          icon={<Bot />} 
          label="Meus Bots" 
          to="/bots" 
          active={location.pathname === "/bots"} 
        />
        <SidebarItem 
          icon={<Wallet />} 
          label="Carteira" 
          to="/wallet" 
          active={location.pathname === "/wallet"} 
        />
        <SidebarItem 
          icon={<LineChart />} 
          label="Performance" 
          to="/performance" 
          active={location.pathname === "/performance"} 
        />
        <SidebarItem 
          icon={<History />} 
          label="Histórico" 
          to="/history" 
          active={location.pathname === "/history"} 
          badge={3}
        />
      </nav>
      
      <div className="border-t border-crypto-card pt-4">
        <SidebarItem icon={<Settings />} label="Configurações" to="/settings" />
        <SidebarItem icon={<LogOut />} label="Sair" to="/logout" />
      </div>
    </aside>
  );
}

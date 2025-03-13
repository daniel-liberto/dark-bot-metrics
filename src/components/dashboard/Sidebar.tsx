
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
  Wallet
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
  const path = location.pathname;
  
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-crypto-card bg-crypto-darker p-4">
      <div className="flex items-center justify-center px-3 py-4">
        <img 
          src="/lovable-uploads/95b69adc-6713-4820-a66e-318c6416adbc.png" 
          alt="Earn with AI" 
          className="h-10 object-contain logo-glow" 
        />
      </div>
      
      <nav className="flex-1 space-y-1 py-4">
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/" 
          active={path === "/"} 
        />
        <SidebarItem 
          icon={<Bot />} 
          label="Minhas Operações" 
          to="/bots" 
          active={path === "/bots"} 
        />
        <SidebarItem 
          icon={<Wallet />} 
          label="Carteira" 
          to="/wallet" 
          active={path === "/wallet"} 
        />
        <SidebarItem 
          icon={<LineChart />} 
          label="Performance" 
          to="/performance" 
          active={path === "/performance"} 
        />
        <SidebarItem 
          icon={<History />} 
          label="Logs do Bot" 
          to="/history" 
          active={path === "/history"} 
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

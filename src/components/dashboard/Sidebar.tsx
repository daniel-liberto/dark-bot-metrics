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
  ShieldAlert
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  badge?: number;
  isCollapsed?: boolean;
}

const SidebarItem = ({ icon, label, to, active, badge, isCollapsed }: SidebarItemProps) => {
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
      <div className="h-5 w-5 flex-shrink-0">{icon}</div>
      {!isCollapsed && (
        <>
          <span className="truncate">{label}</span>
          {badge ? (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-crypto-green px-1.5 text-[10px] font-medium text-black">
              {badge}
            </span>
          ) : null}
        </>
      )}
    </Link>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <aside className={cn(
      "flex h-full flex-col border-r border-crypto-card bg-crypto-darker shadow-xl",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-center p-4">
        {!isCollapsed ? (
          <img 
            src="/lovable-uploads/95b69adc-6713-4820-a66e-318c6416adbc.png" 
            alt="Earn with AI" 
            className="h-10 object-contain logo-glow" 
          />
        ) : (
          <img 
            src="/lovable-uploads/95b69adc-6713-4820-a66e-318c6416adbc.png" 
            alt="Logo" 
            className="h-10 w-10 object-contain logo-glow" 
            style={{ objectFit: 'cover', objectPosition: 'left' }}
          />
        )}
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          to="/" 
          active={path === "/"} 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<Bot />} 
          label="Minhas Operações" 
          to="/bots" 
          active={path === "/bots"} 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<Wallet />} 
          label="Carteira" 
          to="/wallet" 
          active={path === "/wallet"} 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<LineChart />} 
          label="Performance" 
          to="/performance" 
          active={path === "/performance"} 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<History />} 
          label="Logs do Bot" 
          to="/history" 
          active={path === "/history"} 
          badge={isCollapsed ? undefined : 3} 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<ShieldAlert />} 
          label="Admin Dashboard" 
          to="/admin" 
          active={path.startsWith("/admin")} 
          isCollapsed={isCollapsed}
        />
      </nav>
      
      <div className="border-t border-crypto-card p-4">
        <SidebarItem 
          icon={<Settings />} 
          label="Configurações" 
          to="/settings" 
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={<LogOut />} 
          label="Sair" 
          to="/logout" 
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}

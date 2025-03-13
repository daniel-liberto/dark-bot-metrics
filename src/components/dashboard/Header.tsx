import { ChevronDown, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  children?: React.ReactNode;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

export function Header({ children, isSidebarOpen = true, toggleSidebar }: HeaderProps) {
  const [hideValues, setHideValues] = useState(false);
  const allocatedBalance = "R$ 8.250,00";
  const userCredits = 500; // Valor de exemplo para os créditos do usuário
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-crypto-card bg-crypto-darker px-6">
      <div className="flex items-center gap-2">
        {children}
        
        {/* Botão de toggle para dispositivos mobile já existe no children */}
        
        {/* Botão de toggle para desktop */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden lg:flex h-9 w-9 p-0 rounded-full text-gray-400 hover:bg-crypto-card hover:text-crypto-green border border-crypto-card"
          onClick={() => toggleSidebar && toggleSidebar()}
          aria-label={isSidebarOpen ? "Colapsar sidebar" : "Expandir sidebar"}
        >
          {isSidebarOpen ? 
            <ChevronLeft className="h-5 w-5" /> : 
            <ChevronRight className="h-5 w-5" />
          }
        </Button>
        
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>
      
      <div className="flex items-center">
        <div className="hidden md:flex items-center gap-4 ml-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Saldo Alocado:</span>
            <span className="text-sm font-bold text-crypto-green">
              {hideValues ? "••••••••" : allocatedBalance}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setHideValues(!hideValues)}
            >
              {hideValues ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-crypto-green border border-crypto-darker"></span>
          </div>
          
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-white">Usuário Fulano</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs font-medium text-crypto-green">{hideValues ? "••••" : `${userCredits} Créditos`}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

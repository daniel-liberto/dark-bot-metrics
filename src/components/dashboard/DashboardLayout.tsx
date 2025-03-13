
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detectar se é um dispositivo móvel com base na largura da tela
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (window.innerWidth >= 1024 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    // Verificar no carregamento inicial
    checkMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);
    
    // Limpar listener quando componente for desmontado
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-crypto-darker text-white overflow-hidden">
      {/* Sidebar com animação de transição */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        }`}
      >
        <Sidebar isCollapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-400 lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </Header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

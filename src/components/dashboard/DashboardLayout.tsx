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
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é um dispositivo móvel com base na largura da tela
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Em dispositivos móveis, a sidebar deve começar fechada
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    // Verificar no carregamento inicial
    checkMobile();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);
    
    // Limpar listener quando componente for desmontado
    return () => window.removeEventListener('resize', checkMobile);
  }, []);  // Removida a dependência sidebarOpen para evitar loops

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <div className="flex h-screen w-screen bg-crypto-darker text-white overflow-hidden">
      {/* Sidebar com animação de transição */}
      <div 
        className={`fixed lg:relative z-20 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : isMobile ? "w-0" : "w-20"
        }`}
      >
        <div className={`h-full ${!sidebarOpen && isMobile ? "transform -translate-x-full opacity-0" : "opacity-100"} transition-all duration-300`}>
          <Sidebar isCollapsed={!sidebarOpen} />
        </div>
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          isSidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
        >
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

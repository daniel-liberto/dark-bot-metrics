
import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
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
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  // Certificar que em mobile, a sidebar será visível apenas quando explicitamente aberta
  useEffect(() => {
    if (isMobile && !sidebarOpen) {
      document.body.style.overflow = 'auto';
    } else if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden'; // Previne scroll quando sidebar está aberta em mobile
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, sidebarOpen]);

  return (
    <div className="flex h-screen w-screen bg-crypto-darker text-white overflow-hidden">
      {/* Overlay para mobile quando a sidebar está aberta */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 z-10 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar com animação de transição */}
      <div 
        className={`fixed lg:relative z-30 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0 w-64" : isMobile ? "-translate-x-full w-64" : "w-20"
        }`}
      >
        <AdminSidebar isCollapsed={!sidebarOpen && !isMobile} />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-crypto-card bg-crypto-darker px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-gray-400 lg:hidden flex items-center justify-center mr-4"
              onClick={toggleSidebar}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">Painel de Administração</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Admin</span>
            <div className="h-10 w-10 rounded-full bg-crypto-green" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}


import { StatCard } from "@/components/dashboard/StatCard";
import { BotPerformanceChart } from "@/components/dashboard/BotPerformanceChart";
import { BotOperationTable } from "@/components/dashboard/BotOperationTable";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const goToMainApp = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-crypto-darker p-6">
      {/* Admin Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToMainApp}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl font-bold text-gradient-subtle">Painel Administrativo</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Administrador</span>
          <div className="h-10 w-10 rounded-full bg-crypto-green" />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Usuários Ativos" 
            value="1,240" 
            change={8.5} 
            icon="wallet"
            type="success"
          />
          <StatCard 
            title="Créditos Vendidos" 
            value="25,380" 
            change={12.3} 
            icon="coins"
            type="default"
          />
          <StatCard 
            title="Bots em Execução" 
            value="156" 
            change={5.7} 
            icon="bot"
            type="default"
          />
          <StatCard 
            title="Receita Mensal" 
            value="R$ 48,235.75" 
            change={15.2} 
            icon="trending-up"
            type="success"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          <BotPerformanceChart />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <BotOperationTable 
            type="active" 
            title="Operações Ativas de Usuários" 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

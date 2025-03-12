
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { BotPerformanceChart } from "@/components/dashboard/BotPerformanceChart";
import { BotOperationTable } from "@/components/dashboard/BotOperationTable";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient-subtle">Resumo de Performance</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Saldo Disponível" 
            value="$12,340.50" 
            change={3.8} 
            icon="wallet"
            type="success"
          />
          <StatCard 
            title="Saldo Alocado" 
            value="$8,250.00" 
            change={5.2} 
            icon="coins"
            type="default"
          />
          <StatCard 
            title="Operações Ativas" 
            value="8" 
            change={2.0} 
            icon="bot"
            type="default"
          />
          <StatCard 
            title="Unrealized PNL" 
            value="+$1,235.75" 
            change={12.3} 
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
            title="Bots em Operação" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

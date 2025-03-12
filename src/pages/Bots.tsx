
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { BotOperationTable } from "@/components/dashboard/BotOperationTable";

const Bots = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient-subtle">Meus Bots</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            title="Unrealized PNL" 
            value="+$1,235.75" 
            change={12.3} 
            icon="trending-up"
            type="success"
          />
        </div>

        <div className="space-y-6">
          <BotOperationTable 
            type="active" 
            title="Bots em Operação" 
          />
          <BotOperationTable 
            type="finished" 
            title="Bots Finalizados" 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bots;

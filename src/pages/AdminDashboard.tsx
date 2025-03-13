
import { StatCard } from "@/components/dashboard/StatCard";
import { BotPerformanceChart } from "@/components/dashboard/BotPerformanceChart";
import { BotOperationTable } from "@/components/dashboard/BotOperationTable";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gradient-subtle">Painel Administrativo</h2>
      
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
  );
};

export default AdminDashboard;

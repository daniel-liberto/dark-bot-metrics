
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { BotPerformanceChart } from "@/components/dashboard/BotPerformanceChart";
import { BotTable } from "@/components/dashboard/BotTable";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient-subtle">Resumo de Performance</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Bots Ativos" 
            value="5" 
            change={8.2} 
            icon="bot"
            type="default"
            percentage={62}
          />
          <StatCard 
            title="Lucro Total" 
            value="+$2,458.30" 
            change={12.3} 
            icon="wallet"
            type="success"
            percentage={78}
          />
          <StatCard 
            title="Transações Hoje" 
            value="156" 
            change={-4.5} 
            icon="time"
            type="default"
            percentage={48}
          />
          <StatCard 
            title="Win Rate" 
            value="65.8%" 
            change={3.2} 
            icon="bot"
            type="default"
            percentage={66}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          <BotPerformanceChart />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <BotTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;

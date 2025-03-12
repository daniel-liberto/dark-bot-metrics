
import { StatCard } from "@/components/dashboard/StatCard";
import { BotOperationTable } from "@/components/dashboard/BotOperationTable";
import { AvailableBotCard } from "@/components/dashboard/AvailableBotCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Bots = () => {
  return (
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-white">Bots Disponíveis</h3>
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AvailableBotCard
            name="Bitcoin DCA Bot"
            pair="BTC/USDT"
            startDate="2024-06-01"
            pnl={+8.7}
            imageType="microchip"
          />
          <AvailableBotCard
            name="Ethereum Grid"
            pair="ETH/USDT"
            startDate="2024-05-15"
            pnl={+12.3}
            imageType="cpu"
          />
          <AvailableBotCard
            name="Solana Swing Trader"
            pair="SOL/USDT"
            startDate="2024-05-28"
            pnl={+4.2}
            imageType="bot"
          />
          <AvailableBotCard
            name="Ripple Momentum"
            pair="XRP/USDT"
            startDate="2024-06-05"
            pnl={-1.8}
            imageType="cpu"
          />
        </div>
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
  );
};

export default Bots;

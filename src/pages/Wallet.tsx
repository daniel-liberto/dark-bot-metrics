import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreditCard, ArrowRight, Plus, Wallet as WalletIcon, Coins, CreditCardIcon } from "lucide-react";

const Wallet = () => {
  const [creditAmount, setCreditAmount] = useState<string>("");

  const handleAddCredits = () => {
    console.log("Adding credits:", creditAmount);
    // Here would be the logic to add credits
    setCreditAmount("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient-subtle">Minha Carteira</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            title="Créditos Disponíveis" 
            value="5,000" 
            icon="trending-up"
            type="success"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="bg-crypto-card border-crypto-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-xl">Adicionar Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="credits" className="text-sm text-gray-400">
                    Quantidade de Créditos
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="credits"
                      placeholder="1000"
                      value={creditAmount}
                      onChange={(e) => setCreditAmount(e.target.value)}
                      className="bg-crypto-darker border-crypto-darker text-white"
                    />
                    <Button 
                      onClick={handleAddCredits}
                      className="bg-crypto-green hover:bg-crypto-green/80 text-black"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md bg-crypto-darker p-4">
                  <div className="text-sm text-gray-400 mb-2">Métodos de Pagamento</div>
                  <div className="flex items-center gap-3 p-2 rounded border border-crypto-card hover:border-crypto-green cursor-pointer">
                    <CreditCard className="h-5 w-5 text-crypto-green" />
                    <span className="text-white">Cartão de Crédito</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-crypto-card border-crypto-card overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-xl">Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Adição de Créditos", date: "24/06/2023", amount: "+1,000", status: "Concluído" },
                  { type: "Alocação para Bot", date: "22/06/2023", amount: "-500", status: "Concluído" },
                  { type: "Adição de Créditos", date: "15/06/2023", amount: "+2,500", status: "Concluído" }
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-crypto-darker">
                    <div className="flex items-center gap-3">
                      {transaction.amount.startsWith("+") ? (
                        <div className="p-2 rounded-full bg-crypto-gain/10 text-crypto-gain">
                          <Plus className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-crypto-loss/10 text-crypto-loss">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-white">{transaction.type}</div>
                        <div className="text-xs text-gray-400">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        transaction.amount.startsWith("+") ? "text-crypto-gain" : "text-crypto-loss"
                      }`}>
                        {transaction.amount}
                      </div>
                      <div className="text-xs text-gray-400">{transaction.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;

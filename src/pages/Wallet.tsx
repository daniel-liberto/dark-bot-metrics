import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Wallet = () => {
  return (
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
          value="500" 
          icon="trending-up"
          type="success"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-crypto-card border-crypto-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">Comprar Créditos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/wallet/plans" className="block">
                <div className="rounded-md bg-crypto-darker p-4 hover:bg-crypto-darker/80 transition-colors cursor-pointer border border-crypto-card hover:border-crypto-green">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-crypto-green" />
                      <div>
                        <div className="text-white font-medium">Planos de Crédito</div>
                        <div className="text-sm text-gray-400">Economize mais com nossos planos pré-pagos</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Link>
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
                { type: "Adição de Créditos", date: "24/06/2023", amount: "+100", status: "Concluído" },
                { type: "Consumo ETH/USDT", date: "22/06/2023", amount: "-50", status: "Concluído" },
                { type: "Adição de Créditos", date: "15/06/2023", amount: "+250", status: "Concluído" }
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
  );
};

export default Wallet;

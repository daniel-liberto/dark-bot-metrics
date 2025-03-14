import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, AreaChart, PieChart, LineChart } from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados simulados para os gráficos
const dailyRevenue = [
  { date: format(subDays(new Date(), 6), "dd/MM", { locale: ptBR }), valor: 1250 },
  { date: format(subDays(new Date(), 5), "dd/MM", { locale: ptBR }), valor: 1850 },
  { date: format(subDays(new Date(), 4), "dd/MM", { locale: ptBR }), valor: 1550 },
  { date: format(subDays(new Date(), 3), "dd/MM", { locale: ptBR }), valor: 2100 },
  { date: format(subDays(new Date(), 2), "dd/MM", { locale: ptBR }), valor: 1950 },
  { date: format(subDays(new Date(), 1), "dd/MM", { locale: ptBR }), valor: 2300 },
  { date: format(new Date(), "dd/MM", { locale: ptBR }), valor: 2450 },
];

const userAcquisition = [
  { date: format(subDays(new Date(), 30), "dd/MM", { locale: ptBR }), novos: 5, retidos: 2 },
  { date: format(subDays(new Date(), 25), "dd/MM", { locale: ptBR }), novos: 8, retidos: 4 },
  { date: format(subDays(new Date(), 20), "dd/MM", { locale: ptBR }), novos: 12, retidos: 6 },
  { date: format(subDays(new Date(), 15), "dd/MM", { locale: ptBR }), novos: 15, retidos: 8 },
  { date: format(subDays(new Date(), 10), "dd/MM", { locale: ptBR }), novos: 18, retidos: 12 },
  { date: format(subDays(new Date(), 5), "dd/MM", { locale: ptBR }), novos: 22, retidos: 16 },
  { date: format(new Date(), "dd/MM", { locale: ptBR }), novos: 25, retidos: 20 },
];

const botPerformance = [
  { nome: "Trading Bot Alpha", performance: 8.7, operacoes: 352 },
  { nome: "Trading Bot Beta", performance: 6.2, operacoes: 245 },
  { nome: "Trading Bot Gamma", performance: 9.5, operacoes: 124 },
  { nome: "Trading Bot Delta", performance: 5.1, operacoes: 310 },
  { nome: "Trading Bot Epsilon", performance: 7.8, operacoes: 178 },
];

export default function AdminReports() {
  const [activeTab, setActiveTab] = useState("revenue");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold text-white">Relatórios</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
            <BarChart className="mr-2 h-4 w-4" />
            Exportar Dados
          </Button>
        </div>
      </div>
      
      <Card className="bg-crypto-card border-crypto-card overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="revenue" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-crypto-darker border-b border-crypto-card grid grid-cols-3 rounded-none">
              <TabsTrigger value="revenue" className="data-[state=active]:bg-crypto-card">
                Receita
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-crypto-card">
                Usuários
              </TabsTrigger>
              <TabsTrigger value="bots" className="data-[state=active]:bg-crypto-card">
                Performance dos Bots
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-crypto-darker border-crypto-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Receita Diária (R$)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <AreaChart className="h-16 w-16 text-crypto-green opacity-50" />
                      <p className="text-white ml-4">Gráfico de Receita Diária</p>
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-2">
                      {dailyRevenue.map((day) => (
                        <div key={day.date} className="text-center">
                          <div className="text-xs text-gray-400">{day.date}</div>
                          <div className="text-sm text-white font-medium">R$ {day.valor}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Planos Mais Vendidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Distribuição de Planos</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plano Básico</span>
                          <span className="text-white">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plano Intermediário</span>
                          <span className="text-white">40%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plano Premium</span>
                          <span className="text-white">25%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Projeção Mensal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <LineChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Projeção Mensal</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Mês atual:</span>
                          <span className="text-white">R$ 42.500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Projeção próximo mês:</span>
                          <span className="text-crypto-green">R$ 55.800</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Crescimento esperado:</span>
                          <span className="text-crypto-green">+31%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-crypto-darker border-crypto-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Aquisição de Usuários</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-crypto-green opacity-50" />
                      <p className="text-white ml-4">Gráfico de Aquisição de Usuários</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      {userAcquisition.map((period, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-400">{period.date}</span>
                          <div className="flex space-x-4">
                            <span className="text-crypto-green">Novos: {period.novos}</span>
                            <span className="text-white">Retidos: {period.retidos}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Retenção de Usuários</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <LineChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Retenção</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">1ª Semana</span>
                          <span className="text-white">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">1º Mês</span>
                          <span className="text-white">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">3 Meses</span>
                          <span className="text-white">65%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Distribuição Geográfica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Distribuição</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">São Paulo</span>
                          <span className="text-white">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rio de Janeiro</span>
                          <span className="text-white">25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Minas Gerais</span>
                          <span className="text-white">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Outros</span>
                          <span className="text-white">15%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bots" className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-crypto-darker border-crypto-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Performance dos Bots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <BarChart className="h-16 w-16 text-crypto-green opacity-50" />
                      <p className="text-white ml-4">Gráfico de Performance dos Bots</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      {botPerformance.map((bot) => (
                        <div key={bot.nome} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-white font-medium">{bot.nome}</span>
                            <span className={`${bot.performance > 7 ? 'text-crypto-green' : 'text-yellow-500'}`}>
                              {bot.performance}% ROI
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Operações: {bot.operacoes}</span>
                            <span className="text-gray-400">Últimos 30 dias</span>
                          </div>
                          <div className="w-full bg-crypto-card rounded-full h-2 mt-1">
                            <div 
                              className="bg-crypto-green h-2 rounded-full" 
                              style={{ width: `${bot.performance * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Operações por Tempo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <AreaChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Operações</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Manhã (6h-12h)</span>
                          <span className="text-white">35%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tarde (12h-18h)</span>
                          <span className="text-white">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Noite (18h-0h)</span>
                          <span className="text-white">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Madrugada (0h-6h)</span>
                          <span className="text-white">5%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-crypto-darker border-crypto-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Tipos de Operações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-crypto-green opacity-50" />
                        <p className="text-white ml-4">Gráfico de Tipos</p>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Compra</span>
                          <span className="text-white">55%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Venda</span>
                          <span className="text-white">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ratio de Sucesso</span>
                          <span className="text-crypto-green">73%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 
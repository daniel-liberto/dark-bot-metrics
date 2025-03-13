import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";
import { AlertCircle, Check, AlertTriangle, TrendingUp, Crown, Clock } from "lucide-react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Dados simulados para os gráficos
const dailyPerformanceData = [
  { name: "00:00", lucro: 0.2 },
  { name: "03:00", lucro: 0.5 },
  { name: "06:00", lucro: 0.8 },
  { name: "09:00", lucro: 0.3 },
  { name: "12:00", lucro: 1.2 },
  { name: "15:00", lucro: 0.9 },
  { name: "18:00", lucro: 1.8 },
  { name: "21:00", lucro: 2.1 },
];

const weeklyPerformanceData = [
  { name: "Dom", lucro: 1.2 },
  { name: "Seg", lucro: 1.8 },
  { name: "Ter", lucro: 2.3 },
  { name: "Qua", lucro: 1.5 },
  { name: "Qui", lucro: 2.0 },
  { name: "Sex", lucro: 3.2 },
  { name: "Sáb", lucro: 2.8 },
];

const monthlyPerformanceData = [
  { name: "Jan", lucro: 5.8 },
  { name: "Fev", lucro: 4.2 },
  { name: "Mar", lucro: 6.1 },
  { name: "Abr", lucro: 7.3 },
  { name: "Mai", lucro: 5.9 },
  { name: "Jun", lucro: 8.2 },
  { name: "Jul", lucro: 10.1 },
  { name: "Ago", lucro: 9.3 },
  { name: "Set", lucro: 11.2 },
  { name: "Out", lucro: 9.8 },
  { name: "Nov", lucro: 12.5 },
  { name: "Dez", lucro: 14.2 },
];

// Dados simulados para o ranking de usuários
const topUsersData = [
  { id: 1, nome: "Carlos Silva", retorno: 28.4, operacoes: 145, creditos: 850 },
  { id: 2, nome: "Mariana Santos", retorno: 25.6, operacoes: 132, creditos: 720 },
  { id: 3, nome: "Pedro Almeida", retorno: 22.9, operacoes: 118, creditos: 500 },
  { id: 4, nome: "Julia Costa", retorno: 21.3, operacoes: 97, creditos: 350 },
  { id: 5, nome: "Ricardo Oliveira", retorno: 19.8, operacoes: 88, creditos: 620 },
  { id: 6, nome: "Fernanda Lima", retorno: 18.5, operacoes: 76, creditos: 430 },
  { id: 7, nome: "André Martins", retorno: 17.2, operacoes: 65, creditos: 280 },
];

// Define interfaces para os diferentes tipos de dados de operações
interface HourlyOperationData {
  hour: string;
  volume: number;
}

interface WeeklyOperationData {
  day: string;
  volume: number;
}

interface MonthlyOperationData {
  month: string;
  volume: number;
}

type OperationData = HourlyOperationData | WeeklyOperationData | MonthlyOperationData;

// Dados simulados para distribuição temporal de operações (diário)
const hourlyOperationsData: HourlyOperationData[] = [
  { hour: "00:00", volume: 42 },
  { hour: "01:00", volume: 28 },
  { hour: "02:00", volume: 15 },
  { hour: "03:00", volume: 8 },
  { hour: "04:00", volume: 12 },
  { hour: "05:00", volume: 18 },
  { hour: "06:00", volume: 25 },
  { hour: "07:00", volume: 45 },
  { hour: "08:00", volume: 65 },
  { hour: "09:00", volume: 80 },
  { hour: "10:00", volume: 95 },
  { hour: "11:00", volume: 110 },
  { hour: "12:00", volume: 125 },
  { hour: "13:00", volume: 115 },
  { hour: "14:00", volume: 105 },
  { hour: "15:00", volume: 130 },
  { hour: "16:00", volume: 145 },
  { hour: "17:00", volume: 160 },
  { hour: "18:00", volume: 135 },
  { hour: "19:00", volume: 110 },
  { hour: "20:00", volume: 85 },
  { hour: "21:00", volume: 70 },
  { hour: "22:00", volume: 55 },
  { hour: "23:00", volume: 48 },
];

// Dados simulados para distribuição temporal de operações (semanal)
const weeklyOperationsData: WeeklyOperationData[] = [
  { day: "Seg", volume: 720 },
  { day: "Ter", volume: 680 },
  { day: "Qua", volume: 750 },
  { day: "Qui", volume: 810 },
  { day: "Sex", volume: 950 },
  { day: "Sáb", volume: 670 },
  { day: "Dom", volume: 580 },
];

// Dados simulados para distribuição temporal de operações (mensal)
const monthlyOperationsData: MonthlyOperationData[] = [
  { month: "Jan", volume: 18500 },
  { month: "Fev", volume: 16800 },
  { month: "Mar", volume: 19200 },
  { month: "Abr", volume: 21500 },
  { month: "Mai", volume: 23800 },
  { month: "Jun", volume: 22600 },
  { month: "Jul", volume: 25400 },
  { month: "Ago", volume: 26900 },
  { month: "Set", volume: 28300 },
  { month: "Out", volume: 27100 },
  { month: "Nov", volume: 29800 },
  { month: "Dez", volume: 31200 },
];

// Definindo tipos para os períodos
type PerformancePeriod = "daily" | "weekly" | "monthly";
type BotStatus = "active" | "warning" | "error";

// Renderizadores condicionais para diferentes status do bot
const botStatusRenderers: Record<BotStatus, ReactNode> = {
  active: (
    <>
      <div className="h-16 w-16 rounded-full bg-crypto-green/10 flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-crypto-green" />
      </div>
      <h3 className="text-xl font-semibold text-crypto-green mb-2">Operando Normalmente</h3>
      <p className="text-sm text-gray-400">Todas as funcionalidades estão ativas</p>
    </>
  ),
  warning: (
    <>
      <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-yellow-500" />
      </div>
      <h3 className="text-xl font-semibold text-yellow-500 mb-2">Atenção Necessária</h3>
      <p className="text-sm text-gray-400">Há alertas que precisam de verificação</p>
    </>
  ),
  error: (
    <>
      <div className="h-16 w-16 rounded-full bg-crypto-loss/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-crypto-loss" />
      </div>
      <h3 className="text-xl font-semibold text-crypto-loss mb-2">Problemas Detectados</h3>
      <p className="text-sm text-gray-400">Há problemas que requerem atenção imediata</p>
    </>
  ),
};

const AdminDashboard = () => {
  const [performancePeriod, setPerformancePeriod] = useState<PerformancePeriod>("daily");
  const [operationsPeriod, setOperationsPeriod] = useState<PerformancePeriod>("daily");
  
  // Função para selecionar os dados de performance baseado no período
  const getPerformanceData = () => {
    switch (performancePeriod) {
      case "daily":
        return dailyPerformanceData;
      case "weekly":
        return weeklyPerformanceData;
      case "monthly":
        return monthlyPerformanceData;
      default:
        return dailyPerformanceData;
    }
  };
  
  // Função para selecionar os dados de operações baseado no período
  const getOperationsData = (): OperationData[] => {
    switch (operationsPeriod) {
      case "daily":
        return hourlyOperationsData;
      case "weekly":
        return weeklyOperationsData;
      case "monthly":
        return monthlyOperationsData;
      default:
        return hourlyOperationsData;
    }
  };
  
  // Função para obter o valor máximo e a média das operações
  const getOperationsStats = () => {
    const data = getOperationsData();
    let maxVolume = 0;
    let maxPeriod = "";
    let totalVolume = 0;
    
    data.forEach(item => {
      const volume = item.volume;
      if (volume > maxVolume) {
        maxVolume = volume;
        maxPeriod = operationsPeriod === "daily" 
          ? (item as HourlyOperationData).hour 
          : operationsPeriod === "weekly" 
            ? (item as WeeklyOperationData).day 
            : (item as MonthlyOperationData).month;
      }
      totalVolume += volume;
    });
    
    const avgVolume = Math.round(totalVolume / data.length);
    
    return {
      maxVolume,
      maxPeriod,
      avgVolume
    };
  };
  
  // Função para obter o rótulo correto baseado no período
  const getOperationsXAxisKey = (): string => {
    switch (operationsPeriod) {
      case "daily":
        return "hour";
      case "weekly":
        return "day";
      case "monthly":
        return "month";
      default:
        return "hour";
    }
  };
  
  // Função para obter o título da legenda baseado no período
  const getOperationsPeriodLabel = (): string => {
    switch (operationsPeriod) {
      case "daily":
        return "Horário";
      case "weekly":
        return "Dia";
      case "monthly":
        return "Mês";
      default:
        return "Horário";
    }
  };
  
  const operationsStats = getOperationsStats();
  
  // Estado do bot (ativo, com alertas, ou com erro)
  const botStatus: BotStatus = "active";
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gradient-subtle">Visão Geral</h2>
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total de Usuários" 
          value="2,453" 
          change={12.5} 
          icon="wallet"
          type="default"
        />
        <StatCard 
          title="Usuários Ativos Hoje" 
          value="642" 
          change={8.3} 
          icon="wallet"
          type="success"
        />
        <StatCard 
          title="Operações Ativas" 
          value="156" 
          change={5.7} 
          icon="bot"
          type="default"
        />
        <StatCard 
          title="Volume Negociado" 
          value="$1,458,235" 
          change={15.2} 
          icon="trending-up"
          type="success"
        />
      </div>
      
      {/* Gráficos de Performance */}
      <Card className="bg-crypto-card border-crypto-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-xl">Performance do Bot</CardTitle>
            <div className="flex items-center space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${performancePeriod === "daily" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                onClick={() => setPerformancePeriod("daily")}
              >
                Diário
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${performancePeriod === "weekly" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                onClick={() => setPerformancePeriod("weekly")}
              >
                Semanal
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${performancePeriod === "monthly" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                onClick={() => setPerformancePeriod("monthly")}
              >
                Mensal
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getPerformanceData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" tick={{ fill: '#888' }} />
                <YAxis tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#222', 
                    border: '1px solid #444',
                    borderRadius: '4px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Lucro']}
                />
                <defs>
                  <linearGradient id="gradientLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="lucro" 
                  stroke="#00ff9d" 
                  strokeWidth={2}
                  fill="url(#gradientLucro)"
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6, stroke: '#00ff9d', strokeWidth: 2 }} 
                  name="Lucro (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-crypto-darker rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Retorno Médio</p>
                  <p className="text-2xl font-bold text-white mt-1">8.3%</p>
                </div>
                <div className="p-2 rounded-full bg-crypto-green/10">
                  <TrendingUp className="h-5 w-5 text-crypto-green" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-crypto-green flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +2.5% em relação ao período anterior
                </p>
              </div>
            </div>
            
            <div className="bg-crypto-darker rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">76.4%</p>
                </div>
                <div className="p-2 rounded-full bg-crypto-green/10">
                  <Check className="h-5 w-5 text-crypto-green" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-crypto-green flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +1.2% em relação ao período anterior
                </p>
              </div>
            </div>
            
            <div className="bg-crypto-darker rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Volume Operado</p>
                  <p className="text-2xl font-bold text-white mt-1">$345,780</p>
                </div>
                <div className="p-2 rounded-full bg-crypto-green/10">
                  <TrendingUp className="h-5 w-5 text-crypto-green" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-crypto-green flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +12.7% em relação ao período anterior
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Status do Bot e Distribuição Temporal de Operações */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Status do Bot */}
        <Card className="md:col-span-1 bg-crypto-card border-crypto-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-xl">Status do Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              {botStatusRenderers[botStatus]}
              
              <div className="w-full mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">99.8%</span>
                </div>
                <div className="w-full bg-crypto-darker rounded-full h-2">
                  <div className="bg-crypto-green h-2 rounded-full" style={{ width: "99.8%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Distribuição Temporal de Operações */}
        <Card className="md:col-span-2 bg-crypto-card border-crypto-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-xl flex items-center">
                <Clock className="mr-2 h-5 w-5 text-crypto-green" />
                Distribuição Temporal de Operações
              </CardTitle>
              <div className="flex items-center space-x-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${operationsPeriod === "daily" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                  onClick={() => setOperationsPeriod("daily")}
                >
                  Diário
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${operationsPeriod === "weekly" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                  onClick={() => setOperationsPeriod("weekly")}
                >
                  Semanal
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${operationsPeriod === "monthly" ? "bg-crypto-green text-black" : "bg-crypto-darker text-gray-400 hover:text-white"}`}
                  onClick={() => setOperationsPeriod("monthly")}
                >
                  Mensal
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pt-2">
              <div className="text-xs text-gray-400 mb-4">
                Análise do volume de operações por período para identificação de picos de atividade
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getOperationsData()}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2D3A" vertical={false} />
                    <XAxis 
                      dataKey={getOperationsXAxisKey()} 
                      stroke="#6C7293" 
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#2A2D3A' }}
                      interval={operationsPeriod === "daily" ? 3 : 0}
                    />
                    <YAxis 
                      stroke="#6C7293" 
                      tickLine={false}
                      axisLine={{ stroke: '#2A2D3A' }}
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1E1F2B', 
                        borderColor: '#2A2D3A', 
                        color: '#fff',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value} operações`, 'Volume']}
                      labelFormatter={(label: string) => `${getOperationsPeriodLabel()}: ${label}`}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#073929" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <Bar 
                      dataKey="volume" 
                      name="Volume de Operações" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-crypto-darker rounded-lg p-3">
                  <p className="text-xs text-gray-400">{operationsPeriod === "daily" ? "Horário" : operationsPeriod === "weekly" ? "Dia" : "Mês"} de Pico</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {operationsStats.maxPeriod} ({operationsStats.maxVolume} ops)
                  </p>
                </div>
                <div className="bg-crypto-darker rounded-lg p-3">
                  <p className="text-xs text-gray-400">Média {operationsPeriod === "daily" ? "Horária" : operationsPeriod === "weekly" ? "Diária" : "Mensal"}</p>
                  <p className="text-lg font-bold text-white mt-1">{operationsStats.avgVolume} operações</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Ranking de Usuários */}
      <Card className="bg-crypto-card border-crypto-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-xl flex items-center">
            <Crown className="mr-2 h-5 w-5 text-yellow-500" />
            Ranking de Usuários (Maior Retorno)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-crypto-card">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">#</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Usuário</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Retorno %</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Operações</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Créditos</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {topUsersData.map((user, index) => (
                  <tr key={user.id} className="border-b border-crypto-darker hover:bg-crypto-darker/50">
                    <td className="py-3 px-4">
                      {index === 0 ? (
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-xs font-bold text-black">1</div>
                      ) : index === 1 ? (
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-400 text-xs font-bold text-black">2</div>
                      ) : index === 2 ? (
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700 text-xs font-bold text-black">3</div>
                      ) : (
                        <div className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-crypto-darker text-xs font-medium text-gray-400">{index + 1}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{user.nome}</td>
                    <td className="py-3 px-4 text-right text-crypto-green font-semibold">+{user.retorno}%</td>
                    <td className="py-3 px-4 text-right text-gray-300">{user.operacoes}</td>
                    <td className="py-3 px-4 text-right text-gray-300">{user.creditos}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-xs bg-crypto-darker hover:bg-crypto-darker/80 text-gray-400 hover:text-white py-1 px-3 rounded">
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
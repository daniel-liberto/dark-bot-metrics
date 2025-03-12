
import { useState } from "react";
import { Bot, ArrowUp, ArrowDown, MoreVertical, Play, Pause } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

interface BotData {
  id: string;
  name: string;
  type: string;
  status: "active" | "paused" | "error";
  profit: number;
  trades: number;
  winRate: number;
  data: { value: number }[];
}

const generateChartData = () => {
  return Array.from({ length: 20 }, () => ({
    value: Math.random() * 100
  }));
};

const mockBots: BotData[] = [
  { 
    id: "1", 
    name: "Bitcoin Hunter", 
    type: "BTC/USDT", 
    status: "active", 
    profit: 12.3, 
    trades: 145, 
    winRate: 68.5,
    data: generateChartData()
  },
  { 
    id: "2", 
    name: "Ethereum Scalper", 
    type: "ETH/USDT", 
    status: "active", 
    profit: 8.1, 
    trades: 98, 
    winRate: 71.2,
    data: generateChartData()
  },
  { 
    id: "3", 
    name: "Doge Trader", 
    type: "DOGE/USDT", 
    status: "paused", 
    profit: -2.4, 
    trades: 67, 
    winRate: 42.3,
    data: generateChartData()
  },
  { 
    id: "4", 
    name: "Solana Bot", 
    type: "SOL/USDT", 
    status: "error", 
    profit: 0, 
    trades: 11, 
    winRate: 0,
    data: generateChartData()
  },
  { 
    id: "5", 
    name: "Cardano Swing", 
    type: "ADA/USDT", 
    status: "active", 
    profit: 5.7, 
    trades: 72, 
    winRate: 63.9,
    data: generateChartData()
  },
];

const LineChartComponent = ({ data, profit }: { data: { value: number }[], profit: number }) => {
  return (
    <ResponsiveContainer width={120} height={40}>
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={profit >= 0 ? "#c8f906" : "#ff4e4e"}
          strokeWidth={1.5} 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export function BotTable() {
  const [bots, setBots] = useState<BotData[]>(mockBots);
  
  const toggleBotStatus = (id: string) => {
    setBots(prevBots => 
      prevBots.map(bot => 
        bot.id === id 
          ? { 
              ...bot, 
              status: bot.status === "active" ? "paused" : "active" 
            } 
          : bot
      )
    );
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-crypto-green/10 text-crypto-green border-crypto-green/20">
            Ativo
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Pausado
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-crypto-loss/10 text-crypto-loss border-crypto-loss/20">
            Erro
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className="bg-crypto-card border-crypto-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Bots Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-crypto-card hover:bg-transparent">
              <TableHead className="text-gray-400">Bot</TableHead>
              <TableHead className="text-gray-400">Par</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Performance</TableHead>
              <TableHead className="text-gray-400 text-right">Lucro</TableHead>
              <TableHead className="text-gray-400 text-right">Trades</TableHead>
              <TableHead className="text-gray-400 text-right">Win Rate</TableHead>
              <TableHead className="text-gray-400 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bots.map((bot) => (
              <TableRow 
                key={bot.id} 
                className="border-crypto-card hover:bg-crypto-card-hover"
              >
                <TableCell className="font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4 text-crypto-green" />
                  {bot.name}
                </TableCell>
                <TableCell>{bot.type}</TableCell>
                <TableCell>{getStatusBadge(bot.status)}</TableCell>
                <TableCell>
                  <LineChartComponent data={bot.data} profit={bot.profit} />
                </TableCell>
                <TableCell className={cn(
                  "text-right font-medium",
                  bot.profit > 0 ? "text-crypto-gain" : bot.profit < 0 ? "text-crypto-loss" : "text-gray-400"
                )}>
                  <div className="flex items-center justify-end gap-1">
                    {bot.profit > 0 ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : bot.profit < 0 ? (
                      <ArrowDown className="h-3 w-3" />
                    ) : null}
                    {bot.profit > 0 ? "+" : ""}{bot.profit}%
                  </div>
                </TableCell>
                <TableCell className="text-right">{bot.trades}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {bot.winRate}%
                    <div className="w-16 bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={cn(
                          "h-1.5 rounded-full",
                          bot.winRate >= 60 ? "bg-crypto-gain" : 
                          bot.winRate >= 40 ? "bg-yellow-500" : 
                          "bg-crypto-loss"
                        )}
                        style={{ width: `${bot.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBotStatus(bot.id)}
                      disabled={bot.status === "error"}
                    >
                      {bot.status === "active" ? (
                        <Pause className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Play className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-crypto-card border-crypto-card">
                        <DropdownMenuItem className="text-gray-300 cursor-pointer">
                          Editar Configurações
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 cursor-pointer">
                          Ver Histórico
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-crypto-loss cursor-pointer">
                          Excluir Bot
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

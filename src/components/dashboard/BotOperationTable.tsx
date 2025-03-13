import { Bot, Activity, Ban, ArrowUp, ArrowDown } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTableSort } from "@/hooks/useTableSort";

interface BotTableProps {
  type: "active" | "finished";
  title: string;
}

interface BotData {
  id: string;
  name: string;
  pair: string;
  profit: number;
  trades: number;
  status: "active" | "error" | "canceled" | "finished";
  startDate: string;
  endDate?: string;
}

const mockActiveBots: BotData[] = [
  {
    id: "1",
    name: "Bitcoin Hunter",
    pair: "BTC/USDT",
    profit: 12.3,
    trades: 145,
    status: "active",
    startDate: "2024-02-15",
  },
  {
    id: "2",
    name: "Ethereum Scalper",
    pair: "ETH/USDT",
    profit: -2.4,
    trades: 67,
    status: "active",
    startDate: "2024-02-18",
  },
];

const mockFinishedBots: BotData[] = [
  {
    id: "3",
    name: "Doge Trader",
    pair: "DOGE/USDT",
    profit: 5.7,
    trades: 89,
    status: "finished",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
  },
  {
    id: "4",
    name: "Solana Bot",
    pair: "SOL/USDT",
    profit: -8.2,
    trades: 34,
    status: "error",
    startDate: "2024-02-10",
    endDate: "2024-02-12",
  },
  {
    id: "5",
    name: "ADA Trading",
    pair: "ADA/USDT",
    profit: 0,
    trades: 12,
    status: "canceled",
    startDate: "2024-02-14",
    endDate: "2024-02-14",
  },
];

type SortKey = "name" | "pair" | "profit" | "trades" | "status" | "startDate" | "endDate";

export function BotOperationTable({ type, title }: BotTableProps) {
  const bots = type === "active" ? mockActiveBots : mockFinishedBots;
  const { sortConfig, requestSort } = useTableSort<SortKey>("startDate");

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return (
        <div className="ml-1 inline-flex text-gray-400">
          <ArrowUp className="h-3 w-3" />
        </div>
      );
    }
    
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1 text-crypto-green" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1 text-crypto-green" />
    );
  };

  const sortedBots = [...bots].sort((a, b) => {
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];
    
    const safeValueA = valueA ?? "";
    const safeValueB = valueB ?? "";
    
    if (safeValueA < safeValueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (safeValueA > safeValueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-crypto-green/10 text-crypto-green border-crypto-green/20">
            Ativo
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-crypto-loss/10 text-crypto-loss border-crypto-loss/20">
            Erro
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Cancelado
          </Badge>
        );
      case "finished":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
            Finalizado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-crypto-card border-crypto-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          {type === "active" ? (
            <Activity className="h-5 w-5 text-crypto-green" />
          ) : (
            <Ban className="h-5 w-5 text-gray-400" />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-crypto-card hover:bg-transparent">
              <TableHead 
                className="text-gray-400 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Bot {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer"
                onClick={() => requestSort("pair")}
              >
                <div className="flex items-center">
                  Par {getSortIcon("pair")}
                </div>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status {getSortIcon("status")}
                </div>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer text-right"
                onClick={() => requestSort("trades")}
              >
                <div className="flex items-center justify-end">
                  Trades {getSortIcon("trades")}
                </div>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer text-right"
                onClick={() => requestSort("profit")}
              >
                <div className="flex items-center justify-end">
                  Lucro {getSortIcon("profit")}
                </div>
              </TableHead>
              <TableHead 
                className="text-gray-400 cursor-pointer"
                onClick={() => requestSort("startDate")}
              >
                <div className="flex items-center">
                  Data Início {getSortIcon("startDate")}
                </div>
              </TableHead>
              {type === "finished" && (
                <TableHead 
                  className="text-gray-400 cursor-pointer"
                  onClick={() => requestSort("endDate")}
                >
                  <div className="flex items-center">
                    Data Fim {getSortIcon("endDate")}
                  </div>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBots.map((bot) => (
              <TableRow 
                key={bot.id} 
                className="border-crypto-card hover:bg-crypto-card-hover"
              >
                <TableCell className="font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4 text-crypto-green" />
                  {bot.name}
                </TableCell>
                <TableCell>{bot.pair}</TableCell>
                <TableCell>{getStatusBadge(bot.status)}</TableCell>
                <TableCell className="text-right">{bot.trades}</TableCell>
                <TableCell className={cn(
                  "text-right font-medium",
                  bot.profit > 0 ? "text-crypto-gain" : 
                  bot.profit < 0 ? "text-crypto-loss" : 
                  "text-gray-400"
                )}>
                  {bot.profit > 0 ? "+" : ""}{bot.profit}%
                </TableCell>
                <TableCell>{bot.startDate}</TableCell>
                {type === "finished" && (
                  <TableCell>{bot.endDate}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

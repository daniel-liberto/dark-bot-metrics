import { useMemo, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bot, AlertTriangle, CheckCircle, XCircle, Clock, ArrowUp, ArrowDown } from "lucide-react";

interface LogData {
  id: string;
  botName: string;
  pair: string;
  action: string;
  status: "success" | "error" | "canceled" | "active" | "warning";
  timestamp: string;
  details?: string;
}

// Dados de exemplo para logs
const mockLogs: LogData[] = [
  {
    id: "log1",
    botName: "Bitcoin Hunter",
    pair: "BTC/USDT",
    action: "Ordem de compra",
    status: "success",
    timestamp: "2024-04-10 15:23:45",
    details: "Compra de 0.05 BTC a $65,432.10"
  },
  {
    id: "log2",
    botName: "Ethereum Scalper",
    pair: "ETH/USDT",
    action: "Ordem de venda",
    status: "error",
    timestamp: "2024-04-10 14:18:22",
    details: "Falha ao vender: Saldo insuficiente"
  },
  {
    id: "log3",
    botName: "Doge Trader",
    pair: "DOGE/USDT",
    action: "Inicialização",
    status: "active",
    timestamp: "2024-04-10 12:05:10",
    details: "Bot iniciado com $5,000 de alocação"
  },
  {
    id: "log4",
    botName: "Solana Bot",
    pair: "SOL/USDT",
    action: "Stop Loss",
    status: "warning",
    timestamp: "2024-04-10 11:30:15",
    details: "Stop Loss acionado a $142.50"
  },
  {
    id: "log5",
    botName: "ADA Trading",
    pair: "ADA/USDT",
    action: "Finalização",
    status: "canceled",
    timestamp: "2024-04-09 23:45:30",
    details: "Bot finalizado pelo usuário"
  },
  {
    id: "log6",
    botName: "Bitcoin Hunter",
    pair: "BTC/USDT",
    action: "Take Profit",
    status: "success",
    timestamp: "2024-04-09 22:17:12",
    details: "Take Profit atingido a $66,800.00"
  },
  {
    id: "log7",
    botName: "Ripple Trader",
    pair: "XRP/USDT",
    action: "Ordem de compra",
    status: "success",
    timestamp: "2024-04-09 20:08:43",
    details: "Compra de 1000 XRP a $0.52"
  },
  {
    id: "log8",
    botName: "Ethereum Scalper",
    pair: "ETH/USDT",
    action: "Erro de conexão",
    status: "error",
    timestamp: "2024-04-09 18:33:21",
    details: "Falha ao conectar à API da exchange"
  },
  {
    id: "log9",
    botName: "Litecoin Bot",
    pair: "LTC/USDT",
    action: "Inicialização",
    status: "active",
    timestamp: "2024-04-09 16:22:10",
    details: "Bot iniciado com $3,000 de alocação"
  },
  {
    id: "log10",
    botName: "Solana Bot",
    pair: "SOL/USDT",
    action: "Atualização",
    status: "warning",
    timestamp: "2024-04-09 14:11:05",
    details: "Parâmetros de risco atualizados"
  }
];

interface LogsTableProps {
  searchQuery: string;
}

type SortKey = "timestamp" | "botName" | "pair" | "action" | "status";
type SortDirection = "asc" | "desc";

export function LogsTable({ searchQuery }: LogsTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "timestamp",
    direction: "desc",
  });
  
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "asc";
    
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };

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
  
  const filteredLogs = useMemo(() => {
    if (!searchQuery) return mockLogs;
    
    const query = searchQuery.toLowerCase();
    return mockLogs.filter(log => 
      log.botName.toLowerCase().includes(query) || 
      log.pair.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const sortedLogs = useMemo(() => {
    const sortableItems = [...filteredLogs];
    
    sortableItems.sort((a, b) => {
      if (sortConfig.key === "timestamp") {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        
        if (dateA < dateB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (dateA > dateB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      } else {
        const valueA = a[sortConfig.key].toLowerCase();
        const valueB = b[sortConfig.key].toLowerCase();
        
        if (valueA < valueB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }
    });
    
    return sortableItems;
  }, [filteredLogs, sortConfig]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-crypto-gain/10 text-crypto-gain border-crypto-gain/20 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Sucesso
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-crypto-loss/10 text-crypto-loss border-crypto-loss/20 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Erro
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Alerta
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Cancelado
          </Badge>
        );
      case "active":
        return (
          <Badge variant="outline" className="bg-crypto-green/10 text-crypto-green border-crypto-green/20 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Ativo
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-crypto-card hover:bg-transparent">
            <TableHead 
              className="text-gray-400 cursor-pointer"
              onClick={() => requestSort("timestamp")}
            >
              <div className="flex items-center">
                Data e Hora
                {getSortIcon("timestamp")}
              </div>
            </TableHead>
            <TableHead 
              className="text-gray-400 cursor-pointer"
              onClick={() => requestSort("botName")}
            >
              <div className="flex items-center">
                Bot
                {getSortIcon("botName")}
              </div>
            </TableHead>
            <TableHead 
              className="text-gray-400 cursor-pointer"
              onClick={() => requestSort("pair")}
            >
              <div className="flex items-center">
                Par
                {getSortIcon("pair")}
              </div>
            </TableHead>
            <TableHead 
              className="text-gray-400 cursor-pointer"
              onClick={() => requestSort("action")}
            >
              <div className="flex items-center">
                Ação
                {getSortIcon("action")}
              </div>
            </TableHead>
            <TableHead 
              className="text-gray-400 cursor-pointer"
              onClick={() => requestSort("status")}
            >
              <div className="flex items-center">
                Status
                {getSortIcon("status")}
              </div>
            </TableHead>
            <TableHead className="text-gray-400">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLogs.length > 0 ? (
            sortedLogs.map((log) => (
              <TableRow 
                key={log.id} 
                className="border-crypto-card hover:bg-crypto-card-hover"
              >
                <TableCell className="text-sm text-gray-400">{log.timestamp}</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Bot className="h-4 w-4 text-crypto-green" />
                  {log.botName}
                </TableCell>
                <TableCell>{log.pair}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell className="text-sm text-gray-300">{log.details}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                Nenhum resultado encontrado para "{searchQuery}"
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {sortedLogs.length > 0 && (
        <div className="text-sm text-gray-400 mt-4">
          Mostrando {sortedLogs.length} de {mockLogs.length} registros
        </div>
      )}
    </div>
  );
}

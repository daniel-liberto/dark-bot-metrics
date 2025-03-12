
import { useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Bot, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

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

export function LogsTable({ searchQuery }: LogsTableProps) {
  
  const filteredLogs = useMemo(() => {
    if (!searchQuery) return mockLogs;
    
    const query = searchQuery.toLowerCase();
    return mockLogs.filter(log => 
      log.botName.toLowerCase().includes(query) || 
      log.pair.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
            <TableHead className="text-gray-400">Data e Hora</TableHead>
            <TableHead className="text-gray-400">Bot</TableHead>
            <TableHead className="text-gray-400">Par</TableHead>
            <TableHead className="text-gray-400">Ação</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
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
      
      {filteredLogs.length > 0 && (
        <div className="text-sm text-gray-400 mt-4">
          Mostrando {filteredLogs.length} de {mockLogs.length} registros
        </div>
      )}
    </div>
  );
}

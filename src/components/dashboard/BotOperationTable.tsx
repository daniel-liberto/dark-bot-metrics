import { Activity, ArrowUp, ArrowDown, History } from "lucide-react";
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

type SortKey = "pair" | "profit" | "trades" | "status" | "startDate" | "endDate";

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

  const getCryptoIcon = (pair: string) => {
    const symbol = pair.split('/')[0];
    
    switch (symbol) {
      case 'BTC':
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle cx="16" cy="16" r="16" fill="#F7931A"/>
              <path fill="#FFF" fillRule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.53-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/>
            </g>
          </svg>
        );
      case 'ETH':
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle cx="16" cy="16" r="16" fill="#627EEA"/>
              <g fill="#FFF" fillRule="nonzero">
                <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
                <path d="M16.498 4L9 16.22l7.498-3.35z"/>
                <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
                <path d="M16.498 27.995v-6.028L9 17.616z"/>
                <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
                <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
              </g>
            </g>
          </svg>
        );
      case 'DOGE':
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle cx="16" cy="16" r="16" fill="#C3A634"/>
              <path fill="#FFF" d="M13.248 14.61h4.314v2.286h-4.314v4.818h2.721c1.077 0 1.958-.145 2.644-.437.686-.291 1.224-.694 1.615-1.21a4.4 4.4 0 0 0 .796-1.815 11.4 11.4 0 0 0 .21-2.252 11.4 11.4 0 0 0-.21-2.252 4.396 4.396 0 0 0-.796-1.815c-.391-.516-.93-.919-1.615-1.21-.686-.292-1.567-.437-2.644-.437h-2.721v4.325zm-2.766 2.286h-2.155v-2.285h2.155V9.333H6v13.334h4.482v-5.771z"/>
            </g>
          </svg>
        );
      case 'SOL':
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <circle cx="16" cy="16" r="16" fill="#66F9A1"/>
              <path d="M12.516 8.134a.445.445 0 0 1 .436 0l1.974 1.194a.3.3 0 0 1 .145.255v7.22c0 .19-.198.31-.362.218l-1.974-1.194a.444.444 0 0 1-.218-.382V8.352c0-.19.199-.31.362-.218zm4.505 2.716a.444.444 0 0 1 .435 0l1.974 1.194a.3.3 0 0 1 .146.254v7.22c0 .19-.199.31-.363.218l-1.974-1.194a.444.444 0 0 1-.218-.382v-7.092c0-.19.199-.31.363-.218zm-9.01 4.516a.444.444 0 0 1 .436 0l1.974 1.194a.3.3 0 0 1 .145.255v4.505c0 .19-.198.31-.362.218l-1.974-1.194a.444.444 0 0 1-.218-.382v-4.378c0-.19.198-.31.362-.218z" fill="#FFF"/>
            </g>
          </svg>
        );
      case 'ADA':
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <circle cx="16" cy="16" r="16" fill="#0033AD"/>
              <path d="M16.263 16.247c0-.149.185-.283.185-.283s.133.073.134.213c0 .14-.194.307-.194.307s-.125-.087-.125-.237zm-1.775.344s-.068-.192.08-.348c0 0 .172.009.241.13.07.12-.055.38-.055.38s-.163-.03-.266-.162zm.997 1.36s-.15-.165-.053-.362c0 0 .179-.08.304.029.126.108.122.425.122.425s-.188.038-.373-.092zm2.674-1.36s.068-.192-.08-.348c0 0-.172.009-.241.13-.7.12.055.38.055.38s.163-.03.266-.162zm-.997 1.36s.15-.165.053-.362c0 0-.179-.08-.304.029-.126.108-.122.425-.122.425s.188.038.373-.092zm2.996-1.384s.134-.193.013-.387c0 0-.17-.033-.28.072-.11.104-.064.387-.064.387s-.171.063.331-.072zm-1.586 1.733s.193-.096.238-.305c0 0-.126-.154-.273-.133-.148.021-.278.28-.278.28s-.105.171.313.158zm-3.442-1.733s-.134-.193-.013-.387c0 0 .17-.033.28.072.11.104.064.387.064.387s-.171.063-.331-.072zm1.586 1.733s-.193-.096-.238-.305c0 0 .126-.154.273-.133.148.021.278.28.278.28s-.105.171-.313.158zm-2.972-1.52s-.208-.034-.255-.242c0 0 .093-.158.243-.157.15.001.332.212.332.212s-.097.156-.32.187zm.745 1.731s-.152-.138-.114-.34c0 0 .144-.118.286-.063.142.055.241.359.241.359s-.168.126-.413.044zm5.069-1.731s.208-.034.255-.242c0 0-.093-.158-.243-.157-.15.001-.332.212-.332.212s.097.156.32.187zm-.745 1.731s.152-.138.114-.34c0 0-.144-.118-.286-.063-.142.055-.241.359-.241.359s.168.126.413.044zm-5.39-.863s-.215 0-.316-.19c0 0 .049-.188.197-.221.148-.033.38.141.38.141s-.052.201-.261.27zm.128 1.732s-.102-.184 0-.36c0 0 .17-.068.293.055.122.124.154.437.154.437s-.216.059-.447-.132zm10.374-1.732s.215 0 .316-.19c0 0-.049-.188-.197-.221-.148-.033-.38.141-.38.141s.052.201.261.27zm-.13 1.732s.103-.184 0-.36c0 0-.17-.068-.292.055-.122.124-.154.437-.154.437s.216.059.447-.132zm-8.63-1.394s-.178-.12-.178-.318c0 0 .122-.146.267-.118.146.029.27.278.27.278s-.116.173-.358.158zm-.513 1.775s-.037-.202.127-.33c0 0 .181-.001.255.148.075.15-.043.444-.043.444s-.235.012-.339-.262zm7.629-1.775s.178-.12.178-.318c0 0-.122-.146-.267-.118-.145.029-.27.278-.27.278s.116.171.359.158zm.513 1.775s.037-.202-.127-.33c0 0-.181-.001-.255.148-.075.15.043.444.043.444s.235.012.339-.262zm-.8-3.089s-.211.152-.42.066c0 0-.072-.206.06-.363.133-.157.49-.25.49-.25s.082.26-.13.547zm-1.132 6.457s.078-.23.304-.241c0 0 .113.163.047.312-.065.15-.382.316-.382.316s-.107-.17-.074-.387h.105zm-4.528-6.457s.211.152.42.066c0 0 .072-.206-.06-.363-.133-.157-.49-.25-.49-.25s-.082.26.13.547zm1.132 6.457s-.078-.23-.304-.241c0 0-.113.163-.047.312.065.15.382.316.382.316s.107-.17.074-.387h-.105zm-.26-6.602s.084.231.273.288c0 0 .136-.144.096-.302-.04-.158-.331-.405-.331-.405s-.2.107-.037.419zm-1.317 6.47s.224-.104.408.008c0 0-.028.211-.164.293-.136.082-.488.048-.488.048s-.049-.207.244-.35zm5.7-6.47s-.084.231-.273.288c0 0-.136-.144-.096-.302.04-.158.331-.405.331-.405s.2.107.037.419zm1.317 6.47s-.224-.104-.408.008c0 0 .028.211.164.293.136.082.488.048.488.048s.049-.207-.244-.35zM17.386 9.8s-.023.327-.255.545c0 0-.26-.045-.336-.25-.077-.204.126-.627.126-.627s.307-.026.465.332zm-1.862 12.419s.181-.283.461-.283c0 0 .089.242-.055.388-.144.146-.515.225-.515.225s-.112-.188.109-.33zM14.612 9.8s.023.327.255.545c0 0 .26-.045.336-.25.077-.204-.126-.627-.126-.627s-.307-.026-.465.332zm1.862 12.419s-.181-.283-.461-.283c0 0-.089.242.055.388.144.146.515.225.515.225s.112-.188-.109-.33zm-1.042-12.473s-.138.297-.398.406c0 0-.212-.167-.204-.38.009-.215.32-.54.32-.54s.268.103.282.514zm-1.186 12.253s.27-.16.494-.028c0 0-.013.225-.17.323-.157.098-.528.054-.528.054s-.076-.184.204-.349zm3.32-12.253s.138.297.398.406c0 0 .212-.167.204-.38-.009-.215-.32-.54-.32-.54s-.268.103-.282.514zm1.186 12.253s-.27-.16-.494-.028c0 0 .013.225.17.323.157.098.528.054.528.054s.076-.184-.204-.349zm1.09-11.25s.176.206.15.431c0 0-.19.09-.33-.013-.14-.104-.235-.459-.235-.459s.131-.18.414.04zm-7.6 10.121s.281.031.378.234c0 0-.105.193-.291.171-.187-.02-.468-.296-.468-.296s.073-.194.38-.11zm5.326-10.121s-.175.206-.15.431c0 0 .19.09.33-.013.14-.104.235-.459.235-.459s-.131-.18-.414.04zm7.6 10.121s-.28.031-.378.234c0 0 .105.193.291.171.187-.02.468-.296.468-.296s-.073-.194-.38-.11zm-10.34-9.29s.257.052.364.217c0 0-.09.227-.257.227-.166 0-.467-.233-.467-.233s.018-.234.36-.211zm7.988 8.374s.175.235.06.431c0 0-.216.03-.325-.125-.11-.154-.077-.535-.077-.535s.214-.053.342.23zm-5.743-8.374s-.257.052-.364.217c0 0 .09.227.257.227.166 0 .467-.233.467-.233s-.018-.234-.36-.211zm-7.988 8.374s-.175.235-.06.431c0 0 .216.03.325-.125.11-.154.077-.535.077-.535s-.214-.053-.342.23zm12.01-7.556s.253-.023.397.102c0 0-.02.226-.18.286-.162.06-.5-.097-.5-.097s-.01-.236.282-.291zm2.173 6.835s.02.302-.175.42c0 0-.206-.099-.209-.296-.003-.198.203-.456.203-.456s.193.053.18.332zm-10.05-6.835s-.252-.023-.396.102c0 0 .02.226.18.286.162.06.5-.097.5-.097s.01-.236-.283-.291zm-2.173 6.835s-.02.302.175.42c0 0 .206-.099.209-.296.003-.198-.203-.456-.203-.456s-.193.053-.18.332zm13.508-6.683s.074.172-.039.32c0 0-.177.03-.254-.1-.078-.13.005-.338.005-.338s.183-.073.288.118zm-1.053 6.585s-.08.148-.27.106c0 0-.056-.125.03-.22.086-.098.299-.11.299-.11s.031.088-.059.224zM11.41 12.03s-.074.172.039.32c0 0 .177.03.254-.1.078-.13-.005-.338-.005-.338s-.183-.073-.288.118zm1.053 6.585s.08.148.27.106c0 0 .056-.125-.03-.22-.086-.098-.299-.11-.299-.11s-.031.088.059.224z" fill="#FFF"/>
            </g>
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none">
              <circle cx="16" cy="16" r="16" fill="#627EEA"/>
              <path d="M16 6l-1.8 6 1.8 1.8 1.8-1.8z" fill="#FFF"/>
              <path d="M16 13.8l-1.8 1.8 1.8 6 1.8-6z" fill="#FFF"/>
              <path d="M16 24.6l-1.8-1.8-1.8-6h3.6z" fill="#FFF" fillOpacity=".5"/>
              <path d="M16 13.8l1.8 1.8 1.8 6h-3.6z" fill="#FFF" fillOpacity=".5"/>
              <path d="M14.2 15.6L16 13.8l1.8 1.8-1.8 1.8z" fill="#FFF" fillOpacity=".2"/>
            </g>
          </svg>
        );
    }
  };

  return (
    <Card className="bg-crypto-card border-crypto-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          {type === "active" ? (
            <Activity className="h-5 w-5 text-crypto-green" />
          ) : (
            <History className="h-5 w-5 text-crypto-green" />
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
                <TableCell className="flex items-center">
                  {getCryptoIcon(bot.pair)}
                  {bot.pair}
                </TableCell>
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


import { 
  ArrowDown, 
  ArrowUp,
  Bot,
  Wallet,
  Clock,
  Coins,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: "bot" | "wallet" | "time" | "coins" | "trending-up";
  type?: "default" | "success" | "danger";
  percentage?: number;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon,
  type = "default",
  percentage
}: StatCardProps) {
  const isPositive = change && change > 0;
  
  const getIcon = () => {
    switch (icon) {
      case "bot":
        return <Bot className="h-5 w-5" />;
      case "wallet":
        return <Wallet className="h-5 w-5" />;
      case "time":
        return <Clock className="h-5 w-5" />;
      case "coins":
        return <Coins className="h-5 w-5" />;
      case "trending-up":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Bot className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="bg-crypto-card border-crypto-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <div className="flex items-end gap-2">
              <h3 className={cn(
                "text-2xl font-bold",
                type === "success" && "text-crypto-gain",
                type === "danger" && "text-crypto-loss",
                type === "default" && "text-white"
              )}>
                {value}
              </h3>
              
              {percentage !== undefined && (
                <div className="flex items-center h-8 mb-0.5">
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full", 
                        type === "success" && "bg-crypto-gain",
                        type === "danger" && "bg-crypto-loss",
                        type === "default" && "bg-crypto-green"
                      )}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {change && (
              <p className="mt-1 flex items-center text-xs">
                {isPositive ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-crypto-gain" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-crypto-loss" />
                )}
                <span
                  className={cn(
                    isPositive ? "text-crypto-gain" : "text-crypto-loss"
                  )}
                >
                  {Math.abs(change)}% última semana
                </span>
              </p>
            )}
          </div>
          
          <div className={cn(
            "rounded-full p-3",
            type === "success" && "bg-crypto-gain/10",
            type === "danger" && "bg-crypto-loss/10",
            type === "default" && "bg-crypto-green/10"
          )}>
            <div className={cn(
              type === "success" && "text-crypto-gain",
              type === "danger" && "text-crypto-loss",
              type === "default" && "text-crypto-green"
            )}>
              {getIcon()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

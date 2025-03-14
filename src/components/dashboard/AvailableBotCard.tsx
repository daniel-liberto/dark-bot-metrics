
import { Bot, Cpu, CircuitBoard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AvailableBotCardProps {
  name: string;
  pair: string;
  startDate: string;
  pnl: number;
  imageType: "bot" | "cpu" | "circuitBoard";
}

export function AvailableBotCard({ name, pair, startDate, pnl, imageType }: AvailableBotCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getBotIcon = () => {
    switch (imageType) {
      case "bot":
        return <Bot className="h-10 w-10" />;
      case "cpu":
        return <Cpu className="h-10 w-10" />;
      case "circuitBoard":
        return <CircuitBoard className="h-10 w-10" />;
      default:
        return <Bot className="h-10 w-10" />;
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Card className="bg-crypto-card border-crypto-card overflow-hidden h-full">
        <div className="flex justify-center pt-6">
          <Avatar className="h-20 w-20 border-4 border-crypto-green bg-crypto-darker">
            <AvatarFallback className="bg-crypto-darker text-crypto-green">
              {getBotIcon()}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <CardContent className="pt-4 text-center">
          <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-400 mb-4">Pair: {pair}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Data Início</p>
              <p className="text-white font-medium">{formatDate(startDate)}</p>
            </div>
            <div>
              <p className="text-gray-400">PNL Atual</p>
              <p className={cn(
                "font-medium",
                pnl > 0 ? "text-crypto-gain" : "text-crypto-loss"
              )}>
                {pnl > 0 ? "+" : ""}{pnl}%
              </p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 justify-center pb-6">
          <Button className="w-full bg-crypto-darker hover:bg-crypto-darker/80 border border-crypto-card">
            Participar <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

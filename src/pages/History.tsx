
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, History as HistoryIcon } from "lucide-react";
import { LogsTable } from "@/components/dashboard/LogsTable";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gradient-subtle">Histórico</h2>
      
      <Card className="bg-crypto-card border-crypto-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <HistoryIcon className="h-5 w-5 text-crypto-green" />
            Logs do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome de Bot ou Par..."
              className="pl-10 bg-crypto-dark border-crypto-card-hover focus-visible:ring-crypto-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <LogsTable searchQuery={searchQuery} />
        </CardContent>
      </Card>
    </div>
  );
};

export default History;


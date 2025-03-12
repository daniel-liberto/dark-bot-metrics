
import { Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('pt-BR', options);
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-crypto-card bg-crypto-darker px-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      
      <div className="flex items-center">
        <div className="relative mr-4 w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="bg-crypto-card w-full border-0 pl-9 text-sm"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="mr-2 relative">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-crypto-green"></span>
        </Button>
        
        <div className="flex items-center gap-2 ml-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-white">Usuário</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

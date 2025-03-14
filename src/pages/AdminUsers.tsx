import { useState } from "react";
import { useTableSort } from "@/hooks/useTableSort";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  ChevronUp, 
  ChevronDown,
  PlusCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Carlos Silva",
    email: "carlos.silva@example.com",
    registrationDate: "2024-04-12",
    allocatedBalance: 5000,
    accumulatedPnl: 723.45,
    isActive: true
  },
  {
    id: "2",
    name: "Mariana Oliveira",
    email: "mariana.oliveira@example.com",
    registrationDate: "2024-03-15",
    allocatedBalance: 2500,
    accumulatedPnl: -122.30,
    isActive: false
  },
  {
    id: "3",
    name: "André Martins",
    email: "andre.martins@example.com",
    registrationDate: "2024-04-01",
    allocatedBalance: 10000,
    accumulatedPnl: 1520.85,
    isActive: true
  },
  {
    id: "4",
    name: "Juliana Costa",
    email: "juliana.costa@example.com",
    registrationDate: "2024-02-28",
    allocatedBalance: 7500,
    accumulatedPnl: 845.11,
    isActive: true
  },
  {
    id: "5",
    name: "Roberto Santos",
    email: "roberto.santos@example.com",
    registrationDate: "2024-01-15",
    allocatedBalance: 1500,
    accumulatedPnl: -450.22,
    isActive: false
  },
  {
    id: "6",
    name: "Fernanda Lima",
    email: "fernanda.lima@example.com",
    registrationDate: "2024-03-22",
    allocatedBalance: 3000,
    accumulatedPnl: 125.96,
    isActive: true
  },
  {
    id: "7",
    name: "Lucas Mendes",
    email: "lucas.mendes@example.com",
    registrationDate: "2024-04-05",
    allocatedBalance: 5000,
    accumulatedPnl: -214.75,
    isActive: true
  },
];

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { sortConfig, requestSort } = useTableSort<"name" | "registrationDate" | "allocatedBalance" | "accumulatedPnl">("registrationDate");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // Sort filtered users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortConfig.key === "registrationDate") {
      return sortConfig.direction === "asc" 
        ? new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime() 
        : new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
    } else if (sortConfig.key === "allocatedBalance") {
      return sortConfig.direction === "asc" 
        ? a.allocatedBalance - b.allocatedBalance 
        : b.allocatedBalance - a.allocatedBalance;
    } else if (sortConfig.key === "accumulatedPnl") {
      return sortConfig.direction === "asc" 
        ? a.accumulatedPnl - b.accumulatedPnl 
        : b.accumulatedPnl - a.accumulatedPnl;
    }
    return 0;
  });

  // Paginate users
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold text-white">Gerenciamento de Usuários</h1>
        <Button className="bg-crypto-green text-black hover:bg-crypto-green/80">
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <Card className="bg-crypto-card border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email"
                className="pl-10 bg-crypto-darker border-crypto-card text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
              <Filter className="mr-2 h-4 w-4" />
              Mais Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-crypto-card border-none shadow-md overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-crypto-darker">
                <TableRow>
                  <TableHead 
                    className="text-white cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Nome / Email
                      {sortConfig.key === "name" && (
                        <span className="ml-2">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-white cursor-pointer"
                    onClick={() => requestSort("registrationDate")}
                  >
                    <div className="flex items-center">
                      Data de Registro
                      {sortConfig.key === "registrationDate" && (
                        <span className="ml-2">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-white cursor-pointer"
                    onClick={() => requestSort("allocatedBalance")}
                  >
                    <div className="flex items-center">
                      Saldo / PNL
                      {sortConfig.key === "allocatedBalance" && (
                        <span className="ml-2">
                          {sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      className="border-b border-crypto-card hover:bg-crypto-darker/60 cursor-pointer"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <TableCell className="font-medium text-white">
                        <div className="flex flex-col">
                          <span>{user.name}</span>
                          <span className="text-sm text-gray-400">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatDate(user.registrationDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-white">
                            {formatCurrency(user.allocatedBalance)}
                          </span>
                          <span className={user.accumulatedPnl >= 0 ? "text-crypto-green" : "text-red-500"}>
                            {formatCurrency(user.accumulatedPnl)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <div className="flex items-center text-crypto-green">
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Ativo</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Inativo</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          className="text-white hover:bg-crypto-darker"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserClick(user.id);
                          }}
                        >
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-white">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                        className={currentPage === index + 1 ? "bg-crypto-green text-black border-crypto-green" : "text-white"}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;

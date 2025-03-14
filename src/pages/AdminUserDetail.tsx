import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  UserCheck, 
  UserX, 
  Clock, 
  CreditCard, 
  Send, 
  Edit, 
  Unlock,
  Lock,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const mockUserDetail = {
  id: "1",
  name: "Carlos Silva",
  email: "carlos.silva@example.com",
  phone: "+55 11 98765-4321",
  registrationDate: "2024-04-12",
  lastLogin: "2024-05-10T14:32:00",
  allocatedBalance: 5000,
  accumulatedPnl: 723.45,
  isActive: true,
  operations: [
    { id: "op1", timestamp: "2024-05-10T14:30:00", type: "Compra", asset: "BTCUSD", amount: 0.05, price: 47235.12, pnl: 124.56, status: "Concluída" },
    { id: "op2", timestamp: "2024-05-09T10:15:00", type: "Venda", asset: "ETHUSD", amount: 0.5, price: 2145.78, pnl: -32.45, status: "Concluída" },
    { id: "op3", timestamp: "2024-05-08T16:22:00", type: "Compra", asset: "SOLUSD", amount: 2.0, price: 143.22, pnl: 56.88, status: "Concluída" },
    { id: "op4", timestamp: "2024-05-07T09:45:00", type: "Venda", asset: "BTCUSD", amount: 0.03, price: 46985.35, pnl: 78.92, status: "Concluída" },
    { id: "op5", timestamp: "2024-05-06T11:10:00", type: "Compra", asset: "ETHUSD", amount: 0.25, price: 2178.45, pnl: -15.33, status: "Concluída" },
    { id: "op6", timestamp: "2024-05-10T15:20:00", type: "Compra", asset: "BTCUSD", amount: 0.02, price: 47315.67, pnl: 0, status: "Em andamento" }
  ],
  credits: [
    { id: "tr1", timestamp: "2024-05-01T09:22:00", amount: 2000, type: "Adição", description: "Compra de plano: Traders Pack", plan: "Traders Pack", paymentMethod: "Cartão de Crédito", price: "R$ 519,00", bonus: "R$ 259,50" },
    { id: "tr2", timestamp: "2024-04-15T16:48:00", amount: 3000, type: "Adição", description: "Compra de plano: Black Pack", plan: "Black Pack", paymentMethod: "Transferência Bancária", price: "R$ 1.557,00", bonus: "R$ 1.557,00" },
    { id: "tr3", timestamp: "2024-05-10T10:15:00", amount: 500, type: "Adição", description: "Compra de plano: Beginners Pack", plan: "Beginners Pack", paymentMethod: "PIX", price: "R$ 155,70", bonus: "R$ 25,95" },
    { id: "tr4", timestamp: "2024-04-22T14:30:00", amount: -250, type: "Uso", description: "Consumo por operação do bot", plan: null, paymentMethod: "Sistema", price: "-", bonus: null },
    { id: "tr5", timestamp: "2024-04-18T11:05:00", amount: 1000, type: "Adição", description: "Bônus de fidelidade", plan: null, paymentMethod: "Sistema", price: "R$ 0,00", bonus: "R$ 1.000,00" }
  ],
  creditSummary: {
    totalAdded: 6500,
    totalUsed: 1250,
    currentBalance: 5250,
  },
  pendingWithdrawals: [],
  activeSubsPeriod: "2024-05-01 a 2024-06-01"
};

const AdminUserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const user = mockUserDetail;
  
  const goBack = () => {
    navigate("/admin/users");
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  if (!user) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Usuário não encontrado</AlertTitle>
          <AlertDescription>
            Não foi possível encontrar o usuário com ID {userId}. 
            <Button variant="link" className="p-0 h-auto text-white underline" onClick={goBack}>
              Voltar para lista de usuários
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full text-gray-400 hover:text-white" 
            onClick={goBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Detalhes do Usuário</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensagem
          </Button>
          
          <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
            <CreditCard className="mr-2 h-4 w-4" />
            Adicionar Créditos
          </Button>
          
          <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
            <Edit className="mr-2 h-4 w-4" />
            Editar Usuário
          </Button>
          
          <Button variant="destructive" className="hover:bg-red-600/80">
            {user.isActive ? (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Congelar Conta
              </>
            ) : (
              <>
                <Unlock className="mr-2 h-4 w-4" />
                Descongelar Conta
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Card className="bg-crypto-card border-crypto-card overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-crypto-darker border-b border-crypto-card grid grid-cols-3 rounded-none">
              <TabsTrigger value="overview" className="data-[state=active]:bg-crypto-card">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="operations" className="data-[state=active]:bg-crypto-card">
                Operações
              </TabsTrigger>
              <TabsTrigger value="credits" className="data-[state=active]:bg-crypto-card">
                Créditos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-crypto-darker pb-2">
                    Informações do Usuário
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      {user.isActive ? (
                        <span className="text-crypto-green flex items-center">
                          <UserCheck className="h-4 w-4 mr-1" /> Ativo
                        </span>
                      ) : (
                        <span className="text-crypto-loss flex items-center">
                          <UserX className="h-4 w-4 mr-1" /> Inativo
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nome:</span>
                      <span className="text-white">{user.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{user.email}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Telefone:</span>
                      <span className="text-white">{user.phone}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data de Registro:</span>
                      <span className="text-white">12/04/2024</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Último Login:</span>
                      <span className="text-white flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> 10/05/2024 14:32
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-crypto-darker pb-2">
                    Informações Financeiras
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saldo Alocado:</span>
                      <span className="text-white">R$ 5.000,00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">P&L Acumulado:</span>
                      <span className="text-crypto-green">+R$ 723,45</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total de Operações:</span>
                      <span className="text-white">42</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Win Rate:</span>
                      <span className="text-white">68%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Período de Assinatura:</span>
                      <span className="text-white">01/05/2024 a 01/06/2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="operations" className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Histórico de Operações</h3>
                  <div className="flex space-x-2">
                    <Badge className="bg-crypto-green text-black">{user.operations.length} operações</Badge>
                    <Button variant="outline" size="sm" className="h-8 border-crypto-card text-white hover:bg-crypto-darker">
                      Filtrar
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md overflow-hidden">
                  <Table>
                    <TableHeader className="bg-crypto-darker">
                      <TableRow>
                        <TableHead className="text-white">Data</TableHead>
                        <TableHead className="text-white">Tipo</TableHead>
                        <TableHead className="text-white">Ativo</TableHead>
                        <TableHead className="text-white">Quantidade</TableHead>
                        <TableHead className="text-white">Preço</TableHead>
                        <TableHead className="text-white">P&L</TableHead>
                        <TableHead className="text-white">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.operations.map((operation) => (
                        <TableRow key={operation.id} className="border-b border-crypto-card">
                          <TableCell className="text-white">{formatDate(operation.timestamp)}</TableCell>
                          <TableCell>
                            <Badge className={operation.type === "Compra" ? "bg-green-600/30 text-green-400 hover:bg-green-600/40" : "bg-red-600/30 text-red-400 hover:bg-red-600/40"}>
                              {operation.type === "Compra" ? (
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" /> Compra
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <TrendingDown className="h-3 w-3" /> Venda
                                </span>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">{operation.asset}</TableCell>
                          <TableCell className="text-white">{operation.amount}</TableCell>
                          <TableCell className="text-white">USD {operation.price.toFixed(2)}</TableCell>
                          <TableCell className={operation.pnl > 0 ? "text-crypto-green" : operation.pnl < 0 ? "text-crypto-loss" : "text-gray-400"}>
                            {operation.pnl > 0 ? "+" : ""}{formatCurrency(operation.pnl)}
                          </TableCell>
                          <TableCell>
                            <Badge className={operation.status === "Concluída" ? "bg-crypto-darker text-white" : "bg-yellow-600/40 text-yellow-300"}>
                              {operation.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="credits" className="p-6 space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-crypto-darker border-crypto-darker">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Saldo de Créditos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-crypto-green">{user.creditSummary.currentBalance}</div>
                      <p className="text-sm text-gray-400 mt-1">créditos disponíveis</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-crypto-darker border-crypto-darker">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Total Adquirido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">{user.creditSummary.totalAdded}</div>
                      <p className="text-sm text-gray-400 mt-1">créditos adquiridos</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-crypto-darker border-crypto-darker">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">Total Consumido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-400">{user.creditSummary.totalUsed}</div>
                      <p className="text-sm text-gray-400 mt-1">créditos utilizados</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Histórico de Transações</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8 border-crypto-card text-white hover:bg-crypto-darker">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Adicionar Créditos
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 border-crypto-card text-white hover:bg-crypto-darker">
                        Exportar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md overflow-hidden">
                    <Table>
                      <TableHeader className="bg-crypto-darker">
                        <TableRow>
                          <TableHead className="text-white">Data</TableHead>
                          <TableHead className="text-white">Tipo</TableHead>
                          <TableHead className="text-white">Descrição</TableHead>
                          <TableHead className="text-white">Plano</TableHead>
                          <TableHead className="text-white">Forma de Pagamento</TableHead>
                          <TableHead className="text-white">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.credits.map((credit) => (
                          <TableRow key={credit.id} className="border-b border-crypto-card">
                            <TableCell className="text-white">{formatDate(credit.timestamp)}</TableCell>
                            <TableCell>
                              <Badge className={credit.type === "Adição" ? "bg-green-600/30 text-green-400" : "bg-yellow-600/30 text-yellow-400"}>
                                {credit.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">{credit.description}</TableCell>
                            <TableCell>
                              {credit.plan ? (
                                <Badge className="bg-crypto-darker text-white">
                                  {credit.plan}
                                </Badge>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-white">{credit.paymentMethod}</TableCell>
                            <TableCell className={credit.amount > 0 ? "text-crypto-green" : "text-gray-400"}>
                              {credit.amount > 0 ? "+" : ""}{credit.amount} créditos
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Planos Disponíveis para Compra</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-crypto-card bg-crypto-darker hover:border-crypto-green transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white">Starter Pack</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="bg-gray-200 text-black p-3 rounded-md text-center font-bold">
                          R$ 77,85
                        </div>
                        <p className="text-sm text-gray-400">Perfeito para experimentar nossa IA</p>
                        <p className="text-xs text-gray-500">Sem bônus em créditos</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-400">Créditos:</span>
                          <span className="text-white">15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lucro projetado:</span>
                          <span className="text-crypto-green">R$ 155,70</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2 border-crypto-card text-white hover:bg-crypto-green hover:text-black">
                          Adicionar ao Usuário
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-crypto-card bg-crypto-darker hover:border-crypto-green transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 right-0">
                        <div className="bg-crypto-green text-black text-xs px-3 py-1 rounded-bl-md font-semibold">
                          Mais Popular
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white">Traders Pack</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="bg-crypto-green text-black p-3 rounded-md text-center font-bold">
                          R$ 519,00
                        </div>
                        <p className="text-sm text-gray-400">Mais Popular e Escolhido</p>
                        <p className="text-crypto-green text-xs">+50 bônus em créditos</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-400">Créditos:</span>
                          <span className="text-white">100 <span className="text-crypto-green">+ 50</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lucro projetado:</span>
                          <span className="text-crypto-green">R$ 1.557,00</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2 border-crypto-card text-white hover:bg-crypto-green hover:text-black">
                          Adicionar ao Usuário
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-crypto-card bg-crypto-darker hover:border-crypto-green transition-all duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white">Hodlers Pack</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="bg-pink-500 text-white p-3 rounded-md text-center font-bold">
                          R$ 5.190,00
                        </div>
                        <p className="text-sm text-gray-400">Perfeito para maximizar ganhos</p>
                        <p className="text-crypto-green text-xs">+2.000 bônus em créditos</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-gray-400">Créditos:</span>
                          <span className="text-white">1.000 <span className="text-crypto-green">+ 2.000</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lucro projetado:</span>
                          <span className="text-crypto-green">R$ 31.140,00</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-2 border-crypto-card text-white hover:bg-crypto-green hover:text-black">
                          Adicionar ao Usuário
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserDetail;

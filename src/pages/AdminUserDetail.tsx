
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
  LogIn, 
  Settings,
  Unlock,
  Lock
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
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

// Mock data for user details
const mockUserDetail = {
  id: "1",
  name: "Carlos Silva",
  email: "carlos.silva@example.com",
  phone: "(11) 98765-4321",
  registrationDate: "2024-04-12",
  lastLogin: "2024-05-02 14:30:22",
  isActive: true,
  totalCredits: 10000,
  availableCredits: 5000,
  allocatedBalance: 5000,
  futuresBalance: 3500,
  spotBalance: 1500,
  accumulatedPnl: 723.45,
  tradingOperations: [
    { id: "op1", date: "2024-05-02 10:15:33", type: "BUY", asset: "BTC/USDT", quantity: 0.05, price: 62450.30, result: 150.22 },
    { id: "op2", date: "2024-05-01 15:22:45", type: "SELL", asset: "ETH/USDT", quantity: 1.2, price: 3015.75, result: -45.30 },
    { id: "op3", date: "2024-04-30 09:45:12", type: "BUY", asset: "SOL/USDT", quantity: 10, price: 152.45, result: 321.10 },
    { id: "op4", date: "2024-04-29 14:10:55", type: "SELL", asset: "BTC/USDT", quantity: 0.03, price: 61850.25, result: 95.40 },
    { id: "op5", date: "2024-04-28 11:35:20", type: "BUY", asset: "XRP/USDT", quantity: 500, price: 0.551, result: -102.50 },
  ],
  creditPurchases: [
    { id: "cr1", date: "2024-04-12", plan: "Plano Pro", amount: 5000, credits: 5000 },
    { id: "cr2", date: "2024-03-15", plan: "Plano Básico", amount: 1000, credits: 1000 },
    { id: "cr3", date: "2024-02-10", plan: "Plano Avançado", amount: 3000, credits: 3000 },
    { id: "cr4", date: "2024-01-05", plan: "Plano Pro", amount: 5000, credits: 5000 },
  ],
  accessLogs: [
    { id: "log1", date: "2024-05-02 14:30:22", activity: "Login", ip: "187.54.123.45", device: "Chrome em Windows" },
    { id: "log2", date: "2024-05-01 08:15:33", activity: "Login", ip: "187.54.123.45", device: "App Mobile Android" },
    { id: "log3", date: "2024-04-30 19:45:10", activity: "Logout", ip: "187.54.123.45", device: "Chrome em Windows" },
    { id: "log4", date: "2024-04-30 16:22:05", activity: "Login", ip: "187.54.123.45", device: "Chrome em Windows" },
    { id: "log5", date: "2024-04-29 10:05:15", activity: "Senha alterada", ip: "187.54.123.45", device: "Chrome em Windows" },
  ]
};

// Form types
type AddCreditsFormValues = {
  amount: string;
  reason: string;
};

type SendMessageFormValues = {
  subject: string;
  message: string;
};

type EditUserFormValues = {
  name: string;
  email: string;
  phone: string;
};

const AdminUserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [freezeDialogOpen, setFreezeDialogOpen] = useState(false);
  const [operationSuccess, setOperationSuccess] = useState<string | null>(null);

  // Mock user data lookup (in real app, this would fetch from API)
  const user = mockUserDetail;

  // Set up forms
  const addCreditsForm = useForm<AddCreditsFormValues>({
    defaultValues: {
      amount: "",
      reason: ""
    }
  });

  const sendMessageForm = useForm<SendMessageFormValues>({
    defaultValues: {
      subject: "",
      message: ""
    }
  });

  const editUserForm = useForm<EditUserFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || ""
    }
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    if (dateString.includes(" ")) {
      // Handle datetime format
      const [date, time] = dateString.split(" ");
      const formattedDate = new Date(date).toLocaleDateString('pt-BR');
      return `${formattedDate} ${time}`;
    }
    // Handle date-only format
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Handle form submissions
  const onAddCreditsSubmit = (data: AddCreditsFormValues) => {
    console.log("Adding credits:", data);
    setOperationSuccess(`Créditos adicionados com sucesso: ${data.amount}`);
    setTimeout(() => setOperationSuccess(null), 3000);
  };

  const onSendMessageSubmit = (data: SendMessageFormValues) => {
    console.log("Sending message:", data);
    setOperationSuccess("Mensagem enviada com sucesso");
    setTimeout(() => setOperationSuccess(null), 3000);
  };

  const onEditUserSubmit = (data: EditUserFormValues) => {
    console.log("Updating user data:", data);
    setOperationSuccess("Dados do usuário atualizados com sucesso");
    setTimeout(() => setOperationSuccess(null), 3000);
  };

  const handleFreezeAccount = () => {
    console.log("Freezing account:", userId);
    setFreezeDialogOpen(false);
    setOperationSuccess(`Conta ${user.isActive ? "congelada" : "descongelada"} com sucesso`);
    setTimeout(() => setOperationSuccess(null), 3000);
  };

  const goBack = () => {
    navigate("/admin/users");
  };

  if (!user) {
    return (
      <AdminLayout>
        <div className="p-6">
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Usuário não encontrado. <Button variant="link" onClick={goBack}>Voltar para a lista</Button>
            </AlertDescription>
          </Alert>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Detalhes do Usuário</h1>
          </div>
          
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crypto-card text-white border-crypto-darker">
                <DialogHeader>
                  <DialogTitle>Enviar Mensagem para {user.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    A mensagem será enviada para o email cadastrado.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...sendMessageForm}>
                  <form onSubmit={sendMessageForm.handleSubmit(onSendMessageSubmit)} className="space-y-4">
                    <FormField
                      control={sendMessageForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Digite o assunto" 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={sendMessageForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <textarea 
                              className="flex min-h-[120px] w-full rounded-md border border-crypto-card bg-crypto-darker px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              placeholder="Digite sua mensagem aqui" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit" className="bg-crypto-green text-black hover:bg-crypto-green/80">
                        Enviar Mensagem
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Adicionar Créditos
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crypto-card text-white border-crypto-darker">
                <DialogHeader>
                  <DialogTitle>Adicionar Créditos para {user.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Os créditos serão adicionados imediatamente à conta do usuário.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...addCreditsForm}>
                  <form onSubmit={addCreditsForm.handleSubmit(onAddCreditsSubmit)} className="space-y-4">
                    <FormField
                      control={addCreditsForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor de Créditos</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="R$ 0,00" 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Insira o valor em R$ dos créditos a serem adicionados.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addCreditsForm.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Bônus por indicação" 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            Este motivo será registrado no histórico administrativo.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit" className="bg-crypto-green text-black hover:bg-crypto-green/80">
                        Adicionar Créditos
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Dados
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crypto-card text-white border-crypto-darker">
                <DialogHeader>
                  <DialogTitle>Editar Dados de {user.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Altere os dados cadastrais do usuário.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...editUserForm}>
                  <form onSubmit={editUserForm.handleSubmit(onEditUserSubmit)} className="space-y-4">
                    <FormField
                      control={editUserForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-crypto-darker border-crypto-card text-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit" className="bg-crypto-green text-black hover:bg-crypto-green/80">
                        Salvar Alterações
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Dialog open={freezeDialogOpen} onOpenChange={setFreezeDialogOpen}>
              <DialogTrigger asChild>
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
              </DialogTrigger>
              <DialogContent className="bg-crypto-card text-white border-crypto-darker">
                <DialogHeader>
                  <DialogTitle>{user.isActive ? "Congelar" : "Descongelar"} conta de {user.name}</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {user.isActive 
                      ? "Esta ação impedirá que o usuário acesse sua conta e que seus bots operem."
                      : "Esta ação permitirá que o usuário acesse sua conta e que seus bots voltem a operar."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                <Alert className={user.isActive ? "bg-red-900/20 border-red-500" : "bg-green-900/20 border-green-500"}>
                  <AlertTitle>{user.isActive ? "Aviso importante" : "Reativação de conta"}</AlertTitle>
                  <AlertDescription>
                    {user.isActive 
                      ? "O congelamento da conta interromperá imediatamente todas as operações ativas do usuário."
                      : "A conta será reativada imediatamente e os bots poderão voltar a operar."
                    }
                  </AlertDescription>
                </Alert>
                
                <DialogFooter>
                  <Button 
                    onClick={handleFreezeAccount} 
                    className={user.isActive ? "bg-red-600 hover:bg-red-700" : "bg-crypto-green text-black hover:bg-crypto-green/80"}
                  >
                    Confirmar {user.isActive ? "Congelamento" : "Descongelamento"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {operationSuccess && (
          <Alert className="bg-crypto-green/20 border-crypto-green">
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>{operationSuccess}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-crypto-card border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Informações do Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nome:</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Telefone:</span>
                  <span className="text-white font-medium">{user.phone || "Não informado"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cadastro:</span>
                  <span className="text-white font-medium">{formatDate(user.registrationDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Último acesso:</span>
                  <span className="text-white font-medium">{formatDate(user.lastLogin)}</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-crypto-darker">
                  <span className="text-gray-400">Status:</span>
                  {user.isActive ? (
                    <div className="flex items-center text-crypto-green">
                      <UserCheck className="mr-1 h-4 w-4" />
                      <span>Ativo</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <UserX className="mr-1 h-4 w-4" />
                      <span>Inativo</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-crypto-card border-none shadow-md md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">Saldos e Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">Créditos Disponíveis</div>
                  <div className="text-white text-lg font-semibold">{formatCurrency(user.availableCredits)}</div>
                </div>
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">Saldo Alocado</div>
                  <div className="text-white text-lg font-semibold">{formatCurrency(user.allocatedBalance)}</div>
                </div>
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">PNL Acumulado</div>
                  <div className={`text-lg font-semibold ${user.accumulatedPnl >= 0 ? "text-crypto-green" : "text-red-500"}`}>
                    {formatCurrency(user.accumulatedPnl)}
                  </div>
                </div>
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">Total de Créditos</div>
                  <div className="text-white text-lg font-semibold">{formatCurrency(user.totalCredits)}</div>
                </div>
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">Saldo Futures</div>
                  <div className="text-white text-lg font-semibold">{formatCurrency(user.futuresBalance)}</div>
                </div>
                <div className="bg-crypto-darker rounded-md p-3">
                  <div className="text-gray-400 text-sm">Saldo Spot</div>
                  <div className="text-white text-lg font-semibold">{formatCurrency(user.spotBalance)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-crypto-card border-none shadow-md overflow-hidden">
          <CardHeader className="pb-2">
            <Tabs 
              defaultValue="operations" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="bg-crypto-darker w-full justify-start border-b border-crypto-card">
                <TabsTrigger 
                  value="operations"
                  className={`text-sm ${activeTab === "operations" ? "text-crypto-green" : "text-gray-400"}`}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Histórico de Operações
                </TabsTrigger>
                <TabsTrigger 
                  value="purchases"
                  className={`text-sm ${activeTab === "purchases" ? "text-crypto-green" : "text-gray-400"}`}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Compras de Créditos
                </TabsTrigger>
                <TabsTrigger 
                  value="access"
                  className={`text-sm ${activeTab === "access" ? "text-crypto-green" : "text-gray-400"}`}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Logs de Acesso
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className={`text-sm ${activeTab === "settings" ? "text-crypto-green" : "text-gray-400"}`}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <TabsContent value="operations" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-crypto-darker">
                    <TableRow>
                      <TableHead className="text-white">Data</TableHead>
                      <TableHead className="text-white">Tipo</TableHead>
                      <TableHead className="text-white">Ativo</TableHead>
                      <TableHead className="text-white">Quantidade</TableHead>
                      <TableHead className="text-white">Preço</TableHead>
                      <TableHead className="text-white">Resultado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.tradingOperations.map((operation) => (
                      <TableRow key={operation.id} className="border-b border-crypto-card">
                        <TableCell className="text-white">{formatDate(operation.date)}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            operation.type === "BUY" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                          }`}>
                            {operation.type === "BUY" ? "COMPRA" : "VENDA"}
                          </span>
                        </TableCell>
                        <TableCell className="text-white">{operation.asset}</TableCell>
                        <TableCell className="text-white">{operation.quantity}</TableCell>
                        <TableCell className="text-white">
                          {new Intl.NumberFormat('en-US', { 
                            style: 'currency', 
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }).format(operation.price)}
                        </TableCell>
                        <TableCell className={operation.result >= 0 ? "text-crypto-green" : "text-red-500"}>
                          {formatCurrency(operation.result)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="purchases" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-crypto-darker">
                    <TableRow>
                      <TableHead className="text-white">Data</TableHead>
                      <TableHead className="text-white">Plano</TableHead>
                      <TableHead className="text-white">Valor</TableHead>
                      <TableHead className="text-white">Créditos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.creditPurchases.map((purchase) => (
                      <TableRow key={purchase.id} className="border-b border-crypto-card">
                        <TableCell className="text-white">{formatDate(purchase.date)}</TableCell>
                        <TableCell className="text-white">{purchase.plan}</TableCell>
                        <TableCell className="text-white">{formatCurrency(purchase.amount)}</TableCell>
                        <TableCell className="text-white">{formatCurrency(purchase.credits)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="access" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-crypto-darker">
                    <TableRow>
                      <TableHead className="text-white">Data e Hora</TableHead>
                      <TableHead className="text-white">Atividade</TableHead>
                      <TableHead className="text-white">Endereço IP</TableHead>
                      <TableHead className="text-white">Dispositivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.accessLogs.map((log) => (
                      <TableRow key={log.id} className="border-b border-crypto-card">
                        <TableCell className="text-white">{formatDate(log.date)}</TableCell>
                        <TableCell className="text-white">{log.activity}</TableCell>
                        <TableCell className="text-white">{log.ip}</TableCell>
                        <TableCell className="text-white">{log.device}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="m-0 p-6">
              <div className="space-y-6">
                <h3 className="text-white text-lg font-medium">Configurações do Usuário</h3>
                <Alert className="bg-crypto-darker border-crypto-card">
                  <AlertTitle>Configurações Avançadas</AlertTitle>
                  <AlertDescription className="text-gray-400">
                    Esta seção permite configurar opções avançadas para a conta do usuário.
                    Tenha cuidado ao modificar estas configurações, pois elas podem afetar o funcionamento dos bots.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Preferências de Notificação</h4>
                    <div className="flex justify-between items-center bg-crypto-darker p-3 rounded-md">
                      <span className="text-gray-400">Receber notificações por email</span>
                      <div className="w-12 h-6 bg-crypto-card rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 rounded-full bg-crypto-green absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-crypto-darker p-3 rounded-md">
                      <span className="text-gray-400">Receber alertas de operação</span>
                      <div className="w-12 h-6 bg-crypto-card rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 rounded-full bg-crypto-green absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Limites e Permissões</h4>
                    <div className="flex justify-between items-center bg-crypto-darker p-3 rounded-md">
                      <span className="text-gray-400">Limite de operações simultâneas</span>
                      <Input 
                        type="number" 
                        className="w-24 bg-crypto-card border-crypto-darker text-white text-right" 
                        defaultValue="10" 
                      />
                    </div>
                    <div className="flex justify-between items-center bg-crypto-darker p-3 rounded-md">
                      <span className="text-gray-400">Limite de alavancagem</span>
                      <Input 
                        type="number" 
                        className="w-24 bg-crypto-card border-crypto-darker text-white text-right" 
                        defaultValue="5" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-crypto-card text-white hover:bg-crypto-darker">
                    Cancelar
                  </Button>
                  <Button className="bg-crypto-green text-black hover:bg-crypto-green/80">
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUserDetail;

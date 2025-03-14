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

// Mantive apenas o mock data essencial para simplificar
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
    { id: "op1", timestamp: "2024-05-10T14:30:00", type: "Compra", asset: "BTCUSD", amount: 0.05, price: 47235.12, pnl: 124.56 },
    { id: "op2", timestamp: "2024-05-09T10:15:00", type: "Venda", asset: "ETHUSD", amount: 0.5, price: 2145.78, pnl: -32.45 }
  ],
  credits: [
    { id: "tr1", timestamp: "2024-05-01T09:22:00", amount: 2000, type: "Adição", description: "Compra de créditos" },
    { id: "tr2", timestamp: "2024-04-15T16:48:00", amount: 3000, type: "Adição", description: "Crédito inicial" }
  ],
  pendingWithdrawals: [],
  activeSubsPeriod: "2024-05-01 a 2024-06-01"
};

const AdminUserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCreditsDialog, setShowAddCreditsDialog] = useState(false);
  const [showSendMessageDialog, setShowSendMessageDialog] = useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  
  // Simula busca de detalhes do usuário
  const user = mockUserDetail;
  
  const goBack = () => {
    navigate("/admin/users");
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
            <TabsList className="bg-crypto-darker border-b border-crypto-card grid grid-cols-4 md:grid-cols-5 rounded-none">
              <TabsTrigger value="overview" className="data-[state=active]:bg-crypto-card">
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="operations" className="data-[state=active]:bg-crypto-card">
                Operações
              </TabsTrigger>
              <TabsTrigger value="credits" className="data-[state=active]:bg-crypto-card">
                Créditos
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-crypto-card">
                Histórico
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-crypto-card">
                Configurações
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

            {/* Outras abas... */}
            <TabsContent value="operations" className="p-6 space-y-6">
              {/* Conteúdo das operações */}
            </TabsContent>
            
            <TabsContent value="credits" className="p-6 space-y-6">
              {/* Conteúdo de créditos */}
            </TabsContent>
            
            <TabsContent value="history" className="p-6 space-y-6">
              {/* Conteúdo de histórico */}
            </TabsContent>
            
            <TabsContent value="settings" className="p-6 space-y-6">
              {/* Conteúdo de configurações */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserDetail;

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Cog, 
  ShieldAlert, 
  Bell, 
  Server,
  RefreshCw,
  Save
} from "lucide-react";
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isDatabaseBackupOn, setIsDatabaseBackupOn] = useState(true);
  const [isPerformanceAlertOn, setIsPerformanceAlertOn] = useState(true);
  const [isErrorNotificationOn, setIsErrorNotificationOn] = useState(true);
  const [isSystemMaintenanceMode, setIsSystemMaintenanceMode] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
        <div className="flex space-x-2">
          <Button className="bg-crypto-green text-black hover:bg-crypto-green/80">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
      
      <Card className="bg-crypto-card border-crypto-card overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-crypto-darker border-b border-crypto-card grid grid-cols-4 rounded-none">
              <TabsTrigger value="general" className="data-[state=active]:bg-crypto-card">
                <Cog className="mr-2 h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-crypto-card">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-crypto-card">
                <Bell className="mr-2 h-4 w-4" />
                Notificações
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-crypto-card">
                <Server className="mr-2 h-4 w-4" />
                Sistema
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Configurações Gerais</h2>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa</Label>
                    <Input
                      id="companyName"
                      placeholder="Nome da Empresa"
                      defaultValue="Dark Bot Trading"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email Administrativo</Label>
                    <Input
                      id="adminEmail"
                      placeholder="Email Administrativo"
                      type="email"
                      defaultValue="admin@darkbot.com"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Email de Suporte</Label>
                    <Input
                      id="supportEmail"
                      placeholder="Email de Suporte"
                      type="email"
                      defaultValue="suporte@darkbot.com"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium text-white">Modo de Manutenção</h3>
                      <p className="text-sm text-gray-400">Ativar modo de manutenção para todo o sistema</p>
                    </div>
                    <Switch
                      checked={isSystemMaintenanceMode}
                      onCheckedChange={setIsSystemMaintenanceMode}
                    />
                  </div>
                  
                  {isSystemMaintenanceMode && (
                    <Alert className="bg-yellow-900/20 border-yellow-600">
                      <AlertTitle>Atenção! Modo de Manutenção Ativado</AlertTitle>
                      <AlertDescription className="text-gray-400">
                        Quando ativado, os usuários não poderão acessar o sistema. Utilize apenas durante manutenções programadas.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Configurações de Segurança</h2>
                
                <Alert className="bg-crypto-darker border-crypto-card">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Configurações Importantes de Segurança</AlertTitle>
                  <AlertDescription className="text-gray-400">
                    Estas configurações afetam diretamente a segurança do sistema e dos dados dos usuários.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Autenticação em Dois Fatores</h3>
                      <p className="text-sm text-gray-400">Exigir 2FA para acesso administrativo</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Restrição por IP</h3>
                      <p className="text-sm text-gray-400">Limitar acesso por endereços IP específicos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist">IPs Permitidos (separados por vírgula)</Label>
                    <Input
                      id="ipWhitelist"
                      placeholder="ex: 192.168.1.1, 10.0.0.1"
                      defaultValue="192.168.1.1, 177.75.45.87"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tempo de Expiração de Sessão (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      defaultValue="30"
                      min="5"
                      max="120"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Configurações de Notificações</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Alertas de Performance</h3>
                      <p className="text-sm text-gray-400">Notificar quando a performance dos bots estiver abaixo do esperado</p>
                    </div>
                    <Switch
                      checked={isPerformanceAlertOn}
                      onCheckedChange={setIsPerformanceAlertOn}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Notificações de Erro</h3>
                      <p className="text-sm text-gray-400">Receber alertas quando ocorrerem erros críticos no sistema</p>
                    </div>
                    <Switch
                      checked={isErrorNotificationOn}
                      onCheckedChange={setIsErrorNotificationOn}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Novos Usuários</h3>
                      <p className="text-sm text-gray-400">Notificar quando novos usuários se registrarem</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Compras de Crédito</h3>
                      <p className="text-sm text-gray-400">Notificar quando usuários comprarem créditos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notificationEmails">Emails para Notificações (separados por vírgula)</Label>
                    <Input
                      id="notificationEmails"
                      placeholder="ex: admin@darkbot.com, alerts@darkbot.com"
                      defaultValue="admin@darkbot.com, alerts@darkbot.com"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="p-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Configurações do Sistema</h2>
                
                <Alert className="bg-red-900/20 border-red-600">
                  <AlertTitle>Atenção - Área de Alto Risco</AlertTitle>
                  <AlertDescription className="text-gray-400">
                    Estas configurações afetam diretamente o funcionamento do sistema. Alterações incorretas podem causar instabilidade.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-crypto-darker">
                    <div>
                      <h3 className="font-medium text-white">Backup Automático do Banco de Dados</h3>
                      <p className="text-sm text-gray-400">Realizar backup automático diário do banco de dados</p>
                    </div>
                    <Switch
                      checked={isDatabaseBackupOn}
                      onCheckedChange={setIsDatabaseBackupOn}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupTime">Horário do Backup (24h)</Label>
                    <Input
                      id="backupTime"
                      type="time"
                      defaultValue="03:00"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logRetention">Retenção de Logs (dias)</Label>
                    <Input
                      id="logRetention"
                      type="number"
                      defaultValue="30"
                      min="1"
                      max="365"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">Limite de Requisições de API (por minuto)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      defaultValue="100"
                      min="10"
                      max="1000"
                      className="bg-crypto-darker border-crypto-card text-white"
                    />
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button variant="destructive" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reiniciar Serviços
                    </Button>
                    
                    <p className="text-xs text-gray-400 text-center">
                      Esta ação irá reiniciar todos os serviços do sistema. Os usuários poderão experimentar uma breve interrupção.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

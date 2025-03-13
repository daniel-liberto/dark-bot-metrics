import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Key, Wallet, CreditCard } from "lucide-react";
import { EditSettingsModal } from "@/components/dashboard/EditSettingsModal";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Types for our settings
interface ApiSettings {
  apiKey: string;
  secretKey: string;
  exchange: string;
}

interface BalanceSettings {
  futuresBalance: string;
  spotBalance: string;
  allocatedBalance: string;
}

// Define a union type for modal settings
type SettingsType = ApiSettings | BalanceSettings;

const Settings = () => {
  const { toast } = useToast();
  
  // State for settings values
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    apiKey: "sk_test_51Mxxx....xxxx",
    secretKey: "B9xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    exchange: "Binance",
  });
  
  const [balanceSettings, setBalanceSettings] = useState<BalanceSettings>({
    futuresBalance: "5,230.45 USDT",
    spotBalance: "3,120.75 USDT",
    allocatedBalance: "1,500.00 USDT",
  });
  
  // Modal state
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  // Handlers for opening modals
  const openApiModal = () => setIsApiModalOpen(true);
  const openBalanceModal = () => setIsBalanceModalOpen(true);

  // Handle API settings update
  const handleApiSettingsUpdate = (newSettings: SettingsType) => {
    if ('apiKey' in newSettings) {
      setApiSettings(newSettings);
      setIsApiModalOpen(false);
      toast({
        title: "Configurações atualizadas",
        description: "Suas chaves de API foram atualizadas com sucesso.",
      });
    }
  };

  // Handle balance settings update
  const handleBalanceSettingsUpdate = (newSettings: SettingsType) => {
    if ('futuresBalance' in newSettings) {
      setBalanceSettings(newSettings);
      setIsBalanceModalOpen(false);
      toast({
        title: "Configurações atualizadas",
        description: "Configurações de saldo atualizadas com sucesso.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-3xl font-bold text-gradient-subtle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Configurações
      </motion.h2>

      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* API and Secret Keys Section */}
        <Card className="border-crypto-card bg-crypto-card hover:bg-crypto-card-hover transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl text-white">Chaves de API</CardTitle>
              <CardDescription className="text-gray-400">
                Gerencie suas chaves de API e exchange
              </CardDescription>
            </div>
            <Button onClick={openApiModal} variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center">
                <Key className="h-4 w-4 mr-2 text-crypto-muted" />
                <span className="text-sm text-crypto-muted">API Key</span>
              </div>
              <Input 
                value={apiSettings.apiKey} 
                readOnly 
                type="password"
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center">
                <Key className="h-4 w-4 mr-2 text-crypto-muted" />
                <span className="text-sm text-crypto-muted">Secret Key</span>
              </div>
              <Input 
                value={apiSettings.secretKey} 
                readOnly 
                type="password"
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-2 text-crypto-muted" />
                <span className="text-sm text-crypto-muted">Exchange</span>
              </div>
              <Input 
                value={apiSettings.exchange} 
                readOnly
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Balances Section */}
        <Card className="border-crypto-card bg-crypto-card hover:bg-crypto-card-hover transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl text-white">Informações de Saldo</CardTitle>
              <CardDescription className="text-gray-400">
                Visualize e gerencie seus saldos
              </CardDescription>
            </div>
            <Button onClick={openBalanceModal} variant="outline" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-crypto-muted" />
                <span className="text-sm text-crypto-muted">Saldo em Futuros</span>
              </div>
              <Input 
                value={balanceSettings.futuresBalance} 
                readOnly
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-crypto-muted" />
                <span className="text-sm text-crypto-muted">Saldo em Spot</span>
              </div>
              <Input 
                value={balanceSettings.spotBalance} 
                readOnly
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-crypto-muted text-crypto-green" />
                <span className="text-sm text-crypto-muted">Saldo Alocado para o Bot</span>
              </div>
              <Input 
                value={balanceSettings.allocatedBalance} 
                readOnly
                className="bg-crypto-dark border-crypto-card text-white"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <EditSettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onSave={handleApiSettingsUpdate}
        title="Editar Chaves de API"
        settings={apiSettings}
        type="api"
      />

      <EditSettingsModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        onSave={handleBalanceSettingsUpdate}
        title="Editar Informações de Saldo"
        settings={balanceSettings}
        type="balance"
      />
    </div>
  );
};

export default Settings;

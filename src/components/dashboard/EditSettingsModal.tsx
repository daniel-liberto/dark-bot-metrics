
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Types for the different settings
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

type SettingsType = "api" | "balance";

interface EditSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: ApiSettings | BalanceSettings) => void;
  title: string;
  settings: ApiSettings | BalanceSettings;
  type: SettingsType;
}

export const EditSettingsModal: React.FC<EditSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  settings,
  type,
}) => {
  const [formValues, setFormValues] = useState<ApiSettings | BalanceSettings>(settings);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
  };

  // Render API settings form
  const renderApiForm = () => {
    const apiSettings = formValues as ApiSettings;
    return (
      <>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-white">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              value={apiSettings.apiKey}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretKey" className="text-white">Secret Key</Label>
            <Input
              id="secretKey"
              name="secretKey"
              value={apiSettings.secretKey}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exchange" className="text-white">Exchange</Label>
            <Input
              id="exchange"
              name="exchange"
              value={apiSettings.exchange}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
            />
          </div>
        </div>
      </>
    );
  };

  // Render Balance settings form
  const renderBalanceForm = () => {
    const balanceSettings = formValues as BalanceSettings;
    return (
      <>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="futuresBalance" className="text-white">Saldo em Futuros</Label>
            <Input
              id="futuresBalance"
              name="futuresBalance"
              value={balanceSettings.futuresBalance}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
              disabled
            />
            <p className="text-xs text-crypto-muted mt-1">Somente leitura - atualizado automaticamente</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="spotBalance" className="text-white">Saldo em Spot</Label>
            <Input
              id="spotBalance"
              name="spotBalance"
              value={balanceSettings.spotBalance}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
              disabled
            />
            <p className="text-xs text-crypto-muted mt-1">Somente leitura - atualizado automaticamente</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="allocatedBalance" className="text-white">Saldo Alocado para o Bot</Label>
            <Input
              id="allocatedBalance"
              name="allocatedBalance"
              value={balanceSettings.allocatedBalance}
              onChange={handleInputChange}
              className="bg-crypto-dark border-crypto-card text-white"
            />
            <p className="text-xs text-crypto-muted mt-1">Edite o valor alocado para seus bots</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-crypto-dark border-crypto-card text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {type === "api" ? renderApiForm() : renderBalanceForm()}
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-crypto-card text-white hover:bg-crypto-card"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-crypto-green text-black hover:bg-crypto-green/90"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

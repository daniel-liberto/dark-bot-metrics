
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CreditPlanCard = ({ 
  title, 
  subtitle, 
  price, 
  bonus, 
  profit,
  color = "bg-gray-200",
  textColor = "text-black",
  headerTextColor = "text-black",
  bonusColor = "text-crypto-gain",
  isPopular = false
}: { 
  title: string;
  subtitle: string;
  price: string;
  bonus: string | null;
  profit: string;
  color?: string;
  textColor?: string;
  headerTextColor?: string;
  bonusColor?: string;
  isPopular?: boolean;
}) => {
  return (
    <Card className="overflow-hidden border border-crypto-card flex flex-col h-full relative">
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-crypto-green text-black text-xs px-3 py-1 rounded-bl-md font-semibold">
            Mais Popular
          </div>
        </div>
      )}
      <CardHeader className={`${headerTextColor} text-center p-4`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
      </CardHeader>
      <div className={`${color} ${textColor} p-6 text-center`}>
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <CardContent className="flex-1 flex flex-col justify-between p-6 bg-crypto-card">
        <div className="space-y-4">
          {bonus ? (
            <p className={`text-center ${bonusColor}`}>
              Ganhe {bonus} bônus em créditos
            </p>
          ) : (
            <p className="text-center text-gray-400">
              Sem bônus em créditos
            </p>
          )}
          
          <div className="flex items-center gap-2 text-white">
            <div className="rounded-full bg-crypto-green/20 p-1">
              <Check className="h-4 w-4 text-crypto-green" />
            </div>
            <span>
              Você receberá <span className="font-semibold">{profit}</span> de lucro
            </span>
          </div>
        </div>
        
        <Button className="mt-6 w-full bg-crypto-green hover:bg-crypto-green/80 text-black">
          Comprar Agora
        </Button>
      </CardContent>
    </Card>
  );
};

const CreditPlans = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/wallet" className="text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-3xl font-bold text-gradient-subtle">Planos de Crédito</h2>
        </div>
        
        <p className="text-gray-400">
          Escolha um plano que melhor se adapte às suas necessidades de trading.
          Quanto maior o plano, maiores os bônus e retornos potenciais.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreditPlanCard
            title="Starter Pack"
            subtitle="Perfeito para experimentar nossa IA"
            price="$15"
            bonus={null}
            profit="$30"
            color="bg-gray-200"
            textColor="text-black"
            headerTextColor="text-black"
          />
          
          <CreditPlanCard
            title="Beginners Pack"
            subtitle="Perfeito para iniciantes"
            price="$30"
            bonus="$5"
            profit="$70"
            color="bg-purple-500"
            textColor="text-white"
            headerTextColor="text-purple-500"
            bonusColor="text-purple-300"
          />
          
          <CreditPlanCard
            title="Traders Pack"
            subtitle="Mais Popular e Escolhido"
            price="$100"
            bonus="$50"
            profit="$300"
            color="bg-crypto-green"
            textColor="text-black"
            headerTextColor="text-crypto-green"
            isPopular={true}
          />
          
          <CreditPlanCard
            title="Black Pack"
            subtitle="Perfeito para usuários intermediários"
            price="$300"
            bonus="$300"
            profit="$1,200"
            color="bg-black"
            textColor="text-white"
            headerTextColor="text-white"
          />
          
          <CreditPlanCard
            title="Pro Traders Pack"
            subtitle="Perfeito para grandes capitais"
            price="$500"
            bonus="$750"
            profit="$2,500"
            color="bg-yellow-400"
            textColor="text-black"
            headerTextColor="text-yellow-400"
          />
          
          <CreditPlanCard
            title="Hodlers Pack"
            subtitle="Perfeito para maximizar ganhos"
            price="$1,000"
            bonus="$2,000"
            profit="$6,000"
            color="bg-pink-500"
            textColor="text-white"
            headerTextColor="text-pink-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditPlans;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  bonusColor = "text-crypto-gain",
  isPopular = false,
  creditsBase = 15,
  creditsBonus = 0,
  borderStyle = "",
  hasBorderBeam = false
}: { 
  title: string;
  subtitle: string;
  price: string;
  bonus: string | null;
  profit: string;
  color?: string;
  textColor?: string;
  bonusColor?: string;
  isPopular?: boolean;
  creditsBase?: number;
  creditsBonus?: number;
  borderStyle?: string;
  hasBorderBeam?: boolean;
}) => {
  if (hasBorderBeam) {
    return (
      <div className="relative p-[2px] rounded-xl bg-gradient-to-br from-[#84cc16] via-[#10b981] to-[#84cc16] shadow-lg hover:shadow-green-900/20">
        <Card className="relative border-transparent bg-crypto-darker overflow-hidden h-full rounded-xl">
          {isPopular && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-crypto-green text-black text-xs px-3 py-1 rounded-bl-md font-semibold">
                Mais Popular
              </div>
            </div>
          )}
          
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-white">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div>
              <p className="text-sm text-gray-400 mb-1">{subtitle}</p>
              
              {bonus ? (
                <p className={`${bonusColor} text-xs`}>{bonus}</p>
              ) : (
                <p className="text-xs text-gray-500">Sem bônus em créditos</p>
              )}
            </div>
            
            <div className="bg-crypto-darker border border-gray-700 rounded-md p-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Investimento:</span>
                <span className="text-white text-sm font-medium">{price}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-700 pt-3 mb-2">
                <span className="text-gray-300 font-medium">Créditos:</span>
                <span className="text-white text-lg font-bold">
                  {creditsBase} 
                  {creditsBonus > 0 && (
                    <span className="text-crypto-green"> + {creditsBonus}</span>
                  )}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 font-medium">Lucro projetado:</span>
                <span className="text-crypto-green text-lg font-bold">{profit}</span>
              </div>
            </div>
            
            <div className="bg-crypto-green/20 px-2 py-1 rounded text-center text-xs text-crypto-green font-medium">
              {creditsBase + creditsBonus} créditos totais
            </div>
            
            <Button className="w-full mt-2 bg-crypto-green hover:bg-crypto-green/80 text-black transition-all duration-300 hover:shadow-lg hover:shadow-crypto-green/20 transform hover:-translate-y-0.5 font-bold text-base">
              Comprar Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className={`border border-gray-700/50 hover:border-crypto-green/70 bg-crypto-darker transition-all duration-300 relative overflow-hidden h-full ${borderStyle}`}>
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-crypto-green text-black text-xs px-3 py-1 rounded-bl-md font-semibold">
            Mais Popular
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">{subtitle}</p>
          
          {bonus ? (
            <p className={`${bonusColor} text-xs`}>{bonus}</p>
          ) : (
            <p className="text-xs text-gray-500">Sem bônus em créditos</p>
          )}
        </div>
        
        <div className="bg-crypto-darker border border-gray-700 rounded-md p-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400 text-sm">Investimento:</span>
            <span className="text-white text-sm font-medium">{price}</span>
          </div>
          
          <div className="flex justify-between items-center border-t border-gray-700 pt-3 mb-2">
            <span className="text-gray-300 font-medium">Créditos:</span>
            <span className="text-white text-lg font-bold">
              {creditsBase} 
              {creditsBonus > 0 && (
                <span className="text-crypto-green"> + {creditsBonus}</span>
              )}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-300 font-medium">Lucro projetado:</span>
            <span className="text-crypto-green text-lg font-bold">{profit}</span>
          </div>
        </div>
        
        <div className="bg-crypto-green/20 px-2 py-1 rounded text-center text-xs text-crypto-green font-medium">
          {creditsBase + creditsBonus} créditos totais
        </div>
        
        <Button className="w-full mt-2 bg-crypto-green hover:bg-crypto-green/80 text-black transition-all duration-300 hover:shadow-lg hover:shadow-crypto-green/20 transform hover:-translate-y-0.5 font-bold text-base">
          Comprar Agora
        </Button>
      </CardContent>
    </Card>
  );
};

const CreditPlans = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link 
          to="/wallet" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gradient-subtle mb-2">
            Planos de Crédito
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Escolha um plano que melhor se adapte às suas necessidades de trading.
            Quanto maior o plano, maiores os bônus e retornos potenciais.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="animate-fade-in [--animation-delay:200ms]">
          <CreditPlanCard
            title="Starter Pack"
            subtitle="Perfeito para experimentar nossa IA"
            price="R$ 77,85"
            bonus={null}
            profit="R$ 155,70"
            color="bg-gray-200"
            textColor="text-black"
            creditsBase={15}
            creditsBonus={0}
            borderStyle="border border-indigo-500/30 hover:border-indigo-500/60"
          />
        </div>
        
        <div className="animate-fade-in [--animation-delay:400ms]">
          <CreditPlanCard
            title="Beginners Pack"
            subtitle="Perfeito para iniciantes"
            price="R$ 155,70"
            bonus="+5 bônus em créditos"
            profit="R$ 363,30"
            color="bg-purple-500"
            textColor="text-white"
            bonusColor="text-purple-300"
            creditsBase={30}
            creditsBonus={5}
            borderStyle="border border-purple-500/30 hover:border-purple-500/60"
          />
        </div>
        
        <div className="animate-fade-in [--animation-delay:600ms]">
          <CreditPlanCard
            title="Traders Pack"
            subtitle="Mais Popular e Escolhido"
            price="R$ 519,00"
            bonus="+50 bônus em créditos"
            profit="R$ 1.557,00"
            color="bg-crypto-green"
            textColor="text-black"
            isPopular={true}
            creditsBase={100}
            creditsBonus={50}
            hasBorderBeam={true}
          />
        </div>
        
        <div className="animate-fade-in [--animation-delay:800ms]">
          <CreditPlanCard
            title="Black Pack"
            subtitle="Perfeito para usuários intermediários"
            price="R$ 1.557,00"
            bonus="+300 bônus em créditos"
            profit="R$ 6.228,00"
            color="bg-black"
            textColor="text-white"
            creditsBase={300}
            creditsBonus={300}
            borderStyle="border border-purple-800/30 hover:border-purple-800/60"
          />
        </div>
        
        <div className="animate-fade-in [--animation-delay:1000ms]">
          <CreditPlanCard
            title="Pro Traders Pack"
            subtitle="Perfeito para grandes capitais"
            price="R$ 2.595,00"
            bonus="+750 bônus em créditos"
            profit="R$ 12.975,00"
            color="bg-yellow-400"
            textColor="text-black"
            creditsBase={500}
            creditsBonus={750}
            borderStyle="border border-orange-500/30 hover:border-orange-500/60"
          />
        </div>
        
        <div className="animate-fade-in [--animation-delay:1200ms]">
          <CreditPlanCard
            title="Hodlers Pack"
            subtitle="Perfeito para maximizar ganhos"
            price="R$ 5.190,00"
            bonus="+2.000 bônus em créditos"
            profit="R$ 31.140,00"
            color="bg-pink-500"
            textColor="text-white"
            creditsBase={1000}
            creditsBonus={2000}
            borderStyle="border border-pink-500/30 hover:border-pink-500/60"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditPlans;

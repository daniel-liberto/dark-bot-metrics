
import { useState } from 'react';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

// Daily data - last 7 days
const dailyData = [
  { name: 'Seg', saldoAlocado: 8250 },
  { name: 'Ter', saldoAlocado: 8400 },
  { name: 'Qua', saldoAlocado: 8320 },
  { name: 'Qui', saldoAlocado: 8500 },
  { name: 'Sex', saldoAlocado: 8650 },
  { name: 'Sab', saldoAlocado: 8750 },
  { name: 'Dom', saldoAlocado: 8850 },
];

// Weekly data - last 4 weeks
const weeklyData = [
  { name: 'Sem 1', saldoAlocado: 7800 },
  { name: 'Sem 2', saldoAlocado: 8100 },
  { name: 'Sem 3', saldoAlocado: 8400 },
  { name: 'Sem 4', saldoAlocado: 8850 },
];

// Monthly data - last 6 months
const monthlyData = [
  { name: 'Fev', saldoAlocado: 6800 },
  { name: 'Mar', saldoAlocado: 7200 },
  { name: 'Abr', saldoAlocado: 7500 },
  { name: 'Mai', saldoAlocado: 7900 },
  { name: 'Jun', saldoAlocado: 8400 },
  { name: 'Jul', saldoAlocado: 8850 },
];

// All time data
const allTimeData = [
  { name: 'Jan', saldoAlocado: 5000 },
  { name: 'Fev', saldoAlocado: 5500 },
  { name: 'Mar', saldoAlocado: 6200 },
  { name: 'Abr', saldoAlocado: 6800 },
  { name: 'Mai', saldoAlocado: 7300 },
  { name: 'Jun', saldoAlocado: 7800 },
  { name: 'Jul', saldoAlocado: 8250 },
  { name: 'Ago', saldoAlocado: 8500 },
  { name: 'Set', saldoAlocado: 8850 },
];

// Format number to R$ with K suffix for thousands
const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(1)}K`;
  }
  return `R$ ${value}`;
};

// Format tooltip values
const formatTooltipValue = (value: number) => {
  return `R$ ${value.toFixed(2)}`;
};

type TimeRange = 'daily' | 'week' | 'month' | 'all';

export function BotPerformanceChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');

  // Choose data based on time range
  const getDataByTimeRange = () => {
    switch (timeRange) {
      case 'daily':
        return dailyData;
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'all':
      default:
        return allTimeData;
    }
  };

  return (
    <Card className="bg-crypto-card border-crypto-card">
      <CardHeader className="pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Saldo Alocado</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === 'daily' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('daily')}
            className="text-xs"
          >
            <Clock className="h-3 w-3 mr-1" />
            Daily
          </Button>
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
            className="text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
            className="text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Month
          </Button>
          <Button
            variant={timeRange === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('all')}
            className="text-xs"
          >
            <Calendar className="h-3 w-3 mr-1" />
            All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getDataByTimeRange()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#888' }} />
              <YAxis 
                tick={{ fill: '#888' }} 
                tickFormatter={formatYAxis} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#222', 
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff'
                }}
                formatter={formatTooltipValue}
              />
              <defs>
                <linearGradient id="gradientSaldoAlocado" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="saldoAlocado" 
                stroke="#00ff9d" 
                strokeWidth={2}
                fill="url(#gradientSaldoAlocado)"
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6, stroke: '#00ff9d', strokeWidth: 2 }} 
                name="Saldo Alocado"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

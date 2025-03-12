
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Jan', bot1: 4000, bot2: 2400, bot3: 1200 },
  { name: 'Fev', bot1: 3000, bot2: 1398, bot3: 2800 },
  { name: 'Mar', bot1: 9800, bot2: 3908, bot3: 2000 },
  { name: 'Abr', bot1: 5780, bot2: 3800, bot3: 4300 },
  { name: 'Mai', bot1: 8890, bot2: 4800, bot3: 2300 },
  { name: 'Jun', bot1: 4390, bot2: 3800, bot3: 2500 },
  { name: 'Jul', bot1: 3490, bot2: 4300, bot3: 2100 },
];

export function BotPerformanceChart() {
  return (
    <Card className="bg-crypto-card border-crypto-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Performance dos Bots</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#888' }} />
              <YAxis tick={{ fill: '#888' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#222', 
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="bot1" 
                stroke="#c8f906" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6, stroke: '#c8f906', strokeWidth: 2 }} 
              />
              <Line 
                type="monotone" 
                dataKey="bot2" 
                stroke="#00ff9d" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6, stroke: '#00ff9d', strokeWidth: 2 }} 
              />
              <Line 
                type="monotone" 
                dataKey="bot3" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2 }} 
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

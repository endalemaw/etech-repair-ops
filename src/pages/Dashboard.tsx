import React from 'react';
import { 
  Users, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  FileText,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/utils';
import { useERPData } from '@/hooks/useERPData';
import { Badge } from '@/components/ui/badge';
import { REPAIR_STATUSES } from '@/lib/constants';

const data = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

const StatCard = ({ title, value, subValue, icon: Icon, trend, trendValue }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
              {trendValue}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">{subValue}</span>
          </div>
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { customers, repairs, inventory } = useERPData();

  const activeRepairs = repairs.filter(r => !['delivered', 'cancelled', 'unrepairable'].includes(r.status));
  const completedToday = repairs.filter(r => r.status === 'ready').length;
  const lowStock = inventory.filter(i => i.quantity <= i.minQuantity).length;

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm md:text-base text-muted-foreground">Welcome back, Admin. Here's what's happening at E Tech All Tech today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Customers" 
          value={customers.length || "1,284"} 
          subValue="from last month" 
          icon={Users}
          trend="up"
          trendValue="12"
        />
        <StatCard 
          title="Active Repairs" 
          value={activeRepairs.length || "42"} 
          subValue="currently in shop" 
          icon={Wrench}
          trend="up"
          trendValue="5"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={formatCurrency(128450)} 
          subValue="vs target" 
          icon={TrendingUp}
          trend="up"
          trendValue="18"
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStock || "8"} 
          subValue="require attention" 
          icon={AlertTriangle}
          trend="down"
          trendValue="2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Financial Analytics</CardTitle>
            <CardDescription>Revenue and Expenses over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--primary)" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-3" variant="outline">
              <PlusCircle className="h-4 w-4" /> New Customer Registration
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <Wrench className="h-4 w-4" /> Create Repair Ticket
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <Package className="h-4 w-4" /> Restock Inventory
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline">
              <FileText className="h-4 w-4" /> Generate Report
            </Button>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-medium mb-4">Shop Status</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Completed Today</span>
                  </div>
                  <Badge variant="secondary">{completedToday}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Pending Repairs</span>
                  </div>
                  <Badge variant="secondary">{activeRepairs.length}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Repairs</CardTitle>
            <CardDescription>Latest devices received for service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repairs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No recent repairs found.
                </div>
              ) : (
                repairs.slice(0, 5).map((repair) => {
                  const status = REPAIR_STATUSES.find(s => s.id === repair.status);
                  return (
                    <div key={repair.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{repair.ticketNumber}</p>
                          <p className="text-xs text-muted-foreground">{repair.faultDescription}</p>
                        </div>
                      </div>
                      <Badge className={cn(status?.color, "text-white")}>{status?.label}</Badge>
                    </div>
                  );
                })
              )}
            </div>
            <Button variant="link" className="w-full mt-4">View All Repairs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Items running low on stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.filter(i => i.quantity <= i.minQuantity).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  All inventory levels are healthy.
                </div>
              ) : (
                inventory.filter(i => i.quantity <= i.minQuantity).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-destructive/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-destructive">{item.quantity} left</p>
                      <p className="text-[10px] text-muted-foreground">Min: {item.minQuantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button variant="link" className="w-full mt-4 text-destructive">Manage Inventory</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

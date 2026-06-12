import React, { useState } from 'react';
import { useERPData, Repair } from '@/hooks/useERPData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Printer, 
  Eye, 
  CheckCircle,
  Clock,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import { REPAIR_STATUSES, DEVICE_CATEGORIES } from '@/lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Repairs: React.FC = () => {
  const { repairs, customers, devices, createRepair, updateRepairStatus } = useERPData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    category: 'Smartphones',
    brand: '',
    model: '',
    faultDescription: '',
    estimatedCost: 0
  });

  const filteredRepairs = repairs.filter(r => 
    r.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.faultDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRepair = (e: React.FormEvent) => {
    e.preventDefault();
    createRepair({
      ...formData,
      deviceId: 'temp-id', // Simplified for demo
      status: 'received',
      parts: [],
      laborCost: 0,
      finalCost: 0
    });
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Repair Management</h1>
          <p className="text-sm md:text-base text-muted-foreground">Track and manage all device repairs in the shop.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <DialogTitle>Create New Repair Ticket</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateRepair} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2 md:col-span-2">
                <Label>Select Customer</Label>
                <Select onValueChange={(v) => setFormData({...formData, customerId: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name} ({c.phone})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Device Category</Label>
                <Select onValueChange={(v) => setFormData({...formData, category: v})} defaultValue="Smartphones">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEVICE_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Brand & Model</Label>
                <Input placeholder="e.g. Samsung S23" onChange={e => setFormData({...formData, model: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Fault Description</Label>
                <Input placeholder="Describe the problem" onChange={e => setFormData({...formData, faultDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Cost (ETB)</Label>
                <Input type="number" onChange={e => setFormData({...formData, estimatedCost: Number(e.target.value)})} />
              </div>
              <div className="md:col-span-2 mt-4">
                <Button type="submit" className="w-full">Create Ticket</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tickets, faults, serials..." 
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 justify-center">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Received</p>
              <h4 className="text-xl font-bold">{repairs.filter(r => r.status === 'received').length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">In Progress</p>
              <h4 className="text-xl font-bold">{repairs.filter(r => ['diagnosing', 'repairing', 'testing'].includes(r.status)).length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Ready</p>
              <h4 className="text-xl font-bold">{repairs.filter(r => r.status === 'ready').length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Printer className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Delivered</p>
              <h4 className="text-xl font-bold">{repairs.filter(r => r.status === 'delivered').length}</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Ticket ID</TableHead>
                <TableHead>Customer / Device</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Est. Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepairs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    <Wrench className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No repair tickets found. Create your first one!</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRepairs.map((repair) => {
                  const status = REPAIR_STATUSES.find(s => s.id === repair.status);
                  const customer = customers.find(c => c.id === repair.customerId);
                  return (
                    <TableRow key={repair.id}>
                      <TableCell className="font-bold text-primary">{repair.ticketNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer?.name || "Unknown"}</div>
                        <div className="text-xs text-muted-foreground">{repair.faultDescription}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(status?.color, "text-white")}>
                          {status?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{formatDate(repair.receivedAt)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(repair.estimatedCost)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Manage Ticket</DropdownMenuLabel>
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Printer className="h-4 w-4" /> Print Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-[10px] opacity-50">Change Status</DropdownMenuLabel>
                            {REPAIR_STATUSES.map(s => (
                              <DropdownMenuItem 
                                key={s.id} 
                                onClick={() => updateRepairStatus(repair.id, s.id)}
                                className="flex items-center gap-2"
                              >
                                <div className={cn("h-2 w-2 rounded-full", s.color)} />
                                {s.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Repairs;

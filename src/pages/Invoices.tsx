import React, { useState } from 'react';
import { useERPData } from '@/hooks/useERPData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Printer, 
  Download, 
  FileText, 
  ChevronLeft, 
  Mail,
  Eye
} from 'lucide-react';
import { InvoiceTemplate } from '@/components/repair/InvoiceTemplate';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Invoices: React.FC = () => {
  const { repairs, customers } = useERPData();
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = repairs.filter(r => r.status !== 'cancelled');
  
  const filteredInvoices = invoices.filter(r => {
    const customer = customers.find(c => c.id === r.customerId);
    return r.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
           customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedRepair = repairs.find(r => r.id === selectedRepairId);
  const selectedCustomer = selectedRepair ? customers.find(c => c.id === selectedRepair.customerId) : null;

  if (selectedRepair && selectedCustomer) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => setSelectedRepairId(null)} className="gap-2 self-start">
            <ChevronLeft className="h-4 w-4" /> Back to Invoices
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2 flex-1 md:flex-none" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button variant="outline" className="gap-2 flex-1 md:flex-none">
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button className="gap-2 flex-1 md:flex-none w-full md:w-auto">
              <Mail className="h-4 w-4" /> Email
            </Button>
          </div>
        </div>

        <div className="bg-muted p-4 md:p-8 rounded-xl overflow-auto flex justify-center">
          <div className="shadow-2xl bg-white scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top min-w-[800px]">
            <InvoiceTemplate repair={selectedRepair} customer={selectedCustomer} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Invoice History</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage and print invoices for all repair services.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by ticket number or customer name..." 
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.length === 0 ? (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-10" />
                <p>No invoices found matching your search.</p>
              </div>
            ) : (
              filteredInvoices.map((repair) => {
                const customer = customers.find(c => c.id === repair.customerId);
                return (
                  <Card key={repair.id} className="hover:border-primary/50 transition-colors cursor-pointer group" onClick={() => setSelectedRepairId(repair.id)}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold">{repair.ticketNumber}</Badge>
                        <Badge className={repair.status === 'delivered' ? 'bg-emerald-500' : 'bg-primary/10 text-primary border-none'}>
                          {repair.status === 'delivered' ? 'Paid' : 'Pending'}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-lg">{customer?.name || "Unknown Customer"}</CardTitle>
                      <CardDescription>{formatDate(repair.receivedAt)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Amount Due</p>
                          <p className="text-xl font-bold text-primary">{formatCurrency(repair.finalCost || repair.estimatedCost)}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;

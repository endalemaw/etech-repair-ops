import React, { useState } from 'react';
import { useERPData } from '@/hooks/useERPData';
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
  Package, 
  AlertTriangle, 
  History, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';

const Inventory: React.FC = () => {
  const { inventory } = useERPData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Parts Inventory</h1>
          <p className="text-sm md:text-base text-muted-foreground">Monitor stock levels and manage spare parts.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Part
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Parts</p>
              <h3 className="text-2xl font-bold">{inventory.length}</h3>
            </div>
            <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
              <h3 className="text-2xl font-bold text-destructive">
                {inventory.filter(i => i.quantity <= i.minQuantity).length}
              </h3>
            </div>
            <div className="h-12 w-12 rounded bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Inventory Value</p>
              <h3 className="text-2xl font-bold text-emerald-600">
                {formatCurrency(inventory.reduce((acc, curr) => acc + (curr.cost * curr.quantity), 0))}
              </h3>
            </div>
            <div className="h-12 w-12 rounded bg-emerald-100 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search parts by name or category..." 
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all",
                              item.quantity <= item.minQuantity ? "bg-destructive" : "bg-emerald-500"
                            )}
                            style={{ width: `${Math.min(100, (item.quantity / (item.minQuantity * 2)) * 100)}%` }}
                          />
                        </div>
                        <span className={cn(
                          "text-sm font-bold",
                          item.quantity <= item.minQuantity ? "text-destructive" : ""
                        )}>
                          {item.quantity} units
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.cost)}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <History className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;

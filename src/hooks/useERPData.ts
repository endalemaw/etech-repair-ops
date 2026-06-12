import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  altPhone?: string;
  address: string;
  notes?: string;
  createdAt: string;
}

export interface Device {
  id: string;
  customerId: string;
  category: string;
  brand: string;
  model: string;
  serialNumber?: string;
  imei?: string;
  condition: string;
}

export interface RepairItem {
  partName: string;
  quantity: number;
  price: number;
}

export interface Repair {
  id: string;
  ticketNumber: string;
  customerId: string;
  deviceId: string;
  faultDescription: string;
  diagnosticNotes?: string;
  technicianNotes?: string;
  status: string;
  technicianId?: string;
  parts: RepairItem[];
  laborCost: number;
  estimatedCost: number;
  finalCost: number;
  receivedAt: string;
  completedAt?: string;
  deliveredAt?: string;
  warrantyPeriod?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  cost: number;
  supplier?: string;
}

export interface Transaction {
  id: string;
  repairId?: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  method: 'cash' | 'bank' | 'mobile_money';
  date: string;
  description: string;
}

export const useERPData = () => {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('erp_customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('erp_devices');
    return saved ? JSON.parse(saved) : [];
  });

  const [repairs, setRepairs] = useState<Repair[]>(() => {
    const saved = localStorage.getItem('erp_repairs');
    return saved ? JSON.parse(saved) : [];
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('erp_inventory');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'iPhone 13 Screen', category: 'Screens', quantity: 5, minQuantity: 2, price: 5000, cost: 3500 },
      { id: '2', name: 'Samsung S22 Battery', category: 'Batteries', quantity: 1, minQuantity: 3, price: 2500, cost: 1200 },
      { id: '3', name: 'Universal Laptop Charger', category: 'Chargers', quantity: 12, minQuantity: 5, price: 1500, cost: 800 }
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('erp_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('erp_customers', JSON.stringify(customers));
    localStorage.setItem('erp_devices', JSON.stringify(devices));
    localStorage.setItem('erp_repairs', JSON.stringify(repairs));
    localStorage.setItem('erp_inventory', JSON.stringify(inventory));
    localStorage.setItem('erp_transactions', JSON.stringify(transactions));
  }, [customers, devices, repairs, inventory, transactions]);

  // Actions
  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer = {
      ...customer,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const addDevice = (device: Omit<Device, 'id'>) => {
    const newDevice = { ...device, id: crypto.randomUUID() };
    setDevices(prev => [...prev, newDevice]);
    return newDevice;
  };

  const createRepair = (repair: Omit<Repair, 'id' | 'ticketNumber' | 'receivedAt'>) => {
    const ticketNumber = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRepair = {
      ...repair,
      id: crypto.randomUUID(),
      ticketNumber,
      receivedAt: new Date().toISOString()
    };
    setRepairs(prev => [...prev, newRepair]);
    toast.success(`Ticket ${ticketNumber} created successfully`);
    return newRepair;
  };

  const updateRepairStatus = (repairId: string, status: string) => {
    setRepairs(prev => prev.map(r => r.id === repairId ? { 
      ...r, 
      status, 
      completedAt: status === 'ready' ? new Date().toISOString() : r.completedAt,
      deliveredAt: status === 'delivered' ? new Date().toISOString() : r.deliveredAt
    } : r));
    toast.info(`Repair status updated to ${status}`);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions(prev => [...prev, newTransaction]);
    return newTransaction;
  };

  const updateInventory = (id: string, quantity: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  return {
    customers,
    devices,
    repairs,
    inventory,
    transactions,
    addCustomer,
    addDevice,
    createRepair,
    updateRepairStatus,
    addTransaction,
    updateInventory
  };
};

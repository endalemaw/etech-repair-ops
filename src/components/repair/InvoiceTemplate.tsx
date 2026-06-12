import React from 'react';
import { Customer, Repair, RepairItem } from '@/hooks/useERPData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { SHOP_INFO } from '@/lib/constants';
import { Logo } from '../branding/Logo';

interface InvoiceTemplateProps {
  repair: Repair;
  customer: Customer;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ repair, customer }) => {
  const subtotal = repair.parts.reduce((acc, part) => acc + (part.price * part.quantity), 0) + repair.laborCost;
  
  return (
    <div className="bg-white text-black p-10 max-w-4xl mx-auto border border-gray-200 print:border-0 print:p-0 font-sans" id={`invoice-${repair.ticketNumber}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-4">
          <Logo className="h-16 w-16" />
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">{SHOP_INFO.name}</h1>
            <p className="text-sm text-gray-600">{SHOP_INFO.address}</p>
            <p className="text-sm text-gray-600">Phones: {SHOP_INFO.phones.join(', ')}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-gray-300 uppercase mb-2">Invoice</h2>
          <div className="space-y-1">
            <p className="text-sm font-bold">Ticket #: <span className="font-normal">{repair.ticketNumber}</span></p>
            <p className="text-sm font-bold">Date: <span className="font-normal">{formatDate(new Date())}</span></p>
            <p className="text-sm font-bold">Status: <span className="font-normal uppercase">{repair.status}</span></p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Bill To */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Bill To</h3>
          <div className="space-y-1">
            <p className="font-bold text-lg">{customer.name}</p>
            <p className="text-sm text-gray-600">{customer.phone}</p>
            <p className="text-sm text-gray-600">{customer.address}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest">Device Details</h3>
          <div className="space-y-1">
            <p className="font-bold">{repair.faultDescription}</p>
            <p className="text-sm text-gray-600">Technician: Admin</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full mb-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider">Description</th>
            <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider w-24">Qty</th>
            <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider w-32">Price</th>
            <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider w-32">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {repair.parts.map((part, index) => (
            <tr key={index}>
              <td className="py-4 px-4">{part.partName}</td>
              <td className="py-4 px-4 text-center">{part.quantity}</td>
              <td className="py-4 px-4 text-right">{formatCurrency(part.price)}</td>
              <td className="py-4 px-4 text-right font-medium">{formatCurrency(part.price * part.quantity)}</td>
            </tr>
          ))}
          <tr>
            <td className="py-4 px-4">Labor / Service Charges</td>
            <td className="py-4 px-4 text-center">1</td>
            <td className="py-4 px-4 text-right">{formatCurrency(repair.laborCost)}</td>
            <td className="py-4 px-4 text-right font-medium">{formatCurrency(repair.laborCost)}</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-20">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Discount</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t-2 border-gray-900">
            <span className="font-bold text-lg">Grand Total</span>
            <span className="font-black text-xl text-primary">{formatCurrency(repair.finalCost || repair.estimatedCost)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-20 text-center mb-10">
        <div className="pt-4 border-t border-dashed border-gray-300">
          <p className="text-xs text-gray-500 mb-10">Customer Signature</p>
          <div className="h-1 bg-gray-100" />
        </div>
        <div className="pt-4 border-t border-dashed border-gray-300">
          <p className="text-xs text-gray-500 mb-10">Technician Signature</p>
          <div className="h-1 bg-gray-100" />
        </div>
      </div>

      <div className="text-center text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        Thank you for choosing {SHOP_INFO.name}. Professional Electronics Repairs.
      </div>
    </div>
  );
};

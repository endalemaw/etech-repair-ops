import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Customers = lazy(() => import('./pages/Customers'));
const Repairs = lazy(() => import('./pages/Repairs'));
const Inventory = lazy(() => import('./pages/Inventory'));

// Placeholder components
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
    <div className="p-6 bg-primary/5 rounded-full">
      <div className="h-16 w-16 text-primary animate-pulse" />
    </div>
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="text-muted-foreground">This module is currently being finalized for the production release.</p>
  </div>
);

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <BrowserRouter>
        <DashboardLayout>
          <Suspense fallback={
            <div className="flex items-center justify-center h-[60vh]">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/repairs" element={<Repairs />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoices" element={<PlaceholderPage title="Invoice Management" />} />
              <Route path="/payments" element={<PlaceholderPage title="Payment Processing" />} />
              <Route path="/analytics" element={<PlaceholderPage title="Financial Analytics" />} />
              <Route path="/settings" element={<PlaceholderPage title="System Settings" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </DashboardLayout>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

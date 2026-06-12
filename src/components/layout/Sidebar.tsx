import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  Package, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../branding/Logo';
import { Button } from '../ui/button';
import { useLocation, Link } from 'react-router';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Wrench, label: 'Repairs', path: '/repairs' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const SidebarContent: React.FC<{ collapsed?: boolean; onNavItemClick?: () => void }> = ({ collapsed, onNavItemClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <Logo />}
        {collapsed && <Logo showText={false} className="h-8 w-8" />}
      </div>

      <div className="px-3 mb-6">
        <Button 
          className={cn(
            "w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
            collapsed ? "px-0 justify-center" : "px-4"
          )}
        >
          <PlusCircle className="h-5 w-5" />
          {!collapsed && <span>New Repair</span>}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavItemClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer transition-colors",
          collapsed && "justify-center px-0"
        )}>
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside 
      className={cn(
        "hidden lg:flex h-screen border-r border-border transition-all duration-300 flex-col z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="relative flex-1">
        <SidebarContent collapsed={collapsed} />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 h-8 w-8 rounded-full border bg-background z-50 hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
    </aside>
  );
};

import { Wallet, BarChart3 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Expense Tracker
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your finances with ease
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm font-medium">Financial Dashboard</span>
          </div>
        </div>
      </div>
    </header>
  );
}
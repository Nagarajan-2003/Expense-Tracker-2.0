import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, PieChart } from 'lucide-react';
import { Expense, CATEGORY_COLORS } from '@/data/sampleExpenses';

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Calculate totals
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    const yearlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear;
    });
    const yearlyTotal = yearlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Category breakdown
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Sort categories by amount
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5); // Top 5 categories

    return {
      totalAmount,
      monthlyTotal,
      yearlyTotal,
      expenseCount: expenses.length,
      monthlyCount: monthlyExpenses.length,
      categoryTotals: sortedCategories
    };
  }, [expenses]);

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category] || 'expense-other';
  };

  if (expenses.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gradient-card shadow-medium">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">$0.00</div>
                <p className="text-xs text-muted-foreground mt-1">No data yet</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-card shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.expenseCount} {stats.expenseCount === 1 ? 'expense' : 'expenses'} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {stats.monthlyCount} {stats.monthlyCount === 1 ? 'expense' : 'expenses'} this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Year</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.yearlyTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Year-to-date spending
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Expense</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.expenseCount > 0 ? (stats.totalAmount / stats.expenseCount).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average expense amount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>
            Your spending breakdown by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.categoryTotals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No expenses to categorize yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.categoryTotals.map(([category, amount]) => {
                const percentage = (amount / stats.totalAmount) * 100;
                const colorClass = getCategoryColor(category);
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category}</span>
                      <span className="text-muted-foreground">
                        ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`bg-${colorClass} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
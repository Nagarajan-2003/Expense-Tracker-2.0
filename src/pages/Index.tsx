import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Expense } from '@/data/sampleExpenses';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, PlusCircle, List } from 'lucide-react';

const Index = () => {
  // Clear any existing data and start fresh
const [expenses, setExpenses] = useLocalStorage<any[]>('expenses', []);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

 

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId()
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Expenses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard expenses={expenses} />
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <ExpenseForm 
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              onUpdateExpense={handleUpdateExpense}
              onCancelEdit={handleCancelEdit}
            />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <ExpenseList 
              expenses={expenses}
              onEditExpense={handleEditExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

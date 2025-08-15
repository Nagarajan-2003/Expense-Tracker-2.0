import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, X } from 'lucide-react';
import { Expense, EXPENSE_CATEGORIES } from '@/data/sampleExpenses';
import { useToast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  editingExpense?: Expense | null;
  onUpdateExpense?: (expense: Expense) => void;
  onCancelEdit?: () => void;
}

export function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, onCancelEdit }: ExpenseFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: editingExpense?.title || '',
    amount: editingExpense?.amount?.toString() || '',
    category: editingExpense?.category || '',
    date: editingExpense?.date || new Date().toISOString().split('T')[0],
    description: editingExpense?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.amount || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    const expenseData = {
      title: formData.title.trim(),
      amount,
      category: formData.category,
      date: formData.date,
      description: formData.description.trim()
    };

    if (editingExpense && onUpdateExpense) {
      onUpdateExpense({ ...editingExpense, ...expenseData });
      toast({
        title: "Expense Updated",
        description: "Your expense has been successfully updated",
      });
    } else {
      onAddExpense(expenseData);
      toast({
        title: "Expense Added",
        description: "Your expense has been successfully added",
      });
    }

    // Reset form
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-card shadow-medium">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              {editingExpense ? 'Edit Expense' : 'Add New Expense'}
            </CardTitle>
            <CardDescription>
              {editingExpense ? 'Update your expense details' : 'Track your spending by adding a new expense'}
            </CardDescription>
          </div>
          {editingExpense && onCancelEdit && (
            <Button variant="ghost" size="icon" onClick={onCancelEdit}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Grocery Shopping"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional notes about this expense"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-dark">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
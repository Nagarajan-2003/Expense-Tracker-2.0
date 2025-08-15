export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Health & Medical',
  'Shopping',
  'Bills & Utilities',
  'Other'
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': 'expense-food',
  'Transportation': 'expense-transport',
  'Entertainment': 'expense-entertainment',
  'Health & Medical': 'expense-health',
  'Shopping': 'expense-shopping',
  'Bills & Utilities': 'expense-bills',
  'Other': 'expense-other'
};

export const sampleExpenses: Expense[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 89.50,
    category: 'Food & Dining',
    date: '2024-01-15',
    description: 'Weekly groceries from Whole Foods'
  },
  {
    id: '2',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: '2024-01-12',
    description: 'Monthly streaming service'
  },
  {
    id: '3',
    title: 'Gas Station',
    amount: 45.20,
    category: 'Transportation',
    date: '2024-01-10',
    description: 'Fuel for car'
  },
  {
    id: '4',
    title: 'Doctor Visit',
    amount: 150.00,
    category: 'Health & Medical',
    date: '2024-01-08',
    description: 'Annual checkup'
  },
  {
    id: '5',
    title: 'Coffee Shop',
    amount: 8.75,
    category: 'Food & Dining',
    date: '2024-01-07',
    description: 'Morning coffee and pastry'
  },
  {
    id: '6',
    title: 'New Headphones',
    amount: 129.99,
    category: 'Shopping',
    date: '2024-01-05',
    description: 'Wireless noise-canceling headphones'
  },
  {
    id: '7',
    title: 'Electric Bill',
    amount: 95.33,
    category: 'Bills & Utilities',
    date: '2024-01-03',
    description: 'Monthly electricity bill'
  },
  {
    id: '8',
    title: 'Movie Theater',
    amount: 24.50,
    category: 'Entertainment',
    date: '2024-01-02',
    description: 'Movie tickets for two'
  },
  {
    id: '9',
    title: 'Uber Ride',
    amount: 18.40,
    category: 'Transportation',
    date: '2023-12-30',
    description: 'Ride to airport'
  },
  {
    id: '10',
    title: 'Restaurant Dinner',
    amount: 67.85,
    category: 'Food & Dining',
    date: '2023-12-28',
    description: 'Dinner at Italian restaurant'
  },
  {
    id: '11',
    title: 'Internet Bill',
    amount: 79.99,
    category: 'Bills & Utilities',
    date: '2023-12-25',
    description: 'Monthly internet service'
  },
  {
    id: '12',
    title: 'Pharmacy',
    amount: 32.15,
    category: 'Health & Medical',
    date: '2023-12-22',
    description: 'Prescription medications'
  },
  {
    id: '13',
    title: 'Gift for Friend',
    amount: 55.00,
    category: 'Shopping',
    date: '2023-12-20',
    description: 'Birthday present'
  },
  {
    id: '14',
    title: 'Office Supplies',
    amount: 23.99,
    category: 'Other',
    date: '2023-12-18',
    description: 'Notebooks and pens'
  },
  {
    id: '15',
    title: 'Spotify Premium',
    amount: 9.99,
    category: 'Entertainment',
    date: '2023-12-15',
    description: 'Monthly music streaming'
  }
];
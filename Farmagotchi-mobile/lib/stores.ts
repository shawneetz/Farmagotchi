import { create } from 'zustand';

type ModalState = {
  visible: boolean;
};

type ModalAction = {
  open: () => void;
  close: () => void;
};

export const useModal = create<ModalState & ModalAction>((set) => ({
  visible: false,
  open: () => set(() => ({ visible: true })),
  close: () => set(() => ({ visible: false })),
}));

export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  name: string;
  cost: number;
  type: TransactionType;
};

type FinanceState = {
  transactions: Transaction[];
};

type FinanceAction = {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
};

// Initial mock data based on the finance.tsx breakdown
const initialTransactions: Transaction[] = [
  { id: '1', name: 'Rice', cost: 4500, type: 'income' },
  { id: '2', name: 'Carrots', cost: 2500, type: 'income' },
  { id: '3', name: 'Pechay', cost: 2800, type: 'income' },
  { id: '4', name: 'Mangoes', cost: 3500, type: 'income' },
  { id: '5', name: 'Eggplant', cost: 1700, type: 'income' },
  { id: '6', name: 'Fertilizer', cost: 4500, type: 'expense' },
  { id: '7', name: 'Water', cost: 2500, type: 'expense' },
  { id: '8', name: 'Machinery', cost: 3500, type: 'expense' },
  { id: '9', name: 'Transportation /Gas', cost: 1700, type: 'expense' },
];

export const useFinanceStore = create<FinanceState & FinanceAction>((set) => ({
  transactions: initialTransactions,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...transaction, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));

export type TaskCategory = 'daily' | 'weekly' | 'miscellaneous';

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  category: TaskCategory;
  happinessReward: number;
};

type TaskState = {
  tasks: Task[];
};

type TaskAction = {
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  toggleTaskCompletion: (id: string) => void;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Water the mango tree', isCompleted: false, category: 'daily', happinessReward: 10 },
  { id: '2', title: 'Check soil moisture', isCompleted: true, category: 'daily', happinessReward: 5 },
  { id: '3', title: 'Apply fertilizer', isCompleted: false, category: 'weekly', happinessReward: 20 },
  { id: '4', title: 'Prune dead leaves', isCompleted: false, category: 'miscellaneous', happinessReward: 15 },
];

export const useTaskStore = create<TaskState & TaskAction>((set) => ({
  tasks: initialTasks,
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  editTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      ),
    })),
}));

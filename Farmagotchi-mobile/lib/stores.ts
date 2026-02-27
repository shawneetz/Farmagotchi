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

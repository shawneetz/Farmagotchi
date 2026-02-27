import { create } from 'zustand';

type ModalState = {
  visible: boolean;
  showTooltip: boolean;
};

type ModalAction = {
  open: () => void;
  close: () => void;
  dismissTooltip: () => void;
};

export const useModal = create<ModalState & ModalAction>((set) => ({
  visible: false,
  showTooltip: true,
  open: () => set(() => ({ visible: true })),
  close: () => set(() => ({ visible: false })),
  dismissTooltip: () => set(() => ({ showTooltip: false })),
}));

export const useInsightsModal = create<ModalState & ModalAction>((set) => ({
  visible: false,
  showTooltip: true,
  open: () => set(() => ({ visible: true })),
  close: () => set(() => ({ visible: false })),
  dismissTooltip: () => set(() => ({ showTooltip: false })),
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
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  clearTransactions: () => void;
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
    set((state) => {
      const happinessImpact = transaction.type === 'income' ? 2 : -2;
      usePlantStore.getState().updateHappiness(happinessImpact);
      return {
        transactions: [
          ...state.transactions,
          { ...transaction, id: Math.random().toString(36).substr(2, 9) },
        ],
      };
    }),
  removeTransaction: (id) =>
    set((state) => {
      const transaction = state.transactions.find((t) => t.id === id);
      if (transaction) {
        // Reverse happiness impact when removing
        const happinessImpact = transaction.type === 'income' ? -2 : 2;
        usePlantStore.getState().updateHappiness(happinessImpact);
      }
      return {
        transactions: state.transactions.filter((t) => t.id !== id),
      };
    }),
  editTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  clearTransactions: () => set({ transactions: [] }),
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
  resetAllTasks: () => void;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Water the mango tree',
    isCompleted: false,
    category: 'daily',
    happinessReward: 10,
  },
  {
    id: '2',
    title: 'Check soil moisture',
    isCompleted: true,
    category: 'daily',
    happinessReward: 5,
  },
  {
    id: '3',
    title: 'Apply fertilizer',
    isCompleted: false,
    category: 'weekly',
    happinessReward: 20,
  },
  {
    id: '4',
    title: 'Prune dead leaves',
    isCompleted: false,
    category: 'miscellaneous',
    happinessReward: 15,
  },
];

export const useTaskStore = create<TaskState & TaskAction>((set) => ({
  tasks: initialTasks,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }],
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
    set((state) => {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        if (!task.isCompleted) {
          // Completed: Base reward + random increment (0-5)
          const totalReward = task.happinessReward + Math.random() * 5;
          usePlantStore.getState().updateHappiness(totalReward);
        } else {
          // Uncompleted: Subtract base reward
          usePlantStore.getState().updateHappiness(-task.happinessReward);
        }
      }
      return {
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)),
      };
    }),
  resetAllTasks: () =>
    set((state) => ({
      tasks: state.tasks.map((t) => ({ ...t, isCompleted: false })),
    })),
}));

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type ChatState = {
  messages: Message[];
};

type ChatAction = {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  resetChat: () => void;
};

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi there! I'm your Mango tree. How can I help you today?",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: '2',
    role: 'user',
    content: 'How are you feeling today? Do you need anything?',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
  {
    id: '3',
    role: 'assistant',
    content:
      "I'm feeling quite healthy! The weather in Los Baños has been perfect for my growth. Just make sure to check my soil moisture later!",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
  },
];

export const useChatStore = create<ChatState & ChatAction>((set) => ({
  messages: initialMessages,
  addMessage: (message) =>
    set((state) => {
      if (message.role === 'user') {
        const isQuestion = message.content.includes('?');
        const chance = isQuestion ? 0.6 : 0.3; // Incentivize questions
        if (Math.random() < chance) {
          const reward = 2 + Math.random() * 6; // Random 2-8 points
          usePlantStore.getState().updateHappiness(reward);
        }
      }
      return {
        messages: [
          ...state.messages,
          {
            ...message,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
          },
        ],
      };
    }),
  resetChat: () => set({ messages: initialMessages }),
}));

export type WeatherCondition =
  | 'cloud'
  | 'sun'
  | 'cloud-rain'
  | 'cloud-lightning'
  | 'cloud-snow'
  | 'wind'
  | 'cloud-drizzle';

type WeatherState = {
  location: string;
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  condition: WeatherCondition;
};

type WeatherAction = {
  updateWeather: (weather: Partial<WeatherState>) => void;
};

export const useWeatherStore = create<WeatherState & WeatherAction>((set) => ({
  location: 'Los Baños',
  currentTemp: 27,
  highTemp: 30,
  lowTemp: 24,
  condition: 'cloud',
  updateWeather: (weather) => set((state) => ({ ...state, ...weather })),
}));

export type Scan = {
  id: string;
  plotId: string;
  imageUrl: string;
  healthScore: number;
  anomalies: string[];
  tips: string[];
  happinessImpact: number;
  createdAt: number;
};

type ScanState = {
  scans: Scan[];
  recentScan: Scan | null;
  isAnalyzing: boolean;
};

type ScanAction = {
  addScan: (scan: Omit<Scan, 'id' | 'createdAt'>) => void;
  setAnalyzing: (isAnalyzing: boolean) => void;
  setRecentScan: (scan: Scan | null) => void;
  clearRecentScan: () => void;
};

export const useScanStore = create<ScanState & ScanAction>((set) => ({
  scans: [],
  recentScan: null,
  isAnalyzing: false,
  addScan: (scan) => {
    const newScan = {
      ...scan,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    usePlantStore.getState().updateHappiness(scan.happinessImpact);
    set((state) => ({
      scans: [newScan, ...state.scans],
      recentScan: newScan,
    }));
  },
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setRecentScan: (scan) => set({ recentScan: scan }),
  clearRecentScan: () => set({ recentScan: null }),
}));

type PlantState = {
  name: string;
  happiness: number; // 0 to 100
};

type PlantAction = {
  updateHappiness: (amount: number) => void;
  setName: (name: string) => void;
};

export const usePlantStore = create<PlantState & PlantAction>((set) => ({
  name: 'Mango tree',
  happiness: 70.68,
  updateHappiness: (amount) =>
    set((state) => ({
      happiness: Math.min(100, Math.max(0, state.happiness + amount)),
    })),
  setName: (name) => set({ name }),
}));

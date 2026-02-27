# Tasks Screen Implementation Plan

## 1. Overview
Implement a fully functional Tasks Screen (`app/(tabs)/tasks.tsx`) that allows users to manage their daily, weekly, and miscellaneous farming tasks. The screen will be accessible from the main dashboard's "Tasks" widget.

## 2. Navigation
- **Trigger:** Wrap the Tasks widget in `app/(tabs)/index.tsx` with a `Pressable` component.
- **Action:** Use Expo Router's `router.push('/tasks')` to navigate to the Tasks screen.

## 3. State Management (`lib/stores.ts`)
Add a new Zustand store (`useTaskStore`) to manage the state of tasks:
- **Data Model:**
  ```typescript
  export type TaskCategory = 'daily' | 'weekly' | 'miscellaneous';
  
  export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
    category: TaskCategory;
    happinessReward: number; // Hidden from user, used for pet logic
  };
  ```
- **Actions:**
  - `addTask(task: Omit<Task, 'id'>)`
  - `removeTask(id: string)`
  - `editTask(id: string, updates: Partial<Task>)`
  - `toggleTaskCompletion(id: string)`

## 4. UI Implementation (`app/(tabs)/tasks.tsx`)

### 4.1 Layout & Styling (per `DESIGN.md`)
- **Wrapper:** `View` with `flex-1 bg-neutral-100` and padded with `useSafeAreaInsets`.
- **Typography:** `font-geist` family applied using NativeWind classes (e.g., `font-geist text-2xl font-bold text-neutral-900`).
- **Icons:** Use `@expo/vector-icons` (e.g., `Feather` for checkmarks, edit, and trash icons).
- **Categorization:** Use a `SectionList` or multiple `FlatList`s wrapped in a `ScrollView` to group tasks by `daily`, `weekly`, and `miscellaneous`.

### 4.2 Components
- **TaskItem:** 
  - A card component for each task (`bg-white rounded-xl p-4 shadow-sm border border-neutral-200`).
  - Contains a completion checkbox (`Pressable` with conditional icon `check-circle` / `circle`).
  - Title text (with line-through if completed).
  - Edit and Delete action buttons.
- **CategoryHeader:** 
  - Section title with an icon (e.g., `bg-primary-100 text-primary-900 rounded-lg px-3 py-1`).
- **Add Task Modal:**
  - Leverage the existing pattern from `components/Modal.tsx` or build a local modal to add/edit tasks.
  - Inputs for task title and a segmented control/picker for the category.
  - Form styling using semantic tokens (`bg-neutral-100`, `text-neutral-900`, `bg-primary-500` for primary buttons).

## 5. File Modifications Required
1. **`app/(tabs)/index.tsx`**: Add `Pressable` and `useRouter` to navigate to `/tasks`.
2. **`lib/stores.ts`**: Implement `useTaskStore` with mock initial data.
3. **`app/(tabs)/tasks.tsx`**: Build the main screen, lists, and modal for the Tasks feature.

## 6. Execution Steps
1. Create and export `useTaskStore` in `lib/stores.ts`.
2. Update the Dashboard widget in `app/(tabs)/index.tsx` to handle navigation.
3. Build the core layout and static UI in `tasks.tsx`.
4. Integrate the store and add interactive logic (Add, Edit, Delete, Toggle).
5. Refine styles and ensure NativeWind classes strictly follow the `colors.ts` and `tailwind.config.js` tokens.
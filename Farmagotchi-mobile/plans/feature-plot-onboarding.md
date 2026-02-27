# Feature Plan: Plot Onboarding Flow

## Overview
Pressing the "New crop field" button in the `OptionModal` will trigger a new onboarding flow to create a Plot. This flow will gather necessary information for the new plot, including crop details, location, an initial photo, financial baseline, and initial daily tasks.

## User Flow
1. **Trigger**: User opens `OptionModal` and taps "New crop field" (`Left Button`).
2. **Navigation**: App navigates to a new route, e.g., `/add-plot`.
3. **Screens / Steps** (Implemented as a paginated form or a scrollable single screen):
    * **Step 1: Crop Name**: Input field for the name of the crops/plot.
    * **Step 2: Location**: Input field for the location, which will be used for weather features later.
    * **Step 3: Crop Photo**: Option to take or upload a photo of the crop (will be stored for later analysis).
    * **Step 4: Initial Finances**: Input fields for initial costs and profits (revenue calculator baseline).
    * **Step 5: Daily Tasks**: A checklist or dynamic list to add daily tasks for that specific crop.
4. **Completion**: Saving the plot creates a new Plot entity in the store and navigates the user to that new plot's dashboard.

## Technical Implementation

### 1. Routing & Navigation
- Add an `onPress` handler to the "New crop field" button in `components/OptionModal.tsx` to route to `/add-plot`.
- Create a new screen in `app/add-plot.tsx`.

### 2. State Management (Zustand)
- The form state will be managed locally in the `add-plot` screen.
- Upon submission, dispatch an action to the central Plot store (e.g., `addPlot({ name, location, photoUri, initialFinances, dailyTasks })`).

### 3. UI/UX (Following `@plans/DESIGN.md` rules)
- **Styling Methodology**: Use NativeWind `className` strings for all styling. Rely on Flexbox for layout (`flex`, `flex-row`, `justify-between`, etc.). Use `useSafeAreaInsets` for padding around the screen edges.
- **Tokens**: Use semantic colors defined in `tailwind.config.js` and `src/lib/colors.ts` (e.g., `bg-primary-100`, `text-neutral-900`, `bg-neutral-100`).
- **Typography**: Apply the custom font using `font-geist`.
- **Components**:
    * Re-use or build standard inputs (Text inputs, numeric inputs for finances).
    * For the photo step, use an image picker (e.g., `expo-image-picker`) and display a placeholder using an icon from `@expo/vector-icons` or a custom SVG from `/assets/lucide/`. Display the selected image using `expo-image` (for performance and caching).
    * For the daily tasks step, provide a way to add multiple string inputs (an array of tasks).
    * Use buttons that match the style of `OptionModal` or other primary buttons in the app.

### 4. Step-by-Step Breakdown
- **Name & Location View**: Standard `TextInput` components styled with Tailwind.
- **Photo Upload View**: A styled touchable area that triggers the image picker.
- **Finance View**: Numeric input fields for costs and profits.
- **Tasks View**: A dynamic list where users can input text and add it to an array of tasks.

## Code Integration
1. Update `OptionModal.tsx`:
```tsx
<Pressable
  className="h-[103px] flex-1 justify-end overflow-hidden rounded-[19px] bg-primary-400 p-4"
  onPress={() => {
    onClose();
    setTimeout(() => router.push('/add-plot'), 300);
  }}>
  {/* existing content */}
</Pressable>
```
2. Create `app/add-plot.tsx` to house the multistep form.

## Dependencies
- `expo-image-picker`: To handle the photo step (ensure it's installed and configured in `app.json` if necessary).
- `expo-image`: For rendering the selected image.
- `expo-router`: For navigation to the new screen.

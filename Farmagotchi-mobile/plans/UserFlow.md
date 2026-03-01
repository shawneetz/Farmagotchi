# Farmagotchi Mobile User Flow

## 1. Onboarding Flow (MVP)
`Launch App` -> `Welcome Screen`
  -> `Setup Farm Profile (Name, Location for Weather)`
  -> `Setup First Plot (Name, Crop Type)`
  -> `Select Initial Pet (Farmagotchi)`
  -> `Complete Setup & Navigate to Main Dashboard`

## 2. Plots Flow (Context Switcher)
`Tap 'Plots' Tab` -> `List of all active Plots (Fields)`
  -> `Tap a Plot Card` -> `Sets as Active Plot` -> `Navigates to Dashboard for that Plot`
  -> `Tap 'Add Plot'` -> `Setup new Plot (Name, Crop, Pet)` -> `Adds to list`

## 3. Main Dashboard (Home)
**Central Hub** displaying the Farmagotchi, Happiness Bar, and quick action widgets for the **Currently Selected Plot**.
- **Top Bar:** Settings, Notifications, Profile, and a **Plot Switcher Dropdown** (e.g., showing "North Cornfield").
- **Center:** 
    - Interactive `PetAvatar` (e.g., Mango Tree). Tapping the pet opens the **Insights Modal**.
    - Animated tooltip "Tap for insights" signals interactivity.
- **Bottom Navigation Tabs:** Plots | Dashboard | Tasks | Scan | Finance

## 4. Insights & Chat Flow
`Tap Pet on Dashboard` -> `Opens Insights Modal`
  -> `View AI Status Summary:` Weather, Task Progress, Financial Health, and Crop Health.
  -> `Tap 'Chat with your crop'` -> `Navigates to Chat Screen (app/chat.tsx)`
  -> `Chat Interface:` Persistent message history, context-aware AI responses.
  -> `Reset Chat:` Clears conversation history.

## 5. Tasks Flow (Task Tracker)
`Tap 'Tasks' Tab` -> `Daily Task List for the current plot`
  -> `Check off a task` -> `Pet Happiness Increases (+ Bonus)`
  -> `Reset All Tasks:` Resets all tasks to incomplete (Manual for testing/MVP).

## 6. Scan Flow (Soil and Crop AI Analysis)
`Tap 'Scan' Tab` -> `Camera Interface`
  -> `Capture Photo` -> `Simulated Analysis`
  -> `Tap 'Show Analysis'` -> `Scan Analysis Modal` (Health Score, Anomalies, Tips, Happiness Impact)
  -> `Impacts Pet Happiness` -> `Return to Scan Preview`

## 7. Finance Flow (Revenue Calculator)
`Tap 'Finance' Tab` -> `Financial Overview`
  -> `Dynamic Charts:` Semi-circle PieChart for Income vs. Budget.
  -> `Transactions List:` Sorted breakdown of Income and Expenses.
  -> `Add Transaction:` (Planned) Affects Happiness and Chart data.

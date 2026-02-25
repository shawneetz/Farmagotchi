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
- **Top Bar:** Settings, Notifications, Profile, and a **Plot Switcher Dropdown** (e.g., showing "Tomato Patch").
- **Center:** 
    - Interactive `PetAvatar` specific to the current plot. Tapping the pet shows its current stats and level.
    - Daily Insights flow. A chat bubble from PetAvatar, showing weather forecast, short quip about today's actions.
- **Bottom Navigation Tabs:** Plots | Dashboard | Tasks | Scan | Finance | Chat

## 4. Tasks Flow (Task Tracker)
`Tap 'Tasks' Tab` -> `Daily Task List for the current plot`
  -> `Check off a task` -> `Pet Happiness Increases (Visual Feedback)`
  -> `Tap 'Add Task'` -> `Task Configuration Modal` -> `Save Task`

## 5. Scan Flow (Soil and Crop AI Analysis)
`Tap 'Scan' Tab` -> `Camera Preview Screen`
  -> `Capture Photo` or `Select from Gallery`
  -> `Uploading Spinner...`
  -> `Analysis Results Modal` (Shows Health Score, Anomalies, and Tips)
  -> `Applies Score to the current plot's Pet Happiness` -> `Return to Dashboard`

## 6. Finance Flow (Revenue Calculator)
`Tap 'Finance' Tab` -> `Financial Overview (Charts & Profit) for the current plot`
  -> `Tap 'Add Transaction'` -> `Input Expense or Income`
  -> `Save` -> `Recalculate Profit & Charts`
  -> `If Milestone Met -> Pet Happiness Increases`

## 7. Chat Flow (Farmagotchi Chat)
`Tap 'Chat' Tab` -> `Chat Interface`
  -> `User types question (e.g., "When should I harvest my corn?")`
  -> `Send` (Includes silent app context: weather, recent scans, current plot details)
  -> `AI Response streams back in the persona of the current plot's Farmagotchi`

## 8. Daily Insights Flow
*Accessed via Dashboard Widget or notification*
`Launch App (Morning)` -> `Dashboard shows Notification Bubble on Pet`
  -> `Tap Pet Bubble` -> `Opens Daily Insights Modal`
  -> `Shows Weather Forecast, Weekly Recap, and Today's Recommended Actions for the current plot`

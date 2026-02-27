# Farmagotchi Mobile

A mobile application for the Farmagotchi project, built with React Native and Expo.
in the most simplest way:
farmagotchi is a resource management and data analytics mobile application for managing crop fields for farmers
it intends to do the following
- gamify resource management by attaching a mascot to your fields, having to manage and raise your pet the more you take care of your crops
- analyze status of farmer's crops and expenditures
- analyze soil to give farmer a conclusive report of how their field is doing
- profits and revenue calculator
- give reports on possible weather outcomes and how to prepare
- give a list of possible things to do
- chatbot 

## Features

Farmagotchi Pets - Each field of crops has a unique pet to raise and grow. Positive actions (taking care of plants, positive revenue, positive soil quality, etc.) raise the happiness of your pet, allowing for unique rewards, and vice versa.
Task Tracker - Each field has a unique set of tasks the user must do every day. The list of tasks is configurable, and completing them increases the happiness of the Farmagotchi.
Soil and Crop AI Analysis - Every day, the user is incentivised to upload a photo of their fields and sample photos of their crops. An AI analysis is conducted on the images, returning scores, visual descriptions, and possible anomalies for concern. Good scores increase the Farmagotchi's happiness, while bad scores decrease it, and the Farmagotchi will display possible tips and actions to improve quality.
Revenue Calculator - Users can input their current expenses, profit, savings, and budget. Allowing users to have transparent and accountable insights into their expenses, positive profits increase the happiness of the Farmagotchi.
Daily insights – Weather forecasts, insights from last week, and possible tips are displayed by the Farmagotchi, informing the user with actionable information.
Farmagotchi Chat - Users can chat with their Farmagotchi, powered by AI. The Farmagotchi answers questions about their crops and best practices, giving the user new information on how to manage their crops.

## Project Overview

- **Frontend Technologies:** React Native, Expo (SDK 54), TypeScript, NativeWind (Tailwind CSS), React Native Reanimated.
- **Backend Technologies:** FastAPI (Python), SQLModel, SQLite.
- **Architecture:** Standard Expo project structure.
  - `App.tsx`: Main entry point.
  - `components/`: Reusable UI components.
  - `assets/`: Images, icons, and splash screens.
  - `global.css`: Tailwind CSS entry point.

## Building and Running

The project uses the Expo CLI for development.

- **Start Development Server:** `npm start`
- **Run on Android:** `npm run android`
- **Run on iOS:** `npm run ios`
- **Run on Web:** `npm run web`
- **Lint Code:** `npm run lint`
- **Format Code:** `npm run format`

## Development Conventions

- **Styling:** Use Tailwind CSS classes via NativeWind. Classes are applied using the `className` prop (enabled by NativeWind).
- **TypeScript:** Use strict typing. Components should have prop interfaces.
- **Formatting:** Prettier is used for code formatting. Run `npm run format` before committing.
- **Animations:** Use `react-native-reanimated` for performant animations.

## Key Files

- `App.tsx`: Root component wrapping the application in `SafeAreaProvider`.
- `tailwind.config.js`: Tailwind CSS configuration, including content paths and NativeWind presets.
- `metro.config.js`: Metro bundler configuration with NativeWind integration.
- `app.json`: Expo configuration file (name, slug, version, etc.).
- `global.css`: Global styles and Tailwind directives.

## Memory

- **2026-02-28:** Implemented the Finance screen (`app/(tabs)/finance.tsx`) with 1:1 visual parity to Figma design. Switched the income arc to use `assets/chart.svg` via `expo-image` and updated all screen text to use the `GeistPixel` font family.
- **2026-02-28:** Added a "mark all tasks as incomplete" button to the Tasks screen (`app/(tabs)/tasks.tsx`) and implemented the `resetAllTasks` action in `useTaskStore` (`lib/stores.ts`).
- **2026-02-28:** Replaced the "days to growth" plant bar with "happiness" in `app/(tabs)/index.tsx`. Created `usePlantStore` in `lib/stores.ts` to manage plant name and happiness. Updated `InsightsModal.tsx` and `chat.tsx` to use dynamic plant data.
- **2026-02-28:** Implemented the "Show Analysis" feature in the Scan screen (`app/(tabs)/scan.tsx`). Created `useScanStore` to manage analysis state and `ScanAnalysisModal.tsx` to display detailed AI crop analysis results (health score, anomalies, tips, and happiness impact).
- **2026-02-28:** Implemented `useWeatherStore` in `lib/stores.ts` to manage weather data. Updated the weather widget in `app/(tabs)/index.tsx` and AI insights in `components/InsightsModal.tsx` to load data from the store in preparation for API integration.
- **2026-02-28:** Implemented the AIChat feature (`app/chat.tsx`) with persistent message history via `useChatStore`, a reset functionality, and context-aware stubbed AI responses. Linked the "Chat with your crop" button in `InsightsModal.tsx` to the new chat screen.
- **2026-02-28:** Implemented a pull-up "Insights Modal" triggered by pressing the central plant on the dashboard. Added `useInsightsModal` store, `components/InsightsModal.tsx` with AI-style status summaries, and integrated it into the global tab layout. Added an animated "Tap for insights" tooltip to the dashboard to signal interactivity.
- **2026-02-28:** Integrated the "Plant Happiness" feature across all stores. Happiness is now influenced by task completion (with random increments), AI chat engagement (incentivizing questions with higher probability), AI scans, and financial transactions (income/expenses). Added periodic happiness boosts for good weather and positive profit on the Dashboard. *Note: Happiness calculations are currently handled in the frontend for testing/prototyping but should eventually be migrated to the backend for data integrity.*

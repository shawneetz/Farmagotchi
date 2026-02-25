# Data Processing & Analytics Plan (Frontend)

## Overview
While the backend (FastAPI + SQLModel + SQLite) is the source of truth for all historical data, the frontend needs to efficiently fetch, cache, and process this data so the user can fluidly view their analytics (e.g., charts, progress bars, and insights) without constant loading spinners. 

## 1. Data Fetching & Caching Strategy
We will use **TanStack Query (React Query)** to manage remote data fetching, caching, and synchronization. 

- **Why TanStack Query?** It automatically handles caching, background refetching (e.g., when the user refocuses the app), and provides `isLoading` and `isError` states out-of-the-box.
- **Key Queries:**
  - `usePlots()`: Fetches the list of all plots for the user.
  - `usePlotDetails(plotId)`: Fetches the current state of a specific plot and its Farmagotchi.
  - `usePlotAnalytics(plotId, timeRange)`: Fetches aggregated or raw historical data (Scans, Transactions, Task completions) over a specific `timeRange` (e.g., '7d', '30d', 'all').

## 2. Frontend Processing for Visualizations
The backend will send JSON arrays of historical records (e.g., an array of `Transaction` objects or a pre-aggregated `DailySummary` object). The frontend will process this data for visual consumption.

### A. Revenue & Expenses (Finance Tab)
- **Data Shape:** Array of `{ date, type: 'INCOME' | 'EXPENSE', amount }`.
- **Processing:** A utility function will group these by day or week (depending on the chart view) and calculate cumulative profit over time.
- **Visualization:** Pass the processed arrays to a charting library (like `victory-native` or `react-native-chart-kit`) to render a Line Chart showing profit trends, and a Bar Chart comparing expenses vs. income.

### B. Health & Crop Status (Dashboard/Scan Tab)
- **Data Shape:** Array of `{ date, healthScore }` from recent AI Scans.
- **Processing:** Extract the `healthScore` over the last 7 scans to show a trend line. Calculate the average score for the week.
- **Visualization:** A sparkline chart on the dashboard indicating whether crop health is improving or declining.

### C. Task Completion (Progress)
- **Data Shape:** The backend can return a completion percentage per day, e.g., `{ date, completionRate: 0.85 }`.
- **Visualization:** A radial progress bar (using `react-native-reanimated` for smooth filling) showing today's progress, and a small calendar heat-map widget showing consistency over the past month.

## 3. Generating Weekly Insights
While the backend *could* generate the insight text, doing it on the client side allows for richer integration with local device capabilities (like precise current location for weather).

**The Flow:**
1. The frontend uses React Query to pull the last 7 days of data (Average Health, Net Profit, Task Completion %).
2. The frontend calls a weather API (or a backend proxy for weather) using the device's location.
3. The frontend constructs a prompt incorporating all this data.
4. The frontend sends this prompt to the AI endpoint (either directly via an SDK or via the FastAPI backend) to generate the "Weekly Recap" text in the persona of the Farmagotchi.
5. The resulting text is cached locally and displayed in the Daily Insights UI.

## 4. Offline Handling (MVP Scope)
Since it's a mobile app, farmers might be out in a field with poor connectivity.
- **Read-Only Mode:** TanStack Query will serve the last cached analytics and plot status instantly.
- **Optimistic Updates:** When a user checks off a task, the UI will update instantly (optimistic update), and the mutation will be sent to the backend in the background. If the request fails, the UI rolls back.
- **Image Uploads:** If a user takes a picture for a scan while offline, it can be saved locally and placed in a "pending upload" queue to be processed when connectivity is restored.
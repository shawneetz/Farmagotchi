# Main Dashboard (Home) Implementation Plan

## Overview
The Main Dashboard is the central hub of the Farmagotchi application. It provides an immediate, at-a-glance view of the currently selected Plot, the Farmagotchi's status, and quick access to core actions. The design should feel "alive," warm, and engaging.

## Core UI Structure
The screen is vertically structured into three main sections: Header, Pet Interaction Area, and Quick Widgets.

### 1. Header (Plot Context & Global Actions)
- **Top Safe Area:** Respect device safe areas (notches/dynamic islands) using `react-native-safe-area-context`.
- **Plot Switcher Dropdown:** A prominent, styled dropdown or modal selector at the top-center displaying the name of the `currentPlot` (e.g., "Tomato Patch \/"). Tapping it opens a bottom sheet or menu to quickly switch between active plots.
- **Global Icons:** 
  - **Left:** Profile/Settings icon.
  - **Right:** Notifications icon (showing a badge if there are unread alerts or missed tasks).

### 2. Pet Interaction Area (The "Stage")
This is the visual centerpiece of the app.
- **Background:** A stylized, soft-edged container representing the "field" (e.g., a grassy mound or a wooden platform).
- **The Farmagotchi (`PetAvatar` Component):**
  - Rendered centrally using `react-native-reanimated` for idle animations (breathing, slight bouncing).
  - The appearance (sprite/SVG) depends on the `pet.evolutionStage` and `pet.petType`.
  - **Interaction:** Tapping the pet triggers a "happy" or "curious" animation and briefly overlays a stats bubble (Level, Exact Happiness %).
- **Happiness Bar:** A prominent progress bar positioned just below or above the pet.
  - Uses a gradient (e.g., from `Harvest Red` to `Sunlit Gold` to `Earthy Green`) to indicate the happiness level.
  - Animate the fill level on load or when happiness changes.
- **Daily Insight Bubble (Dynamic):** A speech bubble originating from the pet that appears dynamically (e.g., on first morning launch). It contains a brief, folksy message combining weather ("Gonna be hot today!") and a suggested action ("Don't forget to water!").

### 3. Quick Widgets (Bottom/Scrollable Area)
A scrollable grid or list of cards providing summaries and entry points to the other tabs.
- **Task Summary Widget:**
  - Displays progress: "X/Y Tasks Completed Today".
  - A mini progress ring.
  - Tapping navigates to the Tasks Tab.
- **Health/Scan Widget:**
  - Shows the most recent AI Health Score (e.g., "85% - Healthy").
  - A small icon indicating the trend (up/down arrow) compared to the previous scan.
  - Tapping navigates to the Scan Tab.
- **Finance Widget:**
  - Shows current week's or month's net profit (e.g., "+$120").
  - Colored text (Green for positive, Red for negative).
  - Tapping navigates to the Finance Tab.

## State Management & Data Fetching
- **Active Context:** The entire dashboard is wrapped in a mechanism that listens to the `currentPlotId`.
- **Data Hooks (React Query):**
  - `usePlotDetails(currentPlotId)`: Fetches the plot name, crop type, and the associated Farmagotchi details (happiness, level).
  - `useDailySummary(currentPlotId)`: Fetches the aggregated widget data (completed tasks count, latest health score, current profit).
- **Loading States:** While fetching data for a newly selected plot, display skeleton loaders for the widgets and a generic "sleeping" or "loading" state for the PetAvatar to ensure a smooth transition without harsh layout shifts.

## Styling (NativeWind)
- **Layout:** Use Flexbox extensively. The main container should be `flex-1 bg-morning-mist`.
- **Cards/Widgets:** Apply `bg-soft-clay rounded-3xl p-4 shadow-sm` to create soft, touchable areas.
- **Typography:** Ensure headers use the rounded, friendly font, and data points are highly legible. Use `text-rich-soil-brown` for primary text.
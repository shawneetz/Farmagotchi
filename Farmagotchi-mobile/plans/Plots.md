# Plots Implementation Plan

## Overview
A master list allowing users to manage multiple fields (Plots). Each Plot is an independent entity with its own Farmagotchi pet, task list, financial data, and chat history. Selecting a plot from this tab switches the context of the entire app to that specific plot.

## Core Logic
- **Data Model:** A `Plot` object containing `id`, `name`, `cropType`, `petId`, and references to its specific `tasks`, `transactions`, `scans`, and `chatHistory`.
- **Global Context (State Management):** Use Zustand to store an array of `plots` and a `currentPlotId`. 
  - All other stores (Task Store, Pet Store, Finance Store, Chat Store) will either be keyed by `plotId` (e.g., `tasks[plotId]`) or the app will subscribe to a single `PlotContext` that provides the data for the active `currentPlotId`.
- **Context Switching:** When a user selects a different plot, the `currentPlotId` state updates, causing the Dashboard, Tasks, Finance, and Chat tabs to re-render with the data of the newly selected plot.

## UI Implementation
- **Plots List View:** A visually appealing `FlatList` or `ScrollView` displaying cards for each plot. 
  - Each card shows the Plot's name, crop type, a mini avatar of its current Farmagotchi, and a quick status indicator (e.g., happiness level or pending tasks).
- **Add New Plot:** A prominent floating action button (FAB) or card to "Add New Plot." This triggers a flow to name the plot, select the crop type, and choose a new pet.
- **Plot Context Header:** On all other tabs (Dashboard, Tasks, Chat, Finance), the top navigation bar should clearly display the name of the currently active plot (e.g., "Cornfield A") with a quick-switch dropdown to change plots without returning to the Plots tab.
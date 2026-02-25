# Task Tracker Implementation Plan

## Overview
A configurable daily task list for each field. Completing tasks increases the Farmagotchi's happiness.

## Core Logic
- **Task Data Model:** Define a `Task` interface (`id`, `title`, `isCompleted`, `frequency`, `happinessReward`).
- **happinessReward** Should be hidden to the user, and be only calculated at the backend.
- **AI generated to do lists** create a couple tasks based on the crop and field
- **Daily Reset:** Implement logic to reset `isCompleted` status daily at a specific time (e.g., midnight local time) using a local date check on app load or a background fetch task.
- **State Management:** Store tasks locally using Zustand combined with AsyncStorage. Allow users to add, edit, or delete tasks dynamically.

## UI Implementation
- **List View:** Use a `FlatList` for rendering the daily tasks with a custom `TaskItem` component containing a checkbox.
- **Interactions:** On toggling a task completion, trigger a visual cue, update the local state, and dispatch `increaseHappiness(reward)` to the pet store.
- **Styling:** Use NativeWind for the task cards, leveraging Tailwind for spacing, borders, typography, and interactive touch feedback.

# Onboarding Implementation Plan (MVP)

## Overview
The onboarding flow introduces the user to Farmagotchi. For the MVP, we are skipping traditional account creation (email/password) to reduce friction. All data will be stored locally on the device (using AsyncStorage/SQLite) or tied to an anonymous device ID if a backend is used. The goal is to get the user to their first Plot and Pet as quickly as possible.

## Core Logic
- **First Launch Detection:** Use a local storage flag (e.g., `hasCompletedOnboarding`) to determine if the user should see the onboarding flow or go straight to the Dashboard.
- **Data Collection:** Gather the bare minimum needed to initialize the app:
  1.  **Farm/User Details:** A display name and location (for weather).
  2.  **First Plot Details:** Name of their first field and the crop type.
  3.  **Pet Selection:** Choosing their starting Farmagotchi.
- **State Initialization:** Upon completion, populate the global Zustand stores with the `User`, the first `Plot`, and its corresponding `Farmagotchi`. Set the `currentPlotId` to this newly created plot.

## UI Implementation
- **Welcome Screen:** A friendly splash screen with the Farmagotchi logo, brand colors, and a "Get Started" button.
- **Step-by-Step Flow:** Use a paged carousel or a stack navigator to guide the user through the setup steps.
  - **Step 1: Farm Profile:** Input field for the farmer's name. A button to "Detect Location" (using `expo-location`) or a manual city input for weather data.
  - **Step 2: Your First Plot:** Input field for the plot name (e.g., "Backyard Garden") and a picker/dropdown for the primary crop type (e.g., "Tomatoes", "Corn", "Wheat").
  - **Step 3: Choose Your Pet:** A horizontal scroll view or grid displaying the available starter Farmagotchis (e.g., a sprout pet, a seed pet). Users tap to select one, seeing a small bounce animation.
- **Completion:** A celebratory screen ("Welcome to the Farm!") with a button that transitions the app to the Main Dashboard, setting the `hasCompletedOnboarding` flag to `true`.
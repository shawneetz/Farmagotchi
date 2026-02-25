# Daily Insights Implementation Plan

## Overview
Displays weather forecasts, past week insights, and actionable tips via the Farmagotchi.

## Core Logic
- **Weather API:** Integrate an external weather service (e.g., OpenWeatherMap or WeatherAPI) using the device's geolocation via `expo-location`.
- **Data Aggregation:** Collect last week's data from the Task Tracker, Revenue Calculator, and AI Analysis stores to build a "Past Week Insight" summary.
- **Tip Generation:** Combine weather data and past week analytics to produce dynamic context-aware tips (e.g., "It's going to rain tomorrow, you might not need to water the crops!").

## UI Implementation
- **Widget-Based Layout:** A scrollable dashboard displaying a `WeatherWidget`, an `InsightsSummaryCard`, and a `TipsCarousel`.
- **Pet Integration:** The insights and tips will be displayed in a speech bubble originating from the `PetAvatar` component, emphasizing the gamified persona providing the information.
- **Styling:** Use NativeWind to ensure cards feel modern, with proper elevation and rounded corners matching the game's aesthetic.
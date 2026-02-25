# Farmagotchi Pets Implementation Plan

## Overview
Each field of crops has a unique pet to raise and grow. Positive actions raise the happiness of your pet, allowing for unique rewards, and vice versa.

## Core State & Logic
- **State Management:** Use Zustand to track the pet's attributes globally (happiness, level, current stage, rewards unlocked).
- **Triggers:** Expose global actions (`increaseHappiness`, `decreaseHappiness`) to be dispatched by other modules (Task Tracker, Revenue Calculator, AI Analysis).
- **Data Persistence:** Use `AsyncStorage` or an equivalent secure local storage to persist the pet's state locally so it's maintained across app reloads.

## UI Implementation
- **Animation:** I will provide gifs to play on certain Pet actions (Idle, Happy, Sad, Watering) etc, if none exist, just play some css animation looping.
- **Component Design:** A central `PetAvatar` component that accepts the current happiness score and changes sprite sheets or SVGs based on the stage/state.
- **Styling:** Utilize NativeWind for layout positioning, ensuring the pet sits centrally above crop stats and interacts with the user interface.


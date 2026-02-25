# Soil and Crop AI Analysis Implementation Plan

## Overview
Users upload photos of their fields/crops for AI analysis. The score affects the pet's happiness, and users receive actionable tips.

## Core Logic
- **Camera Access:** Use `expo-camera` or `expo-image-picker` to capture live photos or select existing images from the gallery.
- **API Integration:** Upload images (base64 or multipart form) to a secure backend endpoint or a Vision API directly (e.g., Gemini Pro Vision API).
- **Analysis Parsing:** Parse the JSON response for `healthScore` (0-100), `anomalies` (array of detected issues), and `tips` for improvement.
- **Happiness Link:** Map the `healthScore` to a threshold. Consistently high scores trigger `increaseHappiness()`; critically low scores trigger `decreaseHappiness()`.

## UI Implementation
- **Upload Flow:** A dedicated screen with a camera preview overlaid with a framing guide, plus a gallery picker button.
- **Results View:** A modal or slide-up panel showing the parsed AI report, displaying visual indicators (green/yellow/red) based on the health score, and presenting the generated tips.
- **Pet Reaction:** Update the pet's animation state (e.g., celebrating or concerned) immediately upon receiving and processing the AI response.
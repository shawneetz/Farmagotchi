# Farmagotchi Chat Implementation Plan

## Overview
An AI-powered chat interface where users can ask their Farmagotchi questions about crops and best practices.

## Core Logic
- **LLM Integration:** Connect to a backend proxy that forwards requests to an LLM (e.g., Gemini). The system prompt will instruct the AI to act as the user's helpful Farmagotchi mascot.
- **Context Injection:** When sending a message, silently append the current app state (local weather, last AI soil analysis, current task list completion) so the AI can provide hyper-relevant and personalized answers.
- **Message Handling:** Maintain local chat history using AsyncStorage so past conversations and context are preserved between sessions.

## UI Implementation
- **Chat Interface:** Build an intuitive messaging interface, potentially utilizing `react-native-gifted-chat` or a custom `FlatList` of message bubbles.
- **Typing Indicators:** Add visual `react-native-reanimated` typing indicators or "thinking" animations for the pet avatar placed fixed at the top of the chat view.
- **Styling:** Customize message bubbles using NativeWind to fit the gamified, friendly aesthetic of the app, distinct from standard messaging apps.

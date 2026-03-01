# Farmagotchi

**Farmagotchi** is a gamified resource management and data analytics platform designed for farmers. It bridges the gap between complex agricultural data and engaging user experiences by attaching a digital mascot (a "Farmagotchi") to your crop fields. The better you care for your crops, the happier and more evolved your pet becomes.

*This project was developed for the **Innovation Labs Hackathon** hosted by the **Association of Computer Science Students (ACSS) UPLB**.*

## 🌟 Features

### 🐾 Farmagotchi Pets
Each field has a unique pet to raise. Positive actions—like completing tasks, maintaining high soil quality, and generating profit—increase your pet's happiness and level, unlocking rewards.

### 📋 Task Tracker
Manage daily agricultural operations with a plot-specific task list. Completing tasks directly boosts your Farmagotchi's happiness.

### 🔬 AI Crop & Soil Analysis
Upload photos of your fields for instant AI-driven health scores, anomaly detection, and actionable tips. High health scores improve your pet's well-being.

### 💰 Finance & Revenue Calculator
Track expenditures, profits, and budgets with transparent insights. Dynamic charts visualize your income and expenses, ensuring you stay on top of your farm's financial health.

### 🌦️ Daily Insights & Weather
Receive tailored weather forecasts and agricultural tips. The Farmagotchi synthesizes complex data into simple, actionable summaries.

### 💬 AI Farmagotchi Chat
Interact with your pet via an AI-powered chatbot. Ask questions about best practices, crop health, or just check in on how they're doing.

---

## 🛠️ Tech Stack

### Frontend (Mobile)
- **Framework:** React Native with Expo (SDK 54)
- **Styling:** NativeWind (Tailwind CSS)
- **Animations:** React Native Reanimated
- **Charts:** React Native Gifted Charts
- **State Management:** Zustand

### Backend (API)
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL (via Supabase)
- **ORM:** SQLAlchemy / SQLModel
- **Async:** Full asynchronous support for database operations and AI service integration.

### Demo Video
- **Framework:** Remotion
- **Purpose:** Programmatic video production for feature walkthroughs and marketing.

---

## 📂 Project Structure

```text
.
├── Farmagotchi-mobile/       # Expo React Native application
│   ├── app/                  # File-based routing (Expo Router)
│   ├── components/           # Reusable UI components (Modals, Charts, etc.)
│   └── lib/                  # State stores and utilities
├── Farmagotchi-fastapi-app/  # Python backend service
│   ├── main.py               # API entry point
│   ├── models.py             # SQLAlchemy data models
│   └── services.py           # Business logic and AI integrations
└── demo-video/               # Remotion project for product demo
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- Expo Go (for mobile testing)

### Mobile Setup
```bash
cd Farmagotchi-mobile
npm install
npm start
```

### Backend Setup
```bash
cd Farmagotchi-fastapi-app
pip install -r requirements.txt
python main.py
```

---

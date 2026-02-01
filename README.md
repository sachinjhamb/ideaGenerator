# 💎 Leadership Pulse: Idea Generator

A premium, interactive dashboard designed for modern engineering and service leaders. It provides weekly actionable leadership tasks, live industry news, and robust observability.

![Leadership Pulse Screenshot](file:///C:/Users/Sachin%20Jhamb/.gemini/antigravity/brain/524d9873-28b0-44be-b738-d0ada03de84d/leadership_app_initial_load_1769950067797.webp)

## 🚀 Key Features

- **Tailored Role Tracks**: Specialized content for Service Management, Investments Tech, and Data Engineering.
- **Dynamic Idea API**: Real-time sync of leadership ideas from remote sources with resilient local fallbacks.
- **Industry Pulse**: Live technical news feed from **SRE Weekly** and **AWS Financial Services**.
- **Observability Layer**: Built-in daily rolling logger with automatic **JSZip** compression for archiving.
- **Task Management**: Priorities (High/Med/Low), persistent notes, and incomplete task rollover.
- **Premium Aesthetics**: Dark-mode glassmorphism interface with smooth micro-animations.

## 🛠 Tech Stack

- **Core**: React 18 + Vite
- **Styling**: Vanilla CSS (Custom Variable Design System)
- **Utilities**: JSZip (Logging), Vitest (Testing)
- **Data**: REST APIs + Local Industry Expert Knowledge

## ⚙️ Project Setup

### 1. Installation
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the root to configure your custom API source:
```env
VITE_API_BASE_URL=https://your-remote-source.com/data
```

### 3. Development
```bash
npm run dev
```

### 4. Testing
Run the comprehensive unit and integration suite:
```bash
npm test
```

## 📁 Project Structure

- `src/components/`: Modular UI components (Header, LeaderCard, TodoItem, etc.).
- `src/services/`: Network and data fetching logic.
- `src/utils/`: Core utilities like `dateUtils` and the `logger`.
- `src/data/`: Static industry best practices (fallback data).

## 📊 Observability (Logging)

The app includes a dedicated logging utility at `src/utils/logger.js`.
- **Location**: Browser `localStorage`.
- **Rollover**: Automatic daily rollover.
- **Archives**: Historic logs are zipped and stored for 7 days.
- **Inspection**: View logs in the browser console or the **Application** tab in DevTools.

---
*Empowering leaders through structured action and live insights.*

# 🌤️ Elite Weather Forecast App - Apple Style

A visually stunning, high-performance weather application inspired by Apple Weather. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

![Weather App Preview](public/preview.png)

## ✨ Elite Features
-   **Interactive Data Visualization:** Premium 24-hour temperature trend charts using **Recharts**.
-   **Environmental Health Monitoring:** Real-time Air Quality Index (AQI) tracking with detailed pollutant breakdowns.
-   **International Unit Support:** Seamless toggle between Metric (€C) and Imperial (€F) units with local persistence.
-   **Glassmorphism UI:** Sophisticated semi-transparent effects with `backdrop-blur` and dynamic borders.
-   **PWA Ready:** Fully installable on mobile and desktop with offline support.
-   **Architectural Excellence:** Clean separation of concerns with a dedicated Service Layer for API logic.
-   **Deep Blue Elite Theme:** Refined aesthetics for a high-impact first impression.
-   **Context-Aware Insights:** Intelligent health and activity tips based on live weather metrics.
-   **Smooth Animations:** Integrated with **Framer Motion** for premium entry transitions.

## 🛠️ Tech Stack
-   **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
-   **API:** [OpenWeatherMap v2.5](https://openweathermap.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- OpenWeatherMap API Key (Free tier)

### 1. Installation
```bash
git clone https://github.com/Tayyaba-Javed/weather-forecast-app.git
cd weather-forecast-app
npm install
```

### 2. Configure API Key
Create a `.env` file in the root directory:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Run Locally
```bash
npm run dev
```

## 🏗️ Architecture & Philosophy
- **Serverless/API Driven:** The application architecture is lightweight and cloud-native, directly consuming the OpenWeatherMap API with custom axios hooks for data extraction and error handling.
- **State Management:** Using React hooks (`useState`, `useCallback`, `useEffect`) for simple and efficient global state management without the overhead of Redux.
- **CSS-First Design:** Leveraging Tailwind CSS v4's new engine for direct CSS variable manipulation and high-performance glass effects.
- **Database:** Utilizing `localStorage` for client-side persistence of "Favorite Cities" and "API Configuration."

## 📜 License
MIT License - Created for educational and portfolio purposes.
# Smart Agro-Advisory System 

---

## 1) Title & Objective

**Tech:** MERN Stack (MongoDB, Express.js, React/React Native, Node.js) + Weather & Market APIs  
**Objective:** Build a decision-support system that helps farmers determine the best time to plant and harvest, monitor weather conditions, and view market crop prices in real time.

---

## 2) Quick Summary of the Technology

### MERN Stack

- **MongoDB:** Flexible NoSQL database for storing farm data, crops, weather logs, and market prices.
- **Express.js:** Lightweight backend framework for building REST APIs.
- **React / React Native:** User interface for both mobile and web access.
- **Node.js:** Server environment for running backend logic and integrating third-party data sources.

### External APIs

- **Weather APIs:** OpenWeatherMap, WeatherAPI for forecasts and climate trends.
- **Market Data:** Government agricultural boards or private market-price APIs.

### Real-world usage

Agri-tech companies use similar stacks for precision farming, satellite-driven crop monitoring, and digital advisory tools.

---

## 3) System Requirements

### For Developers

- **OS:** Windows/macOS/Linux  
- **Node.js:** v18+  
- **Package Manager:** npm or yarn  
- **Database:** MongoDB (local installation or cloud via Atlas)  
- **Editor:** VS Code + ESLint + Prettier  
- **Frontend Tools:** React or React Native CLI / Expo  

### Dependencies

**Backend:**  
- express  
- mongoose  
- axios  
- dotenv  
- cors  

**Frontend:**  
- react / react-native  
- axios  
- recharts (for data visualization)  
- tailwindcss (for web UI)

**APIs Needed:**  
- WeatherAPI or OpenWeatherMap API key

---

## 4) Installation & Setup

### Backend Setup

```bash
git clone <repo>
cd agro-api

npm install
cp .env.example .env   # Insert API keys + MongoDB URI
npm run dev 
```


Environment Variables
```bash
EXPO_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000
```

5) Minimal Working Example
Weather & Market Advisory Card
```bash
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export default function AdvisoryCard() {
  const [weather, setWeather] = useState(null);
  const maizePrice = 52;

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Nairobi&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => setWeather(data));
  }, []);

  if (!weather) return <Text>Loading...</Text>;

  return (
    <View className="p-4 bg-green-100 rounded-lg">
      <Text>Temperature: {weather.main.temp}°C</Text>
      <Text>Maize Price: KES {maizePrice} / kg</Text>
    </View>
  );
}
```

Expected Output:

Current temperature displayed

Sample market price shown

Loading state while fetching data

6) AI Prompt Journal

Prompt Used:
“Create a simple React Native component to show weather and market prices for farmers.”

AI Contribution:
Helped scaffold the minimal advisory UI and API integration.

7) Common Issues & Fixes

API not responding → Check API key validity

Data not loading on phone → Use local IP instead of localhost

Env variables missing → Restart Expo after changes

8) References

OpenWeatherMap API Documentation

React Native Documentation

Expo Environment Variables

MongoDB Atlas Docs
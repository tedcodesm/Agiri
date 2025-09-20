import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "../config/Ip";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [user, setUser] = useState(null);

   useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
          console.log("User location:", JSON.parse(userData)?.location);
        }
        console.log("User loaded:", userData);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, []);


   const location = user?.location ; 
  useEffect(() => {

     if (!location) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [location]);

  if (!weather) {
    return (
      <Text className="text-center text-green-900 font-bold">Loading...</Text>
    );
  }

  return (
    <View className="px mt-4 w-full">
      <View className="flex-col bg-white px-4 py-4 rounded-xl gap-4 items-start justify-start">
        {/* Header with location and temperature */}
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-lg font-bold text-green-900 flex-row items-center">
            <Ionicons name="location" size={24} color="#16a34a" />{" "}
            {weather.name}
          </Text>
          <Text className="text-2xl font-bold text-green-900">
            {Math.round(weather.main.temp)}°C
          </Text>
        </View>

        {/* Weather Details */}
        <View className="w-full flex-wrap flex-row gap-5 items-center justify-between">
          <View className="flex-col  items-center">
            <Ionicons name="water" size={24} color="#16a34a" />
            <Text className="text-sm text-green-800">
              {weather.main.humidity}%
            </Text>
            <Text className="text-md font-semibold text-green-900">
              Humidity
            </Text>
          </View>
          <View className="flex-col  items-center">
            <Ionicons name="speedometer" size={24} color="#16a34a" />
            <Text className="text-sm text-green-800">
              {weather.main.pressure} hPa
            </Text>
            <Text className="text-md font-semibold text-green-900">
              Pressure
            </Text>
          </View>

          <View className="flex-col  items-center">
            <Icon name="weather-windy" size={28} color="#16a34a" />
            <Text className="text-sm text-green-800">
              {weather.wind.speed} m/s
            </Text>
            <Text className="text-md font-semibold text-green-900">Wind</Text>
          </View>

          <View className="flex-col  items-center">
            <Ionicons name="cloud" size={24} color="#16a34a" />
            <Text className="text-sm text-green-800">
              {weather.clouds.all}%
            </Text>
            <Text className="text-md font-semibold text-green-900">
              Cloudiness
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
};

export default WeatherCard;

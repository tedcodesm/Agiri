import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";  
import WeatherCard from "./TestWeather";

export default function HomeScreen() {
    const [today, setToday] = useState("");

useEffect(() => {
  const updateDate = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setToday(now.toLocaleDateString("en-US", options));
  };

  updateDate(); // initial set
  const interval = setInterval(updateDate, 1000 * 60 * 60 * 24); // update daily

  return () => clearInterval(interval);
}, []);


   const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };
  return (
    <View className="flex-1 bg-green-100">
      <StatusBar barStyle="light-content" backgroundColor="#84cc16" />
      <View className="w-full h-48 bg-[#84cc16] rounded-b-3xl pt-6 shadow-lg flex-col space-y-4 gap-6 shadow-green-200">
        <View className="w-full px-4 py- items-center  justify-between flex-row">
          <View className="flex flex-col items-start">
            <Text className="text-xl font-bold text-green-900 text-white">
              {getGreeting()} Farmer
            </Text>
            <Text className="text-sm text-green-800 text-white">
              {today}
            </Text>
          </View>
          <View className="w-8 h-8 bg-green-400 rounded-full items-center justify-center">
            <Text className="text-white font-bold">*</Text>
          </View>
        </View>
        {/* search bar */}
        <View className="w-full px-4 py-2">
          <View className="bg-[#84cc16] rounded-full border  border-gray-300 flex-row items-center">
            <Ionicons name="search" size={24} color="white" className="ml-4" />
            <TextInput
              placeholder="Search..."
              className="flex-1 py-4 px-4 text-white rounded-full"
            />
          </View>
        </View>
      </View>
      <ScrollView  vertical={true} showsVerticalScrollIndicator={false}>
      <View className="px-4  mt-4 w-full">
       <WeatherCard/>
        <Text className="text-2xl py-4 font-bold text-green-900">
          Commodities and food
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="w-full flex-row items-center gap-5">
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🌽</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Maize</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍇</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Grapes</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🧅</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Onions</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🥕</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Carrot</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🥑</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Avocado</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍒</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Cherries</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍌</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Bananas</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍉</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">
                Watermelon
              </Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🥭</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Mango</Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍓</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">
                Strawberries
              </Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍍</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">
                Pineapple
              </Text>
            </View>
            <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
              <TouchableOpacity className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
                <Text className="text-4xl font-bold">🍋</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-green-900">Lemon</Text>
            </View>
          </View>
        </ScrollView>
      </View>
          <View className="flex-1 pb-40 justify-center items-center p-5">
      <Text className="text-xl font-bold mb-3 text-green-900">
        🌽 Maize Market Value per (debe)
      </Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          datasets: [
            {
              data: [120, 135, 150, 140, 160, 180, 129, 220],
              color: () => `rgba(132, 204, 22, 1)`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel="Ksh "
        chartConfig={{
          backgroundColor: "#f4f4f5",
          backgroundGradientFrom: "#f4f4f5",
          backgroundGradientTo: "#f4f4f5",
          decimalPlaces: 0,
          color: () => `rgba(37, 99, 235, 1)`, 
          labelColor: () => "#374151", 
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#84cc16", 
          },
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16,
        }}
      />
    </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

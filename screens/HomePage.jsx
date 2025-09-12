import { StyleSheet, Text, View, StatusBar, TextInput ,ScrollView} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomePage() {
  return (
    <View className="flex-1 bg-green-100">
      <StatusBar barStyle="light-content" backgroundColor="#84cc16" />
      <View className="w-full h-48 bg-[#84cc16] rounded-b-3xl pt-6 shadow-lg flex-col space-y-4 gap-6 shadow-green-200">
        <View className="w-full px-4 py- items-center  justify-between flex-row">
          <View className="flex flex-col items-start">
            <Text className="text-2xl font-bold text-green-900 text-white">
              Hello Farmer
            </Text>
            <Text className="text-sm text-green-800 text-white">
              Sunday , 01 Dec 2024
            </Text>
          </View>
          <View className="w-8 h-8 bg-green-400 rounded-full items-center justify-center">
            <Text className="text-white font-bold">A</Text>
          </View>
        </View>
        {/* search bar */}
        <View className="w-full px-4 py-2">
          <View className="bg-[#84cc16] rounded-full border border-gray-300 flex-row items-center">
            <Ionicons name="search" size={24} color="white" className="ml-4" />
            <TextInput
              placeholder="Search..."
              className="flex-1 py-4 px-4 rounded-full"
            />
          </View>
        </View>
      </View>
      <View className="px-4 mt-4 w-full">
        <View className="flex-col bg-white px-4 py-4 rounded-xl gap-4 items-start justify-start">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-lg items-center font-bold text-green-900">
              <Ionicons name="location" size={24} color="#16a34a" /> Kanunga
            </Text>
            <Text className="text-2xl font-bold text-green-900">+16°C</Text>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <View className="flex-col items-center">
               <Ionicons name="water" size={24} color="#16a34a" />
              <Text className="text-sm text-green-800">25%</Text>

              <Text className="text-md font-semibold text-green-900">
                Soil Moisture
              </Text>
            </View>
            <View className="flex-col items-center">
               <Ionicons name="windy" size={24} color="#16a34a" />
              <Text className="text-sm text-green-800">25%</Text>

              <Text className="text-md font-semibold text-green-900">
                Wind
              </Text>
            </View>
            <View className="flex-col items-center">
               <Ionicons name="cloud" size={24} color="#16a34a" />
              <Text className="text-sm text-green-800">25%</Text>

              <Text className="text-md font-semibold text-green-900">
                Humidity
              </Text>
            </View>
            <View className="flex-col items-center">
               <Ionicons name="sunny" size={24} color="#16a34a" />
              <Text className="text-sm text-green-800">22°C</Text>

              <Text className="text-md font-semibold text-green-900">
                Temperature
              </Text>
            </View>
          </View>
          
        </View>
         <Text className="text-2xl py-4 font-bold text-green-900">
               Commodities and food
             </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="w-full flex-row items-center gap-5">
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🌽</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Maize
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍇</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Grapes
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🧅</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Onions
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🥕</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Maize
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🥑</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Avocado
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍒</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Cherries
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍌</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Bananas
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍉</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Watermelon
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🥭</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Mango
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍓</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Strawberries
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍍</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Pineapple
               </Text>
          </View>
          <View className=" flex flex-col items-center gap-1 shadow-lg shadow-green-200 p-">
            <View className="w-20 h-20 bg-white items-center justify-center rounded-xl p-4">
              <Text className="text-4xl font-bold">🍋</Text>
            </View>
               <Text className="text-lg font-bold text-green-900">
                 Lemon
               </Text>
          </View>
            
        </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

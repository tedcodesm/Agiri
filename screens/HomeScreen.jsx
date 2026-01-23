import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";  
import WeatherCard from "./TestWeather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFoodPrices } from "../services/FoodPrices";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const [today, setToday] = useState("");
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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


// get user data from async storage
 useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData)); // stored as JSON.stringify(user)
          console.log("User location:", JSON.parse(userData)?.location);
        }
        console.log("User loaded:", userData);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser();
  }, []);

   const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const commodityEmojiMap = {
  "Bananas": "🍌",
  "Maize": "🌽",
  "Beans": "🫘",
  "Rice": "🍚",
  "Tomatoes": "🍅",
  "Onions": "🧅",
  "Potatoes": "🥔",
  "Cabbage": "🥬",
  "Cowpeas": "🫘", 
  "Avocado": "🥑",
  "Sorghum": "🌾",
  "Millet": "🌾",
  "Green grams": "🫘",
  
};
const popularCommodities = [
  "Bananas",
  "Maize",
  "Beans",
  "Cowpeas",
  "Rice",
  "Tomatoes",
  "Cabbage",
];
useEffect(() => {
    const loadData = async () => {
      try {
        const prices = await fetchFoodPrices();
        setData(prices);
      } catch (err) {
        setError("Failed to load commodity data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#006400" />
        <Text>Loading commodities...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }
  return (
    <View className="flex-1 bg-green-100">
      <StatusBar barStyle="light-content" backgroundColor="#84cc16" />
      <View className="w-full h-48 bg-[#84cc16] rounded-b-3xl pt-6 shadow-lg flex-col space-y-4 gap-6 shadow-green-200">
        <View className="w-full px-4 py- items-center  justify-between flex-row">
          <View className="flex flex-col items-start">
            <Text className="text-xl font-bold text-green-900 text-white">
              {getGreeting()} {user?.username}
            </Text>
            <Text className="text-sm text-green-800 text-white">
              {today}
            </Text>
          </View>
          <View className="w-8 h-8 bg-green-400 rounded-full items-center justify-center">
            <Text className="text-white text-4xl text-center font-bold">*</Text>
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
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {popularCommodities.map((comm) => {
          const emoji = commodityEmojiMap[comm] || "🥕"; // fallback
          return (
            <View key={comm} style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  navigation.navigate("CommodityDetail", { commodity: comm })
                }
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>{comm}</Text>
            </View>
          );
        })}
      </ScrollView>
      </View>
          <View className="flex-1 pb-40 justify-center items-center p-5">
      <Text className="text-xl font-bold mb-3 text-green-900">
        🌽 Maize Market Value per (debe)
      </Text>
      <LineChart
        data={{
          labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "jan"],
          datasets: [
            {
              data: [52, 71, 71, 45, 39, 39, 44, 56],
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { padding: 20, backgroundColor: "#84cc16", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "white" },
  subtitle: { color: "white", marginTop: 4 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 2,
  },
  iconContainer: {
    alignItems: "center",
    margin: 12,
    width: 80,
  },
  iconButton: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4ade80",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  emoji: { fontSize: 40 },
  label: { marginTop: 8, fontWeight: "bold", color: "#14532d", fontSize: 14 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

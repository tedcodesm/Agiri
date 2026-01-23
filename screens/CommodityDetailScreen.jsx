// screens/CommodityDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchFoodPrices } from "../services/FoodPrices";

const screenWidth = Dimensions.get("window").width;

export default function CommodityDetailScreen({ route  }) {
  const { commodity } = route.params;
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const load = async () => {
    try {
      const allData = await fetchFoodPrices();
      const filtered = allData
        .filter(item => item.commodity === commodity)
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // oldest → newest for chart

      if (filtered.length > 0) {
        const maxDate = Math.max(...filtered.map(p => new Date(p.date).getTime()));
        const latestDateStr = new Date(maxDate).toISOString().split('T')[0];
        console.log(`Latest ${commodity} price date:`, latestDateStr);
        
        console.log(`Recent prices for ${commodity} (last 3):`);
        filtered.slice(-3).forEach(item => {
          console.log(`  ${item.date} | ${item.market} | KES ${item.price}`);
        });
      } else {
        console.log(`No price data found for ${commodity}`);
      }

      setPrices(filtered);
    } catch (err) {
      console.error("Error loading prices:", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [commodity]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#006400" />
      </SafeAreaView>
    );
  }
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const recentPrices = prices.slice(-10);

const chartData = {
  labels: recentPrices.map(p => {
    const date = new Date(p.date);
    return monthNames[date.getMonth()]; // Only show month
  }),
  datasets: [
    {
      data: recentPrices.map(p => p.price),
      color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};


  return (
 <SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.header}>
      <Text style={styles.title}>{commodity}</Text>
      <Text style={styles.subtitle}>Price trend in KES (WFP)</Text>
    </View>

    {prices.length > 0 ? (
      <>
     <View className="flex-1 pb-40 justify-center items-center p-5 bg-gray-50">
  <Text className="text-xl font-bold mb-3 text-green-900 text-center">
     {commodity} Market Value per (debe)
  </Text>

  <LineChart
    data={chartData}
    width={Dimensions.get("window").width - 40} // match your Tailwind example
    height={220} // match your example
    yAxisLabel="Ksh "
    bezier
    chartConfig={{
      backgroundColor: "#f4f4f5",
      backgroundGradientFrom: "#f4f4f5",
      backgroundGradientTo: "#f4f4f5",
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // blue-ish line like your example
      labelColor: () => "#374151",
      strokeWidth: 2,
      propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#84cc16", // green stroke like your example
        fill: "#ffffff",
      },
    }}
    style={{
      marginVertical: 10,
      borderRadius: 16,
    }}
  />
</View>


        {/* HASHED PART KEPT INTACT */}
        {/* <ScrollView style={styles.list}>
          {prices.slice(0, 30).map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.market}>{item.market}</Text>
              <Text style={styles.price}>KES {item.price.toFixed(0)}</Text>
            </View>
          ))}
        </ScrollView> */}
      </>
    ) : (
      <Text style={styles.empty}>No price data available for {commodity}</Text>
    )}
  </ScrollView>
</SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: "#84cc16",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#dcfce7",
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#14532d",
    marginBottom: 12,
  },

  chart: {
    borderRadius: 16,
  },

  list: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  date: {
    color: "#6b7280",
    flex: 1,
    fontSize: 13,
  },

  market: {
    color: "#111827",
    flex: 1.4,
    fontSize: 14,
    fontWeight: "500",
  },

  price: {
    fontWeight: "700",
    color: "#16a34a",
    flex: 1,
    textAlign: "right",
    fontSize: 14,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

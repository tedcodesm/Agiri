import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import Papa from "papaparse";

const CropPrices = () => {
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
fetch("https://statistics.kilimo.go.ke/en/kilimostat-api/download_prices/?format=json")
      .then((res) => res.json())
      .then((csvText) => {
        // Parse CSV into JSON
        const parsed = Papa.parse(csvText, { header: true });
        const data = parsed.data;

        // Filter maize only
        const maizePrices = data.filter((item) => item.Item === "Maize");

        setPrices(maizePrices);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading maize prices...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>🌽 Maize Prices</Text>
      <FlatList
        data={prices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 10, padding: 10, backgroundColor: "#e0f2fe" }}>
            <Text>County: {item.County}</Text>
            <Text>Month: {item.Month}</Text>
            <Text>Year: {item.Year}</Text>
            <Text>Price: Ksh {item.Price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CropPrices;

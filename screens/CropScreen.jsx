 import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Papa from 'papaparse';

// Updated data URL (latest as of December 2025)
const DATA_URL =
  'https://data.humdata.org/dataset/e0d3fba6-f9a2-45d7-b949-140c455197ff/resource/517ee1bf-2437-4f8c-aa1b-cb9925b9d437/download/wfp_food_prices_ken.csv';

export default function CropScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [searchText, setSearchText] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [selectedMarket, setSelectedMarket] = useState('All');

  // Unique lists for filters (derived from data)
  const commodities = ['All', ...Array.from(new Set(data.map(item => item.cm_name || item.commodity || 'Unknown')))].sort();
  const markets = ['All', ...Array.from(new Set(data.map(item => item.mkt_name || item.market || 'Unknown')))].sort();

  const fetchData = async () => {
    try {
      const response = await axios.get(DATA_URL);
      Papa.parse(response.data, {
        header: true,
        dynamicTyping: false, // Keep as strings initially for safety
        skipEmptyLines: true,
        complete: (results) => {
          // The CSV has inconsistencies: multiple schemas, no headers in many sections, truncations
          // We map flexibly to common fields
          const parsed = results.data
            .map(row => {
              // Normalize common fields (fallback chains for variations)
              const date = row.date || row['#date'] || row.Date || '';
              const price = parseFloat(row.mp_price || row.price || row.Price || row.value || '0') || 0;
              const commodity = row.cm_name || row.commodity || row.Commodity || row.item || 'Unknown';
              const market = row.mkt_name || row.market || row.Market || 'Unknown';
              const unit = row.um_name || row.unit || row.Unit || '';
              const region = row.adm1_name || row.admin1 || row.Region || row.region || 'N/A';

              // Only include rows with essential data
              if (!date || price === 0 || commodity === 'Unknown') return null;

              return {
                date,
                mp_price: price,
                cm_name: commodity,
                mkt_name: market,
                um_name: unit,
                adm1_name: region,
              };
            })
            .filter(row => row !== null) // Remove invalid rows
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Latest first

          console.log(`Successfully parsed ${parsed.length} valid rows`); // For debugging in Expo

          setData(parsed);
          setFilteredData(parsed);
          setLoading(false);
          setError(null);
        },
        error: (err) => {
          console.error('PapaParse error:', err);
          setError('Failed to parse data (malformed CSV).');
          setLoading(false);
        },
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Check your internet connection.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    let filtered = data;

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      filtered = filtered.filter(
        item =>
          (item.cm_name || '').toLowerCase().includes(lowerSearch) ||
          (item.mkt_name || '').toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCommodity !== 'All') {
      filtered = filtered.filter(item => (item.cm_name || '') === selectedCommodity);
    }

    if (selectedMarket !== 'All') {
      filtered = filtered.filter(item => (item.mkt_name || '') === selectedMarket);
    }

    setFilteredData(filtered);
  }, [searchText, selectedCommodity, selectedMarket, data]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.commodity}>{item.cm_name || 'Unknown'}</Text>
        <Text style={styles.unit}>{item.um_name || ''}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.market}>{item.mkt_name || 'Unknown'}</Text>
        <Text style={styles.region}>{item.adm1_name || 'N/A'}</Text>
      </View>
      <View style={styles.priceCell}>
        <Text style={styles.price}>KES {item.mp_price.toFixed(2)}</Text>
        <Text style={styles.date}>{item.date.split('-').slice(0, 2).join('-')}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#006400" />
          <Text style={styles.loadingText}>Loading market prices...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kenya Market Prices</Text>
        <Text style={styles.subtitle}>Latest commodity prices </Text>
      </View>

      <View style={styles.filters}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search commodity or market..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Commodity:</Text>
            {commodities.slice(0, 15).map(com => (  // Limit to avoid overflow
              <TouchableOpacity
                key={com}
                onPress={() => setSelectedCommodity(com)}
                style={[
                  styles.filterChip,
                  selectedCommodity === com && styles.selectedChip,
                ]}
              >
                <Text style={selectedCommodity === com ? styles.selectedChipText : styles.chipText}>
                  {com === 'All' ? 'All' : com.split(' - ')[0].substring(0, 15)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Optional: Add market chips if needed */}
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.date}-${item.cm_name}-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Commodity</Text>
            <Text style={styles.headerText}>Market</Text>
            <Text style={styles.headerText}>Price (KES)</Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            {filteredData.length === 0 ? 'No prices match your filters' : 'No prices found'}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#84cc16' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  error: { color: 'red', fontSize: 16, textAlign: 'center' },
  retryButton: { marginTop: 20, padding: 10, backgroundColor: '#006400', borderRadius: 5 },
  retryText: { color: 'white' },
  header: { padding: 20, backgroundColor: '#006400' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#e6f7e6', marginTop: 5 },
  filters: { padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#ddd' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  filterRow: { flexDirection: 'row' },
  filterGroup: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  filterLabel: { marginRight: 10, fontWeight: 'bold' },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 5,
  },
  selectedChip: { backgroundColor: '#006400' },
  chipText: { fontSize: 12 },
  selectedChipText: { color: 'white', fontSize: 12 },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  headerText: { flex: 1, fontWeight: 'bold', fontSize: 14 },
  row: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: { flex: 1.2 },
  priceCell: { flex: 1, alignItems: 'flex-end' },
  commodity: { fontWeight: 'bold', fontSize: 15 },
  unit: { color: '#666', fontSize: 12 },
  market: { fontWeight: '600' },
  region: { color: '#888', fontSize: 12 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#006400' },
  date: { color: '#999', fontSize: 12 },
  empty: { textAlign: 'center', padding: 30, color: '#666' },
});

import axios from "axios";
import Papa from "papaparse";

const DATA_URL = "https://data.humdata.org/dataset/e0d3fba6-f9a2-45d7-b949-140c455197ff/resource/517ee1bf-2437-4f8c-aa1b-cb9925b9d437/download/wfp_food_prices_ken.csv";
let cachedData = null;

export const fetchFoodPrices = async () => {
  if (cachedData) return cachedData;

  try {
    const response = await axios.get(DATA_URL);
    const results = Papa.parse(response.data, { header: true, skipEmptyLines: true });
    
    const parsed = results.data
      .map(row => ({
        date: row.date || row["#date"] || "",
        price: parseFloat(row.mp_price || row.price || "0") || 0,
        commodity: row.cm_name || row.commodity || "Unknown",
        market: row.mkt_name || row.market || "Unknown",
        unit: row.um_name || row.unit || "",
        region: row.adm1_name || row.admin1 || "N/A",
      }))
      .filter(row => row.date && row.price > 0 && row.commodity !== "Unknown")
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    cachedData = parsed;
    return parsed;
  } catch (err) {
    console.error("Data fetch error:", err);
    throw err;
  }
};

export const getCommodities = (data) => {
  return ["All", ...new Set(data.map(item => item.commodity))].sort();
};
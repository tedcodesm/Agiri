import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { useTranslation } from "react-i18next";

export default function TranslatePage() {
  const { t, i18n } = useTranslation();

  return (
    <View className="flex-1 bg-green-100">
      <StatusBar barStyle="light-content" backgroundColor="#84cc16" />
      
      {/* Header */}
      <View className="w-full h-48 bg-[#84cc16] rounded-b-3xl pt-6 shadow-lg">
        <View className="w-full px-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white">{t("hello")}</Text>
            <Text className="text-sm text-white">{t("date")}</Text>
          </View>
        </View>

        {/* Search bar */}
        <View className="w-full px-4 py-2">
          <View className="bg-[#84cc16] rounded-full border border-gray-300 flex-row items-center px-3 py-2">
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              placeholder={t("search")}
              placeholderTextColor="#ecfdf5"
              className="flex-1 ml-3 text-white"
            />
          </View>
        </View>
      </View>

      {/* Example translated section */}
      <ScrollView>
        <Text className="text-2xl py-4 font-bold text-green-900">
          {t("commodities")}
        </Text>
        <View className="items-center">
          <Text className="text-lg font-bold text-green-900">{t("maize")}</Text>
          <Text className="text-lg font-bold text-green-900">{t("grapes")}</Text>
        </View>
      </ScrollView>

      {/* Language switch buttons */}
      <View className="flex-row justify-center gap-4 mt-4">
        <Text
          className="bg-green-400 px-4 py-2 rounded-lg text-white"
          onPress={() => i18n.changeLanguage("en")}
        >
          English
        </Text>
        <Text
          className="bg-green-600 px-4 py-2 rounded-lg text-white"
          onPress={() => i18n.changeLanguage("sw")}
        >
          Kiswahili
        </Text>
      </View>
    </View>
  );
}

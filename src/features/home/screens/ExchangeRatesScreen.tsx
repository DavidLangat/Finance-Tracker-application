import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { currencyService } from "@/services/currency";
import type { ExchangeRate } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";

export default function ExchangeRatesScreen(): JSX.Element {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);

  const flagByCode = useMemo<Record<string, string>>(
    () => ({
      USD: "🇺🇸",
      EUR: "🇪🇺",
      GBP: "🇬🇧",
      CNY: "🇨🇳",
      UGX: "🇺🇬",
      TZS: "🇹🇿",
      RWF: "🇷🇼",
      ZAR: "🇿🇦",
      INR: "🇮🇳",
      JPY: "🇯🇵",
    }),
    []
  );

  async function load() {
    setLoading(true);
    try {
      const data = await currencyService.fetchRates();
      setRates(data);
    } catch (e) {
      // no-op display minimal error
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50 dark:bg-black">
      <View className="px-4 py-2 flex-row items-center justify-start gap-3">
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">Exchange Rates</Text>
      </View>
      <FlatList
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        data={rates}
        keyExtractor={(item) => item.code}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }) => (
          <View className="flex-1 bg-white dark:bg-gray-900 rounded-2xl px-4 py-5 mb-4 border border-gray-200 dark:border-gray-800">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                  {item.code}
                </Text>
                <Text className="text-gray-500 text-xs">{item.name}</Text>
              </View>
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Text className="text-3xl" accessibilityLabel={`${item.code} flag`}>
                  {flagByCode[item.code] ?? "🌐"}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-green-600 font-semibold">Buy</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
                {item.buy}
              </Text>
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <View className="flex-row items-center gap-2">
                <Text className="text-red-500 font-semibold">Sell</Text>
              </View>
              <Text className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
                {item.sell}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="p-8 items-center">
              <Text className="text-gray-500">No data</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

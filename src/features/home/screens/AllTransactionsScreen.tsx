import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/ui/Input";
import type { Transaction } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { transactionService } from "@/services/transactions";
import { listTransactions } from "@/services/db";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AllTransactionsScreen(): React.ReactElement {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [allItems, setAllItems] = useState<Transaction[]>([]);

  function filterByQuery(source: Transaction[], q: string): Transaction[] {
    const term = q.trim().toLowerCase();
    if (!term) return source;
    return source.filter((t) =>
      [t.title, t.category, t.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }

  useEffect(() => {
    (async () => {
      try {
        const remote = await transactionService.fetchRemote();
        setAllItems(remote);
      } catch {
        const local = await listTransactions();
        setAllItems(local);
      }
    })();
  }, []);

  const items = useMemo(() => filterByQuery(allItems, debounced), [allItems, debounced]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-black">
      <View className="px-4 py-2 flex-row items-center gap-3">
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">Transactions</Text>
      </View>
      <View className="px-4 mb-2">
        <Input placeholder="Search transactions" value={query} onChangeText={setQuery} />
      </View>
      <FlatList
        className="flex-1 px-4"
        data={items}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="px-3 py-4 flex-row items-center justify-between bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                <Text className="text-gray-700 font-semibold">{item.title.slice(0, 1)}</Text>
              </View>
              <View>
                <Text className="text-gray-900 dark:text-gray-100 font-medium">{item.title}</Text>
                <Text className="text-gray-500 text-xs">
                  {new Date(item.date).toLocaleString()}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text
                className={
                  "font-semibold " + (item.type === "income" ? "text-green-600" : "text-red-500")
                }
              >
                Ksh. {item.amount.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-xs">{item.category ?? ""}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="p-8 items-center">
            <Text className="text-gray-500">No transactions</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

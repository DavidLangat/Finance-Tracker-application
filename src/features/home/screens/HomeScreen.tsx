import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation";
import { initDatabase, listTransactions } from "@/services/db";
import { transactionService } from "@/services/transactions";
import type { Transaction } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.ReactElement {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const [items, setItems] = useState<Transaction[]>([]);
  const [allItems, setAllItems] = useState<Transaction[]>([]);

  async function load() {
    // await initDatabase();
    try {
      const remote = await transactionService.fetchRemote();
      // console.log(remote);
      setAllItems(remote);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItems(filterByQuery(allItems, debounced));
  }, [debounced, allItems]);

  const recent = useMemo(() => items.slice(0, 5), [items]);
  const totals = useMemo(() => {
    const income = items.filter((i) => i.type === "income").reduce((s, i) => s + i.amount, 0);
    const expense = items.filter((i) => i.type !== "income").reduce((s, i) => s + i.amount, 0);
    return { income, expense, balance: income - expense };
  }, [items]);

  function filterByQuery(source: Transaction[], q: string): Transaction[] {
    const term = q.trim().toLowerCase();
    if (!term) return source;
    return source.filter((t) =>
      [t.title, t.category, t.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term))
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ padding: 16 }}>
        <View className="gap-6">
          {/* Greeting */}
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Good Morning Tony
          </Text>

          {/* Balance Card */}
          <LinearGradient
            colors={["#0f5b2f", "#1a7b3a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 20 }}
          >
            <View className="p-6 rounded-2xl">
              <Text className="text-gray-200 mb-2">Current Balance</Text>
              <View className="flex-row items-end gap-2">
                <Text className="text-white text-4xl font-extrabold">
                  {totals.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
                <Text className="text-gray-200">KES</Text>
              </View>
              <View className="flex-row mt-6">
                <View className="flex-1 items-center">
                  <Text className="text-gray-200 mb-1">Money In</Text>
                  <Text className="text-white font-semibold">
                    KES{" "}
                    {totals.income.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
                <View className="w-[1px] bg-white/40" />
                <View className="flex-1 items-center">
                  <Text className="text-gray-200 mb-1">Money Out</Text>
                  <Text className="text-white font-semibold">
                    KES{" "}
                    {totals.expense.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Recent list */}
          <View className="bg-white dark:bg-black rounded-2xl">
            <View className="flex-row items-center justify-between mb-3 px-2">
              <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Five Transactions
              </Text>
              <Pressable>
                <Text
                  className="text-green-600 font-medium"
                  onPress={() => navigation.navigate("Transactions")}
                >
                  View All
                </Text>
              </Pressable>
            </View>
            <View className="mb-3 px-2">
              <Input placeholder="Search transactions" value={query} onChangeText={setQuery} />
            </View>
            {recent.length === 0 ? (
              <Text className="text-gray-500 px-2 pb-2">No transactions yet</Text>
            ) : (
              <FlatList
                data={recent}
                scrollEnabled={false}
                keyExtractor={(i) => i.id}
                renderItem={({ item }) => (
                  <View className="px-2 py-4 flex-row items-center justify-between bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 mb-3">
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center">
                        <Text className="text-gray-700 font-semibold">
                          {item.title.slice(0, 1)}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-gray-900 dark:text-gray-100 font-medium">
                          {item.title}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {new Date(item.date).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text
                        className={
                          "font-semibold " +
                          (item.type === "income" ? "text-green-600" : "text-red-500")
                        }
                      >
                        Ksh. {item.amount.toFixed(2)}
                      </Text>
                      <Text className="text-gray-500 text-xs">{item.category ?? ""}</Text>
                    </View>
                  </View>
                )}
              />
            )}
            <View className="mt-2">
              <Button
                label="Add Transaction"
                onPress={() => navigation.navigate("AddTransaction")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

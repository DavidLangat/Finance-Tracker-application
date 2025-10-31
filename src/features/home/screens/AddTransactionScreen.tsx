import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Alert, Pressable, FlatList } from "react-native";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { insertTransaction, initDatabase } from "@/services/db";
import type { Transaction } from "@/types";
import { nanoid } from "nanoid/non-secure";
import { generateReceiptPdf } from "@/utils/receipt";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTransactionScreen(): JSX.Element {
  const [title] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Transport");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState<Date>(new Date());
  const [showCats, setShowCats] = useState(false);

  const categories = useMemo(
    () => [
      { key: "Transport", icon: "🚗" },
      { key: "Shopping", icon: "🛍️" },
      { key: "Eating-out", icon: "🍽️" },
      { key: "Bills", icon: "💡" },
      { key: "Health", icon: "💊" },
    ],
    []
  );

  useEffect(() => {
    void initDatabase();
  }, []);

  async function onSubmit() {
    if (!amount) {
      Alert.alert("Missing amount", "Please provide an amount");
      return;
    }
    const computedTitle = (
      description ||
      category ||
      (type === "income" ? "Income" : "Expense")
    ).toString();
    const tx: Transaction = {
      id: nanoid(),
      title: computedTitle,
      amount: Number(amount),
      currency: "KES",
      date: date.toISOString(),
      category: category || undefined,
      description: description || undefined,
      type,
    };
    try {
      await insertTransaction(tx);
      Alert.alert("Saved", "Transaction added successfully");
      // offer to generate a receipt
      await generateReceiptPdf(tx);
      // no title field in UI; nothing to reset
      setAmount("");
      setCategory("Transport");
      setDescription("");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", String(e));
    }
  }

  function formatDate(d: Date): string {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-black">
      <View className="p-4 gap-6">
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">Add Transaction</Text>

        {/* Category Type Toggle */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Pressable
              className="flex-row items-center gap-2"
              onPress={() => setType("income")}
              accessibilityRole="button"
              accessibilityState={{ selected: type === "income" }}
            >
              <View className="w-6 h-6 rounded-full border-2 border-gray-400 items-center justify-center">
                {type === "income" ? (
                  <View className="w-3.5 h-3.5 rounded-full bg-gray-400" />
                ) : null}
              </View>
              <Text className="text-gray-700 dark:text-gray-200">Income</Text>
            </Pressable>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable
              className="flex-row items-center gap-2"
              onPress={() => setType("expense")}
              accessibilityRole="button"
              accessibilityState={{ selected: type === "expense" }}
            >
              <View className="w-6 h-6 rounded-full border-2 border-green-500 items-center justify-center">
                {type === "expense" ? (
                  <View className="w-3.5 h-3.5 rounded-full bg-green-500" />
                ) : null}
              </View>
              <Text className="text-gray-700 dark:text-gray-200">Expense</Text>
            </Pressable>
          </View>
        </View>

        {/* Amount */}
        <View>
          <Text className="text-gray-900 dark:text-gray-100 mb-2">
            Amount <Text className="text-green-600">(KES)</Text>
          </Text>
          <Input
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            placeholder="1,000.00"
          />
        </View>

        {/* Date */}
        <View>
          <Text className="text-gray-900 dark:text-gray-100 mb-2">Date</Text>
          <Pressable
            onPress={() => setDate(new Date())}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black flex-row items-center justify-between"
          >
            <Text className="text-gray-900 dark:text-gray-100">{formatDate(date)}</Text>
            <Text className="text-gray-500">📅</Text>
          </Pressable>
        </View>

        {/* Category select */}
        <View>
          <Text className="text-gray-900 dark:text-gray-100 mb-2">Category</Text>
          <Pressable
            onPress={() => setShowCats((v) => !v)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-lg">
                {categories.find((c) => c.key === category)?.icon ?? ""}
              </Text>
              <Text className="text-gray-900 dark:text-gray-100">{category}</Text>
            </View>
            <Text className="text-gray-600">▾</Text>
          </Pressable>
          {showCats && (
            <FlatList
              className="mt-2"
              data={categories}
              keyExtractor={(i) => i.key}
              renderItem={({ item }) => (
                <Pressable
                  className="px-4 py-3 border border-gray-200 dark:border-gray-800 rounded-md mb-2 flex-row items-center gap-2"
                  onPress={() => {
                    setCategory(item.key);
                    setShowCats(false);
                  }}
                >
                  <Text className="text-lg">{item.icon}</Text>
                  <Text className="text-gray-900 dark:text-gray-100">{item.key}</Text>
                </Pressable>
              )}
            />
          )}
        </View>

        {/* Description */}
        <View>
          <Text className="text-gray-900 dark:text-gray-100 mb-2">Description</Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Fuel for wife's car"
          />
        </View>

        <View className="pt-2">
          <Button label="Add Transaction" onPress={onSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

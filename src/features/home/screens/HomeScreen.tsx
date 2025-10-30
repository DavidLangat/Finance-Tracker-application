import React from "react";
import { View, Text, ScrollView } from "react-native";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation";

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ padding: 16 }}>
      <View className="gap-4">
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome</Text>
        <Text className="text-gray-600 dark:text-gray-300">
          This template ships with Expo, TypeScript, NativeWind (Tailwind), navigation, theming, icons, and more.
        </Text>
        <Card title="Get Started">
          <Text className="text-gray-700 dark:text-gray-200 mb-4">
            Explore the example screens and components.
          </Text>
          <Button label="Go to Details" onPress={() => navigation.navigate("Details")} />
        </Card>
      </View>
    </ScrollView>
  );
}



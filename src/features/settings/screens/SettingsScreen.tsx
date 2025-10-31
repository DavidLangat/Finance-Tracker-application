import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Button from "@/components/ui/Button";
import { useThemeScheme } from "@/theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function SettingsScreen(): JSX.Element {
  const { colorScheme, toggleTheme } = useThemeScheme();
  return (
    <SafeAreaView
    edges={["top"]}
    className="flex-1 bg-white dark:bg-black"
    >

    <View className="flex-1 bg-white dark:bg-black p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">More</Text>
      <TouchableOpacity
      onPress={() => {
        Alert.alert("Coming Soon");
      }}
      className="flex-row items-center justify-between">
      {/* about us */}
    
        <Text >
          About Us
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

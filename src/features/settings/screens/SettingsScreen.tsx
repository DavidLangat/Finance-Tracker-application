import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/ui/Button";
import { useThemeScheme } from "@/theme/ThemeProvider";

export default function SettingsScreen(): JSX.Element {
  const { colorScheme, toggleTheme } = useThemeScheme();
  return (
    <View className="flex-1 bg-white dark:bg-black p-4 gap-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-700 dark:text-gray-200">Theme: {colorScheme}</Text>
        <Button label="Toggle Theme" onPress={toggleTheme} variant="secondary" />
      </View>
    </View>
  );
}



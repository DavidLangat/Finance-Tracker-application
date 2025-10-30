import React from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function Loader({ label = "Loading..." }: { label?: string }): JSX.Element {
  return (
    <View className="w-full items-center justify-center py-8">
      <ActivityIndicator />
      <Text className="mt-2 text-gray-600 dark:text-gray-300">{label}</Text>
    </View>
  );
}



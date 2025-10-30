import React from "react";
import { View, Text } from "react-native";
import Button from "./Button";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({ message = "Something went wrong.", onRetry }: Props): JSX.Element {
  return (
    <View className="w-full items-center justify-center py-8">
      <Text className="text-red-600 dark:text-red-400">{message}</Text>
      {onRetry ? <View className="mt-3"><Button label="Retry" onPress={onRetry} /></View> : null}
    </View>
  );
}



import React from "react";
import { View, Text, ViewProps } from "react-native";

type Props = ViewProps & {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children, ...rest }: Props): JSX.Element {
  return (
    <View className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4" {...rest}>
      {title ? (
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</Text>
      ) : null}
      {children}
    </View>
  );
}



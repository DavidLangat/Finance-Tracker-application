import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  disabled,
}: Props): JSX.Element {
  const base = "px-4 py-3 rounded-md items-center justify-center ";
  const styles = {
    primary: "bg-primary-500 active:bg-primary-600",
    secondary: "bg-gray-200 dark:bg-gray-800",
    ghost: "bg-transparent",
  } as const;
  const text = {
    primary: "text-white",
    secondary: "text-gray-900 dark:text-gray-100",
    ghost: "text-primary-500",
  } as const;

  return (
    <Pressable
      className={base + styles[variant]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text className={"font-medium " + text[variant]}>{label}</Text>
    </Pressable>
  );
}

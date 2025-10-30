import React from "react";
import { TextInput, TextInputProps } from "react-native";

export default function Input(props: TextInputProps): JSX.Element {
  return (
    <TextInput
      placeholderTextColor={"#9ca3af"}
      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-black"
      {...props}
    />
  );
}



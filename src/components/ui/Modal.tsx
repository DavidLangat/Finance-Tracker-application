import React from "react";
import { Modal as RNModal, View, Text } from "react-native";
import Button from "./Button";

type Props = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function Modal({ visible, title, onClose, children }: Props): JSX.Element {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 p-6">
        <View className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-4">
          {title ? (
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</Text>
          ) : null}
          {children}
          <View className="mt-4">
            <Button label="Close" onPress={onClose} variant="secondary" />
          </View>
        </View>
      </View>
    </RNModal>
  );
}



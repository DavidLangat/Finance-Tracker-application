import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App(): JSX.Element {
  return (
    <View
      className={
        "flex-1 bg-white dark:bg-black items-center justify-center px-6"
      }
    >
      <StatusBar style="auto" />
      <View className={"mx-auto max-w-2xl items-center"}>
        <Text
          className={
            "text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-center"
          }
        >
          Expo Tailwind Boilerplate
        </Text>
        <Text
          className={
            "mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300 text-center"
          }
        >
          Start building with Expo, NativeWind, and Tailwind CSS.
        </Text>
      </View>
    </View>
  );
}

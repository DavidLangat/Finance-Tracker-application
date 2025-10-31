import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tabs";
import DetailsScreen from "@/features/details/screens/DetailsScreen";
import AllTransactionsScreen from "@/features/home/screens/AllTransactionsScreen";
import { useThemeScheme } from "@/theme/ThemeProvider";

export type RootStackParamList = {
  Tabs: undefined;
  Details: { id?: string } | undefined;
  AddTransaction: undefined;
  Transactions: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): JSX.Element {
  const { colorScheme } = useThemeScheme();
  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Details" }} />
        {/* Simple add transaction route */}
        {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
        <Stack.Screen
          name="AddTransaction"
          component={require("@/features/home/screens/AddTransactionScreen").default}
          options={{ title: "Add Transaction" }}
        />
        <Stack.Screen
          name="Transactions"
          component={AllTransactionsScreen}
          options={{ title: "Transactions" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

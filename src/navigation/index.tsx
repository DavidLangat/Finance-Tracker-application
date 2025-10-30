import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./tabs";
import DetailsScreen from "@/features/details/screens/DetailsScreen";
import { useThemeScheme } from "@/theme/ThemeProvider";

export type RootStackParamList = {
  Tabs: undefined;
  Details: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): JSX.Element {
  const { colorScheme } = useThemeScheme();
  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



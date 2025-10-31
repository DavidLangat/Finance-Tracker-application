import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/features/home/screens/HomeScreen";
import ExchangeRatesScreen from "@/features/home/screens/ExchangeRatesScreen";
import SettingsScreen from "@/features/settings/screens/SettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeScheme } from "@/theme/ThemeProvider";

export type TabsParamList = {
  Home: undefined;
  Exchange: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator(): JSX.Element {
  const { colorScheme } = useThemeScheme();
  const isDark = colorScheme === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#ffffff" : "#66951f",
        tabBarStyle: { backgroundColor: isDark ? "#111827" : "#ffffff" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exchange"
        component={ExchangeRatesScreen}
        options={{
          tabBarLabel: "Exchange Rate",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="swap-vert" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="more-horiz" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



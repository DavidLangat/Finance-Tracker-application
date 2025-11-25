import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import WorkoutStackNavigator from './WorkoutStackNavigator';
import MealStackNavigator from './MealStackNavigator';
import ProgressStackNavigator from './ProgressStackNavigator';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Workouts':
              iconName = focused ? 'barbell' : 'barbell-outline';
              break;
            case 'Meals':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Progress':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Community':
              iconName = focused ? 'people' : 'people-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return (
            <View>
              <Ionicons name={iconName} size={28} color={color} />
              {route.name === 'Progress' && (
                <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#00E676', // Neon Green
        tabBarInactiveTintColor: '#505050', // Dark Grey
        tabBarShowLabel: false, // Hide labels
        tabBarStyle: {
          backgroundColor: '#000000', // Pure Black
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          height: 80, // Taller for better touch targets
          paddingTop: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutStackNavigator} />
      <Tab.Screen name="Meals" component={MealStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressStackNavigator} />
      {/* <Tab.Screen name="Community" component={CommunityScreen} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MealStackParamList } from '../types/nutrition.types';

// Import meal screens
import MealsScreen from '../screens/MealsScreen';
import FoodSearchScreen from '../screens/FoodSearchScreen';
import MealLogScreen from '../screens/MealLogScreen';
import DailySummaryScreen from '../screens/DailySummaryScreen';
import WeeklyMealPlanScreen from '../screens/WeeklyMealPlanScreen';
import MealPlanSetupScreen from '../screens/MealPlanSetupScreen';

const Stack = createNativeStackNavigator<MealStackParamList>();

const MealStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MealHub" component={MealsScreen} />
      <Stack.Screen name="FoodSearch" component={FoodSearchScreen} />
      <Stack.Screen name="MealLog" component={MealLogScreen} />
      <Stack.Screen name="DailySummary" component={DailySummaryScreen} />
      <Stack.Screen name="WeeklyMealPlan" component={WeeklyMealPlanScreen} />
      <Stack.Screen name="MealPlanSetup" component={MealPlanSetupScreen} />
    </Stack.Navigator>
  );
};

export default MealStackNavigator;

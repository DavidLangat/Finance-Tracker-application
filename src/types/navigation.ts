import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the tab navigator param list
export type TabParamList = {
  Home: undefined;
  Workouts: undefined; // This will be the workout stack
  Meals: undefined;
  Progress: undefined;
  Community: undefined;
};

// Navigation prop types for each screen
export type HomeScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;
export type WorkoutsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Workouts'>;
export type MealsScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Meals'>;
export type ProgressScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Progress'>;
export type CommunityScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Community'>;

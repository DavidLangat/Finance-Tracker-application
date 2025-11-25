import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '../types/workout.types';

// Import workout screens
import WorkoutsScreen from '../screens/WorkoutsScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import WorkoutScheduleScreen from '../screens/WorkoutScheduleScreen';

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

const WorkoutStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WorkoutList" component={WorkoutsScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="WorkoutSchedule" component={WorkoutScheduleScreen} />
    </Stack.Navigator>
  );
};

export default WorkoutStackNavigator;

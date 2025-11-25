import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressStackParamList } from '../types/progress.types';

// Import progress screens
import ProgressScreen from '../screens/ProgressScreen';
import AddProgressScreen from '../screens/AddProgressScreen';
import GraphsScreen from '../screens/GraphsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PhotoGalleryScreen from '../screens/PhotoGalleryScreen';

const Stack = createNativeStackNavigator<ProgressStackParamList>();

const ProgressStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProgressHub" component={ProgressScreen} />
      <Stack.Screen name="AddProgress" component={AddProgressScreen} />
      <Stack.Screen name="Graphs" component={GraphsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
    </Stack.Navigator>
  );
};

export default ProgressStackNavigator;

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AppState } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MealPlanSetupScreen from './src/screens/MealPlanSetupScreen';
import { isSetupComplete } from './src/services/mealPlanService';

const Stack = createNativeStackNavigator();

export default function App() {
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  useEffect(() => {
    checkSetup();

    // Re-check setup when app comes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkSetup();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const checkSetup = async () => {
    const complete = await isSetupComplete();
    setSetupComplete(complete);
  };

  // Show loading while checking setup status
  if (setupComplete === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!setupComplete ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MealPlanSetup">
            {(props) => (
              <MealPlanSetupScreen
                {...props}
                onSetupComplete={() => {
                  // Re-check setup status to trigger re-render
                  checkSetup();
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <TabNavigator />
      )}
    </NavigationContainer>
  );
}
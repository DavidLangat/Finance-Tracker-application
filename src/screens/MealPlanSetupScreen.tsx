import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MEAL_PLANS } from '../data/mealPlans.data';
import { saveMealPlan, completeSetup } from '../services/mealPlanService';
import { WeeklyMealPlan } from '../types/nutrition.types';

interface MealPlanSetupScreenProps {
  onSetupComplete?: () => void;
}

const MealPlanSetupScreen: React.FC<MealPlanSetupScreenProps> = ({ onSetupComplete }) => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const mealPlans = MEAL_PLANS;

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleComplete = async () => {
    if (!selectedPlan) {
      Alert.alert('Select a Plan', 'Please select a meal plan to continue');
      return;
    }

    const saved = await saveMealPlan(selectedPlan);
    if (saved) {
      await completeSetup();
      
      // Trigger App.tsx to re-check setup status
      if (onSetupComplete) {
        onSetupComplete();
      }
      
      Alert.alert(
        'Setup Complete! 🎉',
        'Your meal plan has been set. Let\'s start your fitness journey!'
      );
    } else {
      Alert.alert('Error', 'Failed to save meal plan. Please try again.');
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'muscle-gain':
        return 'fitness';
      case 'weight-gain':
        return 'trending-up';
      case 'balanced':
        return 'scale';
      default:
        return 'restaurant';
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'muscle-gain':
        return 'bg-red-500';
      case 'weight-gain':
        return 'bg-orange-500';
      case 'balanced':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-green-700 pt-12 pb-8 px-6">
          <Text className="text-white text-3xl font-bold mb-2">Choose Your Meal Plan</Text>
          <Text className="text-green-100 text-base">
            Select a plan that matches your fitness goals
          </Text>
        </View>

        {/* Meal Plans */}
        <View className="px-6 mt-6">
          {mealPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => handleSelectPlan(plan.id)}
              className="mb-4"
            >
              <View
                className={`rounded-2xl p-6 ${
                  selectedPlan === plan.id
                    ? 'bg-green-600 border-4 border-green-800'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`${
                        selectedPlan === plan.id ? 'bg-white/20' : getPlanColor(plan.id)
                      } rounded-full p-3 mr-4`}
                    >
                      <Ionicons
                        name={getPlanIcon(plan.id) as any}
                        size={28}
                        color={selectedPlan === plan.id ? 'white' : 'white'}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`text-xl font-bold ${
                          selectedPlan === plan.id ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {plan.name}
                      </Text>
                      <Text
                        className={`text-sm ${
                          selectedPlan === plan.id ? 'text-green-100' : 'text-gray-600'
                        }`}
                      >
                        {plan.goal}
                      </Text>
                    </View>
                  </View>
                  {selectedPlan === plan.id && (
                    <Ionicons name="checkmark-circle" size={32} color="white" />
                  )}
                </View>

                <View className="flex-row justify-between mb-4">
                  <View>
                    <Text
                      className={`text-2xl font-bold ${
                        selectedPlan === plan.id ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {plan.dailyCalories}
                    </Text>
                    <Text
                      className={`text-xs ${
                        selectedPlan === plan.id ? 'text-green-100' : 'text-gray-500'
                      }`}
                    >
                      kcal/day
                    </Text>
                  </View>
                  <View>
                    <Text
                      className={`text-2xl font-bold ${
                        selectedPlan === plan.id ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {plan.duration}
                    </Text>
                    <Text
                      className={`text-xs ${
                        selectedPlan === plan.id ? 'text-green-100' : 'text-gray-500'
                      }`}
                    >
                      duration
                    </Text>
                  </View>
                </View>

                {/* Sample Meal */}
                <View
                  className={`rounded-lg p-3 ${
                    selectedPlan === plan.id ? 'bg-white/10' : 'bg-gray-50'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold mb-2 ${
                      selectedPlan === plan.id ? 'text-green-100' : 'text-gray-600'
                    }`}
                  >
                    Sample Monday Lunch:
                  </Text>
                  <Text
                    className={`text-sm ${
                      selectedPlan === plan.id ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {plan.meals[0].lunch.meal}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Complete Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleComplete}
          disabled={!selectedPlan}
          className={`rounded-xl p-4 ${
            selectedPlan ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white font-bold text-center text-lg">
            Complete Setup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealPlanSetupScreen;

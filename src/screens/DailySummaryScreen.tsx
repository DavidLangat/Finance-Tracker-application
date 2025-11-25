import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList } from '../types/nutrition.types';
import { getDailyNutrition } from '../services/mealTracking';
import NutritionBar from '../components/NutritionBar';
import MealCard from '../components/MealCard';

type DailySummaryNavigationProp = NativeStackNavigationProp<
  MealStackParamList,
  'DailySummary'
>;

const DailySummaryScreen = () => {
  const navigation = useNavigation<DailySummaryNavigationProp>();
  const [dailyNutrition, setDailyNutrition] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getDailyNutrition();
    setDailyNutrition(data);
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="bg-green-700 pt-12 pb-8 px-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-4 bg-white/20 rounded-full p-2 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-2">Daily Summary 📊</Text>
          <Text className="text-green-100 text-base">Your nutrition overview</Text>
        </View>

        {dailyNutrition && (
          <>
            {/* Quick Stats */}
            <View className="px-6 mt-6">
              <View className="bg-white rounded-xl p-6 shadow-lg">
                <View className="flex-row justify-between mb-6">
                  <View className="items-center flex-1">
                    <Text
                      className={`text-4xl font-bold ${getProgressColor(
                        dailyNutrition.totalNutrition.calories,
                        dailyNutrition.goalNutrition.calories
                      )}`}
                    >
                      {dailyNutrition.totalNutrition.calories}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      / {dailyNutrition.goalNutrition.calories} kcal
                    </Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text
                      className={`text-4xl font-bold ${getProgressColor(
                        dailyNutrition.totalNutrition.protein,
                        dailyNutrition.goalNutrition.protein
                      )}`}
                    >
                      {dailyNutrition.totalNutrition.protein}g
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      / {dailyNutrition.goalNutrition.protein}g protein
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-gray-800">
                      {dailyNutrition.totalNutrition.carbs}g
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">Carbs</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-gray-800">
                      {dailyNutrition.totalNutrition.fat}g
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">Fat</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-gray-800">
                      {dailyNutrition.meals.length}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">Meals</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Progress Bars */}
            <View className="px-6 mt-6">
              <Text className="text-gray-800 text-lg font-semibold mb-4">
                Progress vs Goals
              </Text>
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <NutritionBar
                  label="Calories"
                  current={dailyNutrition.totalNutrition.calories}
                  goal={dailyNutrition.goalNutrition.calories}
                  unit="kcal"
                  color="bg-red-500"
                />
                <NutritionBar
                  label="Protein"
                  current={dailyNutrition.totalNutrition.protein}
                  goal={dailyNutrition.goalNutrition.protein}
                  unit="g"
                  color="bg-blue-500"
                />
                <NutritionBar
                  label="Carbs"
                  current={dailyNutrition.totalNutrition.carbs}
                  goal={dailyNutrition.goalNutrition.carbs}
                  unit="g"
                  color="bg-green-500"
                />
                <NutritionBar
                  label="Fats"
                  current={dailyNutrition.totalNutrition.fat}
                  goal={dailyNutrition.goalNutrition.fat}
                  unit="g"
                  color="bg-yellow-500"
                />
              </View>
            </View>

            {/* Meal Breakdown */}
            <View className="px-6 mt-6 mb-8">
              <Text className="text-gray-800 text-lg font-semibold mb-4">
                Meal Breakdown
              </Text>
              {dailyNutrition.meals.length > 0 ? (
                dailyNutrition.meals.map((meal: any) => (
                  <MealCard key={meal.id} meal={meal} />
                ))
              ) : (
                <View className="bg-white rounded-xl p-8 items-center">
                  <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" />
                  <Text className="text-gray-500 text-base mt-4 text-center">
                    No meals logged today
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DailySummaryScreen;

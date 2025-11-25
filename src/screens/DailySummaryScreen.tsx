import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getDailyNutrition();
    setDailyNutrition(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 90) return 'text-neon-green';
    if (percentage >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <View className="flex-1 bg-deep-black">
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00E676" />}
      >
        {/* Header */}
        <View className="pt-12 pb-8 px-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-6 bg-dark-charcoal border border-white/10 rounded-full p-2 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold mb-2">Daily Summary 📊</Text>
          <Text className="text-neon-green text-base font-medium">Your nutrition overview</Text>
        </View>

        {dailyNutrition && (
          <>
            {/* Quick Stats */}
            <View className="px-6 mt-2">
              <View className="bg-dark-charcoal rounded-2xl p-6 border border-white/10 shadow-lg shadow-neon-green/5">
                <View className="flex-row justify-between mb-6">
                  <View className="items-center flex-1 border-r border-white/10">
                    <Text
                      className={`text-4xl font-bold ${getProgressColor(
                        dailyNutrition.totalNutrition.calories,
                        dailyNutrition.goalNutrition.calories
                      )}`}
                    >
                      {dailyNutrition.totalNutrition.calories}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wider">
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
                    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wider">
                      / {dailyNutrition.goalNutrition.protein}g protein
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between pt-4 border-t border-white/10">
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-white">
                      {dailyNutrition.totalNutrition.carbs}g
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1 uppercase">Carbs</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-white">
                      {dailyNutrition.totalNutrition.fat}g
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1 uppercase">Fat</Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text className="text-2xl font-bold text-white">
                      {dailyNutrition.meals.length}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1 uppercase">Meals</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Progress Bars */}
            <View className="px-6 mt-8">
              <Text className="text-white text-lg font-bold mb-4">
                Progress vs Goals
              </Text>
              <View className="bg-dark-charcoal rounded-2xl p-5 border border-white/10">
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
                  color="bg-neon-green"
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
            <View className="px-6 mt-8 mb-8">
              <Text className="text-white text-lg font-bold mb-4">
                Meal Breakdown
              </Text>
              {dailyNutrition.meals.length > 0 ? (
                dailyNutrition.meals.map((meal: any) => (
                  <MealCard key={meal.id} meal={meal} />
                ))
              ) : (
                <View className="bg-dark-charcoal rounded-2xl p-8 items-center border border-white/10 border-dashed">
                  <Ionicons name="restaurant-outline" size={48} color="#4B5563" />
                  <Text className="text-gray-400 text-base mt-4 text-center">
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

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList, MealType } from '../types/nutrition.types';
import { getTodayMeals, getDailyNutrition, deleteMealLog } from '../services/mealTracking';
import { getTodayPlannedMeals } from '../services/mealPlanService';
import NutritionBar from '../components/NutritionBar';
import MealCard from '../components/MealCard';

type MealsScreenNavigationProp = NativeStackNavigationProp<MealStackParamList, 'MealHub'>;

const MealsScreen = () => {
  const navigation = useNavigation<MealsScreenNavigationProp>();
  const [dailyNutrition, setDailyNutrition] = useState<any>(null);
  const [todayPlan, setTodayPlan] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadMealData = async () => {
    try {
      const nutrition = await getDailyNutrition();
      setDailyNutrition(nutrition);
      
      const plan = await getTodayPlannedMeals();
      setTodayPlan(plan);
    } catch (error) {
      console.error('Error loading meal data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMealData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMealData();
    setRefreshing(false);
  };

  const handleAddFood = (mealType?: MealType) => {
    navigation.navigate('FoodSearch', { mealType });
  };

  const handleViewSummary = () => {
    navigation.navigate('DailySummary');
  };

  const handleDeleteMeal = async (mealId: string) => {
    await deleteMealLog(mealId);
    await loadMealData();
  };

  const handleLogPlannedMeal = async (mealType: string, meal: any) => {
    // Create a simple logged food entry from the planned meal
    const loggedFood = {
      foodId: `planned-${mealType}`,
      foodName: meal.meal,
      servingSize: { name: '1 serving', grams: 100 },
      quantity: 1,
      nutrition: {
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fats,
      },
    };

    // Import saveMealLog
    const { saveMealLog } = await import('../services/mealTracking');
    
    const mealTypeCapitalized = mealType.charAt(0).toUpperCase() + mealType.slice(1);
    const success = await saveMealLog(
      mealTypeCapitalized as MealType,
      [loggedFood]
    );

    if (success) {
      Alert.alert('Meal Logged! 🎉', `${mealTypeCapitalized} has been added to your daily log.`);
      await loadMealData();
    } else {
      Alert.alert('Error', 'Failed to log meal. Please try again.');
    }
  };

  const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-6 px-6">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-3xl font-bold mb-2">Meals 🍽️</Text>
            <Text className="text-green-100 text-base">Track your nutrition</Text>
          </View>
          <TouchableOpacity
            onPress={handleViewSummary}
            className="bg-white/20 rounded-full p-3"
          >
            <Ionicons name="stats-chart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Nutrition Progress */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Today's Nutrition</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {dailyNutrition ? (
            <>
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
            </>
          ) : (
            <Text className="text-gray-500 text-center py-4">Loading...</Text>
          )}
        </View>
      </View>

      {/* Today's Meal Plan */}
      {todayPlan && (
        <View className="px-6 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-800 text-lg font-semibold">Today's Meal Plan</Text>
            <TouchableOpacity onPress={() => navigation.navigate('WeeklyMealPlan')}>
              <Text className="text-green-600 font-semibold">View Week</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {['breakfast', 'lunch', 'snack', 'dinner'].map((mealType) => {
              const meal = todayPlan[mealType];
              
              return (
                <View key={mealType} className="mb-4 last:mb-0">
                  <View className="flex-row items-center mb-2">
                    <View className="flex-row items-center flex-1">
                      <Ionicons
                        name={
                          mealType === 'breakfast'
                            ? 'sunny'
                            : mealType === 'lunch'
                            ? 'partly-sunny'
                            : mealType === 'dinner'
                            ? 'moon'
                            : 'fast-food'
                        }
                        size={20}
                        color="#006B3F"
                      />
                      <View className="ml-3 flex-1">
                        <Text className="text-gray-700 font-semibold capitalize">{mealType}</Text>
                        <Text className="text-gray-600 text-sm">{meal.meal}</Text>
                        <Text className="text-gray-500 text-xs mt-1">
                          {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fats}g
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleLogPlannedMeal(mealType, meal)}
                      className="bg-green-600 rounded-lg px-4 py-2"
                    >
                      <Text className="text-white text-sm font-semibold">Log</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Recent Meals */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Today's Meals</Text>
        {dailyNutrition && dailyNutrition.meals.length > 0 ? (
          dailyNutrition.meals.map((meal: any) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onDelete={() => handleDeleteMeal(meal.id)}
            />
          ))
        ) : (
          <View className="bg-white rounded-xl p-8 items-center">
            <Ionicons name="restaurant-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 text-base mt-4 text-center">
              No meals logged yet
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Start tracking your meals to reach your goals
            </Text>
          </View>
        )}
      </View>

      {/* Kenya Food Tip */}
      <View className="px-6 mb-8">
        <View className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6">
          <Text className="text-white text-xl font-bold mb-2">🇰🇪 Nutrition Tip</Text>
          <Text className="text-white text-sm opacity-90">
            Include protein-rich foods like beans, eggs, and lean meats. Pair ugali with sukuma
            wiki for a balanced meal!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealsScreen;


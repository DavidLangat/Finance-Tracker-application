import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList, PlannedMeal } from '../types/nutrition.types';
import { getActiveMealPlan, getTodayPlannedMeals } from '../services/mealPlanService';

type WeeklyMealPlanNavigationProp = NativeStackNavigationProp<
  MealStackParamList,
  'WeeklyMealPlan'
>;

const WeeklyMealPlanScreen = () => {
  const navigation = useNavigation<WeeklyMealPlanNavigationProp>();
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    const plan = await getActiveMealPlan();
    setMealPlan(plan);
    
    // Auto-expand today
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setExpandedDay(today || null);
  };

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const calculateDayTotal = (day: any) => {
    return {
      calories: day.breakfast.calories + day.lunch.calories + day.snack.calories + day.dinner.calories,
      protein: day.breakfast.protein + day.lunch.protein + day.snack.protein + day.dinner.protein,
      carbs: day.breakfast.carbs + day.lunch.carbs + day.snack.carbs + day.dinner.carbs,
      fats: day.breakfast.fats + day.lunch.fats + day.snack.fats + day.dinner.fats,
    };
  };

  const renderMeal = (label: string, meal: PlannedMeal, icon: string) => (
    <View className="bg-gray-50 rounded-lg p-3 mb-2">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon as any} size={16} color="#6B7280" />
        <Text className="text-gray-700 font-semibold ml-2">{label}</Text>
      </View>
      <Text className="text-gray-800 mb-2">{meal.meal}</Text>
      <View className="flex-row justify-between">
        <Text className="text-gray-600 text-xs">{meal.calories} kcal</Text>
        <Text className="text-gray-600 text-xs">P: {meal.protein}g</Text>
        <Text className="text-gray-600 text-xs">C: {meal.carbs}g</Text>
        <Text className="text-gray-600 text-xs">F: {meal.fats}g</Text>
      </View>
    </View>
  );

  if (!mealPlan) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Loading meal plan...</Text>
      </View>
    );
  }

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

          <Text className="text-white text-3xl font-bold mb-2">{mealPlan.name}</Text>
          <Text className="text-green-100 text-base">{mealPlan.goal}</Text>
          
          <View className="flex-row mt-4">
            <View className="bg-white/20 rounded-lg px-4 py-2 mr-2">
              <Text className="text-white font-bold">{mealPlan.dailyCalories} kcal/day</Text>
            </View>
            <View className="bg-white/20 rounded-lg px-4 py-2">
              <Text className="text-white font-bold">{mealPlan.duration}</Text>
            </View>
          </View>
        </View>

        {/* Days */}
        <View className="px-6 mt-6 mb-8">
          {mealPlan.meals.map((day: any) => {
            const isExpanded = expandedDay === day.day;
            const dayTotal = calculateDayTotal(day);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const isToday = day.day === days[new Date().getDay()];

            return (
              <View key={day.day} className="mb-4">
                <TouchableOpacity
                  onPress={() => toggleDay(day.day)}
                  className={`rounded-xl p-4 ${
                    isToday ? 'bg-green-600' : 'bg-white'
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text
                          className={`text-xl font-bold ${
                            isToday ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {day.day}
                        </Text>
                        {isToday && (
                          <View className="bg-white/20 rounded-full px-2 py-1 ml-2">
                            <Text className="text-white text-xs font-bold">TODAY</Text>
                          </View>
                        )}
                      </View>
                      <Text
                        className={`text-sm mt-1 ${
                          isToday ? 'text-green-100' : 'text-gray-600'
                        }`}
                      >
                        {dayTotal.calories} kcal • P: {dayTotal.protein}g • C: {dayTotal.carbs}g • F: {dayTotal.fats}g
                      </Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color={isToday ? 'white' : '#6B7280'}
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View className="bg-white rounded-b-xl p-4 -mt-2 pt-6">
                    {renderMeal('Breakfast', day.breakfast, 'sunny')}
                    {renderMeal('Lunch', day.lunch, 'partly-sunny')}
                    {renderMeal('Snack', day.snack, 'fast-food')}
                    {renderMeal('Dinner', day.dinner, 'moon')}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default WeeklyMealPlanScreen;

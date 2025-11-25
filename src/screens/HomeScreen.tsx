import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image, TextInput, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { getTodayWorkout } from '../data/exercises.data';
import { getTodayCompletedWorkouts, getWorkoutStreak } from '../services/workoutTracking';
import { getDailyNutrition } from '../services/mealTracking';
import { getLatestEntry } from '../services/progressTracking';
import { getTodayPlannedMeals } from '../services/mealPlanService';
import { WorkoutDay } from '../types/workout.types';
import { DailyNutrition, DailyMealPlan } from '../types/nutrition.types';
import { ProgressEntry } from '../types/progress.types';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  
  // State for dynamic data
  const [todayWorkout, setTodayWorkout] = useState<WorkoutDay | null>(null);
  const [nutrition, setNutrition] = useState<DailyNutrition | null>(null);
  const [latestProgress, setLatestProgress] = useState<ProgressEntry | null>(null);
  const [todayMeals, setTodayMeals] = useState<DailyMealPlan | null>(null);
  const [streak, setStreak] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);

  const loadData = async () => {
    try {
      const workout = getTodayWorkout();
      setTodayWorkout(workout);
      
      const completedWorkouts = await getTodayCompletedWorkouts();
      setWorkoutsCompleted(completedWorkouts.length);
      
      const currentStreak = await getWorkoutStreak();
      setStreak(currentStreak);

      const dailyNutrition = await getDailyNutrition();
      setNutrition(dailyNutrition);

      const progress = await getLatestEntry();
      setLatestProgress(progress);

      const meals = await getTodayPlannedMeals();
      setTodayMeals(meals);

    } catch (error) {
      console.error('Error loading home data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const caloriesProgress = nutrition 
    ? Math.min((nutrition.totalNutrition.calories / nutrition.goalNutrition.calories) * 100, 100)
    : 0;

  return (
    <View className="flex-1 bg-deep-black">
      <StatusBar barStyle="light-content" />
      <ScrollView 
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00E676" />}
      >
        {/* Header Section */}
        <View className="pt-16 pb-6 px-6">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-gray-400 text-sm font-medium mb-1">Welcome Back 👋</Text>
              <Text className="text-white text-2xl font-bold">Let's Crush It!</Text>
            </View>
          </View>

          {/* Stats Overview */}
          <View className="flex-row justify-between mb-8">
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] border border-white/10">
              <View className="bg-neon-green/10 w-8 h-8 rounded-full items-center justify-center mb-2">
                <Ionicons name="flame" size={16} color="#00E676" />
              </View>
              <Text className="text-white text-lg font-bold">{streak}</Text>
              <Text className="text-gray-400 text-xs">Day Streak</Text>
            </View>
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] border border-white/10">
              <View className="bg-blue-500/10 w-8 h-8 rounded-full items-center justify-center mb-2">
                <Ionicons name="barbell" size={16} color="#3B82F6" />
              </View>
              <Text className="text-white text-lg font-bold">{workoutsCompleted}</Text>
              <Text className="text-gray-400 text-xs">Workouts</Text>
            </View>
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] border border-white/10">
              <View className="bg-orange-500/10 w-8 h-8 rounded-full items-center justify-center mb-2">
                <Ionicons name="restaurant" size={16} color="#F97316" />
              </View>
              <Text className="text-white text-lg font-bold">
                {nutrition ? Math.round(nutrition.totalNutrition.calories) : 0}
              </Text>
              <Text className="text-gray-400 text-xs">Kcal Today</Text>
            </View>
          </View>

          {/* Today's Focus */}
          <Text className="text-white text-lg font-bold mb-4">Today's Focus</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Workouts')}
            className="mb-8"
          >
            <View className="h-48 rounded-3xl overflow-hidden relative">
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80' }}
                className="w-full h-full absolute"
                resizeMode="cover"
              />
              <View className="absolute inset-0 bg-black/40" />
              <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <View className="flex-row items-center mb-2">
                  <View className="bg-neon-green px-2 py-1 rounded-md mr-2">
                    <Text className="text-deep-black text-xs font-bold uppercase">Today</Text>
                  </View>
                  <Text className="text-gray-300 text-sm font-medium">
                    {todayWorkout?.exercises ? `${todayWorkout.exercises.length} Exercises` : 'Rest Day'}
                  </Text>
                </View>
                <Text className="text-white text-2xl font-bold mb-1">
                  {todayWorkout ? todayWorkout.focus : 'Rest & Recover'}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-neon-green font-semibold mr-1">Start Workout</Text>
                  <Ionicons name="arrow-forward" size={16} color="#00E676" />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Today's Meals */}
          {todayMeals && (
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-lg font-bold">Today's Meals</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Meals')}>
                  <Text className="text-neon-green text-sm font-semibold">View Plan</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                {[
                  { label: 'Breakfast', meal: todayMeals.breakfast, icon: 'sunny' },
                  { label: 'Lunch', meal: todayMeals.lunch, icon: 'partly-sunny' },
                  { label: 'Snack', meal: todayMeals.snack, icon: 'fast-food' },
                  { label: 'Dinner', meal: todayMeals.dinner, icon: 'moon' },
                ].map((item, index) => (
                  <View 
                    key={index} 
                    className="bg-dark-charcoal p-4 rounded-2xl mr-4 border border-white/10 w-48"
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="bg-white/10 p-2 rounded-full">
                        <Ionicons name={item.icon as any} size={16} color="#00E676" />
                      </View>
                      <Text className="text-gray-400 text-xs font-medium">{item.meal.calories} kcal</Text>
                    </View>
                    <Text className="text-gray-400 text-xs font-medium uppercase mb-1">{item.label}</Text>
                    <Text className="text-white font-bold text-sm" numberOfLines={2}>{item.meal.meal}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Quick Actions */}
          <Text className="text-white text-lg font-bold mb-4">Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 -mx-6 px-6">
            <TouchableOpacity 
              onPress={() => navigation.navigate('Meals')}
              className="bg-dark-charcoal p-4 rounded-2xl mr-4 border border-white/10 w-32"
            >
              <View className="bg-red-500/10 w-10 h-10 rounded-full items-center justify-center mb-3">
                <Ionicons name="add" size={24} color="#EF4444" />
              </View>
              <Text className="text-white font-semibold">Log Meal</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('Progress')}
              className="bg-dark-charcoal p-4 rounded-2xl mr-4 border border-white/10 w-32"
            >
              <View className="bg-blue-500/10 w-10 h-10 rounded-full items-center justify-center mb-3">
                <Ionicons name="scale" size={24} color="#3B82F6" />
              </View>
              <Text className="text-white font-semibold">Log Weight</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Daily Motivation */}
          <View className="bg-dark-charcoal rounded-2xl p-6 border border-white/10 mb-8">
            <View className="flex-row items-start">
              <Ionicons name="chatbox-ellipses" size={24} color="#00E676" className="mr-3" />
              <View className="flex-1">
                <Text className="text-white text-lg font-bold italic mb-2 leading-6">
                  "The only bad workout is the one that didn't happen."
                </Text>
                <Text className="text-gray-400 text-sm">
                  Keep pushing, you're doing great! 🇰🇪
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

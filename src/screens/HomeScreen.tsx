import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { getTodayWorkout } from '../data/exercises.data';
import { getTodayCompletedWorkouts, getWorkoutStreak } from '../services/workoutTracking';
import { getDailyNutrition } from '../services/mealTracking';
import { getLatestEntry } from '../services/progressTracking';
import { getTodayPlannedMeals } from '../services/mealPlanService';
import { WorkoutDay } from '../types/workout.types';
import { DailyNutrition } from '../types/nutrition.types';
import { ProgressEntry } from '../types/progress.types';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  
  // State for dynamic data
  const [todayWorkout, setTodayWorkout] = useState<WorkoutDay | null>(null);
  const [nutrition, setNutrition] = useState<DailyNutrition | null>(null);
  const [latestProgress, setLatestProgress] = useState<ProgressEntry | null>(null);
  const [streak, setStreak] = useState(0);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0);
  const [nextMeal, setNextMeal] = useState<string>('Breakfast');

  const loadData = async () => {
    try {
      // 1. Get Workout Data
      const workout = getTodayWorkout();
      setTodayWorkout(workout);
      
      const completedWorkouts = await getTodayCompletedWorkouts();
      setWorkoutsCompleted(completedWorkouts.length);
      
      const currentStreak = await getWorkoutStreak();
      setStreak(currentStreak);

      // 2. Get Nutrition Data
      const dailyNutrition = await getDailyNutrition();
      setNutrition(dailyNutrition);

      // Determine next meal based on time
      const hour = new Date().getHours();
      if (hour < 11) setNextMeal('Breakfast');
      else if (hour < 15) setNextMeal('Lunch');
      else if (hour < 19) setNextMeal('Dinner');
      else setNextMeal('Snack');

      // 3. Get Progress Data
      const progress = await getLatestEntry();
      setLatestProgress(progress);

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

  // Calculate progress percentages
  const caloriesProgress = nutrition 
    ? Math.min((nutrition.totalNutrition.calories / nutrition.goalNutrition.calories) * 100, 100)
    : 0;

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="relative">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80' }}
          className="w-full h-64 absolute top-0 left-0"
          resizeMode="cover"
        />
        <View className="absolute top-0 left-0 right-0 h-64 bg-green-900/80" />
        
        <View className="pt-12 pb-8 px-6 rounded-b-3xl">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-green-100 text-lg font-medium mb-1">Habari! 👋</Text>
              <Text className="text-white text-3xl font-bold">Let's Crush It!</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="flame" size={16} color="#FDBA74" />
              <Text className="text-white font-bold ml-1">{streak} Day Streak</Text>
            </View>
          </View>

          {/* Main Stats Card */}
          <View className="flex-row mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <View className="flex-1 items-center border-r border-white/20">
              <Text className="text-green-100 text-xs uppercase tracking-wider">Weight</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {latestProgress ? `${latestProgress.weight} kg` : '--'}
              </Text>
            </View>
            <View className="flex-1 items-center border-r border-white/20">
              <Text className="text-green-100 text-xs uppercase tracking-wider">Calories</Text>
              <Text className="text-white text-xl font-bold mt-1">
                {nutrition ? Math.round(nutrition.totalNutrition.calories) : 0}
              </Text>
              <Text className="text-green-100 text-[10px]">
                / {nutrition ? nutrition.goalNutrition.calories : 2500}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-green-100 text-xs uppercase tracking-wider">Workouts</Text>
              <Text className="text-white text-xl font-bold mt-1">{workoutsCompleted}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Today's Focus Section */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-bold mb-3">Today's Focus</Text>
        
        {/* Workout Card */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Workouts')}
          className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex-row items-center"
        >
          <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
            todayWorkout?.focus === 'Rest' ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <Ionicons 
              name={todayWorkout?.focus === 'Rest' ? 'bed' : 'barbell'} 
              size={24} 
              color={todayWorkout?.focus === 'Rest' ? '#3B82F6' : '#16A34A'} 
            />
          </View>
          <View className="flex-1">
            <Text className="text-gray-500 text-xs font-medium uppercase">Workout Plan</Text>
            <Text className="text-gray-800 text-lg font-bold">
              {todayWorkout ? todayWorkout.focus : 'Rest Day'}
            </Text>
            <Text className="text-gray-500 text-sm">
              {todayWorkout?.exercises ? `${todayWorkout.exercises.length} Exercises` : 'Rest & Recover'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>

        {/* Nutrition Card */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Meals')}
          className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center"
        >
          <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center mr-4">
            <Ionicons name="restaurant" size={24} color="#EA580C" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-500 text-xs font-medium uppercase">Nutrition</Text>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-gray-800 text-lg font-bold">
                {nutrition ? Math.round(nutrition.totalNutrition.calories) : 0} kcal
              </Text>
              <Text className="text-gray-400 text-xs">
                {Math.round(caloriesProgress)}%
              </Text>
            </View>
            {/* Progress Bar */}
            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <View 
                className="h-full bg-orange-500 rounded-full" 
                style={{ width: `${caloriesProgress}%` }} 
              />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions Grid */}
      <View className="px-6 mt-8">
        <Text className="text-gray-800 text-lg font-bold mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity 
            onPress={() => navigation.navigate('Meals')}
            className="w-[48%] bg-white p-4 rounded-2xl shadow-sm mb-4 items-center"
          >
            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="add-circle" size={24} color="#DC2626" />
            </View>
            <Text className="text-gray-800 font-semibold">Log Meal</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Workouts')}
            className="w-[48%] bg-white p-4 rounded-2xl shadow-sm mb-4 items-center"
          >
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="fitness" size={24} color="#16A34A" />
            </View>
            <Text className="text-gray-800 font-semibold">Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Progress')}
            className="w-[48%] bg-white p-4 rounded-2xl shadow-sm items-center"
          >
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="scale" size={24} color="#2563EB" />
            </View>
            <Text className="text-gray-800 font-semibold">Log Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Community')}
            className="w-[48%] bg-white p-4 rounded-2xl shadow-sm items-center"
          >
            <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="people" size={24} color="#9333EA" />
            </View>
            <Text className="text-gray-800 font-semibold">Community</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Motivation */}
      <View className="px-6 mt-6 mb-8">
        <View className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
          <View className="flex-row items-start">
            <Ionicons name="chatbox-ellipses" size={24} color="#4ADE80" className="mr-2" />
            <View className="flex-1 ml-2">
              <Text className="text-white text-lg font-bold italic mb-2">
                "The only bad workout is the one that didn't happen."
              </Text>
              <Text className="text-gray-400 text-sm">
                Keep pushing, you're doing great! 🇰🇪
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View className="h-4" />
    </ScrollView>
  );
};

export default HomeScreen;

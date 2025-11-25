import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WorkoutStackParamList, WorkoutDay, Exercise } from '../types/workout.types';
import { getTodayWorkout, getAllWorkoutDays } from '../data/exercises.data';
import {
  getTodayCompletedWorkouts,
  getWorkoutStreak,
  isExerciseCompletedToday,
} from '../services/workoutTracking';

type WorkoutsScreenNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  'WorkoutList'
>;

const WorkoutsScreen = () => {
  const navigation = useNavigation<WorkoutsScreenNavigationProp>();
  const [todayWorkout, setTodayWorkout] = useState<WorkoutDay | null>(null);
  const [allDays, setAllDays] = useState<WorkoutDay[]>([]);
  const [completedExerciseIds, setCompletedExerciseIds] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const loadWorkoutData = async () => {
    try {
      // Get plan data
      const today = getTodayWorkout();
      const days = getAllWorkoutDays();
      setTodayWorkout(today);
      setAllDays(days);

      // Get stats
      const currentStreak = await getWorkoutStreak();
      setStreak(currentStreak);

      // Check completed exercises
      const completed = new Set<string>();
      for (const day of days) {
        if (day.exercises) {
          for (const exercise of day.exercises) {
             const exerciseId = exercise.name; 
             const isCompleted = await isExerciseCompletedToday(exerciseId);
             if (isCompleted) {
               completed.add(exerciseId);
             }
          }
        }
      }
      setCompletedExerciseIds(completed);
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkoutData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWorkoutData();
    setRefreshing(false);
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('ExerciseDetail', { exerciseId: exercise.name });
  };

  const toggleDay = (dayName: string) => {
    setExpandedDay(expandedDay === dayName ? null : dayName);
  };

  const renderExerciseItem = (exercise: Exercise, index: number) => {
    const isCompleted = completedExerciseIds.has(exercise.name);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleExercisePress(exercise)}
        className="bg-deep-black/50 rounded-xl p-4 mb-3 border border-white/5 flex-row items-center justify-between"
      >
        <View className="flex-1">
          <Text className={`font-bold text-base ${isCompleted ? 'text-neon-green' : 'text-white'}`}>
            {exercise.name}
          </Text>
          <Text className="text-gray-400 text-sm">
            {exercise.sets} sets × {exercise.reps} {typeof exercise.reps === 'number' ? 'reps' : ''}
          </Text>
        </View>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#00E676" />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-deep-black">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00E676" />}
      >
        {/* Header */}
        <View className="pt-16 pb-6 px-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white text-3xl font-bold mb-1">Workouts 💪</Text>
              <Text className="text-neon-green text-base font-medium">7-Day Muscle Building Plan</Text>
            </View>
            <View className="bg-dark-charcoal border border-white/10 rounded-xl p-3 items-center min-w-[70px]">
              <View className="flex-row items-center">
                <Ionicons name="flame" size={16} color="#00E676" className="mr-1" />
                <Text className="text-white text-xl font-bold">{streak}</Text>
              </View>
              <Text className="text-gray-400 text-[10px] uppercase tracking-wide">Streak</Text>
            </View>
          </View>
        </View>

        {/* Today's Workout */}
        <View className="px-6 mb-8">
          <Text className="text-white text-lg font-bold mb-4">Today's Focus</Text>
          {todayWorkout ? (
            <View className="bg-dark-charcoal border border-neon-green/30 rounded-2xl p-5 shadow-lg shadow-neon-green/5">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-neon-green text-xl font-bold mb-1">{todayWorkout.day}</Text>
                  <Text className="text-white font-medium text-lg">{todayWorkout.focus}</Text>
                </View>
                <View className="bg-neon-green/10 p-2 rounded-full">
                  {todayWorkout.focus === 'Rest' ? (
                     <Ionicons name="bed" size={24} color="#00E676" />
                  ) : (
                     <Ionicons name="barbell" size={24} color="#00E676" />
                  )}
                </View>
              </View>
              
              {todayWorkout.instructions && (
                <View className="bg-deep-black/30 rounded-lg p-3 mb-4">
                  <Text className="text-gray-300 text-sm italic">
                    💡 {todayWorkout.instructions}
                  </Text>
                </View>
              )}

              {todayWorkout.exercises && todayWorkout.exercises.length > 0 ? (
                <View>
                  <Text className="text-gray-400 text-xs uppercase font-bold mb-3 tracking-wider">Exercises</Text>
                  {todayWorkout.exercises.map((exercise, idx) => (
                    <View key={idx} className="flex-row items-center mb-3 last:mb-0">
                      <Ionicons 
                        name={completedExerciseIds.has(exercise.name) ? "checkbox" : "square-outline"} 
                        size={20} 
                        color={completedExerciseIds.has(exercise.name) ? "#00E676" : "#6B7280"} 
                      />
                      <Text className={`ml-3 flex-1 ${completedExerciseIds.has(exercise.name) ? 'text-neon-green line-through' : 'text-gray-300'}`}>
                        {exercise.name} <Text className="text-gray-500">• {exercise.sets}x{exercise.reps}</Text>
                      </Text>
                    </View>
                  ))}
                  <TouchableOpacity 
                    className="bg-neon-green rounded-xl py-4 mt-4 items-center shadow-md shadow-neon-green/20"
                    onPress={() => setExpandedDay(todayWorkout.day)}
                  >
                    <Text className="text-deep-black font-bold text-base">Start Workout</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="items-center py-4">
                  <Text className="text-neon-green font-medium">Enjoy your rest day! 😴</Text>
                </View>
              )}
            </View>
          ) : (
            <Text className="text-gray-500 italic">No workout plan found for today.</Text>
          )}
        </View>

        {/* Weekly Schedule */}
        <View className="px-6 mb-8">
          <Text className="text-white text-lg font-bold mb-4">Weekly Schedule</Text>
          {allDays.map((day) => (
            <View key={day.day} className="mb-4">
              <TouchableOpacity
                onPress={() => toggleDay(day.day)}
                className={`flex-row items-center justify-between p-4 rounded-xl border ${
                  expandedDay === day.day 
                    ? 'bg-dark-charcoal border-neon-green/50' 
                    : 'bg-dark-charcoal border-white/5'
                }`}
              >
                <View className="flex-row items-center">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    expandedDay === day.day ? 'bg-neon-green' : 'bg-white/10'
                  }`}>
                    <Text className={`font-bold text-xs ${
                      expandedDay === day.day ? 'text-deep-black' : 'text-white'
                    }`}>
                      {day.day.substring(0, 3)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold text-base">
                      {day.day}
                    </Text>
                    <Text className={`text-sm ${
                      expandedDay === day.day ? 'text-neon-green' : 'text-gray-500'
                    }`}>
                      {day.focus}
                    </Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedDay === day.day ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={expandedDay === day.day ? '#00E676' : '#9CA3AF'}
                />
              </TouchableOpacity>

              {expandedDay === day.day && (
                <View className="bg-dark-charcoal/50 rounded-b-xl p-4 mx-2 border-x border-b border-white/5">
                  {day.instructions && (
                    <Text className="text-gray-400 italic mb-4 text-sm">
                      💡 {day.instructions}
                    </Text>
                  )}
                  
                  {day.exercises && day.exercises.length > 0 ? (
                    day.exercises.map((exercise, index) => renderExerciseItem(exercise, index))
                  ) : (
                    <View className="items-center py-4">
                      <Ionicons name="happy-outline" size={32} color="#4B5563" />
                      <Text className="text-gray-500 mt-2">Rest and recover!</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutsScreen;

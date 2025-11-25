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
      // We need to check completion for all exercises in the plan
      // This might be expensive if the plan is huge, but for 7 days it's fine
      for (const day of days) {
        if (day.exercises) {
          for (const exercise of day.exercises) {
             // Use name as ID if ID is missing, or generate a consistent ID
             // Ideally exercises should have IDs. In our data they don't have explicit IDs yet in the new plan.
             // Let's assume we use name for now or we need to update data to have IDs.
             // Actually, let's use name as fallback ID for tracking
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
    // Navigate to detail or just show a modal?
    // For now, let's assume we have an ID. If not, we pass the exercise object?
    // The navigation param expects exerciseId.
    // We might need to update navigation to pass the whole exercise object or ensure IDs.
    // Let's update navigation types later. For now, we'll use name as ID.
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
        className="bg-white rounded-xl p-4 mb-3 shadow-sm flex-row items-center justify-between"
      >
        <View className="flex-1">
          <Text className="text-gray-800 font-bold text-base">{exercise.name}</Text>
          <Text className="text-gray-600 text-sm">
            {exercise.sets} sets × {exercise.reps} {typeof exercise.reps === 'number' ? 'reps' : ''}
          </Text>
        </View>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#16A34A" />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-6 px-6">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-3xl font-bold mb-2">Workouts 💪</Text>
            <Text className="text-green-100 text-base">7-Day Muscle Building Plan</Text>
          </View>
          <View className="bg-white/20 rounded-xl p-3">
            <Text className="text-white text-xl font-bold text-center">{streak}</Text>
            <Text className="text-green-100 text-xs">Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Today's Workout */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Today's Focus</Text>
        {todayWorkout ? (
          <View className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-green-800 text-xl font-bold">{todayWorkout.day}</Text>
                <Text className="text-green-700 font-medium">{todayWorkout.focus}</Text>
              </View>
              {todayWorkout.focus === 'Rest' ? (
                 <Ionicons name="bed" size={32} color="#16A34A" />
              ) : (
                 <Ionicons name="barbell" size={32} color="#16A34A" />
              )}
            </View>
            
            {todayWorkout.instructions && (
              <Text className="text-green-600 text-sm mb-4 italic">
                {todayWorkout.instructions}
              </Text>
            )}

            {todayWorkout.exercises && todayWorkout.exercises.length > 0 ? (
              <View>
                <Text className="text-green-800 font-semibold mb-2">Exercises:</Text>
                {todayWorkout.exercises.map((exercise, idx) => (
                  <View key={idx} className="flex-row items-center mb-2">
                    <Ionicons 
                      name={completedExerciseIds.has(exercise.name) ? "checkbox" : "square-outline"} 
                      size={20} 
                      color="#16A34A" 
                    />
                    <Text className="text-green-700 ml-2 flex-1">
                      {exercise.name} • {exercise.sets}x{exercise.reps}
                    </Text>
                  </View>
                ))}
                <TouchableOpacity 
                  className="bg-green-600 rounded-lg py-3 mt-3 items-center"
                  onPress={() => setExpandedDay(todayWorkout.day)}
                >
                  <Text className="text-white font-bold">Start Workout</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text className="text-green-600">Enjoy your rest day! 😴</Text>
            )}
          </View>
        ) : (
          <Text className="text-gray-500 italic">No workout plan found for today.</Text>
        )}
      </View>

      {/* Weekly Schedule */}
      <View className="px-6 mb-8">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Weekly Schedule</Text>
        {allDays.map((day) => (
          <View key={day.day} className="mb-4">
            <TouchableOpacity
              onPress={() => toggleDay(day.day)}
              className={`flex-row items-center justify-between p-4 rounded-xl ${
                expandedDay === day.day ? 'bg-green-600' : 'bg-white'
              } shadow-sm`}
            >
              <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                  expandedDay === day.day ? 'bg-white/20' : 'bg-green-100'
                }`}>
                  <Text className={`font-bold ${
                    expandedDay === day.day ? 'text-white' : 'text-green-700'
                  }`}>
                    {day.day.substring(0, 3)}
                  </Text>
                </View>
                <View>
                  <Text className={`font-bold text-base ${
                    expandedDay === day.day ? 'text-white' : 'text-gray-800'
                  }`}>
                    {day.day}
                  </Text>
                  <Text className={`text-sm ${
                    expandedDay === day.day ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {day.focus}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={expandedDay === day.day ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={expandedDay === day.day ? 'white' : '#9CA3AF'}
              />
            </TouchableOpacity>

            {expandedDay === day.day && (
              <View className="bg-white rounded-b-xl p-4 mt-1 border-t border-gray-100">
                {day.instructions && (
                  <Text className="text-gray-600 italic mb-4 bg-gray-50 p-3 rounded-lg">
                    💡 {day.instructions}
                  </Text>
                )}
                
                {day.exercises && day.exercises.length > 0 ? (
                  day.exercises.map((exercise, index) => renderExerciseItem(exercise, index))
                ) : (
                  <View className="items-center py-4">
                    <Ionicons name="happy-outline" size={32} color="#9CA3AF" />
                    <Text className="text-gray-500 mt-2">Rest and recover!</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WorkoutsScreen;

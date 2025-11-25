import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '../types/workout.types';
import { getWeeklyWorkouts, getTodayWorkouts } from '../services/workoutTracking';

type WorkoutScheduleNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  'WorkoutSchedule'
>;

const WorkoutScheduleScreen = () => {
  const navigation = useNavigation<WorkoutScheduleNavigationProp>();
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<any[]>([]);
  const [todayWorkouts, setTodayWorkouts] = useState<any[]>([]);

  useEffect(() => {
    loadScheduleData();
  }, []);

  const loadScheduleData = async () => {
    const weekly = await getWeeklyWorkouts();
    const today = await getTodayWorkouts();
    setWeeklyWorkouts(weekly);
    setTodayWorkouts(today);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentDay = today.getDay();

  // Get dates for the current week
  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();

  // Check if a date has workouts
  const hasWorkoutsOnDate = (date: Date) => {
    return weeklyWorkouts.some((workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate.toDateString() === date.toDateString();
    });
  };

  const getWorkoutsForDate = (date: Date) => {
    return weeklyWorkouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate.toDateString() === date.toDateString();
    });
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

          <Text className="text-white text-3xl font-bold mb-2">Workout Schedule 📅</Text>
          <Text className="text-green-100 text-base">Plan your weekly workouts</Text>
        </View>

        {/* Today's Summary */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-3">Today's Workouts</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {todayWorkouts.length > 0 ? (
              <>
                <View className="flex-row items-center mb-3">
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                  <Text className="text-gray-800 font-semibold ml-2">
                    {todayWorkouts.length} exercise{todayWorkouts.length !== 1 ? 's' : ''}{' '}
                    completed
                  </Text>
                </View>
                {todayWorkouts.map((workout, index) => (
                  <View
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 mb-2 last:mb-0 flex-row items-center"
                  >
                    <Ionicons name="fitness" size={20} color="#6B7280" />
                    <Text className="text-gray-700 ml-2 flex-1">{workout.exerciseName}</Text>
                    <Text className="text-gray-500 text-xs">
                      {workout.setsCompleted}×{workout.repsCompleted}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <View className="items-center py-4">
                <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 mt-2">No workouts completed today</Text>
                <Text className="text-gray-400 text-sm mt-1">
                  Start your first workout!
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Weekly Calendar */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-3">This Week</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between mb-4">
              {weekDates.map((date, index) => {
                const isToday = index === currentDay;
                const hasWorkouts = hasWorkoutsOnDate(date);

                return (
                  <TouchableOpacity
                    key={index}
                    className={`items-center p-2 rounded-lg ${
                      isToday ? 'bg-green-600' : hasWorkouts ? 'bg-green-100' : 'bg-gray-50'
                    }`}
                  >
                    <Text
                      className={`text-xs mb-1 ${
                        isToday ? 'text-white' : 'text-gray-600'
                      }`}
                    >
                      {daysOfWeek[index]}
                    </Text>
                    <Text
                      className={`text-lg font-bold ${
                        isToday ? 'text-white' : hasWorkouts ? 'text-green-700' : 'text-gray-800'
                      }`}
                    >
                      {date.getDate()}
                    </Text>
                    {hasWorkouts && !isToday && (
                      <View className="mt-1">
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Workout details for selected day */}
            <View className="border-t border-gray-200 pt-4">
              <Text className="text-gray-700 font-semibold mb-2">
                {daysOfWeek[currentDay]}, {today.toLocaleDateString()}
              </Text>
              {getWorkoutsForDate(today).length > 0 ? (
                getWorkoutsForDate(today).map((workout, index) => (
                  <View key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                    <Text className="text-gray-800 font-semibold">
                      {workout.exerciseName}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {workout.setsCompleted} sets × {workout.repsCompleted} reps
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-gray-500 text-sm">No workouts scheduled</Text>
              )}
            </View>
          </View>
        </View>

        {/* Suggested Weekly Plan */}
        <View className="px-6 mt-6 mb-8">
          <Text className="text-gray-800 text-lg font-semibold mb-3">
            Suggested Weekly Plan
          </Text>
          <View className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6">
            <Text className="text-white text-xl font-bold mb-4">
              Beginner Muscle Gain Plan 💪
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text className="text-white ml-2">Mon, Wed, Fri: Strength Training</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text className="text-white ml-2">Tue, Thu: Light Cardio</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text className="text-white ml-2">Sat: Flexibility & Stretching</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                <Text className="text-white ml-2">Sun: Rest Day</Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-white rounded-xl py-3 mt-4"
              onPress={() =>
                Alert.alert(
                  'Coming Soon',
                  'Custom workout scheduling will be available in the next update!'
                )
              }
            >
              <Text className="text-green-700 font-bold text-center">
                Customize Your Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkoutScheduleScreen;

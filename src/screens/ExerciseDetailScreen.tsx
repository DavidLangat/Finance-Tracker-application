import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WorkoutStackParamList } from '../types/workout.types';
import { getExerciseByName } from '../data/exercises.data';
import {
  saveCompletedWorkout,
  isExerciseCompletedToday,
  getWorkoutsByExercise,
} from '../services/workoutTracking';

type ExerciseDetailRouteProp = RouteProp<WorkoutStackParamList, 'ExerciseDetail'>;
type ExerciseDetailNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList,
  'ExerciseDetail'
>;

const ExerciseDetailScreen = () => {
  const route = useRoute<ExerciseDetailRouteProp>();
  const navigation = useNavigation<ExerciseDetailNavigationProp>();
  const { exerciseId } = route.params; // This is now the exercise name

  const exercise = getExerciseByName(exerciseId);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionCount, setCompletionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadExerciseData();
  }, [exerciseId]);

  const loadExerciseData = async () => {
    const completed = await isExerciseCompletedToday(exerciseId);
    setIsCompleted(completed);

    const history = await getWorkoutsByExercise(exerciseId);
    setCompletionCount(history.length);
  };

  if (!exercise) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Exercise not found</Text>
      </View>
    );
  }

  const handleMarkComplete = async () => {
    setIsLoading(true);
    const success = await saveCompletedWorkout(
      exercise.id || exercise.name, // Use name as fallback ID
      exercise.name,
      exercise.sets || 0,
      exercise.reps || 0,
      undefined,
      'Completed from detail screen'
    );

    if (success) {
      setIsCompleted(true);
      setCompletionCount(completionCount + 1);
      Alert.alert(
        'Great Job! 💪',
        `You've completed ${exercise.name}! Keep up the good work!`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Failed to save workout. Please try again.');
    }
    setIsLoading(false);
  };

  const handleWatchVideo = () => {
    if (exercise.videoUrl) {
      Linking.openURL(exercise.videoUrl);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength':
        return 'bg-red-500';
      case 'Cardio':
        return 'bg-blue-500';
      case 'Flexibility':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <View className="relative">
          {exercise.imageUrl ? (
            <Image
              source={{ uri: exercise.imageUrl }}
              className="w-full h-72"
              resizeMode="cover"
            />
          ) : (
            <View className={`w-full h-72 ${getCategoryColor(exercise.category)}`} />
          )}
          
          {/* Overlay gradient/darkening for text readability */}
          <View className="absolute inset-0 bg-black/40" />

          <View className="absolute top-0 left-0 right-0 pt-12 pb-8 px-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mb-4 bg-white/20 rounded-full p-2 self-start"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text className="text-white text-3xl font-bold mb-2 shadow-sm">{exercise.name}</Text>
            <Text className="text-white/90 text-base mb-4 shadow-sm">{exercise.description}</Text>

            <View className="flex-row items-center">
              <View className={`${getDifficultyColor(exercise.difficulty)} rounded-full px-3 py-1 mr-2`}>
                <Text className="text-xs font-semibold">{exercise.difficulty}</Text>
              </View>
              <View className="bg-white/20 rounded-full px-3 py-1">
                <Text className="text-white text-xs font-semibold">{exercise.category}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Exercise Stats */}
        <View className="px-6 -mt-4">
          <View className="bg-white rounded-2xl p-4 shadow-lg flex-row justify-around">
            <View className="items-center">
              <Text className="text-gray-800 text-2xl font-bold">{exercise.sets}</Text>
              <Text className="text-gray-500 text-xs">Sets</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-800 text-2xl font-bold">{exercise.reps}</Text>
              <Text className="text-gray-500 text-xs">Reps</Text>
            </View>
            <View className="items-center">
              <Text className="text-gray-800 text-2xl font-bold">{completionCount}</Text>
              <Text className="text-gray-500 text-xs">Times Done</Text>
            </View>
          </View>
        </View>

        {/* Equipment */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-3">Equipment</Text>
          <View className="bg-white rounded-xl p-4">
            <View className="flex-row items-center">
              <Ionicons
                name={exercise.equipment === 'None' ? 'body-outline' : 'home-outline'}
                size={24}
                color="#6B7280"
              />
              <View className="ml-3 flex-1">
                <Text className="text-gray-800 font-semibold">
                  {exercise.equipment === 'None' ? 'Bodyweight Only' : 'Household Items'}
                </Text>
                {exercise.equipmentDetails && (
                  <Text className="text-gray-600 text-sm mt-1">
                    {exercise.equipmentDetails}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Target Muscles */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-3">Target Muscles</Text>
          <View className="flex-row flex-wrap">
            {exercise.targetMuscles.map((muscle: string, index: number) => (
              <View key={index} className="bg-green-100 rounded-full px-3 py-1 mr-2 mb-2">
                <Text className="text-green-700 text-sm font-semibold">{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-3">Instructions</Text>
          <View className="bg-white rounded-xl p-4">
            {exercise.instructions.map((instruction: string, index: number) => (
              <View key={index} className="flex-row mb-3 last:mb-0">
                <View className="bg-green-600 rounded-full w-6 h-6 items-center justify-center mr-3">
                  <Text className="text-white text-xs font-bold">{index + 1}</Text>
                </View>
                <Text className="text-gray-700 flex-1">{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        {exercise.tips && exercise.tips.length > 0 && (
          <View className="px-6 mt-6">
            <Text className="text-gray-800 text-lg font-semibold mb-3">Pro Tips 💡</Text>
            <View className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              {exercise.tips.map((tip: string, index: number) => (
                <View key={index} className="flex-row mb-2 last:mb-0">
                  <Ionicons name="bulb" size={16} color="#F59E0B" />
                  <Text className="text-gray-700 ml-2 flex-1">{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Video Button */}
        {exercise.videoUrl && (
          <View className="px-6 mt-6">
            <TouchableOpacity
              onPress={handleWatchVideo}
              className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="play-circle" size={24} color="white" />
              <Text className="text-white font-semibold ml-2">Watch Video Tutorial</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleMarkComplete}
          disabled={isCompleted || isLoading}
          className={`rounded-xl p-4 flex-row items-center justify-center ${
            isCompleted ? 'bg-green-100' : 'bg-green-600'
          }`}
        >
          <Ionicons
            name={isCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={24}
            color={isCompleted ? '#10B981' : 'white'}
          />
          <Text
            className={`font-bold ml-2 ${
              isCompleted ? 'text-green-700' : 'text-white'
            }`}
          >
            {isCompleted ? 'Completed Today ✓' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseDetailScreen;

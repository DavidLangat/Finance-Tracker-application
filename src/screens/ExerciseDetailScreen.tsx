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
  const { exerciseId } = route.params;

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
      <View className="flex-1 bg-deep-black items-center justify-center">
        <Text className="text-gray-500">Exercise not found</Text>
      </View>
    );
  }

  const handleMarkComplete = async () => {
    setIsLoading(true);
    const success = await saveCompletedWorkout(
      exercise.id || exercise.name,
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

  return (
    <View className="flex-1 bg-deep-black">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Parallax Header Image */}
        <View className="relative h-96">
          {exercise.imageUrl ? (
            <Image
              source={{ uri: exercise.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-full bg-dark-charcoal" />
          )}
          
          {/* Gradient Overlay */}
          <View className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-black/20 to-deep-black" />
          <View className="absolute inset-0 bg-black/30" />

          {/* Navigation & Title */}
          <View className="absolute top-0 left-0 right-0 pt-12 px-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mb-6 bg-black/40 backdrop-blur-md rounded-full p-2 self-start border border-white/10"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <View className="flex-row items-center mb-3">
              <View className="bg-neon-green px-3 py-1 rounded-full mr-2">
                <Text className="text-deep-black text-xs font-bold uppercase">{exercise.difficulty}</Text>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                <Text className="text-white text-xs font-bold uppercase">{exercise.category}</Text>
              </View>
            </View>
            <Text className="text-white text-4xl font-bold mb-2 shadow-sm">{exercise.name}</Text>
            <Text className="text-gray-300 text-base shadow-sm">{exercise.description}</Text>
          </View>
        </View>

        {/* Content Container */}
        <View className="px-6 pt-6">
          {/* Stats Grid */}
          <View className="flex-row justify-between mb-8">
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] items-center border border-white/10">
              <Text className="text-neon-green text-2xl font-bold">{exercise.sets}</Text>
              <Text className="text-gray-400 text-xs uppercase font-medium">Sets</Text>
            </View>
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] items-center border border-white/10">
              <Text className="text-neon-green text-2xl font-bold">{exercise.reps}</Text>
              <Text className="text-gray-400 text-xs uppercase font-medium">Reps</Text>
            </View>
            <View className="bg-dark-charcoal rounded-2xl p-4 w-[31%] items-center border border-white/10">
              <Text className="text-white text-2xl font-bold">{completionCount}</Text>
              <Text className="text-gray-400 text-xs uppercase font-medium">Completed</Text>
            </View>
          </View>

          {/* Instructions */}
          <Text className="text-white text-xl font-bold mb-4">Instructions</Text>
          <View className="bg-dark-charcoal rounded-2xl p-5 border border-white/10 mb-8">
            {exercise.instructions.map((instruction: string, index: number) => (
              <View key={index} className="flex-row mb-4 last:mb-0">
                <View className="bg-neon-green/10 w-8 h-8 rounded-full items-center justify-center mr-4 mt-1">
                  <Text className="text-neon-green font-bold">{index + 1}</Text>
                </View>
                <Text className="text-gray-300 text-base flex-1 leading-6">{instruction}</Text>
              </View>
            ))}
          </View>

          {/* Target Muscles */}
          <Text className="text-white text-xl font-bold mb-4">Target Muscles</Text>
          <View className="flex-row flex-wrap mb-8">
            {exercise.targetMuscles.map((muscle: string, index: number) => (
              <View key={index} className="bg-white/10 rounded-full px-4 py-2 mr-2 mb-2 border border-white/5">
                <Text className="text-white text-sm font-medium">{muscle}</Text>
              </View>
            ))}
          </View>

          {/* Pro Tips */}
          {exercise.tips && exercise.tips.length > 0 && (
            <View className="mb-8">
              <Text className="text-white text-xl font-bold mb-4">Pro Tips</Text>
              <View className="bg-neon-green/5 rounded-2xl p-5 border border-neon-green/20">
                {exercise.tips.map((tip: string, index: number) => (
                  <View key={index} className="flex-row mb-3 last:mb-0">
                    <Ionicons name="bulb-outline" size={20} color="#00E676" className="mt-0.5" />
                    <Text className="text-gray-300 ml-3 flex-1 leading-5">{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Video Button */}
          {exercise.videoUrl && (
            <TouchableOpacity
              onPress={handleWatchVideo}
              className="bg-dark-charcoal rounded-2xl p-4 flex-row items-center justify-center border border-white/10 mb-8"
            >
              <Ionicons name="play-circle" size={24} color="#EF4444" />
              <Text className="text-white font-semibold ml-2">Watch Video Tutorial</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-deep-black/90 backdrop-blur-lg border-t border-white/10 p-6 pb-8">
        <TouchableOpacity
          onPress={handleMarkComplete}
          disabled={isCompleted || isLoading}
          className={`rounded-2xl p-4 flex-row items-center justify-center shadow-lg ${
            isCompleted ? 'bg-dark-charcoal border border-neon-green' : 'bg-neon-green'
          }`}
        >
          <Ionicons
            name={isCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={24}
            color={isCompleted ? '#00E676' : '#000000'}
          />
          <Text
            className={`font-bold text-lg ml-2 ${
              isCompleted ? 'text-neon-green' : 'text-deep-black'
            }`}
          >
            {isCompleted ? 'Completed Today' : 'Mark as Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseDetailScreen;

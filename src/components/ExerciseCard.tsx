import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Exercise } from '../types/workout.types';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
  onPress: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, onPress }) => {
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
        return 'text-green-600';
      case 'Intermediate':
        return 'text-yellow-600';
      case 'Advanced':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getEquipmentIcon = (equipment: string) => {
    return equipment === 'None' ? 'body-outline' : 'home-outline';
  };

  return (
    <TouchableOpacity onPress={onPress} className="mb-4">
      <View className="bg-white rounded-xl p-4 shadow-sm">
        {/* Header with completion status */}
        <View className="flex-row items-center justify-between mb-3">
          <View className={`${getCategoryColor(exercise.category)} rounded-full px-3 py-1`}>
            <Text className="text-white text-xs font-semibold">{exercise.category}</Text>
          </View>
          {isCompleted && (
            <View className="bg-green-100 rounded-full p-1">
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
          )}
        </View>

        {/* Exercise name and description */}
        <Text className="text-gray-800 text-lg font-bold mb-2">{exercise.name}</Text>
        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {exercise.description}
        </Text>

        {/* Exercise details */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name={getEquipmentIcon(exercise.equipment)} size={16} color="#6B7280" />
            <Text className="text-gray-600 text-xs ml-1">
              {exercise.equipment === 'None' ? 'Bodyweight' : 'Household'}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="fitness" size={16} color="#6B7280" />
            <Text className="text-gray-600 text-xs ml-1">
              {exercise.sets} sets × {exercise.reps} reps
            </Text>
          </View>

          <Text className={`text-xs font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </Text>
        </View>

        {/* Equipment details if applicable */}
        {exercise.equipmentDetails && (
          <View className="mt-3 bg-gray-50 rounded-lg p-2">
            <Text className="text-gray-600 text-xs">
              <Text className="font-semibold">Needs: </Text>
              {exercise.equipmentDetails}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

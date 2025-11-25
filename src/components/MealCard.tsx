import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealLog } from '../types/nutrition.types';

interface MealCardProps {
  meal: MealLog;
  onPress?: () => void;
  onDelete?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onPress, onDelete }) => {
  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'Breakfast':
        return 'sunny';
      case 'Lunch':
        return 'partly-sunny';
      case 'Dinner':
        return 'moon';
      case 'Snacks':
        return 'fast-food';
      default:
        return 'restaurant';
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case 'Breakfast':
        return 'bg-yellow-500';
      case 'Lunch':
        return 'bg-orange-500';
      case 'Dinner':
        return 'bg-indigo-500';
      case 'Snacks':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity onPress={onPress} className="mb-4" disabled={!onPress}>
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View className={`${getMealColor(meal.mealType)} rounded-full p-2 mr-3`}>
              <Ionicons name={getMealIcon(meal.mealType) as any} size={20} color="white" />
            </View>
            <View>
              <Text className="text-gray-800 text-base font-bold">{meal.mealType}</Text>
              <Text className="text-gray-500 text-xs">{formatTime(meal.timestamp)}</Text>
            </View>
          </View>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} className="p-2">
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-3">
          {meal.foods.map((food, index) => (
            <Text key={index} className="text-gray-700 text-sm mb-1">
              • {food.foodName} ({food.servingSize.name} × {food.quantity})
            </Text>
          ))}
        </View>

        <View className="flex-row justify-between bg-gray-50 rounded-lg p-3">
          <View className="items-center">
            <Text className="text-gray-800 font-bold">{meal.totalNutrition.calories}</Text>
            <Text className="text-gray-500 text-xs">kcal</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-800 font-bold">{meal.totalNutrition.protein}g</Text>
            <Text className="text-gray-500 text-xs">protein</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-800 font-bold">{meal.totalNutrition.carbs}g</Text>
            <Text className="text-gray-500 text-xs">carbs</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-800 font-bold">{meal.totalNutrition.fat}g</Text>
            <Text className="text-gray-500 text-xs">fat</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

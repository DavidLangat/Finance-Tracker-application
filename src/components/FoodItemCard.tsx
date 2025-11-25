import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodItem } from '../types/nutrition.types';

interface FoodItemCardProps {
  food: FoodItem;
  onPress: () => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ food, onPress }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Staples':
        return 'bg-yellow-500';
      case 'Proteins':
        return 'bg-red-500';
      case 'Vegetables':
        return 'bg-green-500';
      case 'Fruits':
        return 'bg-orange-500';
      case 'Snacks':
        return 'bg-purple-500';
      case 'Beverages':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Staples':
        return 'fast-food';
      case 'Proteins':
        return 'fish';
      case 'Vegetables':
        return 'leaf';
      case 'Fruits':
        return 'nutrition';
      case 'Snacks':
        return 'pizza';
      case 'Beverages':
        return 'water';
      default:
        return 'restaurant';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} className="mb-3">
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className={`${getCategoryColor(food.category)} rounded-full p-2 mr-3`}>
              <Ionicons name={getCategoryIcon(food.category) as any} size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 text-base font-bold">{food.name}</Text>
              {food.nameSwahili && (
                <Text className="text-gray-500 text-sm">{food.nameSwahili}</Text>
              )}
            </View>
          </View>
          <Ionicons name="add-circle" size={28} color="#006B3F" />
        </View>

        <View className="flex-row justify-between bg-gray-50 rounded-lg p-2">
          <View className="items-center flex-1">
            <Text className="text-gray-800 font-bold">{food.nutrition.calories}</Text>
            <Text className="text-gray-500 text-xs">kcal</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-gray-800 font-bold">{food.nutrition.protein}g</Text>
            <Text className="text-gray-500 text-xs">protein</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-gray-800 font-bold">{food.nutrition.carbs}g</Text>
            <Text className="text-gray-500 text-xs">carbs</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-gray-800 font-bold">{food.nutrition.fat}g</Text>
            <Text className="text-gray-500 text-xs">fat</Text>
          </View>
        </View>

        {food.description && (
          <Text className="text-gray-600 text-xs mt-2" numberOfLines={1}>
            {food.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;

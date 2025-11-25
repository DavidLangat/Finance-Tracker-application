import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList } from '../types/nutrition.types';
import { saveMealLog, calculateTotalNutrition } from '../services/mealTracking';

type MealLogRouteProp = RouteProp<MealStackParamList, 'MealLog'>;
type MealLogNavigationProp = NativeStackNavigationProp<MealStackParamList, 'MealLog'>;

const MealLogScreen = () => {
  const route = useRoute<MealLogRouteProp>();
  const navigation = useNavigation<MealLogNavigationProp>();
  const { mealType, selectedFoods = [] } = route.params;

  const totalNutrition = calculateTotalNutrition(selectedFoods);

  const handleSaveMeal = async () => {
    const success = await saveMealLog(mealType, selectedFoods);

    if (success) {
      Alert.alert(
        'Meal Logged! 🎉',
        `Your ${mealType.toLowerCase()} has been saved successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MealHub'),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Failed to save meal. Please try again.');
    }
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

          <Text className="text-white text-3xl font-bold mb-2">Log {mealType}</Text>
          <Text className="text-green-100 text-base">Review and save your meal</Text>
        </View>

        {/* Food Items */}
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">Food Items</Text>
          {selectedFoods.map((food, index) => (
            <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
              <Text className="text-gray-800 font-bold text-base">{food.foodName}</Text>
              <Text className="text-gray-600 text-sm mt-1">
                {food.servingSize.name} × {food.quantity}
              </Text>
              <View className="flex-row justify-between mt-3 bg-gray-50 rounded-lg p-2">
                <View className="items-center">
                  <Text className="text-gray-800 font-bold">{food.nutrition.calories}</Text>
                  <Text className="text-gray-500 text-xs">kcal</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-800 font-bold">{food.nutrition.protein}g</Text>
                  <Text className="text-gray-500 text-xs">protein</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-800 font-bold">{food.nutrition.carbs}g</Text>
                  <Text className="text-gray-500 text-xs">carbs</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-800 font-bold">{food.nutrition.fat}g</Text>
                  <Text className="text-gray-500 text-xs">fat</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Total Nutrition */}
        <View className="px-6 mt-6 mb-24">
          <Text className="text-gray-800 text-lg font-semibold mb-4">Total Nutrition</Text>
          <View className="bg-green-600 rounded-xl p-6 shadow-lg">
            <View className="flex-row justify-between mb-4">
              <View className="items-center flex-1">
                <Text className="text-white text-3xl font-bold">{totalNutrition.calories}</Text>
                <Text className="text-green-100 text-sm">Calories</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-white text-3xl font-bold">{totalNutrition.protein}g</Text>
                <Text className="text-green-100 text-sm">Protein</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-white text-3xl font-bold">{totalNutrition.carbs}g</Text>
                <Text className="text-green-100 text-sm">Carbs</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-white text-3xl font-bold">{totalNutrition.fat}g</Text>
                <Text className="text-green-100 text-sm">Fat</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleSaveMeal}
          className="bg-green-600 rounded-xl p-4 flex-row items-center justify-center"
        >
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text className="text-white font-bold ml-2">Save {mealType}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealLogScreen;

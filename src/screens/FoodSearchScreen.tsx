import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList, LoggedFood, FoodItem } from '../types/nutrition.types';
import { KENYA_FOODS, getFoodsByCategory, searchFoods, calculateNutrition } from '../data/foods.data';
import FoodItemCard from '../components/FoodItemCard';

type FoodSearchRouteProp = RouteProp<MealStackParamList, 'FoodSearch'>;
type FoodSearchNavigationProp = NativeStackNavigationProp<MealStackParamList, 'FoodSearch'>;

const FoodSearchScreen = () => {
  const route = useRoute<FoodSearchRouteProp>();
  const navigation = useNavigation<FoodSearchNavigationProp>();
  const { mealType } = route.params || {};

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFoods, setSelectedFoods] = useState<LoggedFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingIndex, setServingIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const categories = ['All', 'Staples', 'Proteins', 'Vegetables', 'Fruits', 'Snacks', 'Beverages'];

  const filteredFoods = searchQuery
    ? searchFoods(searchQuery)
    : getFoodsByCategory(selectedCategory);

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setServingIndex(food.defaultServing);
    setQuantity(1);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;

    const servingSize = selectedFood.servingSizes[servingIndex];
    if (!servingSize) return; // Safety check

    const nutrition = calculateNutrition(selectedFood, servingSize, quantity);

    const loggedFood: LoggedFood = {
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      servingSize,
      quantity,
      nutrition,
    };

    setSelectedFoods([...selectedFoods, loggedFood]);
    setSelectedFood(null);
    Alert.alert('Added!', `${selectedFood.name} added to meal`);
  };

  const handleContinue = () => {
    if (selectedFoods.length === 0) {
      Alert.alert('No Foods', 'Please add at least one food item');
      return;
    }

    if (mealType) {
      navigation.navigate('MealLog', { mealType, selectedFoods });
    } else {
      Alert.alert('Select Meal Type', 'Please select a meal type');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-6 px-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mb-4 bg-white/20 rounded-full p-2 self-start"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-2">Search Food</Text>
        <Text className="text-green-100 text-base">
          {mealType ? `Adding to ${mealType}` : 'Find Kenya foods'}
        </Text>

        {/* Search Bar */}
        <View className="bg-white rounded-xl flex-row items-center px-4 py-3 mt-4">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search ugali, sukuma wiki, nyama..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-gray-800"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`mr-3 px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-green-600'
                : 'bg-white border border-gray-300'
            }`}
          >
            <Text
              className={`font-semibold ${
                selectedCategory === category ? 'text-white' : 'text-gray-700'
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food List */}
      <ScrollView className="flex-1 px-6 mt-4">
        {filteredFoods.map((food) => (
          <FoodItemCard key={food.id} food={food} onPress={() => handleFoodSelect(food)} />
        ))}

        {filteredFoods.length === 0 && (
          <View className="bg-white rounded-xl p-8 items-center mt-4">
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-500 text-base mt-4 text-center">
              No foods found
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Food Selection Modal */}
      {selectedFood && (
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl">
          <Text className="text-gray-800 text-xl font-bold mb-4">{selectedFood.name}</Text>

          <Text className="text-gray-700 font-semibold mb-2">Serving Size</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            {selectedFood.servingSizes.map((serving, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setServingIndex(index)}
                className={`mr-3 px-4 py-2 rounded-lg ${
                  servingIndex === index ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    servingIndex === index ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {serving.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-gray-700 font-semibold mb-2">Quantity</Text>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 rounded-lg p-3"
            >
              <Ionicons name="remove" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-gray-800 text-xl font-bold mx-6">{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className="bg-gray-200 rounded-lg p-3"
            >
              <Ionicons name="add" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setSelectedFood(null)}
              className="bg-gray-200 rounded-xl px-6 py-3 flex-1 mr-2"
            >
              <Text className="text-gray-700 font-bold text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddFood}
              className="bg-green-600 rounded-xl px-6 py-3 flex-1 ml-2"
            >
              <Text className="text-white font-bold text-center">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Continue Button */}
      {selectedFoods.length > 0 && !selectedFood && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-green-600 rounded-xl p-4 flex-row items-center justify-center"
          >
            <Text className="text-white font-bold mr-2">
              Continue ({selectedFoods.length} items)
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FoodSearchScreen;

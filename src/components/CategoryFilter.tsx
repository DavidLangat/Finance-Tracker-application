import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ExerciseCategory } from '../types/workout.types';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = ['All', 'Strength', 'Cardio', 'Flexibility'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 24 }}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onSelectCategory(category)}
          className={`mr-3 px-5 py-2 rounded-full ${
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
  );
};

export default CategoryFilter;

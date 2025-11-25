import React from 'react';
import { View, Text } from 'react-native';

interface NutritionBarProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string; // Tailwind color class like 'bg-red-500'
}

const NutritionBar: React.FC<NutritionBarProps> = ({ label, current, goal, unit, color }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const isOverGoal = current > goal;

  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-2">
        <Text className="text-white font-semibold">{label}</Text>
        <Text className={`font-semibold ${isOverGoal ? 'text-red-500' : 'text-gray-300'}`}>
          {Math.round(current)} / {goal} {unit}
        </Text>
      </View>
      <View className="bg-white/10 rounded-full h-3 overflow-hidden">
        <View
          className={`${color} rounded-full h-3`}
          style={{ width: `${percentage}%` }}
        />
      </View>
      <Text className="text-gray-500 text-xs mt-1 text-right">
        {Math.round(percentage)}%
      </Text>
    </View>
  );
};

export default NutritionBar;

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MealStackParamList } from '../types/nutrition.types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  MealStackParamList,
  'MealPlanSetup'
>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('MealPlanSetup');
  };

  return (
    <View className="flex-1 bg-green-700">
      <View className="flex-1 justify-center items-center px-8">
        {/* App Icon/Logo */}
        <View className="bg-white rounded-full p-6 mb-8">
          <Ionicons name="restaurant" size={64} color="#006B3F" />
        </View>

        {/* Welcome Text */}
        <Text className="text-white text-4xl font-bold text-center mb-4">
          Welcome to{'\n'}Kenya Weight & Muscle Gain
        </Text>
        <Text className="text-green-100 text-lg text-center mb-8">
          🇰🇪 Your journey to a stronger, healthier you starts here
        </Text>

        {/* Features */}
        <View className="w-full mb-12">
          <View className="flex-row items-center mb-4">
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text className="text-white text-base ml-3">Track workouts & exercises</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text className="text-white text-base ml-3">Log meals & nutrition</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text className="text-white text-base ml-3">Follow meal plans</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text className="text-white text-base ml-3">Monitor progress</Text>
          </View>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-white rounded-xl px-12 py-4 w-full"
        >
          <Text className="text-green-700 text-lg font-bold text-center">
            Get Started 🚀
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

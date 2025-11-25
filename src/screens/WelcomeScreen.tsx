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
    <View className="flex-1 bg-deep-black">
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80' }}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      {/* Gradient Overlay */}
      <View className="absolute w-full h-full bg-black/60" />
      
      <View className="flex-1 justify-end items-center px-6 pb-12">
        {/* App Icon/Logo */}
        <View className="bg-dark-charcoal/80 backdrop-blur-md rounded-full p-6 mb-8 border border-white/10">
          <Ionicons name="fitness" size={64} color="#00E676" />
        </View>

        {/* Welcome Text */}
        <Text className="text-white text-4xl font-bold text-center mb-4 tracking-tight">
          Shape Your Body{'\n'}Transform Your Life
        </Text>
        <Text className="text-gray-300 text-lg text-center mb-10 leading-6">
          Premium workouts, nutrition plans, and progress tracking designed for results.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-neon-green rounded-2xl py-4 w-full shadow-lg shadow-neon-green/20 mb-4"
        >
          <Text className="text-deep-black text-lg font-bold text-center">
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Log In Button */}
        <TouchableOpacity
          className="bg-white/10 rounded-2xl py-4 w-full border border-white/10"
        >
          <Text className="text-white text-lg font-bold text-center">
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { saveProgressEntry } from '../services/progressTracking';
import { ProgressPhoto } from '../types/progress.types';

const AddProgressScreen = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    leftArm: '',
    rightArm: '',
    waist: '',
    hips: '',
    leftThigh: '',
    rightThigh: '',
    leftCalf: '',
    rightCalf: '',
  });
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [notes, setNotes] = useState('');

  const pickImage = async (type: 'front' | 'side' | 'back') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const newPhoto: ProgressPhoto = {
        id: `photo_${Date.now()}`,
        uri: result.assets[0].uri,
        date: new Date().toISOString(),
        type,
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleSave = async () => {
    if (!weight) {
      Alert.alert('Weight Required', 'Please enter your current weight');
      return;
    }

    const measurementsObj: any = {};
    Object.keys(measurements).forEach((key) => {
      const value = measurements[key as keyof typeof measurements];
      if (value) {
        measurementsObj[key] = parseFloat(value);
      }
    });

    const entry = {
      date: new Date().toISOString(),
      weight: parseFloat(weight),
      measurements: measurementsObj,
      photos,
      notes,
    };

    const success = await saveProgressEntry(entry);

    if (success) {
      Alert.alert('Progress Saved! 🎉', 'Your progress has been logged successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save progress. Please try again.');
    }
  };

  return (
    <View className="flex-1 bg-deep-black">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="pt-12 pb-6 px-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-6 bg-dark-charcoal border border-white/10 rounded-full p-2 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold mb-1">Add Progress 📈</Text>
          <Text className="text-neon-green text-base font-medium">Log your weight and measurements</Text>
        </View>

        {/* Weight Input */}
        <View className="px-6 mt-2">
          <Text className="text-white text-lg font-bold mb-4">Weight *</Text>
          <View className="bg-dark-charcoal rounded-2xl p-4 flex-row items-center border border-white/10 shadow-lg shadow-neon-green/5">
            <View className="bg-neon-green/10 p-2 rounded-full mr-3">
              <Ionicons name="fitness" size={24} color="#00E676" />
            </View>
            <TextInput
              placeholder="Enter weight"
              placeholderTextColor="#6B7280"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={setWeight}
              className="flex-1 text-white text-xl font-bold"
            />
            <Text className="text-neon-green font-bold text-lg">kg</Text>
          </View>
        </View>

        {/* Measurements */}
        <View className="px-6 mt-8">
          <Text className="text-white text-lg font-bold mb-4">Measurements (Optional)</Text>
          
          {[
            { key: 'chest', label: 'Chest', icon: 'body' },
            { key: 'leftArm', label: 'Left Arm', icon: 'fitness' },
            { key: 'rightArm', label: 'Right Arm', icon: 'fitness' },
            { key: 'waist', label: 'Waist', icon: 'ellipse' },
            { key: 'hips', label: 'Hips', icon: 'ellipse' },
            { key: 'leftThigh', label: 'Left Thigh', icon: 'walk' },
            { key: 'rightThigh', label: 'Right Thigh', icon: 'walk' },
            { key: 'leftCalf', label: 'Left Calf', icon: 'walk' },
            { key: 'rightCalf', label: 'Right Calf', icon: 'walk' },
          ].map((item) => (
            <View key={item.key} className="bg-dark-charcoal rounded-xl p-4 flex-row items-center border border-white/5 mb-3">
              <Ionicons name={item.icon as any} size={20} color="#9CA3AF" />
              <Text className="text-gray-300 font-medium ml-3 flex-1">{item.label}</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="#4B5563"
                keyboardType="decimal-pad"
                value={measurements[item.key as keyof typeof measurements]}
                onChangeText={(value) => setMeasurements({ ...measurements, [item.key]: value })}
                className="text-white text-right w-20 font-semibold"
              />
              <Text className="text-gray-500 ml-2 text-xs">cm</Text>
            </View>
          ))}
        </View>

        {/* Photos */}
        <View className="px-6 mt-8">
          <Text className="text-white text-lg font-bold mb-4">Progress Photos (Optional)</Text>
          <View className="flex-row justify-between">
            {['front', 'side', 'back'].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => pickImage(type as 'front' | 'side' | 'back')}
                className="w-[30%]"
              >
                <View className={`rounded-xl p-4 items-center border ${
                  photos.some((p) => p.type === type) 
                    ? 'bg-dark-charcoal border-neon-green' 
                    : 'bg-dark-charcoal border-white/10'
                }`}>
                  <Ionicons
                    name={photos.some((p) => p.type === type) ? 'checkmark-circle' : 'camera'}
                    size={32}
                    color={photos.some((p) => p.type === type) ? '#00E676' : '#6B7280'}
                  />
                  <Text className={`text-sm mt-2 capitalize ${
                    photos.some((p) => p.type === type) ? 'text-neon-green font-bold' : 'text-gray-500'
                  }`}>{type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View className="px-6 mt-8 mb-8">
          <Text className="text-white text-lg font-bold mb-4">Notes (Optional)</Text>
          <View className="bg-dark-charcoal rounded-xl p-4 border border-white/10">
            <TextInput
              placeholder="Add any notes about your progress..."
              placeholderTextColor="#6B7280"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              className="text-white"
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Save Button */}
        <View className="px-6 mb-8">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-neon-green rounded-xl p-4 shadow-lg shadow-neon-green/20"
          >
            <Text className="text-deep-black font-bold text-center text-lg">Save Progress</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddProgressScreen;

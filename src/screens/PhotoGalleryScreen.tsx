import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAllProgressEntries } from '../services/progressTracking';
import { ProgressPhoto } from '../types/progress.types';

const PhotoGalleryScreen = () => {
  const navigation = useNavigation();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const entries = await getAllProgressEntries();
    const allPhotos = entries.flatMap((entry) => entry.photos);
    setPhotos(allPhotos);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-6 px-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mb-4 bg-white/20 rounded-full p-2 self-start"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-3xl font-bold mb-2">Progress Photos</Text>
        <Text className="text-green-100 text-base">{photos.length} photos</Text>
      </View>

      {/* Photo Grid */}
      <View className="px-6 mt-6 mb-8">
        {photos.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {photos.map((photo) => (
              <View key={photo.id} className="w-[48%] mb-4">
                <View className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <Image
                    source={{ uri: photo.uri }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="text-gray-700 font-semibold capitalize">{photo.type}</Text>
                    <Text className="text-gray-600 text-xs">
                      {new Date(photo.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="bg-white rounded-xl p-8 items-center">
            <Ionicons name="images-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-base mt-4">No photos yet</Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Add photos when logging your progress
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PhotoGalleryScreen;

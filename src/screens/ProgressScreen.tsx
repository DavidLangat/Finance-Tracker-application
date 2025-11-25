import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProgressStackParamList } from '../types/progress.types';
import { getLatestEntry, getProgressStats, getAllProgressEntries } from '../services/progressTracking';

type ProgressScreenNavigationProp = NativeStackNavigationProp<ProgressStackParamList, 'ProgressHub'>;

const ProgressScreen = () => {
  const navigation = useNavigation<ProgressScreenNavigationProp>();
  const [latestEntry, setLatestEntry] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [recentPhotos, setRecentPhotos] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProgressData = async () => {
    try {
      const latest = await getLatestEntry();
      const progressStats = await getProgressStats();
      const entries = await getAllProgressEntries();
      
      // Get recent photos from last 3 entries
      const photos = entries
        .slice(0, 3)
        .flatMap((entry) => entry.photos)
        .slice(0, 6);

      setLatestEntry(latest);
      setStats(progressStats);
      setRecentPhotos(photos);
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProgressData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProgressData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-6 px-6">
        <Text className="text-white text-3xl font-bold mb-2">Progress 📊</Text>
        <Text className="text-green-100 text-base">Track your transformation</Text>
      </View>

      {/* Quick Stats */}
      <View className="px-6 mt-6">
        <View className="flex-row justify-between">
          <View className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm">
            <Ionicons name="trending-up" size={24} color="#16A34A" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">
              {stats?.weightGained >= 0 ? '+' : ''}{stats?.weightGained || 0} kg
            </Text>
            <Text className="text-gray-600 text-sm">Weight Gained</Text>
          </View>
          <View className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm">
            <Ionicons name="calendar" size={24} color="#2563EB" />
            <Text className="text-2xl font-bold text-gray-800 mt-2">{stats?.daysTracked || 0}</Text>
            <Text className="text-gray-600 text-sm">Days Tracked</Text>
          </View>
        </View>
      </View>

      {/* Current Weight */}
      {latestEntry && (
        <View className="px-6 mt-6">
          <Text className="text-gray-800 text-lg font-semibold mb-4">Current Stats</Text>
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-gray-600 text-sm">Current Weight</Text>
                <Text className="text-3xl font-bold text-gray-800">{latestEntry.weight} kg</Text>
              </View>
              <View className="bg-green-100 rounded-full p-3">
                <Ionicons name="fitness" size={32} color="#16A34A" />
              </View>
            </View>
            
            {/* Measurements Preview */}
            {Object.keys(latestEntry.measurements).length > 0 && (
              <View className="border-t border-gray-200 pt-4">
                <Text className="text-gray-700 font-semibold mb-2">Measurements</Text>
                <View className="flex-row flex-wrap">
                  {latestEntry.measurements.chest && (
                    <View className="w-1/2 mb-2">
                      <Text className="text-gray-600 text-xs">Chest</Text>
                      <Text className="text-gray-800 font-semibold">{latestEntry.measurements.chest} cm</Text>
                    </View>
                  )}
                  {latestEntry.measurements.waist && (
                    <View className="w-1/2 mb-2">
                      <Text className="text-gray-600 text-xs">Waist</Text>
                      <Text className="text-gray-800 font-semibold">{latestEntry.measurements.waist} cm</Text>
                    </View>
                  )}
                  {latestEntry.measurements.leftArm && (
                    <View className="w-1/2 mb-2">
                      <Text className="text-gray-600 text-xs">Arms</Text>
                      <Text className="text-gray-800 font-semibold">{latestEntry.measurements.leftArm} cm</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity
            onPress={() => navigation.navigate('AddProgress')}
            className="w-[48%] mb-4"
          >
            <View className="bg-green-600 rounded-xl p-4 items-center">
              <Ionicons name="add-circle" size={32} color="white" />
              <Text className="text-white font-semibold mt-2">Add Progress</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Graphs')}
            className="w-[48%] mb-4"
          >
            <View className="bg-blue-600 rounded-xl p-4 items-center">
              <Ionicons name="bar-chart" size={32} color="white" />
              <Text className="text-white font-semibold mt-2">View Graphs</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('History')}
            className="w-[48%] mb-4"
          >
            <View className="bg-purple-600 rounded-xl p-4 items-center">
              <Ionicons name="time" size={32} color="white" />
              <Text className="text-white font-semibold mt-2">History</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PhotoGallery')}
            className="w-[48%] mb-4"
          >
            <View className="bg-orange-600 rounded-xl p-4 items-center">
              <Ionicons name="images" size={32} color="white" />
              <Text className="text-white font-semibold mt-2">Photos</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Empty State */}
      {!latestEntry && (
        <View className="px-6 mt-6 mb-8">
          <View className="bg-white rounded-xl p-8 items-center">
            <Ionicons name="analytics-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-800 text-xl font-bold mt-4 text-center">
              Start Tracking Your Progress
            </Text>
            <Text className="text-gray-600 text-base mt-2 text-center">
              Log your weight and measurements to see your transformation
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddProgress')}
              className="bg-green-600 rounded-xl px-6 py-3 mt-6"
            >
              <Text className="text-white font-bold">Add First Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Kenya Tip */}
      <View className="px-6 mb-8">
        <View className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6">
          <Text className="text-white text-xl font-bold mb-2">🇰🇪 Progress Tip</Text>
          <Text className="text-white text-sm opacity-90">
            Track your progress weekly for best results. Consistency is key to achieving your muscle gain goals!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;

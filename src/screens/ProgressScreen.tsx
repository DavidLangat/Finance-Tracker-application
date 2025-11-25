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
    <View className="flex-1 bg-deep-black">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00E676" />}
      >
        {/* Header */}
        <View className="pt-12 pb-6 px-6">
          <Text className="text-white text-3xl font-bold mb-1">Progress 📊</Text>
          <Text className="text-neon-green text-base font-medium">Track your transformation</Text>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mt-2">
          <View className="flex-row justify-between">
            <View className="bg-dark-charcoal rounded-2xl p-4 flex-1 mr-2 border border-white/10 shadow-lg shadow-neon-green/5">
              <Ionicons name="trending-up" size={24} color="#00E676" />
              <Text className="text-2xl font-bold text-white mt-2">
                {stats?.weightGained >= 0 ? '+' : ''}{stats?.weightGained || 0} kg
              </Text>
              <Text className="text-gray-400 text-xs uppercase tracking-wider mt-1">Weight Gained</Text>
            </View>
            <View className="bg-dark-charcoal rounded-2xl p-4 flex-1 ml-2 border border-white/10 shadow-lg shadow-blue-500/5">
              <Ionicons name="calendar" size={24} color="#3B82F6" />
              <Text className="text-2xl font-bold text-white mt-2">{stats?.daysTracked || 0}</Text>
              <Text className="text-gray-400 text-xs uppercase tracking-wider mt-1">Days Tracked</Text>
            </View>
          </View>
        </View>

        {/* Current Weight */}
        {latestEntry && (
          <View className="px-6 mt-8">
            <Text className="text-white text-lg font-bold mb-4">Current Stats</Text>
            <View className="bg-dark-charcoal rounded-2xl p-6 border border-white/10">
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text className="text-gray-400 text-sm uppercase tracking-wider mb-1">Current Weight</Text>
                  <Text className="text-4xl font-bold text-white">{latestEntry.weight} <Text className="text-xl text-neon-green">kg</Text></Text>
                </View>
                <View className="bg-neon-green/10 rounded-full p-3">
                  <Ionicons name="fitness" size={32} color="#00E676" />
                </View>
              </View>
              
              {/* Measurements Preview */}
              {Object.keys(latestEntry.measurements).length > 0 && (
                <View className="border-t border-white/10 pt-4">
                  <Text className="text-white font-semibold mb-3">Measurements</Text>
                  <View className="flex-row flex-wrap">
                    {latestEntry.measurements.chest && (
                      <View className="w-1/2 mb-3">
                        <Text className="text-gray-500 text-xs uppercase">Chest</Text>
                        <Text className="text-white font-semibold text-lg">{latestEntry.measurements.chest} cm</Text>
                      </View>
                    )}
                    {latestEntry.measurements.waist && (
                      <View className="w-1/2 mb-3">
                        <Text className="text-gray-500 text-xs uppercase">Waist</Text>
                        <Text className="text-white font-semibold text-lg">{latestEntry.measurements.waist} cm</Text>
                      </View>
                    )}
                    {latestEntry.measurements.leftArm && (
                      <View className="w-1/2 mb-3">
                        <Text className="text-gray-500 text-xs uppercase">Arms</Text>
                        <Text className="text-white font-semibold text-lg">{latestEntry.measurements.leftArm} cm</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View className="px-6 mt-8">
          <Text className="text-white text-lg font-bold mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              onPress={() => navigation.navigate('AddProgress')}
              className="w-[48%] mb-4"
            >
              <View className="bg-neon-green rounded-2xl p-4 items-center shadow-lg shadow-neon-green/20">
                <Ionicons name="add-circle" size={32} color="#000000" />
                <Text className="text-deep-black font-bold mt-2">Add Progress</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Graphs')}
              className="w-[48%] mb-4"
            >
              <View className="bg-dark-charcoal border border-blue-500/30 rounded-2xl p-4 items-center">
                <Ionicons name="bar-chart" size={32} color="#3B82F6" />
                <Text className="text-white font-semibold mt-2">View Graphs</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('History')}
              className="w-[48%] mb-4"
            >
              <View className="bg-dark-charcoal border border-purple-500/30 rounded-2xl p-4 items-center">
                <Ionicons name="time" size={32} color="#A855F7" />
                <Text className="text-white font-semibold mt-2">History</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('PhotoGallery')}
              className="w-[48%] mb-4"
            >
              <View className="bg-dark-charcoal border border-orange-500/30 rounded-2xl p-4 items-center">
                <Ionicons name="images" size={32} color="#F97316" />
                <Text className="text-white font-semibold mt-2">Photos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Empty State */}
        {!latestEntry && (
          <View className="px-6 mt-6 mb-8">
            <View className="bg-dark-charcoal rounded-2xl p-8 items-center border border-white/10 border-dashed">
              <Ionicons name="analytics-outline" size={64} color="#4B5563" />
              <Text className="text-white text-xl font-bold mt-4 text-center">
                Start Tracking Your Progress
              </Text>
              <Text className="text-gray-400 text-base mt-2 text-center">
                Log your weight and measurements to see your transformation
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddProgress')}
                className="bg-neon-green rounded-xl px-6 py-3 mt-6 shadow-lg shadow-neon-green/20"
              >
                <Text className="text-deep-black font-bold">Add First Entry</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Kenya Tip */}
        <View className="px-6 mb-8">
          <View className="bg-gradient-to-r from-dark-charcoal to-deep-black border border-neon-green/20 rounded-2xl p-6 relative overflow-hidden">
            <View className="absolute top-0 right-0 -mt-4 -mr-4 bg-neon-green/10 w-24 h-24 rounded-full blur-xl" />
            <Text className="text-neon-green text-xl font-bold mb-2">🇰🇪 Progress Tip</Text>
            <Text className="text-gray-300 text-sm leading-5">
              Track your progress weekly for best results. Consistency is key to achieving your muscle gain goals!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;

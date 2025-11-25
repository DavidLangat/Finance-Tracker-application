import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAllProgressEntries, deleteProgressEntry } from '../services/progressTracking';
import { ProgressEntry } from '../types/progress.types';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getAllProgressEntries();
    setEntries(data);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this progress entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteProgressEntry(id);
            await loadHistory();
          },
        },
      ]
    );
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
        <Text className="text-white text-3xl font-bold mb-2">History</Text>
        <Text className="text-green-100 text-base">{entries.length} entries logged</Text>
      </View>

      {/* Entries List */}
      <View className="px-6 mt-6 mb-8">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <View key={entry.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <TouchableOpacity onPress={() => setExpandedId(expandedId === entry.id ? null : entry.id)}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-gray-800 font-bold text-lg">{entry.weight} kg</Text>
                    <Text className="text-gray-600 text-sm">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => handleDelete(entry.id)}
                      className="bg-red-100 rounded-full p-2 mr-2"
                    >
                      <Ionicons name="trash" size={20} color="#DC2626" />
                    </TouchableOpacity>
                    <Ionicons
                      name={expandedId === entry.id ? 'chevron-up' : 'chevron-down'}
                      size={24}
                      color="#6B7280"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {expandedId === entry.id && (
                <View className="border-t border-gray-200 mt-4 pt-4">
                  {Object.keys(entry.measurements).length > 0 && (
                    <View className="mb-4">
                      <Text className="text-gray-700 font-semibold mb-2">Measurements</Text>
                      <View className="flex-row flex-wrap">
                        {Object.entries(entry.measurements).map(([key, value]) => (
                          <View key={key} className="w-1/2 mb-2">
                            <Text className="text-gray-600 text-xs capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Text>
                            <Text className="text-gray-800 font-semibold">{value} cm</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {entry.photos.length > 0 && (
                    <View className="mb-4">
                      <Text className="text-gray-700 font-semibold mb-2">
                        {entry.photos.length} photo(s)
                      </Text>
                    </View>
                  )}

                  {entry.notes && (
                    <View>
                      <Text className="text-gray-700 font-semibold mb-2">Notes</Text>
                      <Text className="text-gray-600">{entry.notes}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))
        ) : (
          <View className="bg-white rounded-xl p-8 items-center">
            <Ionicons name="time-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-base mt-4">No progress entries yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;

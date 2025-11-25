import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { getWeightHistory, getNutritionTrends } from '../services/progressTracking';

const GraphsScreen = () => {
  const navigation = useNavigation();
  const [weightData, setWeightData] = useState<any>(null);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days');

  useEffect(() => {
    loadGraphData();
  }, [dateRange]);

  const loadGraphData = async () => {
    const days = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
    
    const weightHistory = await getWeightHistory(days);
    const nutritionTrends = await getNutritionTrends(7);

    if (weightHistory.length > 0) {
      setWeightData({
        labels: weightHistory.map((d) => new Date(d.date).getDate().toString()),
        datasets: [{ data: weightHistory.map((d) => d.weight) }],
      });
    }

    if (nutritionTrends.length > 0) {
      setNutritionData({
        labels: nutritionTrends.map((d) => new Date(d.date).getDate().toString()),
        datasets: [
          { data: nutritionTrends.map((d) => d.calories / 100) }, // Scale down for visibility
          { data: nutritionTrends.map((d) => d.protein) },
        ],
      });
    }
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '4', strokeWidth: '2', stroke: '#16A34A' },
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
        <Text className="text-white text-3xl font-bold mb-2">Graphs</Text>
        <Text className="text-green-100 text-base">Visualize your progress</Text>
      </View>

      {/* Date Range Selector */}
      <View className="px-6 mt-6">
        <View className="flex-row justify-between">
          {(['7days', '30days', '90days'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setDateRange(range)}
              className={`flex-1 mx-1 py-3 rounded-lg ${
                dateRange === range ? 'bg-green-600' : 'bg-white border border-gray-300'
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  dateRange === range ? 'text-white' : 'text-gray-700'
                }`}
              >
                {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Weight Gain Chart */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Weight Progress</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {weightData ? (
            <LineChart
              data={weightData}
              width={Dimensions.get('window').width - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 16 }}
            />
          ) : (
            <View className="items-center py-8">
              <Ionicons name="bar-chart-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 mt-4">No weight data yet</Text>
            </View>
          )}
        </View>
      </View>

      {/* Nutrition Trends Chart */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-gray-800 text-lg font-semibold mb-4">Nutrition Trends (Last 7 Days)</Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          {nutritionData ? (
            <>
              <BarChart
                data={nutritionData}
                width={Dimensions.get('window').width - 64}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                }}
                style={{ borderRadius: 16 }}
              />
              <View className="flex-row justify-center mt-4">
                <View className="flex-row items-center mr-4">
                  <View className="w-4 h-4 bg-blue-600 rounded mr-2" />
                  <Text className="text-gray-600 text-sm">Calories (÷100)</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-4 h-4 bg-green-600 rounded mr-2" />
                  <Text className="text-gray-600 text-sm">Protein (g)</Text>
                </View>
              </View>
            </>
          ) : (
            <View className="items-center py-8">
              <Ionicons name="bar-chart-outline" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 mt-4">No nutrition data yet</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default GraphsScreen;

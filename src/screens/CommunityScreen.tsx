import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = () => {
  const communityFeatures = [
    {
      title: 'Success Stories',
      description: 'Read inspiring transformation stories from fellow Kenyans',
      icon: 'trophy',
      color: 'bg-yellow-500',
    },
    {
      title: 'Workout Groups',
      description: 'Join local workout groups in your area',
      icon: 'people',
      color: 'bg-blue-500',
    },
    {
      title: 'Nutrition Tips',
      description: 'Share and discover healthy Kenyan recipes',
      icon: 'restaurant',
      color: 'bg-green-500',
    },
    {
      title: 'Challenges',
      description: 'Participate in community fitness challenges',
      icon: 'flame',
      color: 'bg-red-500',
    },
  ];

  const recentPosts = [
    {
      user: 'John K.',
      location: 'Nairobi',
      content: 'Just completed my first month! Gained 3kg 💪',
      likes: 24,
      comments: 5,
      time: '2h ago',
    },
    {
      user: 'Mary W.',
      location: 'Mombasa',
      content: 'Looking for workout partners in Mombasa area',
      likes: 12,
      comments: 8,
      time: '5h ago',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-700 pt-12 pb-8 px-6">
        <Text className="text-white text-3xl font-bold mb-2">
          Community 🤝
        </Text>
        <Text className="text-green-100 text-base">
          Connect with fellow fitness enthusiasts
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mt-6">
        <View className="bg-white rounded-xl flex-row items-center px-4 py-3 shadow-sm">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search community..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-gray-800"
          />
        </View>
      </View>

      {/* Community Features */}
      <View className="px-6 mt-6">
        <Text className="text-gray-800 text-lg font-semibold mb-4">
          Explore
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {communityFeatures.map((feature, index) => (
            <TouchableOpacity key={index} className="w-[48%] mb-4">
              <View className="bg-white rounded-xl p-4 shadow-sm">
                <View className={`${feature.color} rounded-full p-3 self-start`}>
                  <Ionicons name={feature.icon as any} size={24} color="white" />
                </View>
                <Text className="text-gray-800 text-base font-semibold mt-3">
                  {feature.title}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">
                  {feature.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Posts */}
      <View className="px-6 mt-6 mb-8">
        <Text className="text-gray-800 text-lg font-semibold mb-4">
          Recent Posts
        </Text>
        {recentPosts.map((post, index) => (
          <View key={index} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="bg-green-600 rounded-full w-10 h-10 items-center justify-center">
                <Text className="text-white font-bold">
                  {post.user.charAt(0)}
                </Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-800 font-semibold">{post.user}</Text>
                <Text className="text-gray-500 text-xs">
                  {post.location} • {post.time}
                </Text>
              </View>
            </View>
            <Text className="text-gray-700 mb-3">{post.content}</Text>
            <View className="flex-row items-center pt-3 border-t border-gray-100">
              <TouchableOpacity className="flex-row items-center mr-6">
                <Ionicons name="heart-outline" size={20} color="#6B7280" />
                <Text className="text-gray-600 ml-2">{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
                <Text className="text-gray-600 ml-2">{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Create Post Button */}
        <TouchableOpacity className="bg-green-600 rounded-xl py-4 items-center mt-2">
          <View className="flex-row items-center">
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text className="text-white font-semibold ml-2">
              Share Your Progress
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CommunityScreen;

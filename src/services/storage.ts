import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage utility service for the Kenya Weight & Muscle Gain App
 * Provides helper functions for storing and retrieving data locally
 */

// Storage keys - centralized for easy management
export const STORAGE_KEYS = {
  USER_PROFILE: '@user_profile',
  WORKOUT_HISTORY: '@workout_history',
  MEAL_PLANS: '@meal_plans',
  PROGRESS_DATA: '@progress_data',
  SETTINGS: '@settings',
};

/**
 * Save data to AsyncStorage
 * @param key - Storage key
 * @param value - Data to store (will be JSON stringified)
 * @returns Promise<boolean> - Success status
 */
export const saveData = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
    return false;
  }
};

/**
 * Retrieve data from AsyncStorage
 * @param key - Storage key
 * @returns Promise<T | null> - Retrieved data or null if not found
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param key - Storage key
 * @returns Promise<boolean> - Success status
 */
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data for key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all data from AsyncStorage
 * @returns Promise<boolean> - Success status
 */
export const clearAll = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Get all keys from AsyncStorage
 * @returns Promise<string[]> - Array of all storage keys
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Check if a key exists in AsyncStorage
 * @param key - Storage key
 * @returns Promise<boolean> - True if key exists
 */
export const hasKey = async (key: string): Promise<boolean> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    console.error(`Error checking if key "${key}" exists:`, error);
    return false;
  }
};

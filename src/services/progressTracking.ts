import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressEntry, WeightDataPoint, NutritionDataPoint } from '../types/progress.types';
import { getDailyNutrition } from './mealTracking';

/**
 * Progress Tracking Service
 * Handles weight, measurements, and photo tracking
 */

const PROGRESS_ENTRIES_KEY = '@progress_entries';

/**
 * Save a new progress entry
 */
export const saveProgressEntry = async (entry: Omit<ProgressEntry, 'id' | 'timestamp'>): Promise<boolean> => {
  try {
    const entries = await getAllProgressEntries();
    
    const newEntry: ProgressEntry = {
      ...entry,
      id: `progress_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    entries.unshift(newEntry); // Add to beginning
    await AsyncStorage.setItem(PROGRESS_ENTRIES_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving progress entry:', error);
    return false;
  }
};

/**
 * Get all progress entries
 */
export const getAllProgressEntries = async (): Promise<ProgressEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_ENTRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting progress entries:', error);
    return [];
  }
};

/**
 * Get latest progress entry
 */
export const getLatestEntry = async (): Promise<ProgressEntry | null> => {
  try {
    const entries = await getAllProgressEntries();
    return entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error getting latest entry:', error);
    return null;
  }
};

/**
 * Get weight history for graphs
 */
export const getWeightHistory = async (days: number = 30): Promise<WeightDataPoint[]> => {
  try {
    const entries = await getAllProgressEntries();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return entries
      .filter((entry) => new Date(entry.date) >= cutoffDate)
      .map((entry) => ({
        date: entry.date,
        weight: entry.weight,
      }))
      .reverse(); // Oldest first for chart
  } catch (error) {
    console.error('Error getting weight history:', error);
    return [];
  }
};

/**
 * Get nutrition trends for graphs
 */
export const getNutritionTrends = async (days: number = 7): Promise<NutritionDataPoint[]> => {
  try {
    const trends: NutritionDataPoint[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const dailyNutrition = await getDailyNutrition(dateString);
      
      trends.push({
        date: dateString,
        calories: dailyNutrition?.totalNutrition?.calories || 0,
        protein: dailyNutrition?.totalNutrition?.protein || 0,
      });
    }

    return trends;
  } catch (error) {
    console.error('Error getting nutrition trends:', error);
    return [];
  }
};

/**
 * Delete a progress entry
 */
export const deleteProgressEntry = async (id: string): Promise<boolean> => {
  try {
    const entries = await getAllProgressEntries();
    const filtered = entries.filter((entry) => entry.id !== id);
    await AsyncStorage.setItem(PROGRESS_ENTRIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    return false;
  }
};

/**
 * Update an existing progress entry
 */
export const updateProgressEntry = async (id: string, updates: Partial<ProgressEntry>): Promise<boolean> => {
  try {
    const entries = await getAllProgressEntries();
    const index = entries.findIndex((entry) => entry.id === id);
    
    if (index === -1) return false;

    entries[index] = { ...entries[index], ...updates };
    await AsyncStorage.setItem(PROGRESS_ENTRIES_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error updating progress entry:', error);
    return false;
  }
};

/**
 * Get progress statistics
 */
export const getProgressStats = async () => {
  try {
    const entries = await getAllProgressEntries();
    
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        weightGained: 0,
        daysTracked: 0,
        startWeight: 0,
        currentWeight: 0,
      };
    }

    const latest = entries[0];
    const oldest = entries[entries.length - 1];
    const weightGained = latest.weight - oldest.weight;
    
    // Calculate unique days tracked
    const uniqueDates = new Set(entries.map((e) => e.date.split('T')[0]));
    const daysTracked = uniqueDates.size;

    return {
      totalEntries: entries.length,
      weightGained: Number(weightGained.toFixed(1)),
      daysTracked,
      startWeight: oldest.weight,
      currentWeight: latest.weight,
    };
  } catch (error) {
    console.error('Error getting progress stats:', error);
    return {
      totalEntries: 0,
      weightGained: 0,
      daysTracked: 0,
      startWeight: 0,
      currentWeight: 0,
    };
  }
};

/**
 * Clear all progress data
 */
export const clearAllProgress = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(PROGRESS_ENTRIES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
};

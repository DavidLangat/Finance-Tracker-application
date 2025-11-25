import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompletedWorkout, WorkoutSession, WorkoutStats } from '../types/workout.types';
import { STORAGE_KEYS } from './storage';

/**
 * Workout Tracking Service
 * Handles saving, retrieving, and analyzing workout data
 */

// Storage key for completed workouts
const COMPLETED_WORKOUTS_KEY = '@completed_workouts';
const WORKOUT_SESSIONS_KEY = '@workout_sessions';

/**
 * Save a completed workout
 */
export const saveCompletedWorkout = async (
  exerciseId: string,
  exerciseName: string,
  sets: number,
  reps: number | string,
  duration?: number,
  notes?: string
): Promise<boolean> => {
  try {
    const workout: CompletedWorkout = {
      id: `workout_${Date.now()}`,
      exerciseId,
      exerciseName,
      date: new Date().toISOString(),
      setsCompleted: sets,
      repsCompleted: reps,
      duration,
      notes,
    };

    // Get existing workouts
    const existingData = await AsyncStorage.getItem(COMPLETED_WORKOUTS_KEY);
    const workouts: CompletedWorkout[] = existingData ? JSON.parse(existingData) : [];

    // Add new workout
    workouts.push(workout);

    // Save back to storage
    await AsyncStorage.setItem(COMPLETED_WORKOUTS_KEY, JSON.stringify(workouts));
    return true;
  } catch (error) {
    console.error('Error saving completed workout:', error);
    return false;
  }
};

/**
 * Get all completed workouts
 */
export const getAllCompletedWorkouts = async (): Promise<CompletedWorkout[]> => {
  try {
    const data = await AsyncStorage.getItem(COMPLETED_WORKOUTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting completed workouts:', error);
    return [];
  }
};

/**
 * Get workout history for a date range
 */
export const getWorkoutHistory = async (
  startDate: Date,
  endDate: Date
): Promise<CompletedWorkout[]> => {
  try {
    const allWorkouts = await getAllCompletedWorkouts();
    return allWorkouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startDate && workoutDate <= endDate;
    });
  } catch (error) {
    console.error('Error getting workout history:', error);
    return [];
  }
};

/**
 * Get today's completed workouts
 */
export const getTodayCompletedWorkouts = async (): Promise<CompletedWorkout[]> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await getWorkoutHistory(today, tomorrow);
  } catch (error) {
    console.error('Error getting today\'s workouts:', error);
    return [];
  }
};

// Alias for backward compatibility if needed, or we can update callsites
export const getTodayWorkouts = getTodayCompletedWorkouts;

/**
 * Get this week's completed workouts
 */
export const getWeeklyWorkouts = async (): Promise<CompletedWorkout[]> => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return await getWorkoutHistory(startOfWeek, endOfWeek);
  } catch (error) {
    console.error('Error getting weekly workouts:', error);
    return [];
  }
};

/**
 * Check if an exercise was completed today
 */
export const isExerciseCompletedToday = async (exerciseId: string): Promise<boolean> => {
  try {
    const todayWorkouts = await getTodayWorkouts();
    return todayWorkouts.some((workout) => workout.exerciseId === exerciseId);
  } catch (error) {
    console.error('Error checking if exercise completed today:', error);
    return false;
  }
};

/**
 * Get workout streak (consecutive days with workouts)
 */
export const getWorkoutStreak = async (): Promise<number> => {
  try {
    const allWorkouts = await getAllCompletedWorkouts();
    if (allWorkouts.length === 0) return 0;

    // Sort workouts by date (newest first)
    const sortedWorkouts = allWorkouts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Get unique workout dates
    const uniqueDates = new Set(
      sortedWorkouts.map((w) => new Date(w.date).toDateString())
    );
    const dateArray = Array.from(uniqueDates).map((d) => new Date(d));

    // Check for consecutive days
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dateArray.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const hasWorkout = dateArray.some(
        (d) => d.toDateString() === checkDate.toDateString()
      );

      if (hasWorkout) {
        streak++;
      } else if (i > 0) {
        // If we miss a day (and it's not today), break the streak
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error calculating workout streak:', error);
    return 0;
  }
};

/**
 * Get workout statistics
 */
export const getWorkoutStats = async (): Promise<WorkoutStats> => {
  try {
    const allWorkouts = await getAllCompletedWorkouts();
    const currentStreak = await getWorkoutStreak();

    // Count unique workout days for longest streak
    const uniqueDates = new Set(
      allWorkouts.map((w) => new Date(w.date).toDateString())
    );

    // Find most frequent exercise
    const exerciseCounts: { [key: string]: number } = {};
    allWorkouts.forEach((workout) => {
      exerciseCounts[workout.exerciseName] =
        (exerciseCounts[workout.exerciseName] || 0) + 1;
    });

    const favoriteExercise =
      Object.keys(exerciseCounts).length > 0
        ? Object.keys(exerciseCounts).reduce((a, b) =>
            (exerciseCounts[a] || 0) > (exerciseCounts[b] || 0) ? a : b
          )
        : undefined;

    // Calculate total minutes
    const totalMinutes = allWorkouts.reduce((sum, workout) => {
      return sum + (workout.duration || 0);
    }, 0);

    return {
      totalWorkouts: uniqueDates.size,
      totalExercises: allWorkouts.length,
      currentStreak,
      longestStreak: currentStreak, // Simplified - could track separately
      favoriteExercise,
      totalMinutes: Math.round(totalMinutes / 60),
    };
  } catch (error) {
    console.error('Error getting workout stats:', error);
    return {
      totalWorkouts: 0,
      totalExercises: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalMinutes: 0,
    };
  }
};

/**
 * Get workouts by exercise ID
 */
export const getWorkoutsByExercise = async (
  exerciseId: string
): Promise<CompletedWorkout[]> => {
  try {
    const allWorkouts = await getAllCompletedWorkouts();
    return allWorkouts.filter((workout) => workout.exerciseId === exerciseId);
  } catch (error) {
    console.error('Error getting workouts by exercise:', error);
    return [];
  }
};

/**
 * Delete a completed workout
 */
export const deleteCompletedWorkout = async (workoutId: string): Promise<boolean> => {
  try {
    const allWorkouts = await getAllCompletedWorkouts();
    const filtered = allWorkouts.filter((w) => w.id !== workoutId);
    await AsyncStorage.setItem(COMPLETED_WORKOUTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting workout:', error);
    return false;
  }
};

/**
 * Clear all workout data
 */
export const clearAllWorkouts = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(COMPLETED_WORKOUTS_KEY);
    await AsyncStorage.removeItem(WORKOUT_SESSIONS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing workouts:', error);
    return false;
  }
};

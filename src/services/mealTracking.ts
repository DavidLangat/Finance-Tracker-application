import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MealLog,
  LoggedFood,
  DailyNutrition,
  NutritionInfo,
  NutritionGoals,
  MealType,
} from '../types/nutrition.types';

/**
 * Meal Tracking Service
 * Handles saving, retrieving, and analyzing meal data
 */

const MEAL_LOGS_KEY = '@meal_logs';
const NUTRITION_GOALS_KEY = '@nutrition_goals';

// Default nutrition goals for muscle gain
const DEFAULT_GOALS: NutritionGoals = {
  calories: 2500,
  protein: 150,
  carbs: 300,
  fat: 70,
};

/**
 * Save a meal log
 */
export const saveMealLog = async (
  mealType: MealType,
  foods: LoggedFood[],
  notes?: string
): Promise<boolean> => {
  try {
    const totalNutrition = calculateTotalNutrition(foods);

    const mealLog: MealLog = {
      id: `meal_${Date.now()}`,
      mealType,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      timestamp: new Date().toISOString(),
      foods,
      totalNutrition,
      notes,
    };

    const existingData = await AsyncStorage.getItem(MEAL_LOGS_KEY);
    const meals: MealLog[] = existingData ? JSON.parse(existingData) : [];

    meals.push(mealLog);

    await AsyncStorage.setItem(MEAL_LOGS_KEY, JSON.stringify(meals));
    return true;
  } catch (error) {
    console.error('Error saving meal log:', error);
    return false;
  }
};

/**
 * Get all meal logs
 */
export const getAllMealLogs = async (): Promise<MealLog[]> => {
  try {
    const data = await AsyncStorage.getItem(MEAL_LOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting meal logs:', error);
    return [];
  }
};

/**
 * Get today's meals
 */
export const getTodayMeals = async (): Promise<MealLog[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const allMeals = await getAllMealLogs();
    return allMeals.filter((meal) => meal.date === today);
  } catch (error) {
    console.error('Error getting today\'s meals:', error);
    return [];
  }
};

/**
 * Get meals for a specific date
 */
export const getMealsByDate = async (date: string): Promise<MealLog[]> => {
  try {
    const allMeals = await getAllMealLogs();
    return allMeals.filter((meal) => meal.date === date);
  } catch (error) {
    console.error('Error getting meals by date:', error);
    return [];
  }
};

/**
 * Get daily nutrition summary
 */
export const getDailyNutrition = async (date?: string): Promise<DailyNutrition> => {
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const meals = await getMealsByDate(targetDate);
    const goals = await getNutritionGoals();

    const totalNutrition: NutritionInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    meals.forEach((meal) => {
      totalNutrition.calories += meal.totalNutrition.calories;
      totalNutrition.protein += meal.totalNutrition.protein;
      totalNutrition.carbs += meal.totalNutrition.carbs;
      totalNutrition.fat += meal.totalNutrition.fat;
    });

    // Round to 1 decimal place
    totalNutrition.protein = Math.round(totalNutrition.protein * 10) / 10;
    totalNutrition.carbs = Math.round(totalNutrition.carbs * 10) / 10;
    totalNutrition.fat = Math.round(totalNutrition.fat * 10) / 10;

    return {
      date: targetDate,
      meals,
      totalNutrition,
      goalNutrition: goals,
    };
  } catch (error) {
    console.error('Error getting daily nutrition:', error);
    return {
      date: date || new Date().toISOString().split('T')[0],
      meals: [],
      totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      goalNutrition: DEFAULT_GOALS,
    };
  }
};

/**
 * Calculate total nutrition from logged foods
 */
export const calculateTotalNutrition = (foods: LoggedFood[]): NutritionInfo => {
  const total: NutritionInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  foods.forEach((food) => {
    total.calories += food.nutrition.calories;
    total.protein += food.nutrition.protein;
    total.carbs += food.nutrition.carbs;
    total.fat += food.nutrition.fat;
  });

  // Round to 1 decimal place
  total.protein = Math.round(total.protein * 10) / 10;
  total.carbs = Math.round(total.carbs * 10) / 10;
  total.fat = Math.round(total.fat * 10) / 10;

  return total;
};

/**
 * Get nutrition goals
 */
export const getNutritionGoals = async (): Promise<NutritionGoals> => {
  try {
    const data = await AsyncStorage.getItem(NUTRITION_GOALS_KEY);
    return data ? JSON.parse(data) : DEFAULT_GOALS;
  } catch (error) {
    console.error('Error getting nutrition goals:', error);
    return DEFAULT_GOALS;
  }
};

/**
 * Set nutrition goals
 */
export const setNutritionGoals = async (goals: NutritionGoals): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(NUTRITION_GOALS_KEY, JSON.stringify(goals));
    return true;
  } catch (error) {
    console.error('Error setting nutrition goals:', error);
    return false;
  }
};

/**
 * Delete a meal log
 */
export const deleteMealLog = async (mealId: string): Promise<boolean> => {
  try {
    const allMeals = await getAllMealLogs();
    const filtered = allMeals.filter((meal) => meal.id !== mealId);
    await AsyncStorage.setItem(MEAL_LOGS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting meal log:', error);
    return false;
  }
};

/**
 * Update a meal log
 */
export const updateMealLog = async (
  mealId: string,
  foods: LoggedFood[],
  notes?: string
): Promise<boolean> => {
  try {
    const allMeals = await getAllMealLogs();
    const mealIndex = allMeals.findIndex((meal) => meal.id === mealId);

    if (mealIndex === -1) return false;

    allMeals[mealIndex].foods = foods;
    allMeals[mealIndex].totalNutrition = calculateTotalNutrition(foods);
    if (notes !== undefined) {
      allMeals[mealIndex].notes = notes;
    }

    await AsyncStorage.setItem(MEAL_LOGS_KEY, JSON.stringify(allMeals));
    return true;
  } catch (error) {
    console.error('Error updating meal log:', error);
    return false;
  }
};

/**
 * Get weekly nutrition data
 */
export const getWeeklyNutrition = async (): Promise<DailyNutrition[]> => {
  try {
    const weekData: DailyNutrition[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const dailyData = await getDailyNutrition(dateString);
      weekData.push(dailyData);
    }

    return weekData;
  } catch (error) {
    console.error('Error getting weekly nutrition:', error);
    return [];
  }
};

/**
 * Clear all meal logs
 */
export const clearAllMealLogs = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(MEAL_LOGS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing meal logs:', error);
    return false;
  }
};

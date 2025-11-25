import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeeklyMealPlan, DailyMealPlan, PlannedMeal } from '../types/nutrition.types';
import { MEAL_PLANS, getTodayMealsFromPlan } from '../data/mealPlans.data';

/**
 * Meal Plan Service
 * Handles meal plan selection and management
 */

const ACTIVE_MEAL_PLAN_KEY = '@active_meal_plan';
const SETUP_COMPLETE_KEY = '@setup_complete';

/**
 * Save selected meal plan
 */
export const saveMealPlan = async (planId: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(ACTIVE_MEAL_PLAN_KEY, planId);
    return true;
  } catch (error) {
    console.error('Error saving meal plan:', error);
    return false;
  }
};

/**
 * Get active meal plan
 */
export const getActiveMealPlan = async (): Promise<WeeklyMealPlan | null> => {
  try {
    const planId = await AsyncStorage.getItem(ACTIVE_MEAL_PLAN_KEY);
    if (!planId) return null;

    const plan = MEAL_PLANS.find((p) => p.id === planId);
    return plan || null;
  } catch (error) {
    console.error('Error getting active meal plan:', error);
    return null;
  }
};

/**
 * Get today's planned meals
 */
export const getTodayPlannedMeals = async (): Promise<DailyMealPlan | null> => {
  try {
    const plan = await getActiveMealPlan();
    if (!plan) return null;

    const todayMeals = getTodayMealsFromPlan(plan);
    return todayMeals || null;
  } catch (error) {
    console.error('Error getting today\'s planned meals:', error);
    return null;
  }
};

/**
 * Check if setup is complete
 */
export const isSetupComplete = async (): Promise<boolean> => {
  try {
    const complete = await AsyncStorage.getItem(SETUP_COMPLETE_KEY);
    return complete === 'true';
  } catch (error) {
    console.error('Error checking setup status:', error);
    return false;
  }
};

/**
 * Mark setup as complete
 */
export const completeSetup = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(SETUP_COMPLETE_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Error completing setup:', error);
    return false;
  }
};

/**
 * Change meal plan
 */
export const changeMealPlan = async (planId: string): Promise<boolean> => {
  return await saveMealPlan(planId);
};

/**
 * Get all available meal plans
 */
export const getAllMealPlans = () => {
  return MEAL_PLANS;
};

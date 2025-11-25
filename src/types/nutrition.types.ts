// TypeScript types for the Nutrition & Food module

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
export type FoodCategory = 'Staples' | 'Proteins' | 'Vegetables' | 'Fruits' | 'Snacks' | 'Beverages';

export interface NutritionInfo {
  calories: number; // kcal per 100g
  protein: number; // grams per 100g
  carbs: number; // grams per 100g
  fat: number; // grams per 100g
}

export interface ServingSize {
  name: string; // e.g., "1 cup", "1 piece", "100g"
  grams: number; // weight in grams
}

export interface FoodItem {
  id: string;
  name: string;
  nameSwahili?: string;
  category: FoodCategory;
  nutrition: NutritionInfo; // per 100g
  servingSizes: ServingSize[];
  defaultServing: number; // index of default serving size
  description?: string;
  preparationNotes?: string;
}

export interface LoggedFood {
  foodId: string;
  foodName: string;
  servingSize: ServingSize;
  quantity: number; // multiplier for serving size
  nutrition: NutritionInfo; // calculated for this portion
}

export interface MealLog {
  id: string;
  mealType: MealType;
  date: string; // ISO date string
  timestamp: string; // ISO timestamp
  foods: LoggedFood[];
  totalNutrition: NutritionInfo;
  notes?: string;
}

export interface DailyNutrition {
  date: string;
  meals: MealLog[];
  totalNutrition: NutritionInfo;
  goalNutrition: NutritionGoals;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface WeeklyNutrition {
  startDate: string;
  endDate: string;
  dailyData: DailyNutrition[];
  averageNutrition: NutritionInfo;
}

// Meal Plan Types
export interface PlannedMeal {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyMealPlan {
  day: string;
  breakfast: PlannedMeal;
  lunch: PlannedMeal;
  snack: PlannedMeal;
  dinner: PlannedMeal;
}

export interface WeeklyMealPlan {
  id: string;
  name: string;
  goal: string;
  duration: string;
  dailyCalories: number;
  meals: DailyMealPlan[];
}

// Navigation types for meal stack
export type MealStackParamList = {
  MealHub: undefined;
  FoodSearch: { mealType?: MealType };
  MealLog: { mealType: MealType; selectedFoods?: LoggedFood[] };
  DailySummary: undefined;
  WeeklyMealPlan: undefined;
  MealPlanSetup: undefined;
};

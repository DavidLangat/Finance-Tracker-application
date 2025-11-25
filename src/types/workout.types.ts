// TypeScript types for the Home Workout module

export type ExerciseCategory = 'Strength' | 'Cardio' | 'Flexibility';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type EquipmentType = 'None' | 'Household Items';

export interface Exercise {
  id?: string; // Optional because plan exercises might not have IDs initially
  name: string;
  description: string;
  category: string;
  difficulty: string;
  equipment: string;
  equipmentDetails?: string;
  sets?: number;
  reps?: number | string;
  duration?: string;
  videoUrl?: string;
  imageUrl?: string;
  targetMuscles: string[];
  instructions: string[];
  tips?: string[];
}

export interface WorkoutDay {
  day: string;
  focus: string;
  instructions?: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  target: string;
  goal: string;
  equipment: string;
  duration: string;
  days: WorkoutDay[];
}

export interface CompletedWorkout {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: string; // ISO date string
  setsCompleted: number;
  repsCompleted: number | string;
  duration?: number; // in seconds
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: CompletedWorkout[];
  totalDuration: number; // in minutes
  caloriesBurned?: number;
}

export interface DailySchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  exerciseIds: string[];
  isRestDay: boolean;
}

export interface WeeklySchedule {
  id: string;
  name: string;
  days: DailySchedule[];
  startDate?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalExercises: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExercise?: string;
  totalMinutes: number;
}

// Navigation types for workout stack
export type WorkoutStackParamList = {
  WorkoutList: undefined;
  ExerciseDetail: { exerciseId: string };
  WorkoutSchedule: undefined;
};

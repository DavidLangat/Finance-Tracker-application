// TypeScript types for the Progress Tracking module

export interface Measurements {
  chest?: number; // cm
  leftArm?: number; // cm
  rightArm?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  leftThigh?: number; // cm
  rightThigh?: number; // cm
  leftCalf?: number; // cm
  rightCalf?: number; // cm
}

export type PhotoType = 'front' | 'side' | 'back';

export interface ProgressPhoto {
  id: string;
  uri: string;
  date: string; // ISO date string
  type: PhotoType;
}

export interface ProgressEntry {
  id: string;
  date: string; // ISO date string
  timestamp: string; // ISO timestamp
  weight: number; // kg
  measurements: Measurements;
  photos: ProgressPhoto[];
  notes?: string;
}

export interface WeightDataPoint {
  date: string;
  weight: number;
}

export interface NutritionDataPoint {
  date: string;
  calories: number;
  protein: number;
}

export type DateRange = '7days' | '30days' | '90days' | 'all';

// Navigation types for progress stack
export type ProgressStackParamList = {
  ProgressHub: undefined;
  AddProgress: undefined;
  Graphs: undefined;
  History: undefined;
  PhotoGallery: undefined;
};

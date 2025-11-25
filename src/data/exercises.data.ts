import { Exercise, WorkoutDay, WorkoutPlan } from '../types/workout.types';

// 7-Day Home Workout Plan for Weight & Muscle Gain
// Target: Men | Equipment: None (Bodyweight) | Goal: Increase weight and muscle

export const WORKOUT_PLAN: WorkoutPlan = {
  target: "Men",
  goal: "Increase weight and muscle",
  equipment: "None",
  duration: "7 days",
  days: [
    {
      day: "Monday",
      focus: "Full Body Strength",
      exercises: [
        {
          name: "Push-ups",
          description: "Classic upper body exercise targeting chest, shoulders, and triceps",
          category: "Strength",
          difficulty: "Beginner",
          equipment: "None",
          sets: 4,
          reps: 15,
          videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
          imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
          instructions: [
            "Start in a plank position with hands shoulder-width apart",
            "Lower your body until chest nearly touches the floor",
            "Keep your core tight and back straight",
            "Push back up to starting position",
            "Repeat for the set reps"
          ],
          tips: [
            "Keep elbows at a 45-degree angle",
            "Breathe in while lowering, breathe out when pushing",
            "If needed, perform on your knees for support"
          ]
        },
        {
          name: "Bodyweight Squats",
          description: "Lower body exercise for quads, glutes, and hamstrings",
          category: "Strength",
          difficulty: "Beginner",
          equipment: "None",
          sets: 4,
          reps: 20,
          videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U",
          imageUrl: "https://images.unsplash.com/photo-1574680096141-1cddd32e0807?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
          instructions: [
            "Stand with feet shoulder-width apart",
            "Lower your hips back and down",
            "Keep chest up and back straight",
            "Push through your heels to stand back up"
          ],
          tips: [
            "Do not let knees cave inward",
            "Go as low as comfortable",
            "Control the movement"
          ]
        },
        {
          name: "Glute Bridges",
          description: "Strengthens glutes and hamstrings",
          category: "Strength",
          difficulty: "Beginner",
          equipment: "None",
          sets: 4,
          reps: 20,
          videoUrl: "https://www.youtube.com/watch?v=m2Zx-57cSok",
          imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Glutes", "Hamstrings", "Core"],
          instructions: [
            "Lie on your back with knees bent",
            "Lift hips toward the ceiling",
            "Squeeze your glutes at the top",
            "Lower down slowly"
          ],
          tips: [
            "Keep core tight",
            "Don't overarch your lower back"
          ]
        }
      ]
    },
    {
      day: "Tuesday",
      focus: "Chest + Shoulders + Triceps",
      exercises: [
        {
          name: "Wide Push-ups",
          description: "Push-up variation targeting outer chest and shoulders",
          category: "Strength",
          difficulty: "Beginner",
          equipment: "None",
          sets: 4,
          reps: 12,
          videoUrl: "https://www.youtube.com/watch?v=J0DnG1_S92I",
          imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Chest", "Shoulders", "Triceps"],
          instructions: [
            "Place hands wider than shoulder-width",
            "Lower your chest toward the ground",
            "Push back up to starting position"
          ],
          tips: [
            "Keep your core tight",
            "Don't flare elbows excessively"
          ]
        },
        {
          name: "Pike Push-ups",
          description: "Bodyweight shoulder press alternative",
          category: "Strength",
          difficulty: "Intermediate",
          equipment: "None",
          sets: 3,
          reps: 10,
          videoUrl: "https://www.youtube.com/watch?v=F-f5wQbOYtg",
          imageUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Shoulders", "Triceps", "Upper Chest"],
          instructions: [
            "Start in a pike position with hips raised",
            "Lower head toward the ground",
            "Push back up using shoulders"
          ],
          tips: [
            "Keep hips high",
            "Move slowly for control"
          ]
        }
      ]
    },
    {
      day: "Wednesday",
      focus: "Leg Day",
      exercises: [
        {
          name: "Lunges",
          description: "Lower-body strength exercise for legs and glutes",
          category: "Strength",
          difficulty: "Beginner",
          equipment: "None",
          sets: 4,
          reps: "12 each leg",
          videoUrl: "https://www.youtube.com/watch?v=QOVaaNiyQ5Y",
          imageUrl: "https://images.unsplash.com/photo-1434608519386-b7126c79c50e?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Quads", "Glutes", "Hamstrings"],
          instructions: [
            "Step forward with one leg",
            "Lower until both knees are at 90 degrees",
            "Push back to starting position"
          ],
          tips: [
            "Keep chest up",
            "Do not let the front knee pass toes"
          ]
        }
      ]
    },
    {
      day: "Thursday",
      focus: "Core & Stability",
      exercises: [
        {
          name: "Plank",
          description: "Core strengthening hold",
          category: "Stability",
          difficulty: "Beginner",
          equipment: "None",
          sets: 3,
          duration: "45 seconds",
          videoUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
          imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Core", "Shoulders", "Glutes"],
          instructions: [
            "Stay in a straight line from head to heels",
            "Engage core muscles",
            "Do not let hips drop"
          ],
          tips: [
            "Breathe steadily",
            "Keep your back flat"
          ]
        }
      ]
    },
    {
      day: "Friday",
      focus: "Full Body Hypertrophy",
      exercises: [
        {
          name: "Decline Push-ups",
          description: "Push-up variation that targets upper chest",
          category: "Strength",
          difficulty: "Intermediate",
          equipment: "Chair",
          sets: 4,
          reps: 12,
          videoUrl: "https://www.youtube.com/watch?v=SKPab2YC8BE",
          imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Upper Chest", "Shoulders", "Triceps"],
          instructions: [
            "Place feet on a raised surface",
            "Lower chest toward the ground",
            "Push back up with control"
          ],
          tips: [
            "Maintain a straight body line",
            "Control the descent"
          ]
        }
      ]
    },
    {
      day: "Saturday",
      focus: "Active Recovery",
      instructions: "Light movement to loosen muscles",
      exercises: [
        {
          name: "Light Jog or Walk",
          description: "Low-intensity cardio for recovery",
          category: "Cardio",
          difficulty: "Beginner",
          equipment: "None",
          duration: "10-20 minutes",
          imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Legs", "Cardiovascular System"],
          instructions: [
            "Move at a comfortable pace",
            "Focus on breathing",
            "Keep it light and easy"
          ],
          tips: [
            "Don't push hard",
            "This is for recovery, not intensity"
          ]
        },
        {
          name: "Stretching",
          description: "Full body stretching routine",
          category: "Flexibility",
          difficulty: "Beginner",
          equipment: "None",
          duration: "10 minutes",
          imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
          targetMuscles: ["Full Body"],
          instructions: [
            "Hold each stretch for 20-30 seconds",
            "Focus on major muscle groups",
            "Breathe deeply"
          ],
          tips: [
            "Don't bounce",
            "Stretch to mild discomfort, not pain"
          ]
        }
      ]
    },
    {
      day: "Sunday",
      focus: "Rest",
      instructions: "Complete rest & eat high-protein meals",
      exercises: []
    }
  ]
};

// Helper function to get today's workout
export const getTodayWorkout = (): WorkoutDay | null => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return WORKOUT_PLAN.days.find((day) => day.day === today) || null;
};

// Helper function to get workout by day name
export const getWorkoutByDay = (dayName: string): WorkoutDay | null => {
  return WORKOUT_PLAN.days.find((day) => day.day === dayName) || null;
};

// Get all workout days
export const getAllWorkoutDays = (): WorkoutDay[] => {
  return WORKOUT_PLAN.days;
};

// Helper to get exercise by name (acting as ID)
export const getExerciseByName = (name: string): Exercise | undefined => {
  for (const day of WORKOUT_PLAN.days) {
    if (day.exercises) {
      const found = day.exercises.find((ex) => ex.name === name);
      if (found) return found;
    }
  }
  return undefined;
};

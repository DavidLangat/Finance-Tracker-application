# Kenya Weight & Muscle Gain App 🇰🇪

A React Native mobile application built with Expo to help Kenyans track their weight gain and muscle building journey.

## Tech Stack

- **Framework**: Expo + React Native
- **Navigation**: React Navigation (Bottom Tabs)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Storage**: AsyncStorage for local data persistence
- **Language**: TypeScript

## Project Structure

```
meal/
├── App.tsx                      # Root application component
├── src/
│   ├── components/              # Reusable UI components (future)
│   ├── constants/
│   │   └── theme.ts            # App-wide theme constants (colors, spacing, etc.)
│   ├── navigation/
│   │   └── TabNavigator.tsx    # Bottom tab navigation configuration
│   ├── screens/                # Screen components
│   │   ├── HomeScreen.tsx      # Home dashboard with quick stats
│   │   ├── WorkoutsScreen.tsx  # Workout tracking screen
│   │   ├── MealsScreen.tsx     # Meal planning and nutrition screen
│   │   ├── ProgressScreen.tsx  # Progress tracking with charts
│   │   └── CommunityScreen.tsx # Community features and social
│   ├── services/
│   │   └── storage.ts          # AsyncStorage utility functions
│   └── types/
│       └── navigation.ts       # TypeScript navigation types
├── types/
│   └── nativewind.d.ts         # NativeWind type declarations
└── package.json
```

## Features

### 🏠 Home Screen
- Welcome message with Swahili greeting
- Quick stats overview (weight, goals, workouts, calories)
- Quick action buttons to navigate to other sections
- Motivational messages

### 💪 Workouts Screen
- Workout categories (Strength Training, Cardio, Flexibility, Custom)
- Recent workouts list
- Easy workout logging

### 🍽️ Meals Screen
- Daily nutrition tracking (Calories, Protein, Carbs, Fats)
- Meal type logging (Breakfast, Lunch, Dinner, Snacks)
- Kenyan nutrition tips
- Progress bars for nutrition goals

### 📊 Progress Screen
- Key metrics tracking (Weight, Muscle Mass, Body Fat %, BMI)
- Timeframe selector (Week, Month, 3 Months, Year)
- Progress charts (placeholder)
- Progress photos

### 🤝 Community Screen
- Community features (Success Stories, Workout Groups, Nutrition Tips, Challenges)
- Recent posts feed
- Search functionality
- Share progress with community

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## AsyncStorage Utilities

The app includes a comprehensive AsyncStorage service with the following functions:

- `saveData(key, value)` - Save data to local storage
- `getData(key)` - Retrieve data from storage
- `removeData(key)` - Remove specific data
- `clearAll()` - Clear all stored data
- `getAllKeys()` - Get all storage keys
- `hasKey(key)` - Check if a key exists

### Storage Keys

Predefined storage keys are available in `src/services/storage.ts`:
- `@user_profile` - User profile information
- `@workout_history` - Workout tracking data
- `@meal_plans` - Meal plans and nutrition data
- `@progress_data` - Progress tracking data
- `@settings` - App settings

## Theme & Styling

The app uses a Kenya-inspired color scheme:

- **Primary Green**: `#006B3F` (Kenya flag green)
- **Accent Red**: `#E74C3C` (Kenya flag red)
- **Background**: `#F8F9FA`
- **Text**: `#1A1A1A`

All colors and spacing constants are defined in `src/constants/theme.ts`.

## Navigation

The app uses React Navigation with a bottom tab navigator featuring 5 main screens:

1. **Home** - Dashboard and overview
2. **Workouts** - Workout tracking
3. **Meals** - Nutrition and meal planning
4. **Progress** - Progress tracking and analytics
5. **Community** - Social features

Each tab has custom icons that change based on active/inactive state.

## Development Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Next Steps

- [ ] Implement workout logging functionality
- [ ] Add meal tracking with Kenyan food database
- [ ] Create progress charts and analytics
- [ ] Build community features
- [ ] Add user authentication
- [ ] Implement data synchronization
- [ ] Add camera integration for progress photos
- [ ] Create workout and meal plan templates

## Contributing

This is a personal project for helping Kenyans achieve their fitness goals. Contributions and suggestions are welcome!

## License

MIT

---

**Built with ❤️ for the Kenyan fitness community** 🇰🇪

# Expo + Tailwind (NativeWind) Template

Professional Expo template with NativeWind (Tailwind), React Navigation (stack + tabs), theming with dark mode, safe areas, icons, env variables, TypeScript, ESLint and Prettier.

## Getting Started

- `npm install` or `yarn install`
- `npx expo start --web`: run in the browser
- `npx expo start --ios`: run on iOS simulator (Xcode required)
- `npx expo start --android`: run on Android emulator (Android Studio required)
- `npx expo start --tunnel`: connect physical devices over the network

### Use as a GitHub Template (recommended)

1. Mark this repository as a Template in GitHub (Settings → Template repository).
2. Click "Use this template" → "Create a new repository" to generate a fresh repo.
3. Clone your new repo and run:

   - `npm install`
   - `npm run init` to personalize the project (sets app name and slug)
   - `npx expo start`

You can also run non-interactively:

```bash
npm run init -- --name="My App" --slug=my-app
```

### Use via create-expo-app

You can initialize directly from this repository:

```bash
npx create-expo-app -t github:{your-username}/expo-tailwind my-app
```

Or publish this repo as an npm template (name it like `expo-template-tailwind`) and use:

```bash
npx create-expo-app -t expo-template-tailwind my-app
```

## Documentation

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Features

- **Navigation**: `@react-navigation/native`, stack + bottom tabs pre-wired
- **Styling**: Tailwind via NativeWind, responsive utilities, dark mode
- **Theming**: `src/theme/ThemeProvider.tsx` with toggling and Appearance sync
- **UI Kit**: Reusable `Button`, `Card`, `Input`, `Modal`, `Loader`, `ErrorState`
- **Safe Areas**: `react-native-safe-area-context` at the app root
- **Icons**: `@expo/vector-icons` with sample usage
- **Env Vars**: `react-native-dotenv` for `API_URL`, `ENV`
- **Quality**: TypeScript, ESLint, Prettier configured

## Folder Structure
This template uses an opinionated, scalable structure for feature development.

- `assets`: platform icons, splash, and favicon for web
- `src/components`: reusable UI components (e.g., buttons, headers)
- `src/features`: feature-specific screens, hooks, services, and state
- `src/hooks`: shared custom hooks
- `src/localizations`: i18n resources
- `src/navigation`: navigation setup (stacks, tabs, etc.)
- `src/services`: infrastructure such as API clients and notifications
- `src/theme`: theming, tokens, color schemes
- `src/types`: app-wide TypeScript types
- `src/utils`: general-purpose utilities

### Example feature structure

- `src/features/name-feature/api`: API clients specific to the feature
- `src/features/name-feature/helpers`: internal helpers for the feature
- `src/features/name-feature/hooks`: feature-scoped hooks
- `src/features/name-feature/screens`: screens for the feature (e.g., auth: login, signup)
- `src/features/name-feature/services`: feature-specific services (e.g., auth service)
- `src/features/name-feature/store`: state management for the feature

## TypeScript

TypeScript is enabled by default via `tsconfig.json`. The app entry is `App.tsx`.

## Tailwind / NativeWind

- Tailwind `content` includes `./app`, `./src`, and root `App.*` to ensure styles are picked up.
- Dark mode uses system Appearance (`darkMode: "media"`). Use `useThemeScheme()` or the Settings screen toggle to switch.

## Navigation

- Entry: `src/navigation/index.tsx` (stack) and `src/navigation/tabs.tsx` (tabs)
- Example screens: `Home`, `Settings`, `Details`

## Theming & Dark Mode

- Provider: `src/theme/ThemeProvider.tsx` exposes `colorScheme`, `toggleTheme`
- Tokens: `src/theme/tokens.ts` for colors/fonts
- Example toggle in `Settings` screen

## Environment Variables

- Configured via Babel plugin `module:react-native-dotenv`
- Add a `.env` file in project root:

```env
API_URL=https://api.example.com
ENV=development
```

- Usage in code: see `src/services/config.ts`

## Linting & Formatting

- ESLint: `.eslintrc.cjs`, `.eslintignore`
- Prettier: `.prettierrc`, `.prettierignore`
- Scripts: `npm run lint`, `npm run format`

## Development Notes

- After cloning, run `npm install` (or `yarn`). Then run:
  - `npm run init` to set app name/slug
  - `npm run web` or `npm run ios` / `npm run android`
- If versions mismatch, prefer `npx expo install <pkg>` to auto-resolve matching versions.

## Notes on versions

Use `npx expo install` to align package versions with your Expo SDK. Avoid manually editing React/React Native versions unless you know they match your SDK.


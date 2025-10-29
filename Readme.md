# Expo Tailwind Boilerplate

React Native project bootstrapped with Expo and NativeWind (Tailwind CSS for React Native).
This template includes a minimal webpack tweak for web builds and ships with TypeScript, dark mode, and a suggested folder structure.

## Getting Started

- `npm install` or `yarn install`
- `npx expo start --web`: run in the browser
- `npx expo start --ios`: run on iOS simulator (Xcode required)
- `npx expo start --android`: run on Android emulator (Android Studio required)
- `npx expo start --tunnel`: connect physical devices over the network

## Documentation

- [Expo Docs](https://docs.expo.dev/)

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
- Dark mode is enabled with `darkMode: "class"`. Toggle a wrapper class at the root to switch.

## Notes on versions

Use `npx expo install` to align package versions with your Expo SDK. Avoid manually editing React/React Native versions unless you know they match your SDK.


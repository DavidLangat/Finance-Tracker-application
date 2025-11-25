/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          500: "#6366f1",
          600: "#5457e0",
        },
        'deep-black': '#000000',
        'dark-charcoal': '#1C1C1E',
        'neon-green': '#00E676',
      },
    },
  },
  plugins: [],
};

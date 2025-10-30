import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeContextValue = {
  colorScheme: Exclude<ColorSchemeName, null>;
  toggleTheme: () => void;
  setTheme: (scheme: Exclude<ColorSchemeName, null>) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const system = Appearance.getColorScheme() ?? "light";
  const [colorScheme, setColorScheme] = useState<Exclude<ColorSchemeName, null>>(system);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme: scheme }) => {
      if (scheme) setColorScheme(scheme);
    });
    return () => sub.remove();
  }, []);

  const setTheme = useCallback((scheme: Exclude<ColorSchemeName, null>) => {
    setColorScheme(scheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ colorScheme, toggleTheme, setTheme }), [colorScheme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeScheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeScheme must be used within ThemeProvider");
  return ctx;
}



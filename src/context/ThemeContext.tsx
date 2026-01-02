import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "intercede-theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with saved theme or default to light
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        return (stored === "dark" || stored === "light") ? stored : "light";
      } catch (error) {
        console.warn("Failed to read theme from localStorage:", error);
        return "light";
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    try {
      if (mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};





import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = "intercede-theme";



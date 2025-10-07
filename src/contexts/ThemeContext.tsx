import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggle = () => setTheme(t => (t === "light" ? "dark" : "light"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

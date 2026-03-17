"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isNotebookOpen: boolean;
  toggleNotebook: () => void;
  isMailMagnetOpen: boolean;
  toggleMailMagnet: () => void;
  isNotificationCenterOpen: boolean;
  toggleNotificationCenter: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isMailMagnetOpen, setIsMailMagnetOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleNotebook = () => {
    setIsNotebookOpen(prev => !prev);
  };

  const toggleMailMagnet = () => {
    setIsMailMagnetOpen(prev => !prev);
  };

  const toggleNotificationCenter = () => {
    setIsNotificationCenterOpen(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isNotebookOpen, 
      toggleNotebook, 
      isMailMagnetOpen, 
      toggleMailMagnet,
      isNotificationCenterOpen,
      toggleNotificationCenter
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

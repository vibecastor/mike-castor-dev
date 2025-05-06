import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isClient: boolean;
}

// Type augmentation for window object
declare global {
  interface Window {
    toggleTheme: () => void;
    getCurrentTheme: () => "light" | "dark";
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default light theme for SSR
const defaultTheme: Theme = "light";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Always start with light theme for SSR to match initial HTML
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isClient, setIsClient] = useState(false);

  // Set client flag and listen for theme changes
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      // Get initial theme from global function
      try {
        const initialTheme = window.getCurrentTheme?.() || "light";
        setTheme(initialTheme as Theme);
      } catch (e) {
        console.error("Error getting initial theme:", e);
      }

      // Listen for theme changes from other components
      const handleThemeChange = (e: CustomEvent) => {
        setTheme(e.detail.theme);
      };

      window.addEventListener(
        "themechange",
        handleThemeChange as EventListener
      );

      return () => {
        window.removeEventListener(
          "themechange",
          handleThemeChange as EventListener
        );
      };
    }
  }, []);

  // Wrapper for the global toggleTheme function
  const toggleTheme = () => {
    if (!isClient || typeof window === "undefined") return;

    try {
      window.toggleTheme();
    } catch (e) {
      console.error("Error in theme context toggleTheme:", e);
      // Fallback toggle if global function fails
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
  };

  // Provide a stable context value
  const contextValue = {
    theme,
    toggleTheme,
    isClient,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

import React, { useEffect, useState } from "react";
import { useTheme } from "../context/theme-context";

const ThemeDebug = () => {
  const { theme, toggleTheme, isClient } = useTheme();
  const [htmlClass, setHtmlClass] = useState<string>("");

  useEffect(() => {
    if (!isClient) return;

    // Get current HTML class
    const updateHtmlClass = () => {
      const root = document.documentElement;
      setHtmlClass(root.className);
    };

    // Update on mount and when mutations occur
    updateHtmlClass();

    // Set up observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateHtmlClass();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg text-xs max-w-xs opacity-75 hover:opacity-100 transition-opacity">
      <h3 className="font-bold mb-1">Theme Debug</h3>
      <p>
        Context Theme: <span className="font-mono">{theme}</span>
      </p>
      <p>
        HTML Class: <span className="font-mono">{htmlClass}</span>
      </p>
      <p>
        Client Rendered:{" "}
        <span className="font-mono">{isClient ? "Yes" : "No"}</span>
      </p>
      <button
        onClick={toggleTheme}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeDebug;

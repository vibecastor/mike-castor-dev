import { Link } from "react-router";
import { useState, useEffect } from "react";

// Type augmentation for window object
declare global {
  interface Window {
    toggleTheme: () => void;
    getCurrentTheme: () => "light" | "dark";
  }
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  // Set client state and initial theme
  useEffect(() => {
    setIsClient(true);

    // Get initial theme
    if (typeof window !== "undefined") {
      try {
        const theme = window.getCurrentTheme?.() || "light";
        setCurrentTheme(theme);
      } catch (e) {
        console.error("Error getting theme:", e);
      }

      // Listen for theme changes
      const handleThemeChange = (e: CustomEvent) => {
        setCurrentTheme(e.detail.theme);
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

  // Handle scroll event to change header appearance (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Safely handle theme toggle (client-side only)
  const handleThemeToggle = () => {
    if (!isClient || typeof window === "undefined") return;

    try {
      // Call the global toggle function
      window.toggleTheme();
    } catch (e) {
      console.error("Error toggling theme:", e);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${
          isScrolled
            ? "h-14 bg-white/90 dark:bg-gray-950/90 backdrop-blur shadow-sm"
            : "h-16 bg-white dark:bg-gray-950"
        }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo/Name */}
        <Link
          to="/"
          className="text-xl font-bold flex items-center text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Mike Castor
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="py-1 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="py-1 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Projects
          </Link>
          <Link
            to="/blog"
            className="py-1 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Blog
          </Link>
        </nav>

        {/* Right-side controls */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle - Used with global theme state */}
          <button
            onClick={isClient ? handleThemeToggle : undefined}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label={
              isClient
                ? currentTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
                : "Theme toggle"
            }
          >
            {isClient && currentTheme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="py-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="py-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/blog"
              className="py-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

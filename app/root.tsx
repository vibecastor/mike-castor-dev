import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { ThemeProvider } from "./context/theme-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeDebug from "./components/ThemeDebug";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Prevent React from hydrating the html element
function Html({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Using a custom component prevents React from hydrating the HTML element
    <Html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Mike Castor - Full-Stack Software Engineer based in Seattle"
        />
        <meta
          name="keywords"
          content="Mike Castor, Software Engineer, Full-Stack Developer, Seattle, React, JavaScript, TypeScript"
        />
        <Meta />
        <Links />
        {/* Inline script to set the theme before any rendering happens */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // This script runs before React and sets initial theme
                // It will NOT cause hydration mismatches because React doesn't control the HTML element
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {
                // Fallback to light theme
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          {/* <ThemeDebug /> */}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        {/* Theme observer script that runs after hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // This runs after React hydration
                function updateThemeClass() {
                  try {
                    const theme = localStorage.getItem('theme');
                    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const shouldBeDark = theme === 'dark' || (!theme && prefersDark);
                    
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light');
                    console.log('Theme updated:', shouldBeDark ? 'dark' : 'light');
                  } catch (e) {
                    console.error('Error updating theme:', e);
                  }
                }
                
                // Listen for theme changes
                window.addEventListener('storage', function(e) {
                  if (e.key === 'theme') {
                    updateThemeClass();
                  }
                });
                
                // Setup system preference change listener
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                if (darkModeMediaQuery.addEventListener) {
                  darkModeMediaQuery.addEventListener('change', updateThemeClass);
                }
                
                // Create a global function that components can call to toggle theme
                window.toggleTheme = function() {
                  const theme = localStorage.getItem('theme') || 'light';
                  const newTheme = theme === 'dark' ? 'light' : 'dark';
                  localStorage.setItem('theme', newTheme);
                  updateThemeClass();
                  
                  // Dispatch an event for components to react to
                  window.dispatchEvent(new CustomEvent('themechange', {
                    detail: { theme: newTheme }
                  }));
                };
                
                // Expose theme accessor function
                window.getCurrentTheme = function() {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  return theme || (prefersDark ? 'dark' : 'light');
                };
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{message}</h1>
      <p className="mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-md">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

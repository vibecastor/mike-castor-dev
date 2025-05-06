import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

// Mock posts that will be used in browser environments
const mockPosts: BlogPost[] = [
  {
    slug: "building-modern-web-apps-with-react-router",
    title: "Building Modern Web Apps with React Router",
    date: "2023-10-15",
    tags: ["React", "JavaScript", "Web Development"],
    excerpt:
      "Exploring the power and flexibility of React Router v7 for building modern single-page applications.",
    content: `---
slug: building-modern-web-apps-with-react-router
title: Building Modern Web Apps with React Router
date: 2023-10-15
tags: ["React", "JavaScript", "Web Development"]
excerpt: Exploring the power and flexibility of React Router v7 for building modern single-page applications.
---

# Building Modern Web Apps with React Router

React Router is a powerful library that enables client-side routing in React applications. With the release of version 7, it's more powerful than ever.

## Key Features

- File-based routing
- Data loading with loaders
- Data mutations with actions
- Error handling
- And much more!

React Router provides a simple way to navigate between different views of your application. It allows you to handle URL changes and render different components based on the URL.

## Getting Started

\`\`\`jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
\`\`\`

This is just the beginning of what's possible with React Router. Stay tuned for more in-depth tutorials!`,
  },
  {
    slug: "mastering-typescript-for-frontend-development",
    title: "Mastering TypeScript for Frontend Development",
    date: "2023-09-20",
    tags: ["TypeScript", "JavaScript", "Frontend"],
    excerpt:
      "Learn how TypeScript can improve your frontend development workflow with static typing and advanced features.",
    content: `---
slug: mastering-typescript-for-frontend-development
title: Mastering TypeScript for Frontend Development
date: 2023-09-20
tags: ["TypeScript", "JavaScript", "Frontend"]
excerpt: Learn how TypeScript can improve your frontend development workflow with static typing and advanced features.
---

# Mastering TypeScript for Frontend Development

TypeScript has become an essential tool for modern frontend development. Its static typing system helps catch errors early and provides better tooling for developers.

## Why TypeScript?

- Static typing
- Better IDE support
- Improved code quality
- Easier refactoring

TypeScript is a superset of JavaScript, which means any valid JavaScript code is also valid TypeScript code. This makes it easy to gradually adopt TypeScript in existing projects.

## Basic Types

\`\`\`typescript
// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // Tuple

// Interfaces
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
\`\`\`

Stay tuned for more advanced TypeScript patterns and best practices!`,
  },
  {
    slug: "the-power-of-tailwind-css",
    title: "The Power of Tailwind CSS",
    date: "2023-08-05",
    tags: ["CSS", "Tailwind", "Web Design"],
    excerpt:
      "Discover how Tailwind CSS can revolutionize your approach to styling web applications.",
    content: `---
slug: the-power-of-tailwind-css
title: The Power of Tailwind CSS
date: 2023-08-05
tags: ["CSS", "Tailwind", "Web Design"]
excerpt: Discover how Tailwind CSS can revolutionize your approach to styling web applications.
---

# The Power of Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML. It provides low-level utility classes that let you build completely custom designs.

## Why Tailwind?

- No more naming classes
- Consistent design system
- Responsive design made easy
- Dark mode support

Tailwind's philosophy is different from traditional CSS frameworks like Bootstrap. Instead of pre-designed components, Tailwind provides utility classes that you can combine to create any design.

## Basic Example

\`\`\`html
<!-- Traditional CSS approach -->
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<!-- Tailwind approach -->
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`

Embrace the utility-first workflow and see how it can transform your development process!`,
  },
];

// Get all blog posts
export const getAllPosts = (): BlogPost[] => {
  try {
    // In browser environments or when files can't be accessed, return mock data
    return [...mockPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.warn("Error reading blog posts, falling back to mock data:", error);
    return [...mockPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
};

// Get a specific post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  try {
    // In browser environments or when files can't be accessed, return from mock data
    return mockPosts.find((post) => post.slug === slug);
  } catch (error) {
    console.warn(
      `Error fetching post with slug ${slug}, falling back to mock data:`,
      error
    );
    return mockPosts.find((post) => post.slug === slug);
  }
};

// Get latest posts (limited by count)
export const getLatestPosts = (count: number = 3): BlogPost[] => {
  return getAllPosts().slice(0, count);
};

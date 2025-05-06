export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  content?: string; // For markdown content
}

export const projects: Project[] = [
  {
    id: "civil-talk",
    slug: "civil-talk",
    title: "CivilTalk",
    description:
      "Social Emotional Learning (SEL) platform with inclusive discussion tools and resources.",
    imageUrl:
      "https://res.cloudinary.com/headliner/image/upload/v1713029057/openGraph/civiltalk_open_graph_banner_1200x630_new_3.png",
    tags: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "MUI",
      "Firebase",
      "AWS",
    ],
    liveUrl: "https://app.civiltalk.com",
    content: `# CivilTalk

## Project Overview
CivilTalk is a Social Emotional Learning (SEL) platform designed to foster inclusive discussions and provide educators with powerful tools and resources. The platform helps build a more respectful and empathetic community of learners.

## Key Features
- Real-time discussion boards
- Moderation tools
- Resource library
- Analytics dashboard
- Accessibility features

## Technical Implementation
This application was built using React and TypeScript on the frontend, with Node.js and PostgreSQL on the backend. The platform implements real-time features using WebSockets and includes a comprehensive user management system.

## Challenges and Solutions
One of the biggest challenges was implementing a moderation system that could detect and manage inappropriate content without stifling productive discussion. We solved this by developing a hybrid system using AI content analysis alongside human moderation.`,
  },
  {
    id: "whats-in-your-fridge",
    slug: "whats-in-your-fridge",
    title: "What's in Your Fridge",
    description:
      "Next.js + OpenAI application that suggests recipes based on ingredients in your fridge.",
    imageUrl: "/images/projects/fridge-app.png",
    tags: ["Next.js", "OpenAI", "Tailwind CSS", "Vercel"],
    liveUrl: "https://fridge-assistant-sigma.vercel.app/",
    githubUrl: "https://github.com/vibecastor/whats-in-your-fridge",
    content: `# What's in Your Fridge

## Project Overview
What's in Your Fridge is a web application that helps users find recipes based on ingredients they already have at home. By leveraging OpenAI's API, the application generates creative and practical recipe suggestions.

## Key Features
- Ingredient-based recipe suggestions
- Dietary preference filtering
- Recipe saving and sharing
- Mobile-responsive design

## Technical Implementation
This project was built using Next.js for the frontend and serverless functions, with OpenAI's GPT models powering the recipe generation. The UI was designed with Tailwind CSS, providing a clean and responsive interface.

## Challenges and Solutions
A significant challenge was optimizing the OpenAI API prompts to generate useful and accurate recipes while managing token usage. This was addressed by creating a carefully structured prompt system that guides the AI to provide consistent and practical recipe formats.`,
  },
];

// Function to get all projects
export const getProjects = (): Project[] => {
  console.log("getProjects called, returning", projects.length, "projects");
  return projects;
};

// Function to get a specific project by ID
export const getProjectById = (id: string): Project | undefined => {
  console.log("getProjectById called with id:", id);
  const project = projects.find((project) => project.id === id);
  console.log("getProjectById result:", project ? project.title : "Not found");
  return project;
};

// Function to get a project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  console.log("getProjectBySlug called with slug:", slug);
  console.log("Available slugs:", projects.map((p) => p.slug).join(", "));

  const project = projects.find((project) => project.slug === slug);
  console.log(
    "getProjectBySlug result:",
    project ? project.title : "Not found"
  );

  return project;
};

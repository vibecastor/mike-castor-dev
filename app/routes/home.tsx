import type { Route } from "./+types/home";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import BlogPostPreview from "../components/BlogPostPreview";
import { getProjects } from "../data/projects";
import { getLatestPosts } from "../utils/blog-utils";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mike Castor | Full-Stack Software Engineer" },
    {
      name: "description",
      content:
        "Mike Castor is a Full-Stack Software Engineer based in Seattle, WA, specializing in building elegant, performant web experiences.",
    },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  // Get featured projects (limited to 2)
  const projects = getProjects().slice(0, 2);

  // Get latest blog posts (limited to 3)
  const latestPosts = getLatestPosts(3);

  return {
    projects,
    latestPosts,
    message: context.VALUE_FROM_NETLIFY,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, latestPosts } = loaderData;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View all projects
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            <Link
              to="/blog"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              View all posts
            </Link>
          </div>

          <div className="max-w-3xl">
            {latestPosts.map((post) => (
              <BlogPostPreview key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

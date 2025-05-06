import type { Route } from "../../+types/projects";
import ProjectCard from "../../components/ProjectCard";
import { getProjects } from "../../data/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Mike Castor" },
    {
      name: "description",
      content:
        "View Mike Castor's portfolio of full-stack web development projects.",
    },
  ];
}

export function loader({}: Route.LoaderArgs) {
  const projects = getProjects();
  return { projects };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of my work across full-stack web development. Each
            project highlights different skills and technologies.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Interested in working together?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <a
            href="mailto:mike.castor@example.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}

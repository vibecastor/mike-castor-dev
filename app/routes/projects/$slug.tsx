import { Link } from "react-router";
import { marked } from "marked";
import type { ProjectRoute } from "../../+types/projects";
import { getProjectBySlug } from "../../data/projects";

export function meta({
  params,
  data,
}: {
  params: Record<string, string>;
  data: ProjectRoute.LoaderData | undefined;
}) {
  if (data?.project) {
    return [
      { title: `${data.project.title} | Mike Castor` },
      { name: "description", content: data.project.description },
    ];
  }

  return [
    { title: "Project | Mike Castor" },
    {
      name: "description",
      content: "Explore my software engineering projects and case studies.",
    },
  ];
}

export function loader({ params }: ProjectRoute.LoaderArgs) {
  const slug = params.slug;
  console.log("Loader called with slug:", slug);

  if (!slug) {
    console.log("No slug provided");
    throw new Response("Not Found", { status: 404 });
  }

  const project = getProjectBySlug(slug);
  console.log("Found project:", project ? project.title : "No project found");

  if (!project) {
    console.log("Project not found for slug:", slug);
    throw new Response("Not Found", { status: 404 });
  }

  return { project };
}

export default function ProjectDetail({
  loaderData,
}: ProjectRoute.ComponentProps) {
  const { project } = loaderData;

  // Parse the markdown content to HTML
  const createMarkup = () => {
    if (!project.content) {
      return {
        __html: "<p>No detailed content available for this project.</p>",
      };
    }

    // Process content with marked for markdown conversion
    let html = marked(project.content) as string;

    // Add Tailwind classes to HTML elements
    html = html
      // Make headings use Tailwind classes
      .replace(
        /<h1>/g,
        '<h1 class="text-3xl font-bold my-6 text-gray-900 dark:text-white">'
      )
      .replace(
        /<h2>/g,
        '<h2 class="text-2xl font-bold my-5 text-gray-900 dark:text-white">'
      )
      .replace(
        /<h3>/g,
        '<h3 class="text-xl font-bold my-4 text-gray-900 dark:text-white">'
      )
      // Style lists
      .replace(
        /<ul>/g,
        '<ul class="list-disc ml-6 my-4 text-gray-800 dark:text-gray-200">'
      )
      .replace(
        /<ol>/g,
        '<ol class="list-decimal ml-6 my-4 text-gray-800 dark:text-gray-200">'
      )
      .replace(/<li>/g, '<li class="mb-2">')
      // Style paragraphs
      .replace(/<p>/g, '<p class="mb-4 text-gray-800 dark:text-gray-200">');

    return { __html: html };
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back to projects link */}
          <div className="mb-8">
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to all projects
            </Link>
          </div>

          {/* Project Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Project Image */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>

          {/* Project Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={createMarkup()}
          />

          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                View Live Project
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                View Source Code
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

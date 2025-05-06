import { Link } from "react-router";
import { marked } from "marked";
import type { PostRoute } from "../../+types/blog";
import { getPostBySlug } from "../../utils/blog-utils";
import { useState, useEffect } from "react";

// Configure marked with minimal options to avoid type errors
marked.setOptions({
  breaks: true,
});

export function meta({
  params,
  data,
}: {
  params: Record<string, string>;
  data: PostRoute.LoaderData | undefined;
}) {
  // If data is available, use it for meta tags
  if (data?.post) {
    return [
      { title: `${data.post.title} | Mike Castor` },
      { name: "description", content: data.post.excerpt },
    ];
  }

  // Fallback meta tags
  return [
    { title: "Blog Post | Mike Castor" },
    {
      name: "description",
      content: "Read Mike Castor's insights on web development.",
    },
  ];
}

export function loader({ params }: PostRoute.LoaderArgs) {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = getPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post };
}

export default function BlogPost({ loaderData }: PostRoute.ComponentProps) {
  const { post } = loaderData;
  const [currentUrl, setCurrentUrl] = useState("");

  // Set the URL only on the client side
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Parse the markdown content to HTML
  const createMarkup = () => {
    // Process content with marked for markdown conversion
    let html = marked(post.content) as string;

    // Add Tailwind classes to HTML elements
    html = html
      // Make headings use Tailwind classes
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold my-6">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold my-5">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold my-4">')
      // Style lists
      .replace(/<ul>/g, '<ul class="list-disc ml-6 my-4">')
      .replace(/<ol>/g, '<ol class="list-decimal ml-6 my-4">')
      .replace(/<li>/g, '<li class="mb-2">')
      // Style code blocks
      .replace(
        /<pre><code>/g,
        '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-6"><code>'
      )
      .replace(
        /<code>/g,
        '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">'
      )
      // Style blockquotes
      .replace(
        /<blockquote>/g,
        '<blockquote class="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2 my-4 italic">'
      );

    return { __html: html };
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link
              to="/blog"
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
              Back to all posts
            </Link>
          </div>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-300 mb-4">
              <span>{formattedDate}</span>
              <span className="mx-2">•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Post Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={createMarkup()}
          />

          {/* Share Links */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-12">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="flex space-x-4">
              {currentUrl && (
                <>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      currentUrl
                    )}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

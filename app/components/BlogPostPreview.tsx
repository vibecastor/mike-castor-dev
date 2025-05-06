import { Link } from "react-router";
import type { BlogPost } from "../utils/blog-utils";

interface BlogPostPreviewProps {
  post: BlogPost;
}

const BlogPostPreview = ({ post }: BlogPostPreviewProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border-b border-gray-200 dark:border-gray-800 py-6 last:border-b-0">
      <div className="flex flex-col gap-2">
        {/* Date */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {post.title}
          </Link>
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>

        {/* Read more link */}
        <div className="mt-2">
          <Link
            to={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center font-medium"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPreview;

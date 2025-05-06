import type { Route } from "../../+types/blog";
import BlogPostPreview from "../../components/BlogPostPreview";
import { getAllPosts } from "../../utils/blog-utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | Mike Castor" },
    {
      name: "description",
      content:
        "Technical articles and insights by Mike Castor on web development, React, TypeScript, and more.",
    },
  ];
}

export function loader({}: Route.LoaderArgs) {
  const posts = getAllPosts();
  return { posts };
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights on web development, React,
            TypeScript, and everything in between.
          </p>
        </header>

        {/* Blog Posts */}
        <div className="max-w-3xl mx-auto">
          {posts.length > 0 ? (
            posts.map((post) => <BlogPostPreview key={post.slug} post={post} />)
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                No posts found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

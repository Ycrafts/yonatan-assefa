import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogs } from "../../lib/blogs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | Yonatan Assefa",
  description: "Articles on backend engineering, architecture, and things I've built.",
};

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="mb-16 max-w-xl">
          <span className="section-label">Blog</span>
          <h1 className="section-title mt-4">All articles</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="blog-card group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={blog.publishedDate}>
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>

              <h2 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {blog.title}
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {blog.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                Read more
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

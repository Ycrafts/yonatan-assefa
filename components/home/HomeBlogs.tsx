import Link from "next/link";
import { getFeaturedBlogs } from "../../lib/blogs";
import { BlogsAnimation } from "../animations/BlogsAnimation";

export async function HomeBlogs() {
  const blogs = await getFeaturedBlogs();

  return (
    <section id="blogs" className="relative py-20 lg:py-32">
      <div className="section-glow left-1/4 top-1/2 bg-accent-magenta" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-16 max-w-xl">
          <span className="section-label blogs-label">Blog</span>
          <h2 className="section-title blogs-title mt-4">Latest articles</h2>
        </div>

        <BlogsAnimation>
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

                <h3 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {blog.title}
                </h3>

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
        </BlogsAnimation>
      </div>
    </section>
  );
}

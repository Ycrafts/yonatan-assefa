import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogs } from "../../../lib/blogs";
import { BlogContent } from "../../../components/blog/BlogContent";
import { BlogFooter } from "../../../components/blog/BlogFooter";

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("Blog page slug:", slug);
  const blog = await getBlogBySlug(slug);

  console.log("Blog result:", blog);

  if (!blog) {
    console.log("Blog not found, showing 404");
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Blog Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-20">
        {/* Meta Info */}
        <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={blog.publishedDate}>
            {new Date(blog.publishedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="mb-8 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          {blog.title}
        </h1>

        {/* Excerpt */}
        <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
          {blog.excerpt}
        </p>

        {/* Divider */}
        <div className="mb-12 h-px bg-border" />

        {/* Blog Body */}
        <BlogContent content={blog.body} />

        {/* Divider */}
        <div className="mb-12 mt-16 h-px bg-border" />

        {/* Footer */}
        <BlogFooter title={blog.title} excerpt={blog.excerpt} />
      </article>
    </div>
  );
}

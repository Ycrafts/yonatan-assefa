"use client";

import { useRouter } from "next/navigation";

export function BlogHeader() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
    setTimeout(() => {
      const blogsSection = document.getElementById("blogs");
      if (blogsSection) {
        blogsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="border-b border-border bg-surface/50 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8">
        <a
          href="/#blogs"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          Back to blogs
        </a>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-4 font-display text-6xl font-bold text-foreground">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          Project not found
        </h2>
        <p className="mb-8 text-muted-foreground">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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
          Back to projects
        </Link>
      </div>
    </main>
  );
}

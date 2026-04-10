export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Blog Content Skeleton */}
      <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:py-20">
        {/* Meta Info Skeleton */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <span className="text-muted-foreground">•</span>
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-12 w-1/2 animate-pulse rounded bg-muted" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="mb-12 space-y-2">
          <div className="h-6 w-full animate-pulse rounded bg-muted" />
          <div className="h-6 w-5/6 animate-pulse rounded bg-muted" />
        </div>

        {/* Divider */}
        <div className="mb-12 h-px bg-border" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          <div className="h-8" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </article>
    </div>
  );
}

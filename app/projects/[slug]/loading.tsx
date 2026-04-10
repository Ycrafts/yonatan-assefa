export default function Loading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <article className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-8 h-16 w-3/4 animate-pulse rounded-lg bg-muted" />
        
        <div className="mb-12 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-muted" />
          ))}
        </div>

        <div className="mb-16 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>

        <div className="space-y-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-muted" />
        </div>
      </article>
    </main>
  );
}

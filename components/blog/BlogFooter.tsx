"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface BlogFooterProps {
  title: string;
  excerpt: string;
}

export function BlogFooter({ title, excerpt }: BlogFooterProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Ignore if user cancels
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToBlogs = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/#blogs");
  };

  return (
    <>
      {/* Toast notification */}
      {copied && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-fade-in rounded-lg border border-primary/20 bg-surface px-6 py-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Link copied to clipboard!
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <a
          href="/#blogs"
          onClick={handleBackToBlogs}
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
          Back to all blogs
        </a>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Share:</span>
          <button
            type="button"
            onClick={handleShare}
            className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-surface-elevated"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Copy link
          </button>
        </div>
      </div>
    </>
  );
}

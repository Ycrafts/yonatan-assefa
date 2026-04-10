"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    // Animate paragraphs and headings
    const elements = container.querySelectorAll("h2, h3, p, pre, ul, ol");
    if (elements.length) {
      gsap.set(elements, { opacity: 1, y: 0 });

      const tween = gsap.fromTo(
        elements,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Simple markdown-like rendering
  const renderContent = () => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H1
      if (line.startsWith("# ")) {
        elements.push(
          <h2 key={key++} className="mb-6 mt-12 font-display text-3xl font-bold text-foreground md:text-4xl">
            {line.substring(2)}
          </h2>
        );
      }
      // H2
      else if (line.startsWith("## ")) {
        elements.push(
          <h3 key={key++} className="mb-4 mt-10 font-display text-2xl font-semibold text-foreground md:text-3xl">
            {line.substring(3)}
          </h3>
        );
      }
      // H3
      else if (line.startsWith("### ")) {
        elements.push(
          <h4 key={key++} className="mb-3 mt-8 font-display text-xl font-semibold text-foreground md:text-2xl">
            {line.substring(4)}
          </h4>
        );
      }
      // Code block
      else if (line.startsWith("```")) {
        const codeLines: string[] = [];
        i++; // Skip the opening ```
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={key++} className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4">
            <code className="font-mono text-sm text-foreground">{codeLines.join("\n")}</code>
          </pre>
        );
      }
      // List item
      else if (line.startsWith("- ")) {
        const listItems: string[] = [line.substring(2)];
        while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
          i++;
          listItems.push(lines[i].substring(2));
        }
        elements.push(
          <ul key={key++} className="my-4 space-y-2 pl-6">
            {listItems.map((item, idx) => (
              <li key={idx} className="list-disc text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        );
      }
      // Paragraph
      else if (line.trim()) {
        elements.push(
          <p key={key++} className="my-4 leading-relaxed text-muted-foreground">
            {line}
          </p>
        );
      }
      // Empty line
      else {
        elements.push(<div key={key++} className="h-2" />);
      }
    }

    return elements;
  };

  return (
    <div ref={contentRef} className="prose prose-lg max-w-none">
      {renderContent()}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectScreenshotsProps {
  images: string[];
  projectTitle: string;
}

export function ProjectScreenshots({ images, projectTitle }: ProjectScreenshotsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imageElements = container.querySelectorAll(".screenshot-item");

    imageElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images.length]);

  return (
    <div ref={containerRef} className="relative">
      <h2 className="mb-12 font-display text-2xl font-semibold text-foreground md:text-3xl">
        Screenshots
      </h2>
      <div className="flex flex-col gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="screenshot-item overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          >
            <Image
              src={image}
              alt={`${projectTitle} screenshot ${index + 1}`}
              width={1200}
              height={900}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

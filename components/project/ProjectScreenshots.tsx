"use client";

import { useEffect, useRef, useState } from "react";
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

type ImageInfo = { src: string; portrait: boolean };

type RenderItem =
  | { type: "single"; image: ImageInfo }
  | { type: "pair"; images: [ImageInfo, ImageInfo] };

function groupImages(infos: ImageInfo[]): RenderItem[] {
  const result: RenderItem[] = [];
  let i = 0;
  while (i < infos.length) {
    if (infos[i]!.portrait && i + 1 < infos.length && infos[i + 1]!.portrait) {
      result.push({ type: "pair", images: [infos[i]!, infos[i + 1]!] });
      i += 2;
    } else {
      result.push({ type: "single", image: infos[i]! });
      i += 1;
    }
  }
  return result;
}

export function ProjectScreenshots({ images, projectTitle }: ProjectScreenshotsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageInfos, setImageInfos] = useState<ImageInfo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      images.map(
        (src) =>
          new Promise<ImageInfo>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve({ src, portrait: img.naturalHeight > img.naturalWidth });
            img.onerror = () => resolve({ src, portrait: false });
            img.src = src;
          })
      )
    ).then((infos) => {
      if (!cancelled) setImageInfos(infos);
    });
    return () => {
      cancelled = true;
    };
  }, [images]);

  const renderItems = imageInfos ? groupImages(imageInfos) : [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !imageInfos) return;

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
  }, [imageInfos]);

  return (
    <div ref={containerRef} className="relative">
      <h2 className="mb-12 font-display text-2xl font-semibold text-foreground md:text-3xl">
        Screenshots
      </h2>
      {imageInfos ? (
        <div className="flex flex-col gap-8">
          {renderItems.map((item, ri) => {
            if (item.type === "pair") {
              return (
                <div key={ri} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {item.images.map((info, ii) => (
                    <div
                      key={ii}
                      className="screenshot-item overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
                    >
                      <Image
                        src={info.src}
                        alt={`${projectTitle} screenshot`}
                        width={600}
                        height={800}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              );
            }
            const portrait = item.image.portrait;
            return (
              <div
                key={ri}
                className={portrait ? "grid grid-cols-1 sm:grid-cols-2" : ""}
              >
                <div
                  className={`screenshot-item overflow-hidden rounded-2xl border border-border bg-surface shadow-lg ${portrait ? "" : "w-full"}`}
                >
                  <Image
                    src={item.image.src}
                    alt={`${projectTitle} screenshot`}
                    width={portrait ? 600 : 1200}
                    height={portrait ? 800 : 900}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
      )}
    </div>
  );
}

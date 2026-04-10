"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

import { HeroCodeBackground } from "./HeroCodeBackground";

export function HomeHero() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-code-zone",
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" },
      0,
    );
    tl.from(".hero-scroll-indicator", { opacity: 0, duration: 0.6 }, 2.0);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <HeroCodeBackground />

      <h1 className="sr-only">Yonatan Assefa</h1>

      <div className="hero-scroll-indicator absolute left-1/2 bottom-48 z-10 -translate-x-1/2 nav:bottom-8">
        <div className="animate-scroll-pulse flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-linear-to-b from-transparent to-muted-foreground" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

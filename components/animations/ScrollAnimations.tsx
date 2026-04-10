"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ServicesAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll(".service-card"));
    const texts = container.querySelectorAll(".service-text");
    const icons = container.querySelectorAll(".service-icon");

    // Shuffle cards order randomly
    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Cards appear in random order with scale + fade
    if (shuffled.length) {
      tl.from(shuffled, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }

    // Texts slide up from below
    if (texts.length) {
      tl.from(
        texts,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    // Icons bounce in after texts
    if (icons.length) {
      tl.from(
        icons,
        {
          scale: 0,
          rotation: -15,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(3)",
        },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export function ProjectsAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const hero = container.querySelector(".project-hero");
    if (hero) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      if (heroTl.scrollTrigger) triggers.push(heroTl.scrollTrigger);

      heroTl.fromTo(
        hero,
        {
          clipPath: "inset(100% 0 0 0)",
        },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.inOut",
        }
      );

      const heroTitle = hero.querySelector(".project-hero-title");
      const heroDesc = hero.querySelector(".project-hero-desc");
      const heroTags = hero.querySelectorAll(".project-hero-tag");

      if (heroTitle) {
        heroTl.from(
          heroTitle,
          { y: 30, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
      }
      if (heroDesc) {
        heroTl.from(
          heroDesc,
          { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" },
          "-=0.1"
        );
      }
      if (heroTags.length) {
        heroTl.from(
          heroTags,
          {
            y: 15,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.1"
        );
      }
    }

    const gridCards = container.querySelectorAll(".project-card");
    if (gridCards.length) {
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridCards[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      if (gridTl.scrollTrigger) triggers.push(gridTl.scrollTrigger);

      const cardDelays = [0, 0.2, 0.15, 0.35];

      Array.from(gridCards).forEach((card, i) => {
        const delay = cardDelays[i] ?? i * 0.15;

        gridTl.from(
          card,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.7,
            ease: "power3.out",
          },
          delay
        );

        const title = card.querySelector(".project-card-title");
        const desc = card.querySelector(".project-card-desc");
        const tags = card.querySelectorAll(".project-card-tag");

        const contentStart = delay + 0.4;
        if (title) {
          gridTl.from(
            title,
            { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" },
            contentStart
          );
        }
        if (desc) {
          gridTl.from(
            desc,
            { y: 20, opacity: 0, duration: 0.4, ease: "power3.out" },
            contentStart + 0.1
          );
        }
        if (tags.length) {
          gridTl.from(
            tags,
            {
              y: 15,
              opacity: 0,
              duration: 0.3,
              stagger: 0.05,
              ease: "power3.out",
            },
            contentStart + 0.2
          );
        }
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

export function SectionHeaderAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const label = container.querySelector(".section-label");
    if (label) {
      const text = label.textContent || "";
      label.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.classList.add("letter-reveal");
        const inner = document.createElement("span");
        inner.textContent = char === " " ? "\u00A0" : char;
        span.appendChild(inner);
        label.appendChild(span);
      });

      const tween = gsap.to(`${label.className.split(' ')[0]} .letter-reveal span`, {
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: label,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    const title = container.querySelector(".section-title");
    if (title) {
      const text = title.textContent || "";
      title.innerHTML = "";

      text.split(" ").forEach((word, i, arr) => {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "top";
        const inner = document.createElement("span");
        inner.classList.add("word-reveal");
        inner.style.display = "inline-block";
        inner.textContent = word;
        wrapper.appendChild(inner);
        title.appendChild(wrapper);
        if (i < arr.length - 1) {
          title.appendChild(document.createTextNode(" "));
        }
      });

      const tween = gsap.from(`${title.className.split(' ')[0]} .word-reveal`, {
        y: "100%",
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

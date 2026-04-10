"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogsAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const label = document.querySelector(".blogs-label");
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

      const tween = gsap.to(".blogs-label .letter-reveal span", {
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

    const title = document.querySelector(".blogs-title");
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

      const tween = gsap.from(".blogs-title .word-reveal", {
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

    const cards = container.querySelectorAll(".blog-card");
    if (cards.length) {
      gsap.set(cards, { opacity: 1, y: 0 });

      const tween = gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
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

  return <div ref={containerRef}>{children}</div>;
}

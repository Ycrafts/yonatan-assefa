"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bolt } from "../icons/Bolt";
import { Code } from "../icons/Code";
import { CreditCard } from "../icons/CreditCard";
import { Gear } from "../icons/Gear";
import { Refresh } from "../icons/Refresh";
import { Rocket } from "../icons/Rocket";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    key: "custom",
    icon: Code,
    color: "text-primary",
    title: "Custom Development",
    description:
      "Tailored web applications built from scratch to meet your specific business needs. From concept to deployment, I create scalable solutions that grow with you.",
  },
  {
    key: "redesign",
    icon: Refresh,
    color: "text-primary",
    title: "Redesign & Modernization",
    description:
      "Transform your existing application with modern technologies and best practices. Improve performance, user experience, and maintainability.",
  },
  {
    key: "performance",
    icon: Bolt,
    color: "text-primary",
    title: "Performance Optimization",
    description:
      "Speed up your application with advanced optimization techniques. Reduce load times, improve Core Web Vitals, and enhance user satisfaction.",
  },
  {
    key: "automation",
    icon: Gear,
    color: "text-primary",
    title: "Business Automation",
    description:
      "I create systems that automate your daily tasks, reduce manual work, and help your business run more efficiently.",
  },
  {
    key: "product",
    icon: Rocket,
    color: "text-primary",
    title: "Product Development",
    description:
      "Have an idea for an app or platform? I help you turn it into a real, working product, from planning to launch, so you can start using it or sharing it with users.",
  },
  {
    key: "payment",
    icon: CreditCard,
    color: "text-primary",
    title: "Payment Integration",
    description:
      "Integrate secure payment systems like Chapa and third-party billing APIs.",
  },
];

export function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const label = container.querySelector(".services-label");
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

      const tween = gsap.to(".services-label .letter-reveal span", {
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

    const title = container.querySelector(".services-title");
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

      const tween = gsap.from(".services-title .word-reveal", {
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

    const grid = container.querySelector(".services-grid");
    if (grid) {
      const cards = Array.from(grid.querySelectorAll(".service-card"));
      const texts = grid.querySelectorAll(".service-text");
      const icons = grid.querySelectorAll(".service-icon");

      const shuffled = [...cards].sort(() => Math.random() - 0.5);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      gsap.set(texts, { opacity: 1, y: 0 });
      gsap.set(icons, { scale: 1, rotation: 0 });

      if (shuffled.length) {
        tl.fromTo(shuffled, {
          y: 60,
          opacity: 0,
          scale: 0.9,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      if (texts.length) {
        tl.fromTo(
          texts,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      if (icons.length) {
        tl.fromTo(
          icons,
          {
            scale: 0,
            rotation: -15,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(3)",
          },
          "-=0.3"
        );
      }
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="services" className="relative py-20 lg:py-32">
      <div className="section-glow left-1/3 top-1/4 bg-accent-amber" />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-16 max-w-xl">
          <span className="section-label services-label">Services</span>
          <h2 className="section-title services-title mt-4">What I can do for you</h2>
        </div>

        <div className="services-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="service-card flex flex-col items-center rounded-2xl border border-border bg-surface px-8 py-12 text-center transition-all duration-300 hover:border-border/60 hover:shadow-lg"
              >
                <div className="service-icon mb-6 flex h-16 w-16 items-center justify-center">
                  <Icon className={`h-8 w-8 ${service.color}`} />
                </div>

                <div className="service-text">
                  <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillGroups = [
  {
    category: "Backend Engineering",
    skills: [
      "API design",
      "Python",
      "FastAPI",
      "Django",
      "PHP",
      "Laravel",
      "Ruby",
      "Ruby on Rails",
      "Java",
      "Spring Boot",
    ],
  },
  {
    category: "Frontend Development",
    skills: ["HTML, CSS, JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    category: "Database Design",
    skills: [
      "Complex relational modeling",
      "Hierarchical org systems",
      "PostgreSQL",
      "MS SQL",
      "MySQL",
      "Supabase",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    category: "Mobile & Bots",
    skills: [
      "Flutter",
      "Telegram Bots",
      "Python Telegram Bot",
      "Pyrogram Client",
    ],
  },
  {
    category: "Systems & Integrations",
    skills: [
      "Payment integration (Chapa, Stripe)",
      "SMTP and email services",
      "Supabase",
      "Firebase",
      "Google Auth",
      "Third-party APIs",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "CI/CD",
      "Linux",
      "Shell scripting",
      "Docker",
      "Deployment & Hosting Setup",
      "Monitoring & Logging",
    ],
  },
];

const techLogos: Record<string, string> = {
  "API design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  "Ruby on Rails": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "HTML, CSS, JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "Telegram Bots": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/telegram/telegram-original.svg",
  "Python Telegram Bot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Pyrogram Client": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MS SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Payment integration (Chapa, Stripe)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
  "SMTP and email services": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Google Auth": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "GitLab": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  "CI/CD": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "Shell scripting": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
};

export function HomeSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const label = container.querySelector(".skills-label");
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

      const tween = gsap.to(".skills-label .letter-reveal span", {
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

    const title = container.querySelector(".skills-title");
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

      const tween = gsap.from(".skills-title .word-reveal", {
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

    const groups = container.querySelectorAll(".skill-group");
    if (groups.length) {
      gsap.set(groups, { opacity: 1, y: 0 });

      const tween = gsap.fromTo(
        groups,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groups[0],
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

  const getCursorStyle = () => {
    if (hoveredSkill && techLogos[hoveredSkill]) {
      return {
        cursor: `url('${techLogos[hoveredSkill]}') 16 16, auto`,
      };
    }
    return {};
  };

  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="section-glow right-1/4 top-1/3 bg-accent-magenta" />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-16 max-w-xl">
          <span className="section-label skills-label">Skills</span>
          <h2 className="section-title skills-title mt-4">
            Skills and Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="skill-group group rounded-2xl border border-border bg-surface/30 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:bg-surface/50"
            >
              <h3 className="mb-4 font-display text-lg font-semibold text-primary">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    style={hoveredSkill === skill ? getCursorStyle() : {}}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    • {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Moon } from "./icons/Moon";
import { Sun } from "./icons/Sun";

type NavLink = {
  label: string;
  href: string;
};

export function AppNavigation() {
  const navLinks = useMemo<NavLink[]>(
    () => [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Blog", href: "#blogs" },
      { label: "Contact", href: "#contact" },
    ],
    [],
  );

  const [isDark, setIsDark] = useState(false);

  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 50);

      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;
      if (nearBottom) setActiveSection("contact");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "services",
      "skills",
      "projects",
      "blogs",
      "contact",
    ];

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  function scrollTo(href: string) {
    const id = href.replace("#", "");
    setIsMenuOpen(false);

    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const extraScroll = 40;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + extraScroll;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.cookie = `theme=${nextIsDark ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
    setIsDark(nextIsDark);
    window.dispatchEvent(new Event("themechange"));
  }

  return (
    <>
      <nav
        className={`nav-bar fixed left-0 right-0 bottom-0 nav:bottom-auto nav:top-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center px-4 py-2 nav:px-8 nav:py-5">
          <div className="hidden items-center gap-8 nav:flex">
            <Link
              href="/"
              className="nav-item font-display text-2xl font-bold tracking-tight text-foreground"
            >
              yo<span className="text-primary transition-colors duration-[2000ms]">.</span>
            </Link>
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-item nav-link relative text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-foreground nav-link--active"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-tight text-foreground nav:hidden"
          >
            yo<span className="text-primary transition-colors duration-[2000ms]">.</span>
          </Link>

          <a
            href="#contact"
            className="ml-4 inline-flex items-center rounded-full border border-foreground/20 px-4 py-2 text-xs font-semibold tracking-wider text-foreground transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95 nav:hidden"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
          >
            Contact
          </a>

          <div className="ml-auto hidden items-center gap-6 nav:flex">
            <a
              href="https://github.com/Ycrafts/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item flex h-8 w-8 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/yonatan-assefa-mekonnen/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item flex h-8 w-8 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              type="button"
              className="nav-item flex h-8 w-8 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="nav-item nav-cta relative inline-flex items-center px-7 py-2.5 text-xs font-semibold tracking-wider text-foreground transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              Contact
            </a>
          </div>

          <button
            className="ml-auto flex h-10 w-10 cursor-pointer items-center justify-center nav:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <div className="relative h-4 w-6">
              <span
                className={`absolute left-0 h-px w-full bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background nav:hidden">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-display text-3xl font-bold transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                {link.label}
              </a>
            );
          })}
          <button
            type="button"
            className="mt-2 flex h-10 w-10 cursor-pointer items-center justify-center text-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      ) : null}
    </>
  );
}

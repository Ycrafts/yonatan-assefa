"use client";

import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AppContact() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    const label = container.querySelector(".contact-label");
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

      const tween = gsap.to(".contact-label .letter-reveal span", {
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

    const title = container.querySelector(".contact-title");
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

      const tween = gsap.from(".contact-title .word-reveal", {
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

    const desc = container.querySelector(".contact-desc");
    if (desc) {
      const tween = gsap.from(desc, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: desc,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    const formFields = container.querySelectorAll(".form-field");
    if (formFields.length) {
      const tween = gsap.from(formFields, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formFields[0],
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

  if (state.succeeded) {
    return (
      <section id="contact" className="relative py-20 lg:py-32">
        <div className="section-glow right-1/4 top-1/3 bg-accent-cyan" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">
            Thank you!
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your message has been sent. I'll get back to you soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      <div className="section-glow right-1/4 top-1/3 bg-accent-cyan" />

      <div ref={containerRef} className="relative z-10 mx-auto max-w-3xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <span className="section-label contact-label">Contact</span>
          <h2 className="section-title contact-title mt-4">Get in touch</h2>
          <p className="contact-desc mt-4 text-muted-foreground">
            Have a question or want to work together? Leave a message, or contact me directly at{" "}
            <a href="mailto:yonatanassefa60@gmail.com" className="text-primary hover:underline">
              yonatanassefa60@gmail.com
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-4 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          <div className="form-field">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-4 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="form-field">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-4 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <div className="form-field flex justify-center">
            <button
              type="submit"
              disabled={state.submitting}
              className="group relative inline-flex items-center transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="relative">
                <span className="relative z-10 animate-fast-blink text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                  {state.submitting ? "Sending..." : "Send Message"}
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 blur-lg opacity-40 bg-primary rounded-full scale-110" />
              </div>
            </button>
          </div>
        </form>

        <div className="mt-16 flex justify-center gap-6">
          <a
            href="https://github.com/Ycrafts/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
            aria-label="GitHub"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/yonatan-assefa-mekonnen/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

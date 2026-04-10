export function HomeAbout() {
  return (
    <section id="about" className="relative py-20 lg:py-32">
      <div className="section-glow left-1/4 top-1/2 -translate-y-1/2 bg-accent-cyan" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="flex flex-col items-start gap-12 md:flex-row md:gap-10 lg:gap-20">
          <div className="relative w-full flex-1 self-stretch">
            <div className="about-image relative h-full w-full min-h-[400px] md:min-h-[500px] rounded-2xl bg-muted overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-magenta/10 to-accent-amber/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-24 h-24 mx-auto rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-muted-foreground/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground/60">Your Photo Here</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-text flex-1 space-y-6 md:max-w-[50%]">
            <span className="section-label about-label">About</span>
            <h2 className="section-title about-title">
              Yonatan Assefa
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              I'm a software engineer with 8 years of coding experience and 4 years building production systems. 
              When I hear requirements, I immediately think about design, how the system should be structured, 
              what patterns fit best, and how it will scale. Architecture and design approaches are always 
              at the forefront of my mind.  
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I practice domain-driven design, leverage proven design patterns, and follow clean code principles. 
              For me, it's not just about making something work, it's about building systems that are maintainable, 
              scalable, and elegant. I believe great software is thoughtfully designed from the ground up.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I'm versatile and adapt quickly to different frameworks and technologies. Whether it's picking up 
              a new stack, diving into unfamiliar domains, or tackling diverse technical challenges, I bring 
              the same design-first mindset to every project.
            </p>

            <div className="mt-8">
              <a
                href="/images/projects/Yonatan_Assefa_Mekonnen_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>

            <div className="about-timeline mt-8 border-t border-border pt-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Experience
              </span>
              <div className="mt-6 pl-6 space-y-5 relative">
                <div className="timeline-line absolute left-0 top-0 h-full w-px origin-top bg-border" />
                
                <div className="timeline-item relative">
                  <span className="timeline-dot absolute -left-6 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <span className="text-sm font-semibold text-foreground">
                      Backend Developer <span className="font-normal text-muted-foreground">— Enscaler</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">Aug 2025 - Present</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Designing and implementing systems for international clients
                  </p>
                </div>

                <div className="timeline-item relative">
                  <span className="timeline-dot absolute -left-6 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-border" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <span className="text-sm font-semibold text-foreground">
                      Backend Developer Intern <span className="font-normal text-muted-foreground">— Quantum Technologies PLC</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">Mar 2025 - Aug 2025</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Built financial and enterprise systems across various domains
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

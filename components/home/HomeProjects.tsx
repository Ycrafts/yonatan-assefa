"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "../../types/project";
import { ProjectsAnimation, SectionHeaderAnimation } from "../animations/ScrollAnimations";

function groupProjects(projects: Project[]) {
  const groups: Array<{ type: "hero" | "grid"; projects: Project[] }> = [];
  let i = 0;

  while (i < projects.length) {
    groups.push({ type: "hero", projects: [projects[i]!] });
    i++;

    if (i < projects.length) {
      groups.push({ type: "grid", projects: projects.slice(i, i + 4) });
      i += 4;
    }
  }

  return groups;
}

export function HomeProjects({ projects }: { projects: Project[] }) {
  const projectGroups = groupProjects(projects);

  return (
    <section id="projects" className="relative py-20 lg:py-32">
      <div className="projects-content relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeaderAnimation>
          <div className="mb-16">
            <span className="section-label projects-label">Projects</span>
            <h2 className="section-title projects-title mt-4">
              Featured Personal Projects
            </h2>
          </div>
        </SectionHeaderAnimation>

        <ProjectsAnimation>
          <div className="space-y-8">
            {projectGroups.map((group, gi) => {
              if (group.type === "hero") {
                const project = group.projects[0]!;
                return (
                  <div
                    key={project.id}
                    className="project-hero group relative overflow-hidden rounded-2xl"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        width={1200}
                        height={514}
                        priority={gi === 0}
                        className="aspect-4/3 w-full object-contain transition-transform duration-700 group-hover:scale-105 sm:aspect-21/9"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </Link>
                    <div className="project-hero-content absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="project-hero-tag rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] text-white/80 sm:px-3 sm:py-1 sm:text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link href={`/projects/${project.slug}`}>
                            <h3 className="project-hero-title mt-2 font-display text-xl font-bold text-white sm:mt-3 sm:text-3xl md:text-5xl hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                          </Link>
                          <p className="project-hero-desc mt-1 text-xs text-white/60 sm:mt-2 sm:max-w-lg sm:text-sm sm:text-white/70">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:bg-white hover:text-black"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:bg-white hover:text-black"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={`grid-${gi}`} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {group.projects.map((project) => (
                    <div
                      key={project.id}
                      className="project-card group relative overflow-hidden rounded-2xl"
                    >
                      <Link href={`/projects/${project.slug}`}>
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          width={600}
                          height={450}
                          className="aspect-4/3 w-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </Link>
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:bg-white hover:text-black"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:bg-white hover:text-black"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="project-card-content absolute bottom-0 left-0 p-6">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="project-card-tag rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link href={`/projects/${project.slug}`}>
                          <h3 className="project-card-title mt-2 font-display text-xl font-bold text-white md:text-2xl hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </Link>
                        <p className="project-card-desc mt-1 text-xs text-white/60">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </ProjectsAnimation>
      </div>
    </section>
  );
}

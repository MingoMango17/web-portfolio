import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import React from "react";
import BlurFade from "./BlurFade";
import SectionHeading from "./ui/SectionHeading";
import Tag from "./ui/Tag";
import { Project } from "@/types";

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section
      id="projects"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1} blur>
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              <span className="text-accent">Selected</span> Works
            </>
          }
          className="mb-16"
        />
      </BlurFade>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />

        <div className="space-y-0">
          {projects.map((project, index) => (
            <BlurFade key={project.id} delay={0.1 + index * 0.08}>
              <article className="relative pl-10 pb-16 group">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 -translate-x-[5px] w-[10px] h-[10px] rounded-full bg-base border border-white/20 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300" />

                <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">
                  {/* Content */}
                  <div>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span
                        className="text-4xl font-bold text-white/[0.06] select-none leading-none"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold text-ink group-hover:text-accent transition-colors duration-200">
                        {project.name}
                      </h3>
                    </div>

                    <p className="text-ink-muted text-sm leading-relaxed mb-5 max-w-lg line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink transition-colors duration-200"
                        >
                          <Github size={13} />
                          Source
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-accent/70 hover:text-accent transition-colors duration-200 group/link"
                        >
                          View Project
                          <ArrowUpRight
                            size={13}
                            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="glass rounded-xl p-1.5">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={560}
                        height={350}
                        className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                        style={{ aspectRatio: "16/10" }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import BlurFade from "./BlurFade";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import { Experience as ExperienceType } from "@/types";

const ExperienceCard = ({ exp }: { exp: ExperienceType }) => (
  <GlassCard className="p-5 text-sm w-full max-w-sm">
    <p className="font-bold text-ink text-base">{exp.company}</p>
    <p className="text-ink-muted italic mb-1">{exp.role}</p>
    <p className="text-ink-faint text-xs mb-4">{exp.period}</p>
    <ul className="space-y-2">
      {exp.bullets.map((b, i) => (
        <li key={i} className="flex gap-2 text-ink-muted leading-relaxed">
          <span className="text-accent mt-1 flex-shrink-0">•</span>
          {b}
        </li>
      ))}
    </ul>
  </GlassCard>
);

const Experience = ({ experiences }: { experiences: ExperienceType[] }) => {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1} blur>
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Experience <span className="text-ink-faint">Timeline</span>
            </>
          }
          className="mb-20"
        />
      </BlurFade>

      {/* Timeline container */}
      <div ref={containerRef} className="relative">
        {/* Background line (static, faint) */}
        <div className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/8" />

        {/* Animated growing line */}
        <motion.div
          className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-accent origin-top"
          style={{
            scaleY: reduceMotion ? 1 : lineScaleY,
            height: "100%",
            transformOrigin: "top",
          }}
        />

        {/* Entries */}
        <ol className="space-y-20 pb-8 list-none">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li key={exp.company}>
                <BlurFade delay={0.15 + index * 0.15}>
                  <div className="relative flex items-start md:items-center">
                    {/* Left side (md+ only) */}
                    <div className="hidden md:flex flex-1 justify-end pr-10">
                      {isLeft && <ExperienceCard exp={exp} />}
                    </div>

                    {/* Center dot / company badge */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                        <span
                          className="text-xs font-bold text-ink-muted"
                          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                        >
                          {exp.initials}
                        </span>
                      </div>
                    </div>

                    {/* Right side (mobile rail + md alternating) */}
                    <div className="flex-1 flex justify-start pl-6 md:pl-10">
                      {/* Mobile: every card sits right of rail */}
                      <div className="md:hidden w-full">
                        <ExperienceCard exp={exp} />
                      </div>
                      {/* md+: only odd entries on the right */}
                      <div className="hidden md:block w-full max-w-sm">
                        {!isLeft && <ExperienceCard exp={exp} />}
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;

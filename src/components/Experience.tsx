"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BlurFade from "./BlurFade";

const experiences = [
  {
    company: "HQZen / BPOseats",
    role: "Full Stack Developer Intern",
    period: "July 2023 – Present",
    initials: "HQ",
    bullets: [
      "Built a full-stack kanban board application using Vue.js and Django, used by internal teams.",
      "Collaborated with senior developers across the entire development lifecycle.",
      "Integrated REST APIs and managed PostgreSQL databases for production features.",
      "Established Git workflows and best practices across the team.",
    ],
  },
  {
    company: "University of the Philippines Cebu",
    role: "BS Computer Science",
    period: "2020 – Present",
    initials: "UP",
    bullets: [
      "Pursuing Bachelor of Science in Computer Science.",
      "Developed multiple full-stack projects including facial recognition systems and payment platforms.",
      "Applied machine learning and AI concepts in personal and academic projects.",
    ],
  },
];

const Experience = () => {
  const containerRef = useRef(null);

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
      <BlurFade delay={0.1}>
        <p className="text-xs uppercase tracking-widest text-lime-400 mb-4 font-semibold">
          Experience
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-20 leading-tight">
          Experience{" "}
          <span className="text-white/25">Timeline</span>
        </h2>
      </BlurFade>

      {/* Timeline container */}
      <div ref={containerRef} className="relative">
        {/* Background line (static, faint) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/8" />

        {/* Animated growing line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-lime-400 origin-top"
          style={{
            scaleY: lineScaleY,
            height: "100%",
            transformOrigin: "top",
          }}
        />

        {/* Entries */}
        <div className="space-y-20 pb-8">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <BlurFade key={exp.company} delay={0.15 + index * 0.15}>
                <div className="relative flex items-center">
                  {/* Left side */}
                  <div className="flex-1 flex justify-end pr-10">
                    {isLeft && (
                      <div className="relative w-full max-w-sm">
                        {/* Card */}
                        <div className="bg-[#111] border border-white/10 rounded-xl p-5 text-sm">
                          <p className="font-bold text-white text-base">{exp.company}</p>
                          <p className="text-white/50 italic mb-1">{exp.role}</p>
                          <p className="text-white/30 text-xs mb-4">{exp.period}</p>
                          <ul className="space-y-2">
                            {exp.bullets.map((b, i) => (
                              <li key={i} className="flex gap-2 text-white/50 leading-relaxed">
                                <span className="text-lime-400 mt-1 flex-shrink-0">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Arrow pointing right */}
                        <div
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderLeft: "12px solid rgba(255,255,255,0.1)",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Center dot / company badge */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#111] border border-white/20 flex items-center justify-center">
                      <span
                        className="text-xs font-bold text-white/70"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {exp.initials}
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex-1 flex justify-start pl-10">
                    {!isLeft && (
                      <div className="relative w-full max-w-sm">
                        {/* Arrow pointing left */}
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderRight: "12px solid rgba(255,255,255,0.1)",
                          }}
                        />
                        {/* Card */}
                        <div className="bg-[#111] border border-white/10 rounded-xl p-5 text-sm">
                          <p className="font-bold text-white text-base">{exp.company}</p>
                          <p className="text-white/50 italic mb-1">{exp.role}</p>
                          <p className="text-white/30 text-xs mb-4">{exp.period}</p>
                          <ul className="space-y-2">
                            {exp.bullets.map((b, i) => (
                              <li key={i} className="flex gap-2 text-white/50 leading-relaxed">
                                <span className="text-lime-400 mt-1 flex-shrink-0">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

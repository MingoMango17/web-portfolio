"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import BlurFade from "./BlurFade";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";

import { Skill, Tool } from "@/types";

const ProgressBar = ({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-ink-muted">{name}</span>
        <span
          className="text-accent text-xs"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {level}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={`${name}: ${level}%`}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 rounded-full bg-white/8 overflow-hidden"
      >
        <motion.div
          initial={reduceMotion ? { width: `${level}%` } : { width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
        />
      </div>
    </div>
  );
};

const Skills = ({ skills, tools }: { skills: Skill[]; tools: Tool[] }) => {
  return (
    <section
      id="skills"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1} blur>
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Skills &amp; <span className="text-ink-faint">Tools</span>
            </>
          }
          className="mb-14"
        />
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Skill bars */}
        <BlurFade delay={0.2}>
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-widest text-ink-faint mb-8 font-semibold">
              Proficiency
            </h3>
            <div className="space-y-7">
              {skills.map((skill, i) => (
                <ProgressBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.1 + i * 0.08}
                />
              ))}
            </div>
          </GlassCard>
        </BlurFade>

        {/* Tools grid */}
        <BlurFade delay={0.3}>
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-widest text-ink-faint mb-8 font-semibold">
              Technologies
            </h3>
            <div className="grid grid-cols-4 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-2 group cursor-default"
                >
                  <div className="w-9 h-9 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.5)] transition-all duration-300">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-ink-faint group-hover:text-ink-muted transition-colors text-center leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </BlurFade>
      </div>
    </section>
  );
};

export default Skills;

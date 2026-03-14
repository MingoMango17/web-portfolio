"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import BlurFade from "./BlurFade";

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

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-white/60">{name}</span>
        <span
          className="text-lime-400 text-xs"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {level}%
        </span>
      </div>
      <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full bg-lime-400 rounded-full"
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
      <BlurFade delay={0.1}>
        <p className="text-xs uppercase tracking-widest text-lime-400 mb-4 font-semibold">
          Skills
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-14 leading-tight">
          Skills &amp;{" "}
          <span className="text-white/25">Tools</span>
        </h2>
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-14 md:gap-20">
        {/* Skill bars */}
        <BlurFade delay={0.2}>
          <h3 className="text-xs uppercase tracking-widest text-white/25 mb-8 font-semibold">
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
        </BlurFade>

        {/* Tools grid */}
        <BlurFade delay={0.3}>
          <h3 className="text-xs uppercase tracking-widest text-white/25 mb-8 font-semibold">
            Technologies
          </h3>
          <div className="grid grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-9 h-9 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(163,230,53,0.5)] transition-all duration-300">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <span className="text-[10px] text-white/20 group-hover:text-white/50 transition-colors text-center leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default Skills;

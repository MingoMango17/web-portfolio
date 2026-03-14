import React from "react";
import BlurFade from "./BlurFade";
import { AboutContent } from "@/types";

const About = ({ about }: { about: AboutContent }) => {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1}>
        <p className="text-xs uppercase tracking-widest text-lime-400 mb-4 font-semibold">
          About
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
          A developer who loves{" "}
          <span className="text-white/25">building things</span>
        </h2>
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-16">
        <BlurFade delay={0.2}>
          <p className="text-white/45 leading-relaxed text-base">
            {about.paragraph1}
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="text-white/45 leading-relaxed text-base">
            {about.paragraph2}
          </p>
        </BlurFade>
      </div>

      {/* Stats */}
      <BlurFade delay={0.4}>
        <div className="flex flex-wrap gap-12">
          {[
            { value: "2+", label: "Years experience" },
            { value: "4+", label: "Projects shipped" },
            { value: "11+", label: "Technologies" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl font-bold text-lime-400 leading-none"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {stat.value}
              </p>
              <p className="text-white/35 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};

export default About;

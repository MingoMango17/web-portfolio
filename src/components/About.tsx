import React from "react";
import BlurFade from "./BlurFade";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import { AboutContent } from "@/types";

const About = ({ about }: { about: AboutContent }) => {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1} blur>
        <SectionHeading
          eyebrow="About"
          title={
            <>
              A developer who loves{" "}
              <span className="text-ink-faint">building things</span>
            </>
          }
          className="mb-12"
        />
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-16">
        <BlurFade delay={0.2} blur>
          <p className="text-ink-muted leading-relaxed text-base">
            {about.paragraph1}
          </p>
        </BlurFade>

        <BlurFade delay={0.3} blur>
          <p className="text-ink-muted leading-relaxed text-base">
            {about.paragraph2}
          </p>
        </BlurFade>
      </div>

      {/* Stats */}
      <BlurFade delay={0.4}>
        <GlassCard className="flex flex-wrap gap-12 p-8">
          {[
            { value: "2+", label: "Years experience" },
            { value: "4+", label: "Projects shipped" },
            { value: "11+", label: "Technologies" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-4xl font-bold text-accent leading-none"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {stat.value}
              </p>
              <p className="text-ink-faint text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </GlassCard>
      </BlurFade>
    </section>
  );
};

export default About;

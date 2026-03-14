import React from "react";
import BlurFade from "./BlurFade";

const About = () => {
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
            I&apos;m a passionate Full Stack Developer currently pursuing my
            Bachelor&apos;s in Computer Science at the University of the
            Philippines Cebu. I combine academic knowledge with hands-on
            industry experience to build efficient, user-centered applications.
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="text-white/45 leading-relaxed text-base">
            My journey began as an intern at HQZen/BPOseats building a
            full-stack kanban board with Vue.js and Django. Outside of work,
            I&apos;m always exploring the latest in AI, machine learning, and
            automotive engineering — interests that shape how I approach every
            project I build.
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

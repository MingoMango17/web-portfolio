import { Github, Linkedin, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";
import BlurFade from "./BlurFade";
import { SITE_GITHUB, SITE_LINKEDIN } from "@/lib/site";

const Main = () => {
  const startDate = new Date(2023, 6, 1);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return (
    <section className="min-h-screen flex items-center max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-20">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 w-full">

        {/* Left — text content */}
        <div className="flex flex-col flex-1">
          {/* Status badge */}
          <BlurFade delay={0.1}>
            <div className="flex items-center gap-2.5 mb-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-sm text-ink-muted">Available for work</span>
            </div>
          </BlurFade>

          {/* Hi label */}
          <BlurFade delay={0.2} blur>
            <p className="text-ink-muted text-lg mb-2 tracking-wide">Hi, I&apos;m</p>
          </BlurFade>

          {/* Name */}
          <BlurFade delay={0.25} blur>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-6"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Junry Mingo
            </h1>
          </BlurFade>

          {/* Title */}
          <BlurFade delay={0.3} blur>
            <h2 className="text-xl md:text-2xl font-medium text-ink-muted mb-6">
              Full Stack <span className="text-accent font-semibold">Web Developer</span>
            </h2>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.4} blur>
            <p className="text-ink-muted text-base leading-relaxed max-w-lg mb-12">
              CS graduate with {years} year{years > 1 ? "s" : ""}
              {months > 0 ? ` and ${months} month${months > 1 ? "s" : ""}` : ""} of
              experience building full-stack applications. I thrive at the
              intersection of creative problem-solving and technical implementation,
              with a growing focus on AI & Machine Learning projects.
            </p>
          </BlurFade>

          {/* Contact row */}
          <BlurFade delay={0.5}>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="https://www.google.com/maps/place/Cebu+City"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink-faint hover:text-ink transition-colors duration-200 text-sm"
              >
                <MapPin size={14} className="text-accent" />
                Cebu City, Philippines
              </a>

              <span className="w-px h-4 bg-white/15" />

              <div className="flex items-center gap-3">
                <a
                  href={SITE_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full glass text-ink-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
                >
                  <Github size={16} />
                </a>
                <a
                  href={SITE_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full glass text-ink-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Right — profile image */}
        <BlurFade delay={0.35} className="flex-shrink-0">
          <div className="relative w-56 h-72 md:w-64 md:h-80">
            {/* Lime radial glow behind portrait */}
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgb(163 230 53 / 0.14) 0%, transparent 70%)",
              }}
            />
            {/* Glass frame */}
            <div className="glass rounded-2xl p-2 w-full h-full">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/MINGO_JUNRY.jpg"
                  alt="Junry Mingo"
                  fill
                  quality={100}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  );
};

export default Main;

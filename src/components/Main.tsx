import { Github, Linkedin, MapPin } from "lucide-react";
import React from "react";
import Image from "next/image";
import BlurFade from "./BlurFade";

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400" />
              </span>
              <span className="text-sm text-white/50">Available for work</span>
            </div>
          </BlurFade>

          {/* Hi label */}
          <BlurFade delay={0.2}>
            <p className="text-white/40 text-lg mb-2 tracking-wide">Hi, I&apos;m</p>
          </BlurFade>

          {/* Name */}
          <BlurFade delay={0.25}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-6"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Junry Mingo
            </h1>
          </BlurFade>

          {/* Title */}
          <BlurFade delay={0.3}>
            <h2 className="text-xl md:text-2xl font-medium text-white/60 mb-6">
              Full Stack <span className="text-lime-400 font-semibold">Web Developer</span>
            </h2>
          </BlurFade>

          {/* Description */}
          <BlurFade delay={0.4}>
            <p className="text-white/40 text-base leading-relaxed max-w-lg mb-12">
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
                className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-200 text-sm"
              >
                <MapPin size={14} className="text-lime-400" />
                Cebu City, Philippines
              </a>

              <span className="w-px h-4 bg-white/15" />

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/MingoMango17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/50 hover:text-lime-400 hover:border-lime-400/40 transition-all duration-200"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/junry-mingo-2bb819246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/50 hover:text-lime-400 hover:border-lime-400/40 transition-all duration-200"
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
            {/* Lime accent border */}
            <div className="absolute inset-0 rounded-2xl border border-lime-400/20" />
            {/* Offset lime block decoration */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-lime-400/10" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/MINGO_JUNRY.jpg"
                alt="Junry Mingo"
                fill
                quality={100}
                className="object-cover"
              />
            </div>
          </div>
        </BlurFade>

      </div>
    </section>
  );
};

export default Main;

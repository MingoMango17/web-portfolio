import { Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import BlurFade from "./BlurFade";

const links = [
  {
    label: "Email",
    value: "mingojunry@gmail.com",
    href: "mailto:mingojunry@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "junry-mingo",
    href: "https://www.linkedin.com/in/junry-mingo-2bb819246/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "MingoMango17",
    href: "https://github.com/MingoMango17",
    icon: Github,
  },
  {
    label: "Location",
    value: "Cebu City, Philippines",
    href: "https://www.google.com/maps/place/Cebu+City",
    icon: MapPin,
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1}>
        <p className="text-xs uppercase tracking-widest text-lime-400 mb-4 font-semibold">
          Contact
        </p>
      </BlurFade>

      <BlurFade delay={0.15}>
        <h2
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Let&apos;s work
          <br />
          <span className="text-lime-400">together.</span>
        </h2>
      </BlurFade>

      <BlurFade delay={0.2}>
        <p className="text-white/40 text-base max-w-md leading-relaxed mb-14">
          I&apos;m open to new opportunities, collaborations, or just a good
          conversation. Feel free to reach out through any of the channels
          below.
        </p>
      </BlurFade>

      {/* Availability badge */}
      <BlurFade delay={0.25}>
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/5 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
          </span>
          <span className="text-sm text-lime-400/80">Available for freelance &amp; full-time</span>
        </div>
      </BlurFade>

      {/* Contact links */}
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <BlurFade key={link.label} delay={0.3 + i * 0.07}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-lime-400/30 hover:bg-lime-400/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-lime-400 group-hover:border-lime-400/30 transition-all duration-300">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-white/25 mb-0.5">{link.label}</p>
                    <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-white/20 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </a>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;

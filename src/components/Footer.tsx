import React from "react";
import { SITE_GITHUB } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="min-h-[60vh] md:min-h-screen w-full flex flex-col items-center justify-center border-t border-white/10 relative">
      <p
        className="text-4xl md:text-6xl font-thin text-ink-faint tracking-widest text-center px-6"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        Thank you :)
      </p>
      <a
        href={SITE_GITHUB}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10 text-ink-faint hover:text-ink text-sm transition-colors duration-200"
      >
        github.com/MingoMango17
      </a>
    </footer>
  );
};

export default Footer;

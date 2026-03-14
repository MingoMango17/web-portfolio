import React from "react";

const Footer = () => {
  return (
    <footer className="h-screen w-full flex flex-col items-center justify-center border-t border-white/5 relative">
      <p
        className="text-4xl md:text-6xl font-thin text-white/20 tracking-widest text-center px-6"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        Thank you :)
      </p>
      <a
        href="https://github.com/MingoMango17"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10 text-white/25 hover:text-white/60 text-sm transition-colors duration-200"
      >
        github.com/MingoMango17
      </a>
    </footer>
  );
};

export default Footer;

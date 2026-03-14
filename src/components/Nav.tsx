"use client";

import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="fixed top-6 right-6 md:top-8 md:right-16 z-50">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5 text-sm">
        <a
          href="https://github.com/MingoMango17"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-white/70 hover:text-white transition-colors duration-200"
        >
          Source Code
        </a>
        <span className="hidden md:block w-px h-4 bg-white/20" />
        <Link
          href="/resume.pdf"
          download
          className="bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-full px-4 py-1 transition-colors duration-200"
        >
          Download CV
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

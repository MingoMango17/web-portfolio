"use client";

import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="fixed top-6 right-6 md:top-8 md:right-16 z-50">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5 text-sm">
        <Link
          href="/resume"
          className="bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-full px-4 py-1 transition-colors duration-200"
        >
          View CV
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

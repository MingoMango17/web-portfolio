"use client";

import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav aria-label="Main" className="fixed top-6 right-6 md:top-8 md:right-16 z-50">
      <div className="flex items-center gap-3 glass-strong rounded-full px-4 py-2.5 text-sm">
        <Link
          href="/resume"
          className="bg-accent hover:bg-accent-hover text-[#0a0f1a] font-semibold rounded-full px-4 py-1 transition-colors duration-200"
        >
          View CV
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

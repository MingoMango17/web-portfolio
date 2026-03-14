"use client";

import React from "react";

const RESUME_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume/resume.pdf`;

const Nav = () => {
  return (
    <nav className="fixed top-6 right-6 md:top-8 md:right-16 z-50">
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5 text-sm">
        {/* <a */}
        {/*   href="https://github.com/MingoMango17" */}
        {/*   target="_blank" */}
        {/*   rel="noopener noreferrer" */}
        {/*   className="hidden md:block text-white/70 hover:text-white transition-colors duration-200" */}
        {/* > */}
        {/*   Source Code */}
        {/* </a> */}
        {/* <span className="hidden md:block w-px h-4 bg-white/20" /> */}
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-full px-4 py-1 transition-colors duration-200"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
};

export default Nav;

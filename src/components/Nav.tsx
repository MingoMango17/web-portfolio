// Nav.jsx
"use client"
import React from "react";
import Link from "next/link";

const Nav = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#030712] py-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <svg height="60" viewBox="0 0 160 60">
          <text
            y="37"
            fontFamily="monospace"
            fontSize="28"
            fontWeight="bold"
            fill="white"
          >
            {"<"}JM /{">"}
          </text>
        </svg>

        <div className="flex gap-8 text-center items-center">
          <span 
            className="text-white cursor-pointer hover:text-gray-300"
            onClick={() => scrollToSection("about")}
          >
            About
          </span>
          <span 
            className="text-white cursor-pointer hover:text-gray-300"
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </span>
          <span 
            className="text-white cursor-pointer hover:text-gray-300"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </span>
          <Link 
            href="/resume.pdf" 
            download
            className="bg-white text-[#030712] px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
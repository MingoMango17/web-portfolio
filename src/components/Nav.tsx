// Nav.jsx
import React from "react";

const Nav = () => {
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

        <div className="flex gap-8 text-center">
          <span>About</span>
          <span>Work</span>
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
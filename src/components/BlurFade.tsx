"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  /**
   * Animate filter blur. Only enable for pure-text content —
   * animating `filter` on an ancestor breaks descendant
   * `backdrop-filter` (glass) in Chromium/Safari.
   */
  blur?: boolean;
}

export default function BlurFade({
  children,
  delay = 0,
  className = "",
  yOffset = 10,
  blur = false,
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: yOffset,
              ...(blur ? { filter: "blur(6px)" } : {}),
            }
      }
      animate={
        isInView
          ? { opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }
          : {}
      }
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

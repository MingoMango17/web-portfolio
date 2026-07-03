import React from "react";

type Variant = "primary" | "ghost" | "danger-ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent hover:bg-accent-hover text-[#0a0f1a] font-semibold",
  ghost:
    "border border-white/10 text-ink-muted hover:text-ink hover:border-white/25 bg-white/[0.03]",
  "danger-ghost":
    "border border-red-400/20 text-red-400 hover:bg-red-400/10 hover:border-red-400/40",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

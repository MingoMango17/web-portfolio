import React from "react";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  strong?: boolean;
}

export default function GlassCard({
  children,
  className,
  as: Tag = "div",
  strong = false,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(strong ? "glass-strong" : "glass", "rounded-2xl", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

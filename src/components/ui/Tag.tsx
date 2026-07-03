export default function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs text-ink-faint border border-white/10 bg-white/[0.03] rounded-full px-2.5 py-1 ${className}`}
    >
      {children}
    </span>
  );
}

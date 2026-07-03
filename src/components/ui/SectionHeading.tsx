interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
      >
        {title}
      </h2>
    </div>
  );
}

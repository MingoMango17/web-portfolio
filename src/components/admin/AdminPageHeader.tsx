interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({
  eyebrow = "Manage",
  title,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
      </div>
      {action}
    </div>
  );
}

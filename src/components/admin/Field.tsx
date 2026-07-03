"use client";

import { useId } from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  min?: number;
  max?: number;
}

export default function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  placeholder = "",
  required = false,
  rows = 3,
  min,
  max,
}: FieldProps) {
  const id = useId();
  const base =
    "w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-ink-faint/60";

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs text-ink-faint uppercase tracking-widest block mb-1.5"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none`}
          rows={rows}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}

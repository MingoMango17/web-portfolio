"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Experience } from "@/types";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const empty = {
  company: "",
  role: "",
  period: "",
  initials: "",
  bullets: "",
  order_index: 0,
};

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { data } = await supabase
      .from("experiences")
      .select("*")
      .order("order_index");
    if (data) setExperiences(data);
  };

  const openAdd = () => {
    setForm(empty);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (e: Experience) => {
    setForm({
      company: e.company,
      role: e.role,
      period: e.period,
      initials: e.initials,
      bullets: e.bullets.join("\n"),
      order_index: e.order_index,
    });
    setEditingId(e.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      company: form.company,
      role: form.role,
      period: form.period,
      initials: form.initials,
      bullets: form.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
      order_index: Number(form.order_index),
    };

    if (editingId) {
      await supabase.from("experiences").update(payload).eq("id", editingId);
    } else {
      await supabase.from("experiences").insert(payload);
    }

    setForm(empty);
    setEditingId(null);
    setShowForm(false);
    setLoading(false);
    await revalidateSite();
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await supabase.from("experiences").delete().eq("id", id);
    await revalidateSite();
    fetch();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
            Manage
          </p>
          <h1 className="text-2xl font-bold text-white">Experience</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Add Entry
        </button>
      </div>

      {showForm && (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">
              {editingId ? "Edit Entry" : "New Entry"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Company / Institution"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                required
              />
              <Field
                label="Role / Degree"
                value={form.role}
                onChange={(v) => setForm({ ...form, role: v })}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field
                label="Period"
                value={form.period}
                onChange={(v) => setForm({ ...form, period: v })}
                placeholder="July 2023 – Present"
                required
              />
              <Field
                label="Initials (2–3 chars)"
                value={form.initials}
                onChange={(v) => setForm({ ...form, initials: v })}
                placeholder="HQ"
                required
              />
              <Field
                label="Order Index"
                type="number"
                value={String(form.order_index)}
                onChange={(v) => setForm({ ...form, order_index: Number(v) })}
              />
            </div>
            <Field
              label="Bullet points (one per line)"
              value={form.bullets}
              onChange={(v) => setForm({ ...form, bullets: v })}
              multiline
              placeholder={"Built a kanban board with Vue.js and Django.\nCollaborated with senior developers."}
              required
            />
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {loading ? "Saving…" : editingId ? "Save Changes" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-start justify-between gap-4 bg-white/[0.03] border border-white/8 rounded-xl px-5 py-4 hover:border-white/15 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-white/20 font-mono">
                  #{exp.order_index}
                </span>
                <h3 className="text-white font-medium text-sm">
                  {exp.company}
                </h3>
              </div>
              <p className="text-lime-400/60 text-xs mb-1">{exp.role}</p>
              <p className="text-white/25 text-xs">{exp.period}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(exp)}
                className="p-2 rounded-lg text-white/30 hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-200"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-white/20 text-sm text-center py-12">
            No entries yet.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  placeholder = "",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const base =
    "w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors placeholder:text-white/20";
  return (
    <div>
      <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none`}
          rows={4}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}

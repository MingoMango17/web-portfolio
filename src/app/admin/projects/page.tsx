"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Project } from "@/types";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const empty = {
  name: "",
  description: "",
  link: "",
  github: "",
  image: "",
  tags: "",
  order_index: 0,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
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
      .from("projects")
      .select("*")
      .order("order_index");
    if (data) setProjects(data);
  };

  const openAdd = () => {
    setForm(empty);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setForm({
      name: p.name,
      description: p.description,
      link: p.link ?? "",
      github: p.github ?? "",
      image: p.image,
      tags: p.tags.join("\n"),
      order_index: p.order_index,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      description: form.description,
      link: form.link || null,
      github: form.github || null,
      image: form.image,
      tags: form.tags.split("\n").map((t) => t.trim()).filter(Boolean),
      order_index: Number(form.order_index),
    };

    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
    } else {
      await supabase.from("projects").insert(payload);
    }

    setForm(empty);
    setEditingId(null);
    setShowForm(false);
    setLoading(false);
    await revalidateSite();
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
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
          <h1 className="text-2xl font-bold text-white">Projects</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">
              {editingId ? "Edit Project" : "New Project"}
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
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
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
              label="Description"
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              multiline
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Live URL"
                value={form.link}
                onChange={(v) => setForm({ ...form, link: v })}
                placeholder="https://..."
              />
              <Field
                label="GitHub URL"
                value={form.github}
                onChange={(v) => setForm({ ...form, github: v })}
                placeholder="https://github.com/..."
              />
            </div>
            <Field
              label="Image path (e.g. /artefy.png)"
              value={form.image}
              onChange={(v) => setForm({ ...form, image: v })}
              required
            />
            <Field
              label="Tags (one per line)"
              value={form.tags}
              onChange={(v) => setForm({ ...form, tags: v })}
              multiline
              placeholder={"Vue.js\nFirebase\nTailwind CSS"}
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

      {/* List */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-start justify-between gap-4 bg-white/[0.03] border border-white/8 rounded-xl px-5 py-4 group hover:border-white/15 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white/20 font-mono">
                  #{p.order_index}
                </span>
                <h3 className="text-white font-medium text-sm">{p.name}</h3>
              </div>
              <p className="text-white/35 text-xs line-clamp-1 mb-2">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] text-white/30 border border-white/8 rounded-full px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(p)}
                className="p-2 rounded-lg text-white/30 hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-200"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-white/20 text-sm text-center py-12">
            No projects yet. Add your first one.
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
          rows={3}
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

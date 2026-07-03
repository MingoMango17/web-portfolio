"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Experience } from "@/types";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import Field from "@/components/admin/Field";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SortableList from "@/components/admin/SortableList";
import Button from "@/components/ui/Button";

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
    setForm({ ...empty, order_index: experiences.length });
    setEditingId(null);
    setShowForm(true);
  };

  const handleReorder = (list: Experience[]) => {
    setExperiences(list.map((exp, i) => ({ ...exp, order_index: i })));
  };

  const persistOrder = async () => {
    await Promise.all(
      experiences.map((exp, i) =>
        supabase.from("experiences").update({ order_index: i }).eq("id", exp.id)
      )
    );
    await revalidateSite();
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
      <AdminPageHeader
        title="Experience"
        action={
          <Button onClick={openAdd}>
            <Plus size={15} />
            Add Entry
          </Button>
        }
      />

      {showForm && (
        <div className="glass-strong rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-ink font-semibold">
              {editingId ? "Edit Entry" : "New Entry"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="text-ink-faint hover:text-ink-muted transition-colors"
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <Field
              label="Bullet points (one per line)"
              value={form.bullets}
              onChange={(v) => setForm({ ...form, bullets: v })}
              multiline
              rows={4}
              placeholder={"Built a kanban board with Vue.js and Django.\nCollaborated with senior developers."}
              required
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving…" : editingId ? "Save Changes" : "Create"}
              </Button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-ink-muted hover:text-ink text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <SortableList
        items={experiences}
        onReorder={handleReorder}
        onDragEnd={persistOrder}
        getKey={(exp) => exp.id}
        className="space-y-3"
        renderItem={(exp) => (
          <div className="flex items-start justify-between gap-4 glass rounded-xl px-5 py-4 hover:border-white/20 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-ink-faint font-mono">
                  #{exp.order_index}
                </span>
                <h3 className="text-ink font-medium text-sm">
                  {exp.company}
                </h3>
              </div>
              <p className="text-accent/70 text-xs mb-1">{exp.role}</p>
              <p className="text-ink-faint text-xs">{exp.period}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(exp)}
                aria-label={`Edit ${exp.company}`}
                className="p-2 rounded-lg text-ink-faint hover:text-accent hover:bg-accent/10 transition-all duration-200"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                aria-label={`Delete ${exp.company}`}
                className="p-2 rounded-lg text-ink-faint hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      />
      {experiences.length === 0 && (
        <p className="text-ink-faint text-sm text-center py-12">
          No entries yet.
        </p>
      )}
    </div>
  );
}

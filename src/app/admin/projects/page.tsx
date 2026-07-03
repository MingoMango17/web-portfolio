"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Project } from "@/types";
import { Pencil, Trash2, Plus, X, Upload, Loader2 } from "lucide-react";
import Field from "@/components/admin/Field";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SortableList from "@/components/admin/SortableList";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

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
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    setForm({ ...empty, order_index: projects.length });
    setEditingId(null);
    setShowForm(true);
  };

  const handleReorder = (list: Project[]) => {
    setProjects(list.map((p, i) => ({ ...p, order_index: i })));
  };

  const persistOrder = async () => {
    await Promise.all(
      projects.map((p, i) =>
        supabase.from("projects").update({ order_index: i }).eq("id", p.id)
      )
    );
    await revalidateSite();
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

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: true });
    if (error) {
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(path);
    setForm((f) => ({ ...f, image: data.publicUrl }));
    setUploading(false);
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
      <AdminPageHeader
        title="Projects"
        action={
          <Button onClick={openAdd}>
            <Plus size={15} />
            Add Project
          </Button>
        }
      />

      {/* Form */}
      {showForm && (
        <div className="glass-strong rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-ink font-semibold">
              {editingId ? "Edit Project" : "New Project"}
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
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
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
            {/* Image upload */}
            <div>
              <label className="text-xs text-ink-faint uppercase tracking-widest block mb-1.5">
                Image
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 text-ink-muted hover:text-ink text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Upload size={14} />
                  )}
                  {uploading ? "Uploading…" : "Upload image"}
                </button>
                {form.image && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={form.image}
                      alt={`${form.name} preview`}
                      width={40}
                      height={40}
                      className="rounded object-cover w-10 h-10"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      aria-label="Remove image"
                      className="text-ink-faint hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                  e.target.value = "";
                }}
              />
            </div>
            <Field
              label="Tags (one per line)"
              value={form.tags}
              onChange={(v) => setForm({ ...form, tags: v })}
              multiline
              placeholder={"Vue.js\nFirebase\nTailwind CSS"}
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

      {/* List */}
      <SortableList
        items={projects}
        onReorder={handleReorder}
        onDragEnd={persistOrder}
        getKey={(p) => p.id}
        className="space-y-3"
        renderItem={(p) => (
          <div className="flex items-start justify-between gap-4 glass rounded-xl px-5 py-4 group hover:border-white/20 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-ink-faint font-mono">
                  #{p.order_index}
                </span>
                <h3 className="text-ink font-medium text-sm">{p.name}</h3>
              </div>
              <p className="text-ink-muted text-xs line-clamp-1 mb-2">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t} className="text-[10px] px-2 py-0.5">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(p)}
                aria-label={`Edit ${p.name}`}
                className="p-2 rounded-lg text-ink-faint hover:text-accent hover:bg-accent/10 transition-all duration-200"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                aria-label={`Delete ${p.name}`}
                className="p-2 rounded-lg text-ink-faint hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )}
      />
      <div>
        {projects.length === 0 && (
          <p className="text-ink-faint text-sm text-center py-12">
            No projects yet. Add your first one.
          </p>
        )}
      </div>
    </div>
  );
}

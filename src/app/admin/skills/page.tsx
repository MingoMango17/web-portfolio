"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Skill, Tool } from "@/types";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import Field from "@/components/admin/Field";
import Button from "@/components/ui/Button";
import SortableList from "@/components/admin/SortableList";

const emptySkill = { name: "", level: 80, order_index: 0 };
const emptyTool = { name: "", icon: "", order_index: 0 };

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  const [skillForm, setSkillForm] = useState(emptySkill);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const [toolForm, setToolForm] = useState(emptyTool);
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [showToolForm, setShowToolForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [s, t] = await Promise.all([
      supabase.from("skills").select("*").order("order_index"),
      supabase.from("tools").select("*").order("order_index"),
    ]);
    if (s.data) setSkills(s.data);
    if (t.data) setTools(t.data);
  };

  // ── Skills CRUD ──────────────────────────────────────
  const openAddSkill = () => {
    setSkillForm({ ...emptySkill, order_index: skills.length });
    setEditingSkillId(null);
    setShowSkillForm(true);
  };

  const reorderSkills = (list: Skill[]) => {
    setSkills(list.map((s, i) => ({ ...s, order_index: i })));
  };

  const persistSkillOrder = async () => {
    await Promise.all(
      skills.map((s, i) =>
        supabase.from("skills").update({ order_index: i }).eq("id", s.id)
      )
    );
    await revalidateSite();
  };

  const openEditSkill = (s: Skill) => {
    setSkillForm({ name: s.name, level: s.level, order_index: s.order_index });
    setEditingSkillId(s.id);
    setShowSkillForm(true);
  };

  const submitSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...skillForm, level: Number(skillForm.level), order_index: Number(skillForm.order_index) };
    if (editingSkillId) {
      await supabase.from("skills").update(payload).eq("id", editingSkillId);
    } else {
      await supabase.from("skills").insert(payload);
    }
    setShowSkillForm(false);
    setEditingSkillId(null);
    setLoading(false);
    await revalidateSite();
    fetchAll();
  };

  const deleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await supabase.from("skills").delete().eq("id", id);
    await revalidateSite();
    fetchAll();
  };

  // ── Tools CRUD ───────────────────────────────────────
  const openAddTool = () => {
    setToolForm({ ...emptyTool, order_index: tools.length });
    setEditingToolId(null);
    setShowToolForm(true);
  };

  const reorderTools = (list: Tool[]) => {
    setTools(list.map((t, i) => ({ ...t, order_index: i })));
  };

  const persistToolOrder = async () => {
    await Promise.all(
      tools.map((t, i) =>
        supabase.from("tools").update({ order_index: i }).eq("id", t.id)
      )
    );
    await revalidateSite();
  };

  const openEditTool = (t: Tool) => {
    setToolForm({ name: t.name, icon: t.icon, order_index: t.order_index });
    setEditingToolId(t.id);
    setShowToolForm(true);
  };

  const submitTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...toolForm, order_index: Number(toolForm.order_index) };
    if (editingToolId) {
      await supabase.from("tools").update(payload).eq("id", editingToolId);
    } else {
      await supabase.from("tools").insert(payload);
    }
    setShowToolForm(false);
    setEditingToolId(null);
    setLoading(false);
    await revalidateSite();
    fetchAll();
  };

  const deleteTool = async (id: string) => {
    if (!confirm("Delete this tool?")) return;
    await supabase.from("tools").delete().eq("id", id);
    await revalidateSite();
    fetchAll();
  };

  return (
    <div className="max-w-4xl space-y-14">
      {/* ── Skills ── */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
              Manage
            </p>
            <h1 className="text-2xl font-bold text-ink">Skills</h1>
            <p className="text-ink-faint text-xs mt-1">Progress bar proficiencies</p>
          </div>
          <Button onClick={openAddSkill}>
            <Plus size={15} />
            Add Skill
          </Button>
        </div>

        {showSkillForm && (
          <div className="glass-strong rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-ink font-semibold">
                {editingSkillId ? "Edit Skill" : "New Skill"}
              </h2>
              <button
                onClick={() => setShowSkillForm(false)}
                aria-label="Close form"
                className="text-ink-faint hover:text-ink-muted"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submitSkill} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Name"
                  value={skillForm.name}
                  onChange={(v) => setSkillForm({ ...skillForm, name: v })}
                  required
                />
                <Field
                  label="Level (0–100)"
                  type="number"
                  min={0}
                  max={100}
                  value={String(skillForm.level)}
                  onChange={(v) => setSkillForm({ ...skillForm, level: Number(v) })}
                  required
                />
              </div>
              <div className="flex gap-3 pt-1">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving…" : editingSkillId ? "Save Changes" : "Create"}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowSkillForm(false)}
                  className="text-ink-muted hover:text-ink text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <SortableList
          items={skills}
          onReorder={reorderSkills}
          onDragEnd={persistSkillOrder}
          getKey={(s) => s.id}
          className="space-y-2"
          renderItem={(s) => (
            <div className="flex items-center gap-4 glass rounded-xl px-5 py-3 hover:border-white/20 transition-colors">
              <span className="text-ink-faint text-xs font-mono w-5">#{s.order_index}</span>
              <span className="text-ink text-sm flex-1">{s.name}</span>
              <div className="flex items-center gap-2 w-32">
                <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${s.level}%` }} />
                </div>
                <span className="text-accent text-xs font-mono w-8 text-right">{s.level}%</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditSkill(s)}
                  aria-label={`Edit ${s.name}`}
                  className="p-2 rounded-lg text-ink-faint hover:text-accent hover:bg-accent/10 transition-all"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteSkill(s.id)}
                  aria-label={`Delete ${s.name}`}
                  className="p-2 rounded-lg text-ink-faint hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        />
      </div>

      {/* ── Tools ── */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
              Manage
            </p>
            <h1 className="text-2xl font-bold text-ink">Tools</h1>
            <p className="text-ink-faint text-xs mt-1">Icon grid technologies</p>
          </div>
          <Button onClick={openAddTool}>
            <Plus size={15} />
            Add Tool
          </Button>
        </div>

        {showToolForm && (
          <div className="glass-strong rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-ink font-semibold">
                {editingToolId ? "Edit Tool" : "New Tool"}
              </h2>
              <button
                onClick={() => setShowToolForm(false)}
                aria-label="Close form"
                className="text-ink-faint hover:text-ink-muted"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submitTool} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Name"
                  value={toolForm.name}
                  onChange={(v) => setToolForm({ ...toolForm, name: v })}
                  required
                />
                <Field
                  label="Icon path (e.g. /react.png)"
                  value={toolForm.icon}
                  onChange={(v) => setToolForm({ ...toolForm, icon: v })}
                  required
                />
              </div>
              <div className="flex gap-3 pt-1">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving…" : editingToolId ? "Save Changes" : "Create"}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowToolForm(false)}
                  className="text-ink-muted hover:text-ink text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <SortableList
          items={tools}
          onReorder={reorderTools}
          onDragEnd={persistToolOrder}
          getKey={(t) => t.id}
          className="space-y-2"
          renderItem={(t) => (
            <div className="flex items-center gap-4 glass rounded-xl px-5 py-3 hover:border-white/20 transition-colors">
              <span className="text-ink-faint text-xs font-mono w-5">#{t.order_index}</span>
              <span className="text-ink text-sm flex-1">{t.name}</span>
              <span className="text-ink-faint text-xs font-mono">{t.icon}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditTool(t)}
                  aria-label={`Edit ${t.name}`}
                  className="p-2 rounded-lg text-ink-faint hover:text-accent hover:bg-accent/10 transition-all"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => deleteTool(t.id)}
                  aria-label={`Delete ${t.name}`}
                  className="p-2 rounded-lg text-ink-faint hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}

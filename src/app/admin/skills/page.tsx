"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { Skill, Tool } from "@/types";
import { Pencil, Trash2, Plus, X } from "lucide-react";

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
    setSkillForm(emptySkill);
    setEditingSkillId(null);
    setShowSkillForm(true);
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
    setToolForm(emptyTool);
    setEditingToolId(null);
    setShowToolForm(true);
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
            <p className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
              Manage
            </p>
            <h1 className="text-2xl font-bold text-white">Skills</h1>
            <p className="text-white/30 text-xs mt-1">Progress bar proficiencies</p>
          </div>
          <button
            onClick={openAddSkill}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} />
            Add Skill
          </button>
        </div>

        {showSkillForm && (
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold">
                {editingSkillId ? "Edit Skill" : "New Skill"}
              </h2>
              <button onClick={() => setShowSkillForm(false)} className="text-white/30 hover:text-white/60">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submitSkill} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">Name</label>
                  <input
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
                    Level (0–100)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">Order</label>
                  <input
                    type="number"
                    value={skillForm.order_index}
                    onChange={(e) => setSkillForm({ ...skillForm, order_index: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving…" : editingSkillId ? "Save Changes" : "Create"}
                </button>
                <button type="button" onClick={() => setShowSkillForm(false)} className="text-white/40 hover:text-white text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-2">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3 hover:border-white/15 transition-colors">
              <span className="text-white/20 text-xs font-mono w-5">#{s.order_index}</span>
              <span className="text-white text-sm flex-1">{s.name}</span>
              <div className="flex items-center gap-2 w-32">
                <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-lime-400 rounded-full" style={{ width: `${s.level}%` }} />
                </div>
                <span className="text-lime-400 text-xs font-mono w-8 text-right">{s.level}%</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditSkill(s)} className="p-2 rounded-lg text-white/30 hover:text-lime-400 hover:bg-lime-400/10 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => deleteSkill(s.id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools ── */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
              Manage
            </p>
            <h1 className="text-2xl font-bold text-white">Tools</h1>
            <p className="text-white/30 text-xs mt-1">Icon grid technologies</p>
          </div>
          <button
            onClick={openAddTool}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} />
            Add Tool
          </button>
        </div>

        {showToolForm && (
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold">
                {editingToolId ? "Edit Tool" : "New Tool"}
              </h2>
              <button onClick={() => setShowToolForm(false)} className="text-white/30 hover:text-white/60">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={submitTool} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">Name</label>
                  <input
                    value={toolForm.name}
                    onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
                    Icon path (e.g. /react.png)
                  </label>
                  <input
                    value={toolForm.icon}
                    onChange={(e) => setToolForm({ ...toolForm, icon: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">Order</label>
                  <input
                    type="number"
                    value={toolForm.order_index}
                    onChange={(e) => setToolForm({ ...toolForm, order_index: Number(e.target.value) })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving…" : editingToolId ? "Save Changes" : "Create"}
                </button>
                <button type="button" onClick={() => setShowToolForm(false)} className="text-white/40 hover:text-white text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-2">
          {tools.map((t) => (
            <div key={t.id} className="flex items-center gap-4 bg-white/[0.03] border border-white/8 rounded-xl px-5 py-3 hover:border-white/15 transition-colors">
              <span className="text-white/20 text-xs font-mono w-5">#{t.order_index}</span>
              <span className="text-white text-sm flex-1">{t.name}</span>
              <span className="text-white/25 text-xs font-mono">{t.icon}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => openEditTool(t)} className="p-2 rounded-lg text-white/30 hover:text-lime-400 hover:bg-lime-400/10 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => deleteTool(t.id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { AboutContent } from "@/types";

const fallback: Omit<AboutContent, "id"> = {
  paragraph1:
    "I'm a passionate Full Stack Developer currently pursuing my Bachelor's in Computer Science at the University of the Philippines Cebu. I combine academic knowledge with hands-on industry experience to build efficient, user-centered applications.",
  paragraph2:
    "My journey began as an intern at HQZen/BPOseats building a full-stack kanban board with Vue.js and Django. Outside of work, I'm always exploring the latest in AI, machine learning, and automotive engineering — interests that shape how I approach every project I build.",
};

export default function AboutAdmin() {
  const [form, setForm] = useState(fallback);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("about").select("*").eq("id", 1).single();
      if (data) setForm({ paragraph1: data.paragraph1, paragraph2: data.paragraph2 });
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("about").upsert({ id: 1, ...form });
    await revalidateSite();
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const base =
    "w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors placeholder:text-white/20 resize-none";

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
          Manage
        </p>
        <h1 className="text-2xl font-bold text-white">About</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/[0.03] border border-white/10 rounded-xl p-6 space-y-5"
      >
        <div>
          <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
            Paragraph 1
          </label>
          <textarea
            rows={5}
            className={base}
            value={form.paragraph1}
            onChange={(e) => setForm({ ...form, paragraph1: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
            Paragraph 2
          </label>
          <textarea
            rows={5}
            className={base}
            value={form.paragraph2}
            onChange={(e) => setForm({ ...form, paragraph2: e.target.value })}
            required
          />
        </div>
        <div className="flex items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <span className="text-lime-400 text-sm">Saved!</span>
          )}
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { revalidateSite } from "@/lib/revalidate";
import { AboutContent } from "@/types";
import Field from "@/components/admin/Field";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Button from "@/components/ui/Button";

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

  return (
    <div className="max-w-2xl">
      <AdminPageHeader title="About" />

      <form
        onSubmit={handleSubmit}
        className="glass-strong rounded-xl p-6 space-y-5"
      >
        <Field
          label="Paragraph 1"
          value={form.paragraph1}
          onChange={(v) => setForm({ ...form, paragraph1: v })}
          multiline
          rows={5}
          required
        />
        <Field
          label="Paragraph 2"
          value={form.paragraph2}
          onChange={(v) => setForm({ ...form, paragraph2: v })}
          multiline
          rows={5}
          required
        />
        <div className="flex items-center gap-4 pt-1">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
          {saved && (
            <span role="status" className="text-accent text-sm">
              Saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

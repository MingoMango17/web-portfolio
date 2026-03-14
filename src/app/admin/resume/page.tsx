"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Upload, Trash2, FileText, ExternalLink } from "lucide-react";

const BUCKET = "resume";
const FILE_NAME = "resume.pdf";

export default function AdminResumePage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const notify = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 4000);
  };

  const fetchResume = async () => {
    const { data } = await supabase.storage.from(BUCKET).list("", { search: FILE_NAME });
    if (data && data.length > 0) {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(FILE_NAME);
      setResumeUrl(urlData.publicUrl);
    } else {
      setResumeUrl(null);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      notify("error", "Only PDF files are allowed.");
      return;
    }

    setUploading(true);
    const { error } = await supabase.storage.from(BUCKET).upload(FILE_NAME, file, {
      upsert: true,
      contentType: "application/pdf",
    });

    if (error) {
      notify("error", error.message);
    } else {
      await fetchResume();
      notify("success", "Resume uploaded successfully.");
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async () => {
    if (!confirm("Remove the current resume?")) return;
    const { error } = await supabase.storage.from(BUCKET).remove([FILE_NAME]);
    if (error) {
      notify("error", error.message);
    } else {
      setResumeUrl(null);
      notify("success", "Resume removed.");
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-bold text-white mb-1">Resume</h2>
      <p className="text-white/40 text-sm mb-8">
        Upload a PDF to replace the downloadable CV on your portfolio.
      </p>

      {status && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm ${
            status.type === "success"
              ? "bg-lime-400/10 text-lime-400 border border-lime-400/20"
              : "bg-red-400/10 text-red-400 border border-red-400/20"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Current resume */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-6">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Current Resume</p>
        {resumeUrl ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                <FileText size={18} className="text-lime-400" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">{FILE_NAME}</p>
                <p className="text-xs text-white/30">PDF document</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
              >
                <ExternalLink size={12} />
                Preview
              </a>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400/70 hover:text-red-400 border border-red-400/10 hover:border-red-400/30 transition-colors"
              >
                <Trash2 size={12} />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white/25 text-sm">No resume uploaded yet.</p>
        )}
      </div>

      {/* Upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-white/15 hover:border-lime-400/40 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors group"
      >
        <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-lime-400/10 border border-white/10 group-hover:border-lime-400/20 flex items-center justify-center transition-colors">
          <Upload size={20} className="text-white/30 group-hover:text-lime-400 transition-colors" />
        </div>
        <div className="text-center">
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
            {uploading ? "Uploading…" : resumeUrl ? "Click to replace PDF" : "Click to upload PDF"}
          </p>
          <p className="text-xs text-white/25 mt-1">PDF only</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>
    </div>
  );
}

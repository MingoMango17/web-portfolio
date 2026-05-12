"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export default function DownloadButton({ url }: { url: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "resume.pdf";
      a.click();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-colors disabled:opacity-40"
    >
      <Download size={12} />
      {loading ? "Downloading…" : "Download"}
    </button>
  );
}

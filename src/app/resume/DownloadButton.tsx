"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";

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
    <Button variant="primary" onClick={handleDownload} disabled={loading}>
      <Download size={12} />
      {loading ? "Downloading…" : "Download"}
    </Button>
  );
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DownloadButton from "./DownloadButton";

const RESUME_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resume/resume.pdf`;

export const metadata = {
  title: "Resume | Junry Mingo",
  description: "Junry Mingo's Resume",
};

export default function ResumePage() {
  return (
    <div className="fixed inset-0 bg-base flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 glass-strong border-x-0 border-t-0 rounded-none">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink-muted hover:text-ink border border-white/10 hover:border-white/25 bg-white/[0.03] transition-colors"
        >
          <ArrowLeft size={12} />
          Back
        </Link>
        <DownloadButton url={RESUME_URL} />
      </div>

      {/* PDF viewer */}
      <iframe
        src={`${RESUME_URL}#toolbar=0`}
        className="flex-1 w-full"
        title="Resume"
      />
    </div>
  );
}

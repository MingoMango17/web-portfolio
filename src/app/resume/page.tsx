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
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/admin/about", label: "About" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills & Tools" },
  { href: "/admin/resume", label: "Resume" },
  { href: "/admin/visits", label: "Visits" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const supabase = createClient();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const sidebarContent = (
    <>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-1">
          Portfolio
        </p>
        <h1 className="text-ink font-bold">Admin CMS</h1>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setDrawerOpen(false)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname.startsWith(item.href)
                ? "bg-accent/10 text-accent"
                : "text-ink-muted hover:text-ink hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="block px-3 py-2 rounded-lg text-xs text-ink-faint hover:text-ink-muted hover:bg-white/5 transition-colors"
        >
          ↗ View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-ink-faint hover:text-ink-muted hover:bg-white/5 transition-colors"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 glass-strong rounded-none border-x-0 border-t-0 flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">
            Portfolio
          </p>
          <span className="text-ink font-bold text-sm">Admin CMS</span>
        </div>
        <button
          onClick={() => setDrawerOpen((o) => !o)}
          aria-expanded={drawerOpen}
          aria-controls="admin-drawer"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/5 transition-colors"
        >
          {drawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile slide-over drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            id="admin-drawer"
            className="absolute left-0 top-0 h-full w-64 glass-strong rounded-none border-y-0 border-l-0 flex flex-col p-6"
          >
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="self-end mb-4 p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-52 glass-strong rounded-none border-y-0 border-l-0 flex-col p-6 fixed h-full z-10">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="md:ml-52 flex-1 p-5 md:p-10 min-h-screen">{children}</main>
    </div>
  );
}

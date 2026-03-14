"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills & Tools" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-52 border-r border-white/5 flex flex-col p-6 fixed h-full z-10">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-lime-400 font-semibold mb-1">
            Portfolio
          </p>
          <h1 className="text-white font-bold">Admin CMS</h1>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-lime-400/10 text-lime-400"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-4 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="block px-3 py-2 rounded-lg text-xs text-white/25 hover:text-white/50 hover:bg-white/5 transition-colors"
          >
            ↗ View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-52 flex-1 p-10 min-h-screen">{children}</main>
    </div>
  );
}

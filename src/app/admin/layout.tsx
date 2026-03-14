// Server component — prevents static prerendering of all /admin/* pages
export const dynamic = "force-dynamic";

import AdminShell from "./AdminShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}

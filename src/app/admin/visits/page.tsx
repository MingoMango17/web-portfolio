"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { SiteVisit } from "@/types";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type CountryCount = { country: string; country_code: string | null; count: number };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function flagEmoji(code: string | null) {
  if (!code || code.length !== 2) return "🌐";
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

export default function VisitsAdmin() {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_visits")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(200);
    if (data) setVisits(data as SiteVisit[]);
    setLoading(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = visits.filter(
    (v) => new Date(v.visited_at) >= today
  ).length;

  const countryCounts = visits.reduce<Record<string, CountryCount>>(
    (acc, v) => {
      const key = v.country ?? "Unknown";
      if (!acc[key]) acc[key] = { country: key, country_code: v.country_code, count: 0 };
      acc[key].count++;
      return acc;
    },
    {}
  );
  const topCountries = Object.values(countryCounts).sort(
    (a, b) => b.count - a.count
  );

  return (
    <div className="max-w-5xl">
      <AdminPageHeader eyebrow="Analytics" title="Site Visits" />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Visits" value={visits.length} />
        <StatCard label="Today" value={todayCount} />
        <StatCard label="Countries" value={topCountries.length} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Countries breakdown */}
        <div className="glass rounded-xl p-5">
          <h2 className="text-xs uppercase tracking-widest text-ink-faint font-semibold mb-4">
            By Country
          </h2>
          {loading ? (
            <p className="text-ink-faint text-sm">Loading…</p>
          ) : topCountries.length === 0 ? (
            <p className="text-ink-faint text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topCountries.map((c) => {
                const pct = Math.round((c.count / visits.length) * 100);
                return (
                  <div key={c.country}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-ink-muted flex items-center gap-2">
                        <span>{flagEmoji(c.country_code)}</span>
                        <span className="truncate max-w-[110px]">{c.country}</span>
                      </span>
                      <span className="text-xs text-ink-faint font-mono">
                        {c.count}
                      </span>
                    </div>
                    <div
                      className="h-1 bg-white/5 rounded-full"
                      role="img"
                      aria-label={`${c.country}: ${c.count} visits (${pct}%)`}
                    >
                      <div
                        className="h-1 bg-accent rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent visits table */}
        <div className="col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest text-ink-faint font-semibold">
              Recent Visits
            </h2>
            <button
              onClick={loadVisits}
              className="text-xs text-ink-faint hover:text-ink-muted transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="text-ink-faint text-sm">Loading…</p>
          ) : visits.length === 0 ? (
            <p className="text-ink-faint text-sm text-center py-10">
              No visits recorded yet.
            </p>
          ) : (
            <div className="overflow-auto max-h-[520px]">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Recent site visits with time, page, location, and referrer
                </caption>
                <thead>
                  <tr className="text-left text-xs text-ink-faint uppercase tracking-widest border-b border-white/5">
                    <th scope="col" className="pb-3 pr-4 font-medium">Time</th>
                    <th scope="col" className="pb-3 pr-4 font-medium">Page</th>
                    <th scope="col" className="pb-3 pr-4 font-medium">Location</th>
                    <th scope="col" className="pb-3 font-medium">Referrer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visits.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-2.5 pr-4 text-ink-faint font-mono text-xs whitespace-nowrap">
                        {formatDate(v.visited_at)}
                      </td>
                      <td className="py-2.5 pr-4 text-ink-muted font-mono text-xs">
                        {v.page}
                      </td>
                      <td className="py-2.5 pr-4 text-ink-muted text-xs whitespace-nowrap">
                        {v.country ? (
                          <span className="flex items-center gap-1.5">
                            <span>{flagEmoji(v.country_code)}</span>
                            <span>
                              {v.city ? `${v.city}, ` : ""}
                              {v.country}
                            </span>
                          </span>
                        ) : (
                          <span className="text-ink-faint">—</span>
                        )}
                      </td>
                      <td className="py-2.5 text-ink-faint text-xs max-w-[160px] truncate">
                        {v.referrer ? (
                          <span title={v.referrer}>{v.referrer}</span>
                        ) : (
                          <span className="text-ink-faint/60">direct</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-ink-faint font-semibold mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { page, referrer } = await req.json();

    // Extract IP from headers (works on Vercel, Cloudflare, etc.)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") ?? null;

    const userAgent = req.headers.get("user-agent") ?? null;

    // Geo lookup via ip-api.com (free, no key needed, 45 req/min)
    let country: string | null = null;
    let countryCode: string | null = null;
    let city: string | null = null;
    let region: string | null = null;

    if (ip && ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geo = await fetch(
          `http://ip-api.com/json/${ip}?fields=country,countryCode,city,regionName`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (geo.ok) {
          const data = await geo.json();
          if (data.status !== "fail") {
            country = data.country ?? null;
            countryCode = data.countryCode ?? null;
            city = data.city ?? null;
            region = data.regionName ?? null;
          }
        }
      } catch {
        // Geo lookup failed — continue without location
      }
    }

    await supabase.from("site_visits").insert({
      page: page ?? "/",
      referrer: referrer || null,
      ip_address: ip,
      user_agent: userAgent,
      country,
      country_code: countryCode,
      city,
      region,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

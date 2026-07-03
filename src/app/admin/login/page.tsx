"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import Field from "@/components/admin/Field";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-strong rounded-2xl p-8">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          Portfolio
        </p>
        <h1
          className="text-3xl font-bold text-ink mb-1"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Admin CMS
        </h1>
        <p className="text-ink-faint text-sm mb-10">
          Sign in to manage your portfolio content
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@email.com"
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
          />

          {error && (
            <p
              role="alert"
              className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

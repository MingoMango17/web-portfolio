"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import BlurFade from "./BlurFade";
import { createClient } from "@/lib/supabase-browser";

const links = [
  {
    label: "Email",
    value: "junry.mingo17@gmail.com",
    href: "mailto:mingojunry@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "junry-mingo",
    href: "https://www.linkedin.com/in/junry-mingo-2bb819246/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "MingoMango17",
    href: "https://github.com/MingoMango17",
    icon: Github,
  },
  {
    label: "Location",
    value: "Cebu City, Philippines",
    href: "https://www.google.com/maps/place/Cebu+City",
    icon: MapPin,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: form,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputBase =
    "w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-400/50 transition-colors placeholder:text-white/20";

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1}>
        <p className="text-xs uppercase tracking-widest text-lime-400 mb-4 font-semibold">
          Contact
        </p>
      </BlurFade>

      <BlurFade delay={0.15}>
        <h2
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Let&apos;s work
          <br />
          <span className="text-lime-400">together.</span>
        </h2>
      </BlurFade>

      <BlurFade delay={0.2}>
        <p className="text-white/40 text-base max-w-md leading-relaxed mb-14">
          I&apos;m open to new opportunities, collaborations, or just a good
          conversation. Feel free to reach out through any of the channels
          below.
        </p>
      </BlurFade>

      {/* Availability badge */}
      <BlurFade delay={0.25}>
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/5 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
          </span>
          <span className="text-sm text-lime-400/80">Available for freelance &amp; full-time</span>
        </div>
      </BlurFade>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact links */}
        <BlurFade delay={0.3}>
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-lime-400/30 hover:bg-lime-400/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-lime-400 group-hover:border-lime-400/30 transition-all duration-300">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs text-white/25 mb-0.5">{link.label}</p>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-white/20 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </a>
              );
            })}
          </div>
        </BlurFade>

        {/* Email form */}
        <BlurFade delay={0.35}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
                Name
              </label>
              <input
                type="text"
                className={inputBase}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
                Email
              </label>
              <input
                type="email"
                className={inputBase}
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/30 uppercase tracking-widest block mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                className={`${inputBase} resize-none`}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
              {status === "success" && (
                <span className="text-lime-400 text-sm">Message sent!</span>
              )}
              {status === "error" && (
                <span className="text-red-400 text-sm">Something went wrong. Try again.</span>
              )}
            </div>
          </form>
        </BlurFade>
      </div>
    </section>
  );
};

export default Contact;

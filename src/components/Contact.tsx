"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import BlurFade from "./BlurFade";
import Button from "./ui/Button";
import { createClient } from "@/lib/supabase-browser";
import { SITE_EMAIL, SITE_GITHUB, SITE_LINKEDIN } from "@/lib/site";

const links = [
  {
    label: "Email",
    value: SITE_EMAIL,
    href: `mailto:${SITE_EMAIL}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "junry-mingo",
    href: SITE_LINKEDIN,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "MingoMango17",
    href: SITE_GITHUB,
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
      console.error("[Contact] send-contact-email failed:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }

    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputBase =
    "w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-ink text-sm focus:outline-none focus:border-accent/50 transition-colors placeholder:text-ink-faint/60";

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 md:px-12 py-24 border-t border-white/5"
    >
      <BlurFade delay={0.1} blur>
        <p className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">
          Contact
        </p>
      </BlurFade>

      <BlurFade delay={0.15} blur>
        <h2
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Let&apos;s work
          <br />
          <span className="text-accent">together.</span>
        </h2>
      </BlurFade>

      <BlurFade delay={0.2} blur>
        <p className="text-ink-muted text-base max-w-md leading-relaxed mb-14">
          I&apos;m open to new opportunities, collaborations, or just a good
          conversation. Feel free to reach out through any of the channels
          below.
        </p>
      </BlurFade>

      {/* Availability badge */}
      <BlurFade delay={0.25}>
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-sm text-accent/80">Available for freelance &amp; full-time</span>
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
                  className="glass rounded-xl flex items-center justify-between px-5 py-4 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ink-faint group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs text-ink-faint mb-0.5">{link.label}</p>
                      <p className="text-sm text-ink-muted group-hover:text-ink transition-colors duration-200">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
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
            className="glass-strong rounded-xl p-6 space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="text-xs text-ink-faint uppercase tracking-widest block mb-1.5"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                className={inputBase}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="text-xs text-ink-faint uppercase tracking-widest block mb-1.5"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                className={inputBase}
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="text-xs text-ink-faint uppercase tracking-widest block mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                className={`${inputBase} resize-none`}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <div className="flex items-center gap-4 pt-1">
              <Button type="submit" disabled={status === "loading"}>
                <Send size={14} />
                {status === "loading" ? "Sending…" : "Send Message"}
              </Button>
              {status === "success" && (
                <span role="status" className="text-accent text-sm">
                  Message sent!
                </span>
              )}
              {status === "error" && (
                <span role="alert" className="text-red-400 text-sm">
                  Something went wrong. Try again.
                </span>
              )}
            </div>
          </form>
        </BlurFade>
      </div>
    </section>
  );
};

export default Contact;

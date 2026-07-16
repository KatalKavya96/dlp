"use client";

import { ArrowUpRight, Send } from "lucide-react";
import { FormEvent, useState } from "react";

const footerGroups = [
  {
    title: "Explore",
    links: [["Our story", "#story"], ["The collection", "#collection"], ["Craft process", "#craft"], ["Journal", "#journal"]],
  },
  {
    title: "Ownership",
    links: [["Personalisation", "#consultation"], ["Lifetime restoration", "#care"], ["Heritage passport", "#craft"], ["Care guidance", "#care"]],
  },
  {
    title: "Work with us",
    links: [["Homeowners", "#consultation"], ["Designers", "#consultation"], ["Gifting", "#consultation"], ["Hospitality", "#consultation"]],
  },
] as const;

export function Footer() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <footer className="bg-[#181513] pb-8 pt-20 text-[#f7f2e8]">
      <div className="site-container">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <a className="flex items-center gap-3" href="#top" aria-label="Dharohar home">
              <span className="grid size-11 place-items-center rounded-full border border-[#d8b86b]/45 font-serif text-xl text-[#d8b86b]">D</span>
              <span className="font-serif text-4xl">Dharohar</span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/48">Handcrafted heritage cookware for modern homes, supported by provenance, personalisation and lifetime restoration.</p>
            <div className="mt-8 flex gap-3">
              <a className="grid size-10 place-items-center rounded-full border border-white/12 font-serif text-xs transition hover:border-[#d8b86b] hover:text-[#d8b86b]" href="https://instagram.com" aria-label="Instagram">IG</a>
              <a className="grid size-10 place-items-center rounded-full border border-white/12 text-xs font-serif transition hover:border-[#d8b86b] hover:text-[#d8b86b]" href="https://pinterest.com" aria-label="Pinterest">P</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8b86b]">{group.title}</p>
                <ul className="mt-5 space-y-3 text-sm text-white/55">
                  {group.links.map(([label, href]) => <li key={label}><a className="transition hover:text-white" href={href}>{label}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow !text-[#d8b86b]">The Dharohar letter</p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl sm:text-4xl">Stories of craft, care and the Indian kitchen.</h2>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" required placeholder="Your email address" className="h-13 min-w-0 flex-1 rounded-full border border-white/14 bg-white/5 px-5 text-sm outline-none transition placeholder:text-white/30 focus:border-[#d8b86b] focus:ring-4 focus:ring-[#d8b86b]/10" />
            <button className="primary-button justify-center" type="submit">Subscribe <Send size={15} /></button>
          </form>
          <p className="lg:col-start-2" aria-live="polite">
            {status === "success" ? <span className="text-xs text-[#d8b86b]">Thank you. Your place in the journal list is reserved.</span> : <span className="text-[10px] text-white/30">No clutter. Only occasional stories worth keeping.</span>}
          </p>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[10px] uppercase tracking-[0.14em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Dharohar. Crafted with care.</p>
          <div className="flex flex-wrap gap-5">
            <a className="hover:text-white" href="#top">Privacy</a>
            <a className="hover:text-white" href="#top">Terms</a>
            <a className="inline-flex items-center gap-1 hover:text-white" href="mailto:hello@dharohar.example">Contact <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

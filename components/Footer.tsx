"use client";

import { ArrowRight, Mail, Send } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

export function Footer() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  return (
    <footer id="consultation" className="border-t border-[#b78b3c]/25 bg-[#4d3421] text-[#fff8e9]">
      <div className="site-container grid gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e0bd76]">A private beginning</p>
          <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-[.93] sm:text-7xl">Build a kitchen your family will remember.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/65">Tell us which rituals, metals or gifting moments you are considering. We’ll prepare a thoughtful path into the collection.</p>
          <a href="mailto:hello@dharohar.example" className="mt-7 inline-flex items-center gap-3 text-sm text-[#f0d59b]"><Mail size={18} /> hello@dharohar.example</a>
        </div>
        <form onSubmit={submit} className="rounded-[2rem] border border-[#e3c27c]/28 bg-white/8 p-6 backdrop-blur sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">Your name</span><input required name="name" className="h-13 w-full rounded-xl border border-white/15 bg-white/8 px-4 text-sm outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="Name" /></label><label><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">Email</span><input required name="email" type="email" className="h-13 w-full rounded-xl border border-white/15 bg-white/8 px-4 text-sm outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="you@example.com" /></label></div>
          <label className="mt-4 block"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">What are you looking for?</span><textarea name="message" rows={4} className="w-full resize-none rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="A first copper piece, a complete rasoi, wedding gifting…" /></label>
          <button type="submit" className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#d3a84d] px-6 text-[10px] font-bold uppercase tracking-[.15em] text-[#3c291b] transition hover:bg-[#e2c275]">Request consultation <Send size={15} /></button>
          <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#e8cc91]">{sent ? "Thank you. Your request has been received." : "We usually reply within one working day."}</p>
        </form>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-7 py-8 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" aria-label="Dharohar home" className="flex items-center gap-3"><span className="relative block size-16 overflow-hidden rounded-full bg-[#fffaf0]"><Image src="/images/dharohar-mark.png" alt="" fill unoptimized sizes="64px" className="object-contain mix-blend-multiply" /></span><span><strong className="block font-serif text-3xl font-medium tracking-[.12em]">DHAROHAR</strong><span className="mt-0.5 block text-[7px] font-bold uppercase tracking-[.32em] text-[#e0bd76]">Heritage Kitchen</span></span></a>
          <div className="flex flex-wrap gap-5 text-[9px] font-bold uppercase tracking-[.14em] text-white/48"><a href="#collection" className="hover:text-white">Collection</a><a href="#materials" className="hover:text-white">Materials</a><a href="#craft" className="hover:text-white">Passport</a><a href="#care" className="hover:text-white">Care</a><a href="mailto:hello@dharohar.example" className="inline-flex items-center gap-1 hover:text-white">Contact <ArrowRight size={11} /></a></div>
          <p className="text-[9px] uppercase tracking-[.12em] text-white/35">© 2026 Dharohar</p>
        </div>
      </div>
    </footer>
  );
}

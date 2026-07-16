"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  ["Collection", "collection"],
  ["Materials", "materials"],
  ["Craft", "craft"],
  ["Personalise", "personalisation"],
  ["Lifetime care", "care"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("collection");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-32% 0px -62%" });
    links.forEach(([, id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="relative z-50 flex min-h-8 items-center justify-center border-b border-[#d8b86b]/18 bg-[#120d09] px-4 py-2 text-center text-[8px] font-semibold uppercase tracking-[.2em] text-[#d9bd83] sm:text-[9px]">
        Handcrafted in India · Pure metals · Lifetime craftsmanship care
      </div>
      <header className="sticky top-0 z-50 border-b border-[#d8b86b]/18 bg-[#17110d]/94 text-[#f7e9c9] shadow-[0_8px_35px_rgba(0,0,0,.18)] backdrop-blur-xl">
        <div className="site-container flex h-[78px] items-center justify-between gap-4">
          <a href="#top" aria-label="Dharohar home" className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="relative block size-11 overflow-hidden rounded-full bg-[#fffaf0] sm:size-14"><Image src="/images/dharohar-mark.png" alt="" fill priority unoptimized sizes="56px" className="object-contain mix-blend-multiply" /></span>
            <span><strong className="block font-serif text-xl font-medium tracking-[.08em] text-[#f2dcae] sm:text-3xl sm:tracking-[.12em]">DHAROHAR</strong><span className="mt-0.5 hidden text-[7px] font-bold uppercase tracking-[.32em] text-[#cda75e] sm:block">Heritage Kitchen</span></span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {links.map(([label, id]) => <a key={id} href={`#${id}`} className={`relative py-4 text-[9px] font-bold uppercase tracking-[.15em] transition hover:text-[#e2c27d] ${active === id ? "text-[#e2c27d]" : "text-white/65"}`}>{label}<span className={`absolute inset-x-0 bottom-2 mx-auto h-px bg-[#d8b86b] transition-all ${active === id ? "w-full" : "w-0"}`} /></a>)}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden md:block"><a href="#consultation" className="heritage-button heritage-button-filled">Private consultation</a></span>
            <a href="#collection" aria-label="View shopping collection" className="hidden size-10 place-items-center rounded-full border border-[#d8b86b]/25 text-[#e0c381] transition hover:border-[#d8b86b] hover:bg-white/5 sm:grid"><ShoppingBag size={17} strokeWidth={1.5} /></a>
            <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-full border border-[#d8b86b]/25 text-[#e0c381] lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? <motion.div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col bg-[#17110d] px-6 pb-8 pt-28 text-[#fff1d2] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
            {links.map(([label, id], index) => <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-[#d8b86b]/20 py-5 font-serif text-[clamp(2.25rem,11vw,4.5rem)] leading-none" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .05 }}>{label}<ArrowRight className="text-[#d8b86b]" strokeWidth={1.2} /></motion.a>)}
          </nav>
          <a href="#consultation" onClick={() => setOpen(false)} className="heritage-button heritage-button-filled justify-center">Book a heritage consultation</a>
        </motion.div> : null}
      </AnimatePresence>
    </>
  );
}

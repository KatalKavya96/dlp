"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Story", "story"],
  ["Collection", "collection"],
  ["Craft", "craft"],
  ["Lifetime Care", "care"],
  ["Journal", "journal"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("story");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -62%" },
    );
    links.forEach(([, id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="relative z-50 flex min-h-9 items-center justify-center gap-5 bg-[#231d19] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#efe4d2] sm:text-xs">
        <span>Crafted in India · Designed for generations · Lifetime restoration</span>
        <a className="hidden underline decoration-[#b88a3b] underline-offset-4 transition hover:text-white lg:inline" href="#craft">
          Explore the heritage process
        </a>
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-black/10 bg-[#f7f2e8]/90 text-[#211e1a] shadow-[0_12px_32px_rgba(35,28,21,.06)] backdrop-blur-xl" : "border-black/10 bg-[#f7f2e8]/84 text-[#211e1a] backdrop-blur-md"
        }`}
      >
        <div className="site-container flex h-[74px] items-center justify-between gap-5">
          <a className="group flex items-center gap-3" href="#top" aria-label="Dharohar home">
            <span className="grid size-9 place-items-center rounded-full border border-[#a85d35]/40 font-serif text-lg text-[#8c4e2f] transition group-hover:bg-[#8c4e2f] group-hover:text-white">D</span>
            <span className="font-serif text-2xl tracking-[-0.02em]">Dharohar</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {links.map(([label, id]) => (
              <a
                key={id}
                className={`relative py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:text-[#a85d35] ${active === id ? "text-[#a85d35]" : "text-current/75"}`}
                href={`#${id}`}
              >
                {label}
                <span className={`absolute inset-x-0 bottom-1 mx-auto h-px bg-[#a85d35] transition-all ${active === id ? "w-full" : "w-0"}`} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a className="hidden rounded-full border border-current/20 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#a85d35] hover:bg-[#a85d35] hover:text-white md:inline-flex" href="#consultation">
              Book a consultation
            </a>
            <button className="grid size-11 place-items-center rounded-full transition hover:bg-black/5" type="button" aria-label="Shopping bag">
              <ShoppingBag size={19} strokeWidth={1.6} />
            </button>
            <button
              className="grid size-11 place-items-center rounded-full transition hover:bg-black/5 lg:hidden"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#211e1a] px-6 pb-10 pt-32 text-[#f7f2e8] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
              {links.map(([label, id], index) => (
                <motion.a
                  key={id}
                  className="flex items-center justify-between border-b border-white/12 py-5 font-serif text-[clamp(2rem,10vw,4rem)] leading-none"
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {label}
                  <ArrowUpRight className="text-[#d8b86b]" strokeWidth={1.2} />
                </motion.a>
              ))}
            </nav>
            <a className="primary-button justify-center" href="#consultation" onClick={() => setOpen(false)}>
              Book a heritage consultation
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

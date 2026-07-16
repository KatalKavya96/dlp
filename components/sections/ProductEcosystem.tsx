"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, Fingerprint, Hammer, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { ecosystem } from "@/data/dharohar";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Hammer, Sparkles, Fingerprint, BookOpenText, RefreshCcw, ShieldCheck];

export function ProductEcosystem() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const selected = ecosystem[active];
  const Icon = icons[active];

  return (
    <section className="section-pad overflow-hidden bg-[#fcfaf6]" aria-labelledby="ecosystem-title">
      <div className="site-container">
        <Reveal>
          <SectionHeading eyebrow="One piece. An entire ecosystem." title="A lifetime of ownership begins at the workshop.">
            <p>Every Dharohar object comes with the knowledge, care and continuity needed to live well beyond a purchase.</p>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch">
          <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="tablist" aria-label="Dharohar ownership ecosystem">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#b88a3b]/55 to-transparent lg:block" />
            {ecosystem.map((item, index) => {
              const ItemIcon = icons[index];
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="ecosystem-panel"
                  className={`group relative z-10 flex min-h-36 items-start gap-4 rounded-3xl border p-5 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a85d35] sm:flex-col ${
                    active === index
                      ? "border-[#a85d35]/40 bg-[#f3e9d9] shadow-[0_20px_60px_rgba(79,47,30,.12)]"
                      : "border-black/8 bg-[#fcfaf6] hover:border-[#a85d35]/25 hover:bg-[#f7f2e8]"
                  }`}
                  onClick={() => setActive(index)}
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition ${active === index ? "border-[#a85d35] bg-[#a85d35] text-white" : "border-black/10 text-[#a85d35] group-hover:border-[#a85d35]/40"}`}>
                    <ItemIcon size={18} strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a6c3b]">{item.number}</span>
                    <span className="mt-2 block font-serif text-xl leading-tight">{item.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="ecosystem-panel" role="tabpanel" className="relative min-h-[400px] overflow-hidden rounded-[2rem] bg-[#211e1a] p-8 text-[#f7f2e8] sm:p-10">
            <div className="absolute -right-16 -top-20 size-72 rounded-full border border-[#d8b86b]/20" />
            <div className="absolute -right-3 top-5 size-52 rounded-full border border-[#d8b86b]/15" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative z-10 flex h-full flex-col"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <span className="grid size-14 place-items-center rounded-full border border-[#d8b86b]/35 text-[#d8b86b]">
                  <Icon size={24} strokeWidth={1.3} />
                </span>
                <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8b86b]">Stage {selected.number}</p>
                <h3 className="mt-4 max-w-md font-serif text-4xl leading-[1.02] sm:text-5xl">{selected.title}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/65">{selected.description}</p>
                <div className="mt-auto border-t border-white/12 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Customer benefit</p>
                  <p className="mt-2 font-serif text-2xl text-[#e2c580]">{selected.benefit}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

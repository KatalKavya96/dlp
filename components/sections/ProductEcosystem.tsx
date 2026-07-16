"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, Fingerprint, Hammer, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { AmbientScene } from "@/components/ui/AmbientScene";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem } from "@/data/dharohar";

const icons = [Hammer, Sparkles, Fingerprint, BookOpenText, RefreshCcw, ShieldCheck];
const scenes = [
  ["/images/artisan.jpg", "68% 48%"],
  ["/images/brass-collection.jpg", "45% 52%"],
  ["/images/heritage-product-rail.webp", "54% 52%"],
  ["/images/indian-table.jpg", "52% 55%"],
  ["/images/brass-collection.jpg", "74% 48%"],
  ["/images/heritage-kitchen.jpg", "48% 52%"],
] as const;

export function ProductEcosystem() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const selected = ecosystem[active];
  const Icon = icons[active];

  return (
    <section className="section-pad overflow-hidden bg-[#fcfaf6]" aria-labelledby="ecosystem-title">
      <div className="site-container">
        <Reveal>
          <SectionHeading id="ecosystem-title" eyebrow="One piece. An entire ecosystem." title="A lifetime of ownership begins at the workshop.">
            <p>Every Dharohar object comes with the knowledge, care and continuity needed to live well beyond a purchase.</p>
          </SectionHeading>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-[2.5rem] bg-[#211e1a] shadow-[0_45px_120px_rgba(53,34,24,.18)] lg:grid lg:min-h-[780px] lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative z-20 border-b border-white/12 bg-[#211e1a]/96 p-6 text-[#f7f2e8] sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(184,138,59,.14),transparent_40%)]" />
            <p className="relative text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d8b86b]">The ownership orbit</p>
            <div className="relative mt-8" role="tablist" aria-label="Dharohar ownership ecosystem">
              <span className="absolute bottom-5 left-[19px] top-5 w-px bg-gradient-to-b from-transparent via-[#d8b86b]/35 to-transparent" aria-hidden="true" />
              {ecosystem.map((item, index) => {
                const ItemIcon = icons[index];
                const isActive = active === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="ecosystem-panel"
                    className={`group relative flex w-full items-center gap-4 border-b border-white/10 py-5 text-left transition duration-500 last:border-b-0 ${isActive ? "text-white" : "text-white/46 hover:text-white/80"}`}
                    onClick={() => setActive(index)}
                  >
                    <span className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border transition duration-500 ${isActive ? "border-[#e2c580] bg-[#e2c580] text-[#251812] shadow-[0_0_28px_rgba(226,197,128,.28)]" : "border-white/15 bg-[#211e1a] text-[#d8b86b]"}`}>
                      <ItemIcon size={17} strokeWidth={1.45} />
                    </span>
                    <span className="flex flex-1 items-center justify-between gap-4">
                      <span>
                        <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d8b86b]">{item.number}</span>
                        <span className="mt-1 block font-serif text-xl leading-tight sm:text-2xl">{item.title}</span>
                      </span>
                      <span className={`h-px bg-[#d8b86b] transition-all duration-700 ${isActive ? "w-12" : "w-0 group-hover:w-6"}`} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="ecosystem-panel" role="tabpanel" className="relative min-h-[620px] overflow-hidden lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reducedMotion ? false : { opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <AmbientScene
                  src={scenes[active][0]}
                  alt={`${selected.title} within the Dharohar ownership story`}
                  className="h-full w-full"
                  imagePosition={scenes[active][1]}
                  overlayClassName="bg-[linear-gradient(180deg,rgba(24,17,13,.14),rgba(24,17,13,.36)_42%,rgba(24,17,13,.94)_100%)]"
                />
              </motion.div>
            </AnimatePresence>

            <div className="metal-orbit pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full border border-dashed border-[#e2c580]/25" aria-hidden="true" />
            <div className="metal-orbit-reverse pointer-events-none absolute -right-7 top-8 size-[270px] rounded-full border border-[#e2c580]/18" aria-hidden="true" />
            <div className="pointer-events-none absolute right-[72px] top-[112px] grid size-28 place-items-center rounded-full border border-[#e2c580]/25 bg-black/18 text-[#e2c580] backdrop-blur-sm" aria-hidden="true">
              <Icon size={34} strokeWidth={1.05} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${active}`}
                className="absolute inset-x-0 bottom-0 z-20 p-7 text-[#f7f2e8] sm:p-10 lg:p-12"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#e2c580]">Stage {selected.number}</p>
                <h3 className="mt-4 max-w-2xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.9] tracking-[-0.04em]">{selected.title}</h3>
                <div className="mt-7 grid max-w-3xl gap-6 border-t border-white/16 pt-6 sm:grid-cols-[1.2fr_.8fr]">
                  <p className="text-sm leading-7 text-white/68 sm:text-base">{selected.description}</p>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">Customer benefit</p>
                    <p className="mt-2 font-serif text-2xl leading-tight text-[#e2c580]">{selected.benefit}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

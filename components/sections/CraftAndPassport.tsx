"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpenText, ChevronRight, Fingerprint, QrCode, RefreshCcw, ShieldCheck, Utensils } from "lucide-react";
import { useState } from "react";
import { craftSteps } from "@/data/dharohar";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const passportViews = [
  {
    label: "Provenance",
    icon: Fingerprint,
    title: "The story behind your piece",
    copy: "Material, craft region, technique and maker record travel with the vessel from day one.",
    meta: ["Material", "Hammered copper"],
  },
  {
    label: "Care",
    icon: ShieldCheck,
    title: "Care that fits the material",
    copy: "Simple use, cleaning and storage guidance helps traditional cookware feel natural in a modern routine.",
    meta: ["Next care note", "After 20 uses"],
  },
  {
    label: "Recipes",
    icon: Utensils,
    title: "Recipes selected for the form",
    copy: "A growing library connects the vessel’s shape and material to the dishes it was made to hold.",
    meta: ["Saved recipe", "Slow-cooked dal"],
  },
  {
    label: "Restoration",
    icon: RefreshCcw,
    title: "A continuous service history",
    copy: "Inspections and restoration events build an ownership record instead of disappearing with time.",
    meta: ["Status", "Care plan active"],
  },
];

export function CraftAndPassport() {
  const [craft, setCraft] = useState(0);
  const [passport, setPassport] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section id="craft" className="section-pad bg-[#fcfaf6]" aria-labelledby="craft-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="The making" title="Made by hands. Preserved through generations.">
              <p>Traditional metalwork is not a texture applied at the end. It is a sequence of decisions made by practiced hands.</p>
            </SectionHeading>
          </Reveal>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-[#3a261b] sm:aspect-[5/4] lg:aspect-[4/5]">
                <SafeImage
                  src="/images/artisan.jpg"
                  alt="Artisan shaping a copper vessel by hand"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover transition-[object-position] duration-700"
                  style={{ objectPosition: `50% ${Math.max(28, 58 - craft * 4)}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={craft}
                    className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e2c580]">Stage {craftSteps[craft][0]}</p>
                    <h3 className="mt-2 font-serif text-4xl">{craftSteps[craft][1]}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/72">{craftSteps[craft][2]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-black/8 bg-black/8 sm:grid-cols-4">
                {[
                  ["Maker", "Recorded per piece"],
                  ["Craft region", "Recorded per piece"],
                  ["Material", "Copper · Brass · Bronze"],
                  ["Technique", "Hand-shaped"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#f7f2e8] p-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9a6c3b]">{label}</p>
                    <p className="mt-2 text-xs leading-5 text-[#5d554d]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <ol className="border-t border-black/10">
              {craftSteps.map(([number, title, description], index) => (
                <li key={number}>
                  <button
                    type="button"
                    className={`grid w-full grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-black/10 py-6 text-left transition sm:py-7 ${craft === index ? "text-[#a85d35]" : "hover:text-[#a85d35]"}`}
                    aria-expanded={craft === index}
                    onClick={() => setCraft(index)}
                  >
                    <span className="pt-2 text-[10px] font-semibold tracking-[0.18em]">{number}</span>
                    <span>
                      <span className="block font-serif text-2xl sm:text-3xl">{title}</span>
                      <AnimatePresence initial={false}>
                        {craft === index ? (
                          <motion.span
                            className="mt-3 block max-w-lg text-sm leading-6 text-[#665e55]"
                            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                          >
                            {description}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                    <ChevronRight className={`mt-2 transition ${craft === index ? "rotate-90" : ""}`} size={18} />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden bg-[#3a261b] text-[#f7f2e8]" aria-labelledby="passport-title">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_15%,#a85d35,transparent_30%),radial-gradient(circle_at_85%_85%,#b88a3b,transparent_25%)]" />
        <div className="site-container relative grid gap-14 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
          <Reveal>
            <p className="eyebrow !text-[#d8b86b]">The heritage passport</p>
            <h2 id="passport-title" className="mt-5 font-serif text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">Every object remembers.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/62 sm:text-lg">A QR-powered passport connects the physical piece to its origin, care knowledge, recipes, restoration history and future owners.</p>
            <div className="mt-9 grid gap-2 sm:grid-cols-2" role="tablist" aria-label="Heritage passport views">
              {passportViews.map((view, index) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.label}
                    type="button"
                    role="tab"
                    aria-selected={passport === index}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left text-sm transition ${passport === index ? "border-[#d8b86b]/65 bg-[#d8b86b]/12 text-white" : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"}`}
                    onClick={() => setPassport(index)}
                  >
                    <Icon size={18} strokeWidth={1.4} /> {view.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-[640px]" delay={0.12}>
            <div className="absolute -left-8 top-16 hidden rotate-[-7deg] rounded-2xl border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur-md sm:block">
              <QrCode className="text-[#d8b86b]" size={58} strokeWidth={1} />
              <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/60">Scan to open</p>
            </div>
            <div className="relative ml-auto w-full max-w-[390px] rounded-[3rem] border border-white/20 bg-[#181513] p-3 shadow-[0_50px_120px_rgba(0,0,0,.45)]">
              <div className="overflow-hidden rounded-[2.35rem] bg-[#f7f2e8] text-[#211e1a]">
                <div className="relative h-48 overflow-hidden">
                  <SafeImage src="/images/brass-collection.jpg" alt="Heritage passport cookware record" fill sizes="390px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4 flex items-end justify-between text-white">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f2d899]">Dharohar no. 0001</p>
                      <p className="mt-1 font-serif text-2xl">Signature Handi</p>
                    </div>
                    <Fingerprint size={28} strokeWidth={1.1} />
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={passport}
                    className="min-h-80 p-6"
                    initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#a85d35]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8c4e2f]">{passportViews[passport].label}</span>
                      <BookOpenText size={18} className="text-[#a85d35]" />
                    </div>
                    <h3 className="mt-7 font-serif text-3xl leading-tight">{passportViews[passport].title}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#6b6258]">{passportViews[passport].copy}</p>
                    <div className="mt-7 rounded-2xl border border-black/8 bg-white/65 p-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9a6c3b]">{passportViews[passport].meta[0]}</p>
                      <p className="mt-2 font-serif text-xl">{passportViews[passport].meta[1]}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

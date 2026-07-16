"use client";

import { ArrowRight, Gift, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ownershipSteps = ["Purchase", "Use", "Restore", "Pass down"];

export function PersonalisationOwnership() {
  const [engraving, setEngraving] = useState("The Mehra Family");
  const [restoration, setRestoration] = useState(52);

  return (
    <>
      <section className="section-pad bg-[#f7f2e8]" aria-labelledby="personalisation-title">
        <div className="site-container grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
          <Reveal>
            <SectionHeading id="personalisation-title" eyebrow="Personalisation" title="Make every piece part of your family story.">
              <p>A name, wedding date or private message is engraved with the same care as the object itself, then recorded in its certificate of authenticity.</p>
            </SectionHeading>
            <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              {["Family name", "Wedding date", "Personal message", "Custom gift note", "Certificate of authenticity", "Premium wooden packaging"].map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-black/10 pb-3 text-[#5e574f]"><Sparkles size={14} className="text-[#a85d35]" /> {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-[2.25rem] border border-black/8 bg-[#fcfaf6] p-5 shadow-[0_35px_90px_rgba(66,42,29,.12)] sm:p-8" delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Live engraving preview</p>
                <p className="mt-2 text-xs text-[#746b61]">Visual preview only · final placement is confirmed with you</p>
              </div>
              <Gift className="text-[#a85d35]" strokeWidth={1.3} />
            </div>
            <div className="relative mt-7 aspect-[5/3] overflow-hidden rounded-[1.75rem] bg-[#824a2f]">
              <SafeImage src="/images/brass-collection.jpg" alt="Metal surface prepared for a personal engraving preview" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover object-center scale-125 blur-[1px]" />
              <div className="absolute inset-0 bg-[#6f3e28]/35 backdrop-saturate-75" />
              <div className="absolute inset-[10%] grid place-items-center rounded-[50%] border border-[#f1d7a0]/35 shadow-[inset_0_0_80px_rgba(255,225,171,.22)]">
                <div className="text-center text-[#f8dfad] [text-shadow:0_1px_0_#59301f,0_0_18px_rgba(255,231,185,.45)]">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em]">Dharohar · Made for</p>
                  <p className="mt-3 font-serif text-[clamp(1.5rem,4vw,3.2rem)] italic leading-none">{engraving || "Your family name"}</p>
                  <p className="mt-3 text-[9px] uppercase tracking-[0.24em]">To carry forward</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-end justify-between gap-4">
                <label className="text-xs font-semibold uppercase tracking-[0.14em]" htmlFor="engraving">Family name</label>
                <span className="text-xs text-[#7b7167]" aria-live="polite">{engraving.length}/24</span>
              </div>
              <input
                id="engraving"
                className="mt-3 h-13 w-full rounded-xl border border-black/12 bg-white px-4 text-base outline-none transition placeholder:text-black/35 focus:border-[#a85d35] focus:ring-4 focus:ring-[#a85d35]/10"
                value={engraving}
                maxLength={24}
                placeholder="Enter a family name"
                onChange={(event) => setEngraving(event.target.value)}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="care" className="section-pad overflow-hidden bg-[#211e1a] text-[#f7f2e8]" aria-labelledby="care-title">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <Reveal>
              <p className="eyebrow !text-[#d8b86b]">Lifetime ownership</p>
              <h2 id="care-title" className="mt-5 font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.93] tracking-[-0.05em]">Owned for generations. Restored, not replaced.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">Re-tinning, polishing, dent repair, inspection and re-certification keep the object—and its story—in use.</p>
              <a className="primary-button mt-8" href="#consultation">Explore lifetime care <ArrowRight size={16} /></a>
            </Reveal>

            <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-4" delay={0.1}>
              {ownershipSteps.map((step, index) => (
                <div key={step} className="relative bg-[#27221f] p-5 sm:min-h-40 sm:p-6">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-[#d8b86b]">0{index + 1}</span>
                  <p className="mt-8 font-serif text-2xl">{step}</p>
                  {index < ownershipSteps.length - 1 ? <ArrowRight className="absolute right-3 top-5 hidden text-white/20 sm:block" size={15} /> : <RefreshCcw className="absolute right-4 top-4 text-[#d8b86b]/55" size={18} />}
                </div>
              ))}
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="eyebrow !text-[#d8b86b]">Restoration study</p>
                  <h3 className="mt-2 font-serif text-3xl">See the return of the surface.</h3>
                </div>
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/55">Drag to compare</span>
              </div>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-[#6f4c34]">
                <SafeImage src="/images/brass-collection.jpg" alt="Restored brass cookware surface" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover saturate-125" />
                <div className="absolute inset-y-0 left-0 overflow-hidden grayscale brightness-[.52] sepia" style={{ width: `${restoration}%` }}>
                  <div className="relative h-full" style={{ width: `${10000 / Math.max(restoration, 1)}%` }}>
                    <SafeImage src="/images/brass-collection.jpg" alt="Worn cookware surface before restoration" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                  </div>
                </div>
                <div className="absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,.18)]" style={{ left: `${restoration}%` }}>
                  <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#f7f2e8] text-[#211e1a] shadow-xl">↔</span>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[9px] uppercase tracking-[0.15em]">Before</span>
                <span className="absolute right-4 top-4 rounded-full bg-[#f7f2e8] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#211e1a]">Restored</span>
                <label htmlFor="restoration" className="sr-only">Restoration before and after comparison</label>
                <input
                  id="restoration"
                  type="range"
                  min="8"
                  max="92"
                  value={restoration}
                  onChange={(event) => setRestoration(Number(event.target.value))}
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
            </Reveal>

            <Reveal className="grid content-start gap-3" delay={0.14}>
              {["Re-tinning", "Polishing", "Dent repair", "Inspection", "Re-certification", "Ownership transfer", "Lifetime care guidance"].map((service, index) => (
                <div key={service} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#d8b86b]/35">
                  <span className="flex items-center gap-3 text-sm text-white/72"><ShieldCheck className="text-[#d8b86b]" size={16} strokeWidth={1.4} /> {service}</span>
                  <span className="text-[9px] text-white/30">0{index + 1}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SafeImage } from "@/components/ui/SafeImage";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 90]);

  return (
    <section id="top" ref={section} className="relative min-h-[calc(100svh-110px)] overflow-hidden bg-[#f7f2e8]">
      <div className="site-container grid min-h-[calc(100svh-110px)] items-center gap-12 py-12 lg:grid-cols-[0.94fr_1.06fr] lg:py-16">
        <div className="relative z-10 max-w-3xl py-4">
          <motion.p className="eyebrow" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Heritage · Crafted for generations
          </motion.p>
          <motion.h1
            className="mt-6 max-w-[760px] font-serif text-[clamp(3.25rem,7.2vw,7.7rem)] leading-[0.88] tracking-[-0.06em] text-balance"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            India’s heritage kitchen, <em className="font-normal text-[#a85d35]">reimagined.</em>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-xl text-base leading-7 text-[#5e574f] sm:text-lg sm:leading-8"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
          >
            Handcrafted copper, brass and bronze cookware with artisan provenance, considered personalisation and lifetime restoration.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
          >
            <a className="primary-button justify-center" href="#collection">
              Explore the collection <ArrowRight size={16} />
            </a>
            <a className="secondary-button justify-center" href="#consultation">
              Build your heritage kitchen
            </a>
          </motion.div>
          <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#766d63]">
            <span className="grid size-9 place-items-center rounded-full border border-black/15"><ArrowDown size={14} /></span>
            Scroll to enter the story
          </div>
        </div>

        <motion.div className="relative min-h-[460px] sm:min-h-[620px] lg:min-h-[calc(100svh-160px)]" style={{ y: imageY }}>
          <div className="absolute inset-0 overflow-hidden rounded-[48%_48%_12%_12%/18%_18%_10%_10%] bg-[#442d21] shadow-[0_42px_90px_rgba(58,38,27,.24)] lg:rounded-[52%_12%_14%_42%/24%_12%_18%_24%]">
            <SafeImage
              src="/images/hero-kitchen.jpg"
              alt="Warm kitchen interior with copper cookware"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211e1a]/50 via-transparent to-[#fff5df]/5" />
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-3xl"
              animate={reducedMotion ? undefined : { x: ["-180%", "260%"] }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
          </div>
          {[
            ["Copper", "top-[15%] -left-3"],
            ["Brass", "right-[-10px] top-[48%]"],
            ["Bronze", "bottom-[11%] left-[6%]"],
          ].map(([label, position], index) => (
            <motion.span
              key={label}
              className={`absolute ${position} rounded-full border border-white/35 bg-[#211e1a]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-xl backdrop-blur-md`}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.13 }}
            >
              {label}
            </motion.span>
          ))}
          <div className="absolute -bottom-5 right-6 max-w-[220px] rounded-2xl border border-black/10 bg-[#fcfaf6]/95 p-5 shadow-2xl backdrop-blur-xl sm:right-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a85d35]">Lifetime piece 01</p>
            <p className="mt-2 font-serif text-xl leading-tight">Made to earn its place in the family.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

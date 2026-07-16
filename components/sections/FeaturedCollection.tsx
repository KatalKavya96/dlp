"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { products, type Product } from "@/data/dharohar";

const filters = ["All", "Copper", "Brass", "Bronze"] as const;

export function FeaturedCollection() {
  const [material, setMaterial] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const reducedMotion = useReducedMotion();
  const visibleProducts = useMemo(() => (material === "All" ? products : products.filter((product) => product.material === material)), [material]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="heritage-page-pad">
      <section id="collection" aria-labelledby="collection-title" className="heritage-frame heritage-collection-dark relative overflow-hidden px-6 py-14 text-[#fff2d5] sm:px-10 lg:px-16 lg:py-20">
        <span className="heritage-corner heritage-corner-tl" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-tr" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-bl" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-br" aria-hidden="true" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="heritage-label w-fit"><span>✦</span> Utensils for sale <span>✦</span></p>
            <h2 id="collection-title" className="mt-7 max-w-4xl font-serif text-5xl leading-[.93] tracking-[-.035em] text-[#fff2d5] sm:text-6xl">Two rows of objects, made for a lifetime.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/58">Explore copper, brass and bronze cookware. Buy actions are ready to connect to the Dharohar commerce store.</p>
          </Reveal>
          <div className="flex flex-wrap gap-2" aria-label="Filter products by material">
            {filters.map((filter) => <button key={filter} type="button" aria-pressed={material === filter} onClick={() => setMaterial(filter)} className={`rounded-full border px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] transition ${material === filter ? "border-[#d7b66f] bg-[#d7b66f] text-[#24180f]" : "border-white/20 bg-black/15 text-white/60 hover:border-[#d7b66f]/65 hover:text-white"}`}>{filter}</button>)}
          </div>
        </div>

        <motion.div layout className="no-scrollbar -mx-6 mt-12 grid auto-cols-[82vw] grid-flow-col grid-rows-2 gap-5 overflow-x-auto px-6 pb-5 sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:grid-rows-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <motion.article layout key={product.name} className="group snap-center overflow-hidden rounded-[1.3rem] border border-[#d8b86b]/38 bg-[#19110c]/74 p-3 shadow-[0_18px_45px_rgba(0,0,0,.2)]" initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ delay: index * .05 }}>
              <button type="button" className="w-full text-left" onClick={() => setSelected(product)} aria-label={`View details for ${product.name}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#2b1d14]">
                  <SafeImage src={product.image} alt={`${product.name}, ${product.material.toLowerCase()} cookware`} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: product.imagePosition }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#51341e]/48 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/65 bg-[#fffaf0]/88 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-[#8e6428] backdrop-blur">{product.material}</span>
                  <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#fffaf0] text-[#9e712d] shadow-lg"><ArrowRight size={16} /></span>
                </div>
                <div className="px-2 pb-2 pt-5"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#d7b66f]">{product.collection}</p><h3 className="mt-2 font-serif text-3xl leading-none text-[#fff0ce]">{product.name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-white/50">{product.use}</p><div className="mt-5 flex items-center justify-between border-t border-white/12 pt-4"><strong className="font-serif text-xl font-medium text-[#f1d69b]">{product.price}</strong><span className="text-[9px] font-bold uppercase tracking-[.13em] text-white/45">View details</span></div></div>
              </button>
              <a href="#consultation" className="heritage-button heritage-button-filled mt-2 w-full justify-center">Buy now <ShoppingBag size={15} /></a>
            </motion.article>
          ))}
        </motion.div>

        {typeof document !== "undefined" ? createPortal(
          <AnimatePresence>
            {selected ? <motion.div className="fixed inset-0 z-[100] flex justify-end bg-[#372414]/48 p-0 backdrop-blur-sm sm:p-4" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
              <motion.div className="h-full w-full overflow-y-auto border border-[#b78b3c]/35 bg-[#fffaf0] p-5 text-[#40301f] shadow-2xl sm:max-w-xl sm:rounded-[2rem] sm:p-8" initial={reducedMotion ? false : { x: "100%" }} animate={{ x: 0 }} exit={reducedMotion ? undefined : { x: "100%" }} transition={{ duration: .45, ease: [0.22, 1, .36, 1] }}>
                <div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a4772d]">Private product view</p><button type="button" autoFocus aria-label="Close quick view" onClick={() => setSelected(null)} className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/30 hover:bg-[#f3e5ce]"><X size={18} /></button></div>
                <div className="relative mt-7 aspect-[4/3] overflow-hidden rounded-[1.5rem]"><SafeImage src={selected.image} alt={`${selected.name} detailed view`} fill sizes="(max-width: 640px) 100vw, 576px" className="object-cover" style={{ objectPosition: selected.imagePosition }} /></div>
                <p className="mt-7 text-[10px] font-bold uppercase tracking-[.18em] text-[#a4772d]">{selected.collection} · {selected.material}</p><h3 id="quick-view-title" className="heritage-display mt-3 text-5xl">{selected.name}</h3><p className="mt-5 text-base leading-8 text-[#706251]">{selected.use} Each piece includes material guidance and access to the Dharohar ownership journey.</p>
                <ul className="mt-7 space-y-3 text-sm">{["Artisan and material provenance", "Personalisation available", "Care guidance and restoration access"].map(item => <li key={item} className="flex items-center gap-3"><Check className="text-[#b78b3c]" size={16} /> {item}</li>)}</ul>
                <div className="mt-8 flex items-center justify-between border-y border-[#b78b3c]/25 py-5"><span className="text-sm text-[#756958]">Indicative range</span><strong className="font-serif text-2xl font-medium">{selected.price}</strong></div>
                <a href="#consultation" onClick={() => setSelected(null)} className="heritage-button heritage-button-filled mt-7 w-full justify-center">Buy on Dharohar <ArrowRight size={16} /></a>
              </motion.div>
            </motion.div> : null}
          </AnimatePresence>, document.body) : null}
      </section>
    </div>
  );
}

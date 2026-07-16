"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/data/dharohar";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const filters = ["All", "Copper", "Brass", "Bronze"] as const;

export function FeaturedCollection() {
  const [material, setMaterial] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const reducedMotion = useReducedMotion();
  const visibleProducts = useMemo(
    () => (material === "All" ? products : products.filter((product) => product.material === material)),
    [material],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="collection" className="section-pad bg-[#f7f2e8]" aria-labelledby="collection-title">
      <div className="site-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading eyebrow="The collection" title="Cookware with the presence of an object of art.">
              <p>Begin with one ritual, or build a complete kitchen through a private material consultation.</p>
            </SectionHeading>
          </Reveal>
          <div className="flex flex-wrap gap-2" aria-label="Filter products by material">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${material === filter ? "border-[#211e1a] bg-[#211e1a] text-white" : "border-black/15 bg-white/50 hover:border-[#a85d35]"}`}
                aria-pressed={material === filter}
                onClick={() => setMaterial(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <motion.article
              layout
              key={product.name}
              className="group min-w-[82vw] snap-center sm:min-w-0"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.55 }}
            >
              <button className="block w-full text-left" type="button" onClick={() => setSelected(product)} aria-label={`View details for ${product.name}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#d8c9b5]">
                  <SafeImage
                    src={product.image}
                    alt={`${product.name}, ${product.material.toLowerCase()} cookware reference`}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.055]"
                    style={{ objectPosition: product.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {product.material}
                  </span>
                  <span className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-[#fcfaf6] text-[#211e1a] opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={18} />
                  </span>
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a6c3b]">{product.collection}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{product.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#6d655c]">{product.use}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 text-sm">
                  <span className="font-medium">{product.price}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a85d35]">View details</span>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      {selected ? (
          <motion.div
            className="fixed inset-0 z-[70] flex justify-end bg-black/55 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.div
              className="h-full w-full overflow-y-auto bg-[#f7f2e8] p-5 sm:max-w-xl sm:p-8"
              initial={reducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">Private view</p>
                <button className="grid size-11 place-items-center rounded-full border border-black/10 hover:bg-black/5" type="button" aria-label="Close quick view" onClick={() => setSelected(null)} autoFocus>
                  <X size={19} />
                </button>
              </div>
              <div className="relative mt-8 aspect-square overflow-hidden rounded-[2rem]">
                <SafeImage src={selected.image} alt={`${selected.name} close view`} fill sizes="(max-width: 640px) 100vw, 576px" className="object-cover" style={{ objectPosition: selected.imagePosition }} />
              </div>
              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9a6c3b]">{selected.collection} · {selected.material}</p>
              <h3 id="quick-view-title" className="mt-3 font-serif text-4xl sm:text-5xl">{selected.name}</h3>
              <p className="mt-5 text-base leading-7 text-[#655d54]">{selected.use} Each final piece is selected in conversation, then registered to its owner through a Dharohar Heritage Passport.</p>
              <ul className="mt-7 space-y-3 text-sm">
                {["Artisan and material provenance", "Personalisation available", "Care guidance and restoration access"].map((item) => (
                  <li key={item} className="flex items-center gap-3"><Check className="text-[#a85d35]" size={16} /> {item}</li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-between border-y border-black/10 py-5">
                <span className="text-sm text-[#746a60]">Indicative range</span>
                <span className="font-serif text-2xl">{selected.price}</span>
              </div>
              <a className="primary-button mt-7 w-full justify-center" href="#consultation" onClick={() => setSelected(null)}>
                Personalise this piece <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
      ) : null}
    </section>
  );
}

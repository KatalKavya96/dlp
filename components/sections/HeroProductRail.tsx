"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { useRef } from "react";
import { SafeImage } from "@/components/ui/SafeImage";

const heroProducts = [
  {
    name: "Kansa Dining Set",
    material: "Bronze",
    price: "From ₹8,900",
    slug: "kansa-dining-set",
    position: "0% 58%",
  },
  {
    name: "Hammered Handi Pair",
    material: "Copper",
    price: "From ₹12,400",
    slug: "hammered-handi-pair",
    position: "51% 55%",
  },
  {
    name: "Celebration Thali",
    material: "Brass",
    price: "From ₹15,800",
    slug: "celebration-thali",
    position: "100% 58%",
  },
] as const;

function getStoreHref(slug: string) {
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL?.replace(/\/$/, "");
  return storeUrl ? `${storeUrl}/products/${slug}` : "#consultation";
}

function ProductCard({ product, index }: { product: (typeof heroProducts)[number]; index: number }) {
  const reducedMotion = useReducedMotion();
  const card = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: card, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-18, 18]);

  return (
    <motion.article
      ref={card}
      className="group min-w-[82vw] snap-center border-l border-white/15 pl-4 first:border-l-0 first:pl-0 sm:min-w-[42vw] lg:min-w-0 lg:pl-5"
      initial={reducedMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.72, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="product-portrait relative aspect-[1.18/1] overflow-hidden rounded-[1.55rem] bg-[#291d18]">
        <motion.div className="absolute -inset-y-8 inset-x-0" style={{ y: imageY }}>
          <SafeImage
            src="/images/heritage-product-rail.webp"
            alt={`${product.name} in a warm stone studio setting`}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 30vw"
            className="scale-[1.45] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.51]"
            style={{ objectPosition: product.position }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120e0b]/75 via-transparent to-white/5" />
        <div className="product-glint absolute inset-y-0 -left-1/2 w-1/3 rotate-[12deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f4dfad] backdrop-blur-md">
          {product.material}
        </span>
        <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full border border-white/25 bg-[#f6efe3]/95 text-[#2b1c15] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c7a66b]">Object 0{index + 1}</p>
          <h3 className="mt-2 font-serif text-[1.75rem] leading-none tracking-[-0.025em] text-[#fff8ec]">{product.name}</h3>
          <p className="mt-2 text-xs text-white/55">{product.price}</p>
        </div>
        <a
          href={getStoreHref(product.slug)}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#d4ad67]/45 px-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f6dfb3] transition hover:border-[#e5c47d] hover:bg-[#e5c47d] hover:text-[#251812]"
          aria-label={`Buy ${product.name}`}
        >
          Buy <MoveRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}

export function HeroProductRail() {
  return (
    <section className="relative z-20 -mt-7 overflow-hidden bg-[#201712] pb-14 pt-11 text-white sm:-mt-10 sm:pb-16 sm:pt-14 lg:-mt-12" aria-labelledby="hero-products-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_10%,rgba(184,138,59,.18),transparent_28%),linear-gradient(120deg,transparent_5%,rgba(255,255,255,.025)_50%,transparent_85%)]" />

      <div className="marquee-mask mb-10 overflow-hidden border-y border-white/10 py-3" aria-hidden="true">
        <div className="heritage-marquee flex w-max items-center gap-8 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.26em] text-[#c9aa76]">
          {[0, 1].map((loop) => (
            <div className="flex items-center gap-8" key={loop}>
              <span>Made slowly</span><span className="size-1 rounded-full bg-[#a85d35]" />
              <span>Personalised with restraint</span><span className="size-1 rounded-full bg-[#a85d35]" />
              <span>Restored for life</span><span className="size-1 rounded-full bg-[#a85d35]" />
              <span>Registered to its keeper</span><span className="size-1 rounded-full bg-[#a85d35]" />
            </div>
          ))}
        </div>
      </div>

      <div className="site-container">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c7a66b]">The first ritual</p>
            <h2 id="hero-products-title" className="mt-3 max-w-xl font-serif text-[clamp(2.35rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.045em] text-[#fff8ec]">
              Begin with an <em className="font-normal text-[#d39a70]">object of meaning.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/55">
            A first look at pieces planned for the Dharohar store. Every buy action is ready for the final commerce destination.
          </p>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {heroProducts.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}
        </div>
        <p className="mt-5 text-[9px] uppercase tracking-[0.18em] text-white/35">Indicative pricing · Final catalogue and availability will live on the Dharohar store</p>
      </div>
    </section>
  );
}

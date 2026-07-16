"use client";

import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { featuredProducts, type ProductCardData, type ProductMaterial } from "@/data/featured-products";

const filters: Array<{ label: string; value: "all" | ProductMaterial }> = [
  { label: "All", value: "all" },
  { label: "Copper", value: "copper" },
  { label: "Brass", value: "brass" },
  { label: "Bronze", value: "bronze" },
];

const weightedEase = [0.22, 1, 0.36, 1] as const;

function getStoreHref(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL?.replace(/\/$/, "") ?? "https://shop.dharohar.com";
  return `${storeUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function ProductCard({ product, priority = false }: { product: ProductCardData; priority?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [previewed, setPreviewed] = useState(false);
  const showSecondary = hovered || previewed;
  const detailsHref = getStoreHref(product.detailsHref ?? product.buyHref);
  const buyHref = getStoreHref(product.buyHref);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[#b78b3c]/45 bg-[linear-gradient(180deg,rgba(40,26,17,.94),rgba(18,12,8,.98))] p-2.5 shadow-[0_20px_48px_rgba(0,0,0,.3)] transition duration-300 hover:border-[#e1b85c]/85 hover:shadow-[0_0_0_1px_rgba(224,178,76,.25),0_24px_70px_rgba(0,0,0,.45),0_0_34px_rgba(196,137,43,.12)] focus-within:border-[#e1b85c]">
      <div
        className="group/image relative aspect-[1.32/1] overflow-hidden rounded-[.82rem] bg-[#2a1b12]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div className="absolute inset-0" animate={{ scale: showSecondary && !reducedMotion ? 1.035 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: weightedEase }}>
          <SafeImage
            src={product.primaryImage}
            alt={`${product.name} in its primary studio view`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 86vw, (max-width: 900px) 44vw, (max-width: 1200px) 31vw, 23vw"
            className="object-cover"
            style={{ objectPosition: product.primaryPosition }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-0 w-[58%] overflow-hidden border-l border-[#e1b85c]/80 shadow-[-16px_0_30px_rgba(14,8,4,.3)]"
          initial={false}
          animate={{ x: showSecondary ? "0%" : "104%" }}
          transition={{ duration: reducedMotion ? 0 : 0.62, ease: weightedEase }}
        >
          <div className="absolute inset-y-0 right-0 w-[172%]">
            <SafeImage
              src={product.secondaryImage}
              alt={`${product.name} alternate product preview`}
              fill
              sizes="(max-width: 640px) 86vw, (max-width: 900px) 44vw, (max-width: 1200px) 31vw, 23vw"
              className="object-cover"
              style={{ objectPosition: product.secondaryPosition }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b1008]/18 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#160d08]/64 via-transparent to-black/5" />
        <span className="absolute left-3 top-3 rounded-md border border-[#c99b43]/45 bg-[#120b07]/72 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[.17em] text-[#e2bf75] backdrop-blur-md">{product.material}</span>
        <span className={`absolute right-3 top-3 rounded-md border border-[#c99b43]/35 bg-[#120b07]/72 px-2 py-1 text-[7px] font-bold uppercase tracking-[.13em] text-[#d3ad62] backdrop-blur-md transition-opacity ${showSecondary ? "opacity-100" : "opacity-0"}`}>Alternate view</span>
        <button
          type="button"
          className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full border border-[#e2bd70]/70 bg-[#17100b]/88 text-[#f1d99d] shadow-lg backdrop-blur transition hover:border-[#f0ca77] hover:bg-[#c99536] hover:text-[#1d120b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e1b85c]"
          aria-label={`${showSecondary ? "Hide" : "Show"} alternate view of ${product.name}`}
          aria-pressed={previewed}
          onClick={() => setPreviewed((value) => !value)}
        >
          <Eye size={16} strokeWidth={1.7} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
        <h3 className="font-serif text-[1.55rem] leading-none tracking-[-.025em] text-[#f7e7c4]">{product.name}</h3>
        <p className="mt-2 line-clamp-1 text-[11px] leading-5 text-white/46">{product.shortDescription}</p>
        <div className="mt-3 flex items-center gap-4 border-t border-white/10 pt-3">
          <strong className="font-serif text-base font-medium text-[#e2bd70]">{product.price}</strong>
          <a className="ml-auto text-[8px] font-bold uppercase tracking-[.15em] text-white/45 transition hover:text-[#e4c27d]" href={detailsHref}>View details</a>
        </div>
        <a
          href={buyHref}
          className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#e3b959]/80 bg-[linear-gradient(180deg,#e2b756,#b67b24)] px-4 text-[9px] font-extrabold uppercase tracking-[.17em] text-[#211309] shadow-[inset_0_1px_rgba(255,246,204,.45),0_8px_20px_rgba(124,75,15,.25)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0cd83]"
          aria-label={`Buy ${product.name} on the Dharohar store`}
        >
          Buy now <ShoppingBag size={14} strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

function ProductCarouselRow({ products, row }: { products: ProductCardData[]; row: 1 | 2 }) {
  const reducedMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [metrics, setMetrics] = useState({ cardWidth: 280, gap: 16, maxOffset: 0, maxIndex: 0 });

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const width = viewport.clientWidth;
    const visible = width < 560 ? 1.12 : width < 900 ? 2.15 : width < 1200 ? 3 : 4;
    const gap = width < 640 ? 12 : 16;
    const cardWidth = (width - gap * (visible - 1)) / visible;
    const trackWidth = products.length * cardWidth + Math.max(0, products.length - 1) * gap;
    const maxOffset = Math.max(0, trackWidth - width);
    const maxIndex = Math.max(0, Math.ceil(maxOffset / (cardWidth + gap)));
    setMetrics({ cardWidth, gap, maxOffset, maxIndex });
    setIndex((current) => Math.min(current, maxIndex));
  }, [products.length]);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure]);

  const step = metrics.cardWidth + metrics.gap;
  const offset = Math.min(index * step, metrics.maxOffset);
  const progress = metrics.maxIndex === 0 ? 0 : index / metrics.maxIndex;
  const canMoveBack = index > 0;
  const canMoveForward = index < metrics.maxIndex;

  const move = (direction: -1 | 1) => setIndex((current) => Math.max(0, Math.min(metrics.maxIndex, current + direction)));

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (reducedMotion) return;
    if (info.offset.x < -55 || info.velocity.x < -320) move(1);
    if (info.offset.x > 55 || info.velocity.x > 320) move(-1);
  };

  return (
    <div
      className="relative"
      role="region"
      aria-label={`${row === 1 ? "First" : "Second"} product carousel row`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}
    >
      <button
        type="button"
        aria-label={`Show previous products in row ${row}`}
        disabled={!canMoveBack}
        onClick={() => move(-1)}
        className="absolute -left-3 top-[38%] z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#d7aa51]/65 bg-[#16100c]/92 text-[#e3c078] shadow-xl transition hover:border-[#f0cc79] hover:bg-[#c79132] hover:text-[#1d120a] disabled:pointer-events-none disabled:opacity-25 sm:-left-5 lg:-left-7"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        aria-label={`Show next products in row ${row}`}
        disabled={!canMoveForward}
        onClick={() => move(1)}
        className="absolute -right-3 top-[38%] z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#d7aa51]/65 bg-[#16100c]/92 text-[#e3c078] shadow-xl transition hover:border-[#f0cc79] hover:bg-[#c79132] hover:text-[#1d120a] disabled:pointer-events-none disabled:opacity-25 sm:-right-5 lg:-right-7"
      >
        <ArrowRight size={18} />
      </button>

      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          className="flex will-change-transform"
          style={{ gap: metrics.gap }}
          animate={{ x: -offset }}
          transition={{ duration: reducedMotion ? 0.01 : 0.82, ease: weightedEase }}
          drag={metrics.maxOffset > 0 && !reducedMotion ? "x" : false}
          dragConstraints={{ left: -metrics.maxOffset, right: 0 }}
          dragElastic={0.035}
          onDragEnd={handleDragEnd}
        >
          {products.map((product, productIndex) => (
            <motion.div
              key={product.id}
              className="shrink-0"
              style={{ width: metrics.cardWidth }}
              initial={reducedMotion ? false : { opacity: 0, y: row === 1 ? 18 : -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: reducedMotion ? 0 : Math.min(productIndex, 4) * 0.045, ease: weightedEase }}
            >
              <ProductCard product={product} priority={row === 1 && productIndex < 4} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center gap-4 px-10" aria-hidden="true">
        <span className="size-2.5 rotate-45 border border-[#b98b36]/65 bg-[#17100b]" />
        <div className="relative h-px flex-1 bg-[linear-gradient(90deg,rgba(178,132,48,.12),rgba(216,177,93,.58),rgba(178,132,48,.12))]">
          <motion.div
            className="absolute -top-[2px] left-0 h-[5px] w-[18%] rounded-full bg-[linear-gradient(90deg,#8f5e1e,#f0c96f,#fff0b0)] shadow-[0_0_13px_rgba(232,183,75,.58)]"
            animate={{ x: `${progress * 455}%` }}
            transition={{ duration: reducedMotion ? 0.01 : 0.82, ease: weightedEase }}
          >
            <motion.span className="absolute -right-1.5 -top-1 size-3 rounded-[50%_20%_20%_50%] border border-[#f3d17e] bg-[#bd7f25] shadow-[0_0_10px_rgba(233,183,73,.6)]" animate={{ rotate: progress * 360 }} transition={{ duration: reducedMotion ? 0.01 : 0.82, ease: weightedEase }} />
          </motion.div>
        </div>
        <span className="size-2.5 rotate-45 border border-[#b98b36]/65 bg-[#17100b]" />
      </div>
      <span className="sr-only" role="status">Row {row}, position {index + 1} of {metrics.maxIndex + 1}</span>
    </div>
  );
}

export function FeaturedCollection() {
  const [material, setMaterial] = useState<"all" | ProductMaterial>("all");
  const filteredProducts = useMemo(() => material === "all" ? featuredProducts : featuredProducts.filter((product) => product.material === material), [material]);
  const firstRow = filteredProducts.filter((product) => product.row === 1);
  const secondRow = filteredProducts.filter((product) => product.row === 2);

  return (
    <div className="heritage-page-pad">
      <section id="collection" aria-labelledby="collection-title" className="heritage-frame heritage-collection-dark relative isolate overflow-hidden px-6 py-14 text-[#fff2d5] sm:px-10 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.14]">
          <SafeImage src="/images/heritage-product-rail.webp" alt="" fill sizes="100vw" className="scale-125 object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_10%,#100a07_80%),linear-gradient(90deg,#100a07_55%,transparent_82%,#100a07)]" />
        </div>
        <span className="heritage-corner heritage-corner-tl" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-tr" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-bl" aria-hidden="true" />
        <span className="heritage-corner heritage-corner-br" aria-hidden="true" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="heritage-label w-fit"><span>✦</span> Utensils for sale <span>✦</span></p>
            <h2 id="collection-title" className="mt-7 max-w-4xl font-serif text-[clamp(3rem,5vw,5.6rem)] leading-[.91] tracking-[-.04em] text-[#fff0cf]">Two Rows of Objects, Made for a Lifetime.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">Explore copper, brass and bronze cookware. Discover signature pieces and continue to the Dharohar commerce store.</p>
          </div>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Filter products by material">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={material === filter.value}
                onClick={() => setMaterial(filter.value)}
                className={`shrink-0 rounded-full border px-6 py-3 text-[9px] font-extrabold uppercase tracking-[.17em] transition duration-300 ${material === filter.value ? "border-[#e4ba61] bg-[linear-gradient(180deg,#e2b756,#bd8229)] text-[#241409] shadow-[0_8px_24px_rgba(189,126,35,.24)]" : "border-[#b58a3d]/45 bg-[#140d09]/45 text-[#e6cc95]/78 hover:border-[#dcb35e] hover:text-[#f3dca9]"}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={material}
            className="mt-10 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.32, ease: weightedEase }}
          >
            <ProductCarouselRow products={firstRow} row={1} />
            <ProductCarouselRow products={secondRow} row={2} />
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
